import { useState, useEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
import { getUseEffectData } from "#/utils/useEffect"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyCode } from "#/component/MyCode"
import { MyButton } from "#/component/MyButton"

const { example, useEffectStr } = getUseEffectData()
export function UseEffect() {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(1)
  useEffect(() => {
    setCount2(count1)
  }, [count1])
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: set count by useEffect</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex flex-row justify-center items-center gap-5">
        <div className=" text-center">
          <p>setData</p>
          <MyButton onClick={() => setCount1(count1 + 1)}> count:{count1}</MyButton>
        </div>
        <div className=" text-center">
          <p>useEffect</p>
          <MyButton type="info" disabled>
            count:{count2}
          </MyButton>
        </div>
      </div>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useEffectStr}</MyCode>
    </div>
  )
}
