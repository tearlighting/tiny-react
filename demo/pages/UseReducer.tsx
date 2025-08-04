import { getUseReducerData } from "#/utils/useReducer"
import { createElement } from "@/lib/react-dom"
import { useReducer } from "@/lib/react"

const { useReducer: useReducerStr, example } = getUseReducerData()
export function UseReducer() {
  const [count, setCount] = useReducer((x) => x + 1, 1)
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
        <button onClick={() => setCount(0)} className="hover:cursor-pointer shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          count:{count}
        </button>
      </div>
      <pre>
        <code>{useReducerStr}</code>
      </pre>
    </div>
  )
}
