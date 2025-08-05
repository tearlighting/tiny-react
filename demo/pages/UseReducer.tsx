import { getUseReducerData } from "#/utils/useReducer"
import { createElement } from "@/lib/react-dom"
import { useReducer } from "@/lib/react"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyCode } from "#/component/MyCode"
import { MyButton } from "#/component/MyButton"

const { useReducer: useReducerStr, example } = getUseReducerData()
export function UseReducer() {
  const [count, setCount] = useReducer((x) => x + 1, 1)
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: count</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex justify-center items-center gap-5 mt-5">
        <label> click me:</label>
        <MyButton onClick={() => setCount(count)}>count:{count}</MyButton>
      </div>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useReducerStr}</MyCode>
    </div>
  )
}
