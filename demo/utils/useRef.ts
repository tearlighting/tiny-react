const useRefStr = `
interface Ref<T> {
    current: T
}
export function useRef<T>(initialValue: T | (() => T)): { current: T } {
  const hook = updateWorkInProgressHook()
  if (!currentlyRenderingFiber?.alternate) {
    const current = initialValue instanceof Function ? initialValue() : initialValue
    hook.memorizedState = { current }
  }
  return hook.memorizedState
}
`
export const example = `
const inputRef = useRef<HTMLInputElement | null>(null)
useEffect(() => {
    inputRef.current?.focus()
}, [])
`

export const getUseRefData = () => {
  return {
    useRefStr,
    example,
  }
}
