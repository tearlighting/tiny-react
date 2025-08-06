import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { useCreatePopup } from "#/hooks/useCreatePopup"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseMemoData } from "#/utils/useMemo"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const { useMemoStr, example } = getUseMemoData()
export function UseMemo() {
  const { createPopup, clear } = useCreatePopup()
  const rootRef = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const rootDom = document.getElementById("root") as HTMLDivElement
    rootRef.current = rootDom
  }, [])
  const [count, setCount] = useState(0)
  const handler1 = () => setCount((x) => x + 1)
  const handler2 = useMemo(() => () => setCount((x) => x + 1), [])

  useEffect(() => {
    rootRef.current?.appendChild(createPopup("useEffect", "value changed", false))
  }, [handler1])
  useLayoutEffect(() => {
    rootRef.current?.appendChild(createPopup("useLayoutEffect", "useMemo changed", false))
  }, [handler2])
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: popup when value changed</p>
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
      <MyCode>{useMemoStr}</MyCode>
    </div>
  )
}
