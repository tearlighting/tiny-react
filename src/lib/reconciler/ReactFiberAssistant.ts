import { EFiberFlags, EFiberTags } from "../shared/constants"
import { isTextNode } from "../shared/utils"
import type { Fiber } from "./ReactFiber"
/**
 * 先看key,再看type
 * @param vnode
 * @param fiberNode
 * @returns
 */
export function sameNode(vnode: VNode | string | number, fiberNode: Fiber | null): boolean {
  if (isTextNode(vnode)) {
    const res = fiberNode && fiberNode.tag === EFiberTags.HostText
    return !!res
  }
  const res = vnode && fiberNode && vnode.key === fiberNode.key && vnode.type === fiberNode.type
  return !!res
}

/**
 * 专门更新 lastPlacedIndex,还是 mount，update的统一入口，这里设置index，
 * 还是统一处理的地方Placement，默认都可以复用，打的flag不影响外面的flag
 * @param newFiber
 * @param lastPlacedIndex
 * @param shouldTrackSideEffects
 */
export function placeChild(newFiber: Fiber, lastPlacedIndex: number, newIndex: number, shouldTrackSideEffects: boolean): number {
  newFiber.index = newIndex
  //初次渲染,不需要记录位置
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex
  }
  /**
   * 旧的fiber
   */
  const current = newFiber.alternate
  if (current) {
    const oldIndex = current.index!
    //你想差到之前的位置，说明位置乱了，需要移动
    if (oldIndex < lastPlacedIndex) {
      //能复用但乱了
      newFiber.flags |= EFiberFlags.Placement
      return lastPlacedIndex
    } else {
      //更新lastPlacedIndex，不需要移动
      return oldIndex
    }
  } else {
    //需要插入
    newFiber.flags |= EFiberFlags.Placement
    return lastPlacedIndex
  }
}

export function deleteRemainingChildren(returnFiber: Fiber, currentFirstChild: Fiber | null) {
  //   console.log(currentFirstChild, "delete")

  let childToDelete = currentFirstChild
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete)
    childToDelete = childToDelete.sibling
  }
}
function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
  console.log("deletion")

  childToDelete.flags |= EFiberFlags.Deletion
  returnFiber.deletions = returnFiber.deletions || []
  returnFiber.deletions.push(childToDelete)
}

export function mapRemainingChildren(currentFiber: Fiber | null) {
  const res = new Map<string, Fiber>()
  let current = currentFiber
  while (current) {
    res.set(current.key || current.index!.toString(), current)
    current = current.sibling
  }
  return res
}
