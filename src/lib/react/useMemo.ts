import { areHookInputsEqual } from "../shared/utils"
import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"

export function useMemo<T>(factory: () => T, deps: any[]): T {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as Memo<T>
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))
  if (changed) {
    const memo: Memo<T> = {
      deps,
      value: factory(),
    }
    hook.memorizedState = memo
  }
  return hook.memorizedState.value as T
}
