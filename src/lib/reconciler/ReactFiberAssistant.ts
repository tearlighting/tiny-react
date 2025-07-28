import { EFiberFlags } from "../shared/constants"
import type { Fiber } from "./ReactFiber"
/**
 * 先看key,再看type
 * @param vnode
 * @param fiberNode
 * @returns
 */
export function sameNode(vnode: VNode, fiberNode: Fiber | null): boolean {
  const res = vnode && fiberNode && vnode.key === fiberNode.key && vnode.type === fiberNode.type
  return !!res
}

/**
 * 专门更新 lastPlacedIndex
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
    if (oldIndex < lastPlacedIndex) {
      newFiber.flags |= EFiberFlags.Update
      return lastPlacedIndex
    } else {
      return oldIndex
    }
  } else {
    newFiber.flags |= EFiberFlags.Placement
    return lastPlacedIndex
  }
}

export function deleteRemainingChildren(returnFiber: Fiber, currentFirstChild: Fiber | null) {
  let childToDelete = currentFirstChild
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete)
    childToDelete = childToDelete.sibling
  }
}
function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
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
