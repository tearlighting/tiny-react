const useCallbackStr = `
interface Callback<T extends (...args: any[]) => any> {
    deps?: any[]
    callback: T
}
export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]) {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as Callback<T>
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))
  if (changed) {
    const res: Callback<T> = {
      deps,
      callback,
    }
    hook.memorizedState = res
  }
  return hook.memorizedState.callback
}
`

export function getUseCallbackData() {
  return {
    useCallbackStr,
  }
}
