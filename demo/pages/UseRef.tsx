import { MyCode } from "#/component/MyCode"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseRefData } from "#/utils/useRef"
import { useRef, useEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const { example, useRefStr } = getUseRefData()
export function UseRef() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: input focus</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex justify-center">
        <div className="w-90 flex items-center ml-5">
          <label className="font-bold">myinput</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover:border-gray-400 transition duration-150 ml-2"
            type="text"
            ref={inputRef}
          />
        </div>
      </div>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useRefStr}</MyCode>
    </div>
  )
}
