const completeWork = `
function completeWork(wip: Fiber) {
  const current = wip.alternate
  const tag = wip.tag!
  //mount
  if (!current) {
    //createInstance
    tagsCreateInstanceStrategy[tag]?.(wip)
    //apendChild 
    if (wip.stateNode && tag === EFiberTags.HostComponent) {
      appendAllChildren(wip.stateNode as HTMLElement, wip.child)
    }
    //add props to dom
    finalizeInitialChildren(wip)
  } else {
    //reuse dom,diff Props,mark update
    tagsUpdateComponetStrategy[tag]?.(wip)
    //mark ref
    markRef(wip)
  }
  //bubble flags and updateQueue
  bubbleProperties(wip)
}
  

function bubbleProperties(wip: Fiber) {
  let effectQueue: Effect | null = null
  let child = wip.child ?? (wip as unknown as FiberRoot).pendingChildren
  let subtreeFlags = 0
  while (child) {
    subtreeFlags |= child.subtreeFlags
    subtreeFlags |= child.flags
    if (child.tag === EFiberTags.FunctionComponent || child.tag === EFiberTags.ForwardRef) {
      effectQueue = mergeEffectQueues(effectQueue, child.updateQueue)
    }
    child = child.sibling
  }
  wip.subtreeFlags |= subtreeFlags
  if (wip.tag === EFiberTags.FunctionComponent || wip.tag === EFiberTags.ForwardRef) {
    if (effectQueue) wip.updateQueue = mergeEffectQueues(wip.updateQueue as Effect, effectQueue)
  } else {
    const host = getHostFunctionComponentFiber(wip)
    if (host && effectQueue) {
      host.updateQueue = mergeEffectQueues(host.updateQueue as Effect, effectQueue)
    }
  }
}
`

export function getCompleteWorkData() {
  return {
    completeWork,
  }
}
