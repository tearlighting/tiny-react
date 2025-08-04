import { getUseRefData } from "#/utils/useRef"
import { useRef, useEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const { example, useRefStr } = getUseRefData()
export function UseRef() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
      </div>
      <div className="w-90 flex items-center">
        <label className="font-bold">myinput</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover:border-gray-400 transition duration-150 ml-2"
          type="text"
          ref={inputRef}
        />
      </div>

      <div>
        <pre>
          <code>{useRefStr}</code>
        </pre>
      </div>
    </div>
  )
}
