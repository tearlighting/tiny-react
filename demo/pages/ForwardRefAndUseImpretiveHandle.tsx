import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getForwardRefData } from "#/utils/forwardRef"
import { forwardRef, useImperativeHandle, useRef } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
import clsx from "clsx"

const MyInput = ({ label, value, className = "" }: { label: string; value: string; className?: string }, ref: Ref<Record<"focus" | "blur", () => void>> | null) => {
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
        className={clsx(
          `w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 placeholder-gray-400
           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
           hover:border-gray-400 transition duration-150 ml-2`,
          className
        )}
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
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: let child's input focus with forwardRef</p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="flex flex-col items-center justify-center mt-5">
        <MyInputWithRef ref={myInputRef} label="myInput" value="" />
        <div className="flex items-center gap-5 mt-5">
          <label className="sm:inline hidden"> click me:</label>
          <MyButton onClick={() => myInputRef.current?.focus()}>focus</MyButton>
          <MyButton onClick={() => myInputRef.current?.blur()} type="success">
            blur
          </MyButton>
        </div>
      </div>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{forwardRefStr}</MyCode>
    </div>
  )
}
