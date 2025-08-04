import { getForwardRefData } from "#/utils/forwardRef"
import { forwardRef, useImperativeHandle, useRef } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const MyInput = ({ label, value }: { label: string; value: string }, ref: Ref<Record<"focus" | "blur", () => void>> | null) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }))
  return (
    <div className="w-90 flex items-center">
      <label className="font-bold">{label}</label>
      <input
        ref={inputRef}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover:border-gray-400 transition duration-150 ml-2"
        type="text"
        value={value}
      />
    </div>
  )
}
const MyInputWithRef = forwardRef(MyInput)
const { forwardRefStr, example } = getForwardRefData()
export function ForwardRefAndUseImpretiveHandle() {
  const myInputRef = useRef<Record<"focus" | "blur", () => void>>(null as any)
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
      </div>
      <MyInputWithRef ref={myInputRef} label="my Input" value="12345" />
      <div>
        <button onClick={() => myInputRef.current?.focus()} className="hover:hover:cursor-pointer shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          focus
        </button>
        <button onClick={() => myInputRef.current?.blur()} className="hover:cursor-pointer ml-2 shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          blur
        </button>
      </div>
      <div>
        <pre>
          <code>{forwardRefStr}</code>
        </pre>
      </div>
    </div>
  )
}
