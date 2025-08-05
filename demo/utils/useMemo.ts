const useMemoStr = `
interface Memo<T> {
    deps: any[]
    value: T
}
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
  return hook.memorizedState.value
}
`

const example = `const { createPopup, clear } = useCreatePopup()
const [count, setCount] = useState(0)
const handler1 = () => setCount((x) => x + 1)
const handler2 = useMemo(() => () => setCount((x) => x + 1), [])
useEffect(() => {
  rootRef.current?.appendChild(createPopup("useEffect", "value changed", false))
}, [handler1])
useLayoutEffect(() => {
  rootRef.current?.appendChild(createPopup("useEffect", "useMemo changed", false))
}, [handler2])

//vnode
        <MyButton onClick={() => setCount(count + 1)}> count:{count}</MyButton>
<MyButton onClick={clear} type="success" className="ml-5">clear</MyButton>
`
export const getUseMemoData = () => {
  return {
    useMemoStr,
    example,
  }
}
