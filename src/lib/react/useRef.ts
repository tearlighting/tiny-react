import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"

export function useRef<T>(initialValue: T | (() => T)): { current: T } {
  const hook = updateWorkInProgressHook()
  if (!currentlyRenderingFiber?.alternate) {
    const current = initialValue instanceof Function ? initialValue() : initialValue
    hook.memorizedState = { current }
  }
  return hook.memorizedState
}
