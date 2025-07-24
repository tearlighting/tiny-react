import { isStr } from "../shared/utils"
import { createFiber, type Fiber } from "./ReactFiber"

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
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child
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

  //第一次遍历，会尝试复用
  for (; oldFiber && i < newChildren.length; i++) {
    //第一次肯定不会，oldFiber不存在
  }
  //进入上面的循环，且i===newChildren.length,说明只需要更新
  if (i === newChildren.length) {
  }
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
  //第二次遍历，会创建新的fiber对象
}
/**
 * 专门更新 lastPlacedIndex
 * @param newFiber
 * @param lastPlacedIndex
 * @param shouldTrackSideEffects
 */
function placeChild(newFiber: Fiber, lastPlacedIndex: number, newIndex: number, shouldTrackSideEffects: boolean): number {
  newFiber.index = newIndex
  //初次渲染,不需要记录位置
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex
  }
  //todo
  return Infinity
}
