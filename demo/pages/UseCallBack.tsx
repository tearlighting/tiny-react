import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { RenderTimeRecoder } from "#/component/RenderTimeRecoder"
import { useCreatePopup } from "#/hooks/useCreatePopup"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseCallbackData } from "#/utils/useCallback"
import { useCallback, useState, useEffect, useRef, useLayoutEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const { useCallbackStr, example } = getUseCallbackData()
export function UseCallback() {
  const { createPopup, clear } = useCreatePopup()

  const rootRef = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const rootDom = document.getElementById("root") as HTMLDivElement
    rootRef.current = rootDom
  }, [])
  const [count, setCount] = useState(0)
  const handler1 = () => setCount((x) => x + 1)
  const handler2 = useCallback(() => setCount((x) => x + 1), [])

  useEffect(() => {
    rootRef.current?.appendChild(createPopup("useEffect", "normal function changed", false))
  }, [handler1])
  useLayoutEffect(() => {
    rootRef.current?.appendChild(createPopup("useLayoutEffect", "usecallback function changed", false))
  }, [handler2])
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: popup when cabllback changed </p>
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
      <MyCode>{useCallbackStr}</MyCode>
    </div>
  )
}
