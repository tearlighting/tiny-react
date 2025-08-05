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

const example = `const { createPopup, clear } = useCreatePopup()
const [count, setCount] = useState(0)
const handler1 = () => setCount((x) => x + 1)
const handler2 = useCallback(() => setCount((x) => x + 1), [])
useEffect(() => {
  rootRef.current?.appendChild(createPopup("useEffect", "normal function changed", false))
}, [handler1])
useLayoutEffect(() => {
  rootRef.current?.appendChild(createPopup("useEffect", "usecallback function changed", false))
}, [handler2])

//vnode
<MyButton onClick={() => setCount(count + 1)}> count:{count}</MyButton>
<MyButton onClick={clear} type="success" className="ml-5">clear</MyButton>
`

export function getUseCallbackData() {
  return {
    useCallbackStr,
    example,
  }
}
