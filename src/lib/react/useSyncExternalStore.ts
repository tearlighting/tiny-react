import { scheduleUpdateOnFiber } from "../reconciler"
import { EEffectTag } from "../shared/constants"
import { cloneEffect, pushEffect } from "../shared/utils"
import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"

export function useSyncExternalStore<T>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => T): T {
  const hook = updateWorkInProgressHook()

  const fiber = currentlyRenderingFiber!
  const snapshot = getSnapshot()
  if (!currentlyRenderingFiber?.alternate) {
    // mount
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
    // 注册清理
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
  // update：返回 memorizedState
  return hook.memorizedState
}
