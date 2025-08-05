const useReducer = `function useReducer<T extends any>(reducer: ((state: T) => T) | null, initialState: T | (() => T)) {
  const hook = updateWorkInProgressHook()
  //mount
   if (!currentlyRenderingFiber?.alternate) {
     hook.memorizedState = initialState instanceof Function ? initialState() : initialState
 
     const dispatch = (action: T | ((pre: T) => T)) => {
       dispatchReducerAction(currentlyRenderingFiber!, hook, reducer, action)
     }
     hook.updateQueue = { pending: null, dispatch }
   }
  return [hook.memorizedState,hook.updateQueue.dispatch] as [T, (action: T | ((pre: T) => T)) => void]
}

interface Update<T> {
    action: T | ((prev: T) => T)
    next: Update<T> | null
}

function dispatchReducerAction<T extends any>(fiber: Fiber, hook: Hook, reducer: ((state: T) => T) | null, action: T | ((pre: T) => T)) {
  const update: Update<T> = { action: reducer ?? action, next: null }
  if (hook.updateQueue?.pending === null) {
    hook.updateQueue.pending = update
  }
  const queue = hook.updateQueue.pending
  //create circular linked list
  if (queue.next === null) {
    update.next = update 
  } else {
    update.next = queue.next
    queue.next = update
  }
  //point to last node
  hook.updateQueue.pending = update
  const wip = { ...fiber }
  wip.alternate = fiber
  fiber.alternate = wip
  //start update(scheduler and workloop)
  //this is the core of reactive
  scheduleUpdateOnFiber(wip)
}
`
const example = `const [count, setCount] = useReducer((x) => x + 1, 1)

//vnode
<MyButton onClick={() => setCount(count)}>count:{count}</MyButton>
`

export const getUseReducerData = () => {
  return {
    useReducer,
    example,
  }
}
