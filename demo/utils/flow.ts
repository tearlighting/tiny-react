const overView = `
let wip: Fiber | null = null

let wipRoot: FiberRoot | null = null
function scheduleUpdateOnFiber(fiber: Fiber | FiberRoot) {
  wipRoot = getFiberRoot(fiber)
  wip = wipRoot.pendingChildren
  //Scheduler's function which controls when to call workLoop
  scheduleCallback(workLoop)
}

function workLoop(remainingTime: number) {
  while (wip) {
    if (remainingTime < 0) return workLoop
    //call workLoop
    performUnitOfWork()
  }
  if (!wip) {
    //this function will update dom ,exchange alternate fiber, call sync effectLists like useLayoutEffect and useImperativeHandleEffect
    //at last call effectLists with aysnc like useEffect
    commitRoot()
  }
}

function performUnitOfWork() {
  //when update, this function will use diff algorithm ,including marking PlaceMent,Deletion
  beginWork(wip)
  //DFS child,then sibling
  if (wip?.child) {
    wip = wip.child
    //return is very strange but this is the core of time slicing
    return
  }
  //when update,this function will mark Update,Ref .etc and bubble flags and updateQueue to parent
  completeWork(wip)

  let next = wip
  //find sibling
  while (next) {
    if (next.sibling) {
      wip = next.sibling
      return
    }
    next = next.return
    completeWork(next)
  }
  wip = null
}
`

const fiber = `
class Fiber {
  /**
   * ref comes from vnode,if HostFunctionComponent want to use it,then forwardRef is needed.
   */
  ref: VNode["ref"] | null
  /**
   * key comes from vnode.it will be used to diff algorithm
   */
  key: string | null
  /**
   * type comes from vnode,it can be a string,function. it will be use to diff algorithm
   */
  type: string | Function | undefined | null
  /**
   * props comes from vnode,it will be used to diff algorithm,create real dom, mark update,etc.
   */
  props: Partial<{ id: string; children: VNode[] | string; className: string } & Record<string, any>> | null
  /**
   * real dom
   */
  stateNode: HTMLElement | null
  /**
   * tag is defined by type,it can be FunctionComponent、ClassComponent、HostComponent、HostText,etc.
   */
  tag: EFiberTags | null
  /**
   * child fiber node
   */
  child: Fiber | null
  /**
   * sibling fiber node
   */
  sibling: Fiber | null
  /**
   * return fiber node
   */
  return: Fiber | null
  /**
   * marking flags,like Placement,Deletion,Update,Ref,etc.
   */
  flags: EFiberFlags
  /**
   *
   * index is used to diff algorithm to defined Placement and Deletion
   */
  index: number | null
  /**
   * current fiber node when committed
   */
  alternate: Fiber | null
  /**
   * bubble from child fiber node
   */
  subtreeFlags: number = 0
  /**
   * the fiber node need to be delete.coming from diff algorithm
   */
  deletions: Fiber[] = []
  /**
   * the point to hook's (linked list) first node
   */
  memoizedState: Hook | null = null
  /**
   * circular linked list which bubble from child fiber node, like useEffect,useLayoutEffect’s callback,etc.
   */
  updateQueue: UpdateQueue = null
  /**
   * use as key to find context
   */
  contextType:any
  /**
   * context real value
   * /
   contextValue: any = null
  ...
}`

export const getFlowData = () => {
  return {
    overView,
    fiber,
  }
}
