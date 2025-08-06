import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseStateData } from "#/utils/useState"
import { useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const { example, useStateStr } = getUseStateData()
export function UseState() {
  const [count, setCount] = useState(0)
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: count</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex justify-center items-center gap-5 mt-5">
        <label className="sm:inline hidden"> click me:</label>
        <MyButton onClick={() => setCount(count + 1)}>count:{count}</MyButton>
      </div>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useStateStr}</MyCode>
    </div>
  )
}
