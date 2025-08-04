const forwardRefStr = `
export function forwardRef<T, P = {}>(render: (props: P, ref: { current: T } | null) => ReactNode) {
  const elementType = (props: P & { ref: any }, ref: { current: T } | null) => {
    return render(props, ref || null)
  }
  //set fiber tag by this prop
  elementType.$$typeof = FORWARD_REF
  return elementType
}

//add to updateQueue and synchronize to set current
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
    pushEffect(currentlyRenderingFiber!, cloneEffect(effect))
  }
}
`

const example = `
const MyInput = ({ label, value }: { label: string; value: string }, ref: Ref<Record<"focus" | "blur", () => void>> | null) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }))
  return (
    <div className="w-90 flex items-center">
      <label className="font-bold">{label}</label>
      <input
        ref={inputRef}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover:border-gray-400 transition duration-150 ml-2"
        type="text"
        value={value}
      />
    </div>
  )
}
const MyInputWithRef = forwardRef(MyInput)
`
export const getForwardRefData = () => {
  return { forwardRefStr, example }
}
