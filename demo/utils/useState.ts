const useStateStr = `export function useState<T>(initialValue: T | (() => T)) {
  return useReducer(null, initialValue)
}
`
const example = `const [count, setCount] = useState(0)

//vnode
 <MyButton onClick={() => setCount(count + 1)}>count:{count}</MyButton>
`

export const getUseStateData = () => {
  return {
    useStateStr,
    example,
  }
}
