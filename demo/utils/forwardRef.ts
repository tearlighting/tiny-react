const forwardRefStr = `export function forwardRef<T, P = {}>(render: (props: P, ref: { current: T } | null) => ReactNode) {
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

const example = `const MyInput = ({ label, value }: { label: string; value: string }, ref: Ref<Record<"focus" | "blur", () => void>> | null) => {
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
        value={value}
      />
    </div>
  )
}
const MyInputWithRef = forwardRef(MyInput)

//vnode
<MyInputWithRef ref={myInputRef} label="myInput" value="" />
<MyButton onClick={() => myInputRef.current?.focus()}>focus</MyButton>
<MyButton onClick={() => myInputRef.current?.blur()} type="success" className="ml-5">blur</MyButton>
`
export const getForwardRefData = () => {
  return { forwardRefStr, example }
}
