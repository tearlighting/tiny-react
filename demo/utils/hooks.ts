const hooks = `
interface Hook<T = any> {
    /**
     * The memorized state of the hook
     */
    memorizedState?: Effect | State | Ref | Memo | Callback
    /**
     * The queue of updates for the hook
     */
    queue?: Update<T> | null
    /**
    /**
     * The next hook in the chain
     */
    next?: Hook | null
    /**
     * update for useState
     */
    updateQueue: {
      /**
       *circular linked list to update useState
       */
      pending: Update<T> | null
}

/**
 * FunctionComponent fiber is rendering
 */
export let currentlyRenderingFiber: Fiber | null = null
/**
 * use it to link linked list
 */
let workInProgressHook: Hook | null = null
/**
 * alternate's memoizedState Hooks
 */
export let currentHook: Hook | null = null
export function renderWithHooks(wip: Fiber) {
  //initialize
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memoizedState = null
  workInProgressHook = null
  currentlyRenderingFiber.updateQueue = null
}

export function updateWorkInProgressHook(): Hook {
  let hook: Hook
  const current = currentlyRenderingFiber!.alternate
  // Mount
  if (!current) {
    hook = { memorizedState: null, next: null, updateQueue: { pending: null } }
    if (workInProgressHook) {
      //add hook to linked list
      workInProgressHook = workInProgressHook.next = hook
    } else {
      //memoizedState will point to the first hook
      currentlyRenderingFiber!.memoizedState = workInProgressHook = hook
    }
  } else {
    //Update 
    currentHook = currentHook?.next ?? current.memoizedState!
    //clone to avoid change old value
    hook = cloneHook(currentHook)
    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentlyRenderingFiber!.memoizedState = hook
    }
  }
  //compute new state for useState
  processUpdateQueue(hook)
  return hook
}

function processUpdateQueue<T>(hook: Hook<T>) {
  if (hook.updateQueue?.pending) {
    let update = hook.updateQueue.pending.next!
    let state = hook.memorizedState
    do {
      const action = update.action
      state = action instanceof Function ? action(state) : action
      update = update.next!
    } while (update !== hook.updateQueue.pending.next)
    hook.memorizedState = state

    hook.updateQueue.pending = null //clear
  }
}

`

export const getHooksData = () => {
  return { hooks }
}
