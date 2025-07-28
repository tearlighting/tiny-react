import { EFiberFlags } from "../shared/constants"
import { isStr } from "../shared/utils"
import { createFiber, type Fiber } from "./ReactFiber"
import { deleteRemainingChildren, mapRemainingChildren, placeChild, sameNode } from "./ReactFiberAssistant"

/**
 *生成子fiber，然后串成链表
 * @param returnFiber
 * @param children
 */
export function reconcilerChildren(returnFiber: Fiber, children: VNode | string | (VNode | string)[]) {
  //文本节点已经处理过了
  if (isStr(children)) {
    return
  }
  //归一化子节点
  const newChildren = Array.isArray(children) ? children : [children]
  /**
   * 上一个fiber对象
   */
  let previousNewFiber: Fiber | null = null
  /**
   * @var previousNewFiber 对应的缓冲树上的fiber对象
   */
  let oldFiber = returnFiber.alternate?.child ?? null
  /**
   * @var newChildren 遍历index
   */
  let i = 0
  /**
   * 上一次dom元素插入的最远距离
   */
  let lastPlacedIndex = 0
  /**
   * 是否需要追踪副作用
   * false是初次渲染
   * true是更新
   */
  let shouldTrackSideEffects = !!returnFiber.alternate
  /**
   * 下一个或者当前的fiber对象
   */
  let nextOldFiber = null

  //第一次遍历，会尝试复用
  for (; oldFiber && i < newChildren.length; i++) {
    //第一次肯定不会，oldFiber不存在
    const newChildrenVNode = newChildren[i]
    if (newChildrenVNode === null || isStr(newChildrenVNode)) {
      continue
    }
    //如果oldFiber存在，则尝试复用
    //old 是 5,4,3,2,1
    //new 是 1,2,3,4,5
    if (oldFiber.index && oldFiber.index > i) {
      nextOldFiber = oldFiber
      oldFiber = null
    } else {
      nextOldFiber = oldFiber.sibling
    }
    if (!sameNode(newChildrenVNode, oldFiber)) {
      //还原
      if (!oldFiber) oldFiber = nextOldFiber
      break
    }
    //可以复用,复用dom对象
    const newFiber = createFiber(newChildrenVNode, returnFiber)
    Object.assign<Fiber, Partial<Fiber>>(newFiber, {
      stateNode: oldFiber!.stateNode,
      alternate: oldFiber,
      flags: EFiberFlags.Update,
    })
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
    if (previousNewFiber) {
      previousNewFiber.sibling = newFiber
    } else {
      returnFiber.child = newFiber
    }
    previousNewFiber = newFiber
    oldFiber = nextOldFiber
  }
  //进入上面的循环，且i===newChildren.length,说明只需要更新
  //该创建的都创建了
  if (i === newChildren.length) {
    //删除多余的
    deleteRemainingChildren(returnFiber, oldFiber)
  } else {
    //第二次遍历
    //新增的没有创建完，需要建Map查找子节点
    const map = mapRemainingChildren(oldFiber)
    while (i < newChildren.length) {
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null || isStr(newChildrenVNode)) {
        i++
        continue
      }
      const newFiber = createFiber(newChildrenVNode, returnFiber)
      const key = newFiber.key ?? newFiber.index!.toString()
      if (map.has(key)) {
        const alternate = map.get(key)
        Object.assign<Fiber, Partial<Fiber>>(newFiber, {
          stateNode: alternate!.stateNode,
          alternate,
          flags: EFiberFlags.Update,
        })
        map.delete(key)
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      if (previousNewFiber) {
        previousNewFiber.sibling = newFiber
      } else {
        returnFiber.child = newFiber
      }
      previousNewFiber = newFiber
    }
    //删除多余的
    for (let [_, alternate] of map.entries()) {
      deleteRemainingChildren(returnFiber, alternate)
    }
  }
  //mount
  if (!oldFiber) {
    //第一次渲染
    for (; i < newChildren.length; i++) {
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null) {
        continue
      }
      const newFiber = createFiber(newChildrenVNode, returnFiber)
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      //开始串链表
      newFiber.return = returnFiber
      if (previousNewFiber) {
        previousNewFiber.sibling = newFiber
      } else {
        returnFiber.child = newFiber
      }
      previousNewFiber = newFiber
    }
  }
}
