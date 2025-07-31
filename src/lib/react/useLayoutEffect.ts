import { EEffectTag } from "../shared/constants"
import { areHookInputsEqual, cloneEffect, pushEffect } from "../shared/utils"
import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"

export function useLayoutEffect(create: () => void | (() => void), deps?: any[]) {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as Effect
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))
  if (changed) {
    const effect: Effect = { create, deps, tag: EEffectTag.layoutEffect }
    effect.destroy = prev?.destroy
    hook.memorizedState = effect
    // const fiber = currentlyRenderingFiber!
    // fiber.layoutEffectList = fiber.layoutEffectList || []
    // fiber.layoutEffectList.push(effect)
    pushEffect(currentlyRenderingFiber!, cloneEffect(effect))
  }
}
