import { EEffectTag, FORWARD_REF } from "../shared/constants"
import { areHookInputsEqual, cloneEffect, pushEffect } from "../shared/utils"
import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"

/**
 * 为啥需要forwardRef?编译vnode是使用createElement，ref不在props里面，需要额外的拦截器。把ref给截取，再转发给子组件
 * @param render
 * @returns
 */
export function forwardRef<T, P = {}>(render: (props: P, ref: { current: T } | null) => ReactNode) {
  const elementType = (props: P & { ref: any }, ref: { current: T } | null) => {
    return render(props, ref || null)
  }
  elementType.$$typeof = FORWARD_REF
  return elementType
}
/**
 * 为啥不直接设置ref，而是使用useImperativeHandle?
 * render阶段，又后者说beginWork阶段，这时候的ref还是老值，再beforeMutation清掉，layout阶段再设置新值
 * 相较于useEffect这是同步
 * @param ref
 * @param create
 * @param deps
 */
export function useImperativeHandle<T>(ref: { current: T | null } | undefined, create: () => T, deps?: any[]) {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as { deps?: any[] } | undefined
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))
  if (changed) {
    const effect: Effect = {
      create: () => {
        if (ref) ref.current = create()
        return () => {
          if (ref) ref.current = null
        }
      },
      deps,
      tag: EEffectTag.imperativeHandle,
    }
    hook.memorizedState = effect
    console.log(effect)

    // currentlyRenderingFiber!.layoutEffectList = currentlyRenderingFiber!.layoutEffectList || []
    // currentlyRenderingFiber!.layoutEffectList.push(effect)
    pushEffect(currentlyRenderingFiber!, cloneEffect(effect))
  }
}
