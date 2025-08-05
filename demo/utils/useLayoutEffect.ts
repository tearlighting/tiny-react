const useLayoutEffectStr = `
export function useLayoutEffect(create: () => void | (() => void), deps?: any[]) {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as Effect
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))
  if (changed) {
    const effect: Effect = { create, deps, tag: EEffectTag.layoutEffect }
    effect.destroy = prev?.destroy
    hook.memorizedState = effect
    pushEffect(currentlyRenderingFiber!, cloneEffect(effect))
  }
}
`
const example = `const { createPopup,clear } = useCreatePopup()
const [count, setCount] = useState(0)
useEffect(() => {
  const popup = createPopup("useEffect", "count:" + count)
  root.current?.appendChild(popup)
}, [count])
useLayoutEffect(() => {
  const popup = createPopup("useLayoutEffect", "count:" + count)
  root.current?.appendChild(popup)
}, [count])

//vnode
<MyButton onClick={() => setCount(count + 1)}> count:{count}</MyButton>
<MyButton onClick={clear} type="success" className="ml-5">clear</MyButton>
  `
export const getUseLayoutEffect = () => {
  return {
    example,
    useLayoutEffectStr,
  }
}
