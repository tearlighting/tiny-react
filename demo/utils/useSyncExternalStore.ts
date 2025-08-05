const useSyncExternalStoreStr = `export function useSyncExternalStore<T>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => T): T {
  const hook = updateWorkInProgressHook()
  const fiber = currentlyRenderingFiber!
  const snapshot = getSnapshot()
  if (!currentlyRenderingFiber?.alternate) { // mount
    hook.memorizedState = snapshot
    let unsubscribe: (() => void) | null = null
    const onStoreChange = () => {
      const nextValue = getSnapshot()
      if (!Object.is(hook.memorizedState, nextValue)) {
        hook.memorizedState = nextValue
        scheduleUpdateOnFiber(fiber)
      }
    }
    unsubscribe = subscribe(onStoreChange)
    const effect: Effect = {
      create: () => subscribe(onStoreChange),
      destroy: unsubscribe,
      tag: EEffectTag.syncExternalStore,
    }
    pushEffect(fiber, cloneEffect(effect))
  }
  if (!Object.is(hook.memorizedState, snapshot)) {
    hook.memorizedState = snapshot
  }
  return hook.memorizedState
}
`

const example = `const usePubSub = () => {
  let eventList = useRef(() => new Map<string, (...args: any) => any>())
  const publish = useCallback((event: string, ...args: any[]) => {
    if (eventList.current.has(event)) {
      eventList.current.get(event)!.call(null, ...args)
    }
  }, [])
  const subscribe = useCallback((event: string, fn: (...args: any[]) => any) => {
    eventList.current.set(event, fn)
    return () => {
      eventList.current.delete(event)
    }
  }, [])
  return { publish, subscribe }
}

const useAddCount = () => {
  const countRef = useRef(0)
  const { publish, subscribe } = usePubSub()
  const addCount = useCallback(() => {
    publish("addCount", ++countRef.current)
  }, [])
  const getSnapshot = () => countRef.current
  return { addCount, subscribe, getSnapshot }
}

//vnode
<MyButton onClick={addCount}> count:{count}</MyButton>  
`

export const getUseSyncExternalStoreData = () => {
  return {
    example,
    useSyncExternalStoreStr,
  }
}
