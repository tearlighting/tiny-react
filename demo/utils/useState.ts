const useStateStr = `
export function useState<T>(initialValue: T | (() => T)) {
  return useReducer(null, initialValue)
}
`
const example = `
const [count, setCount] = useState(0)
`

export const getUseStateData = () => {
  return {
    useStateStr,
    example,
  }
}
