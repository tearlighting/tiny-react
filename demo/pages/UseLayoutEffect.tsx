import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { useCreatePopup } from "#/hooks/useCreatePopup"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseLayoutEffect } from "#/utils/useLayoutEffect"
import { useRef, useState, useEffect, useLayoutEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const { example, useLayoutEffectStr } = getUseLayoutEffect()
export function UseLayoutEffect() {
  const root = useRef<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const rootDom = document.getElementById("root")
    root.current = rootDom
  }, [])
  const { createPopup, clear } = useCreatePopup()
  const [count, setCount] = useState(0)
  useEffect(() => {
    const popup = createPopup("useEffect", `count:${count}`)
    root.current?.appendChild(popup)
  }, [count])
  useLayoutEffect(() => {
    const popup = createPopup("useLayoutEffect", `count:${count}`)
    root.current?.appendChild(popup)
  }, [count])
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: popup effect list and layout effect list</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex justify-center items-center gap-5 mt-5">
        <label className="sm:inline hidden"> click me:</label>
        <MyButton onClick={() => setCount(count + 1)}> count:{count}</MyButton>
        <MyButton onClick={clear} type="success">
          clear
        </MyButton>
      </div>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useLayoutEffectStr}</MyCode>
    </div>
  )
}
