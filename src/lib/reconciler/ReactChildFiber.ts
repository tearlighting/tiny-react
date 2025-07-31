import { EFiberFlags } from "../shared/constants"
import { createFiber, type Fiber } from "./ReactFiber"
import { deleteRemainingChildren, mapRemainingChildren, placeChild, sameNode } from "./ReactFiberAssistant"

/**
 *生成子fiber，然后串成链表
 * @param returnFiber
 * @param children
 */
export function reconcilerChildren(returnFiber: Fiber, children: VNode | string | (VNode | string)[]) {
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
   * 上一次处里的dom元素插入的最远距离
   */
  let lastPlacedIndex = 0
  /**
   * 是否需要追踪副作用
   * false是初次渲染
   * true是更新
   */
  let shouldTrackSideEffects = !!returnFiber.alternate
  /**
   * 缓存下一个旧节点
   */
  let nextOldFiber = null
  /**
   * 把链表与新Node串起来，previousNewFiber不存在说明是child，存在就是sibling，然后重置
   * @param newFiber
   */
  function linkFiber(newFiber: Fiber) {
    if (previousNewFiber) {
      previousNewFiber.sibling = newFiber
    } else {
      returnFiber.child = newFiber
    }
    previousNewFiber = newFiber
  }
  /**
   * 复用alternate
   * @param newFiber
   * @param oldFiber
   */
  function reuseAlternateFiber(newFiber: Fiber, oldFiber: Fiber) {
    // Object.assign<Fiber, Partial<Fiber>>(newFiber, {
    //   //这是completeWork里面复用
    //   // stateNode: oldFiber!.stateNode,
    //   alternate: oldFiber,
    //   //   flags: EFiberFlags.Update,
    // })
    newFiber.alternate = oldFiber
    oldFiber.alternate = newFiber
  }
  //mount
  if (!oldFiber) {
    // console.log("mount")
    //第一次渲染
    for (; i < newChildren.length; i++) {
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null) {
        continue
      }
      const newFiber = createFiber(newChildrenVNode, returnFiber)
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      //开始串链表
      linkFiber(newFiber)
    }
  } else {
    // console.log("update")

    //update
    //第一次遍历，会尝试复用
    for (; oldFiber && i < newChildren.length; i++) {
      //第一次肯定不会，oldFiber不存在
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null) {
        continue
      }

      //如果oldFiber存在，则尝试复用
      //old 是 5,4,3,2,1
      //new 是 1,2,3,4,5
      //如果oldFiber跑后面去了，赋值为null强制退出
      if (oldFiber.index && oldFiber.index > i) {
        nextOldFiber = oldFiber
        oldFiber = null
      } else {
        //如果没有跑后面去，为下一次循环做准备，最终还是要看sameNode的判断
        nextOldFiber = oldFiber.sibling
      }
      if (!sameNode(newChildrenVNode, oldFiber)) {
        //如果强制退出的，还要还原一下
        if (!oldFiber) oldFiber = nextOldFiber
        break
      }
      //可以复用
      const newFiber = createFiber(newChildrenVNode, returnFiber)

      reuseAlternateFiber(newFiber, oldFiber!)
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      linkFiber(newFiber)
      oldFiber = nextOldFiber
    }

    //进入上面的循环，且i===newChildren.length,说明只需要更新
    //该创建的都创建了
    if (i === newChildren.length) {
      //删除多余的
      oldFiber && deleteRemainingChildren(returnFiber, oldFiber)
    } else {
      //第二次遍历
      //新增的没有创建完，需要建Map查找子节点
      const map = mapRemainingChildren(oldFiber)
      while (i < newChildren.length) {
        const newChildrenVNode = newChildren[i]
        if (newChildrenVNode === null) {
          i++
          continue
        }
        const newFiber = createFiber(newChildrenVNode, returnFiber)
        const key = newFiber.key ?? newFiber.index!.toString()
        if (map.has(key)) {
          const alternate = map.get(key)
          reuseAlternateFiber(newFiber, alternate!)
          map.delete(key)
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
        linkFiber(newFiber)
        i++
      }
      //删除多余的
      for (let [_, alternate] of map.entries()) {
        deleteRemainingChildren(returnFiber, alternate)
      }
    }
  }
}
