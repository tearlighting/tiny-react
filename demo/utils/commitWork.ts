const commitWork = `
export function commitWork(fiber: Fiber) {
  //mount
  if (!fiber.alternate) {
    appendAllChildren(fiber.return!.stateNode!, fiber.child)
    const wipRoot = getFiberRoot(fiber)
    commitAttachRef(wipRoot.pendingChildren)
  } else {
    //  because of recursing, layout don't call layout Effects before exchange alternate
    if (!(fiber.flags === 0 && fiber.subtreeFlags === 0)) {
      beforeMutation(fiber)
      mutation(fiber)
      layout(fiber)
      commitWork(fiber.child)
    }
    commitWork(fiber.sibling)
  }
}

function beforeMutation(fiber: Fiber) {
  // 1. getSnapshotBeforeUpdate
  // if (wip.tag === EFiberTags.ClassComponent && wip.instance?.getSnapshotBeforeUpdate) {
  //   const snapshot = wip.instance.getSnapshotBeforeUpdate()
  //   wip.instance.__snapshot = snapshot
  // }
  // 2.remove old ref
  if (fiber.flags! & EFiberFlags.Ref) {
    patchRef(fiber.alternate?.ref!, null)
  }
  // 3. can do other things to control old dom
}
/**
 * update dom by flags
 * @param fiber
 */
function mutation(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Placement) {
    commitPlacement(fiber)
  }
  if (fiber.flags & EFiberFlags.Update) {
    // console.log(fiber.flags & EFiberFlags.Update, fiber)
    commitUpdate(fiber)
  }
  if (fiber.flags & EFiberFlags.Deletion) {
    commitDeletion(fiber)
  }
}
function layout(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Ref) {
    // set new ref
    patchRef(fiber.ref!, fiber.stateNode)
  }
  //move it out because of  recursing
  //   const wipRoot = getFiberRoot(fiber)!
  //   flushEffects(wipRoot.updateQueue, [EEffectTag.layoutEffect, EEffectTag.imperativeHandle])
}
`

const commitRoot = `
function commitRoot() {
  if (!wipRoot || !wipRoot.pendingChildren) return
  commitWork(wipRoot.pendingChildren)
  //excharge alternate
  wipRoot.current = wipRoot.pendingChildren
  wipRoot.pendingChildren = createWorkInProgress(wipRoot.current)
  wipRoot.pendingChildren.return = wipRoot as any
  /**
   * commit layout effects synchronously
   */
  flushEffects(wipRoot.updateQueue, [EEffectTag.layoutEffect, EEffectTag.imperativeHandle, EEffectTag.syncExternalStore])
  const rootEffects = wipRoot.updateQueue as Effect | null
 /**
  * comit passive effects asynchronously
  * /
  setTimeout(() => {
    flushEffects(rootEffects, [EEffectTag.passiveEffect])
  })
  wipRoot!.updateQueue = null
  wip = null
}
`

export const getCommitWortData = () => {
  return {
    commitWork,
    commitRoot,
  }
}
