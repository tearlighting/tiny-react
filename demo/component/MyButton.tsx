import { createElement } from "@/lib/react-dom"
import clsx from "clsx"
const types = {
  primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white",
  danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
  info: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white",
  text: "bg-transparent text-blue-500 hover:underline",
}
export function MyButton({
  children,
  type = "primary",
  className = "",
  onClick,
  disabled = false,
}: {
  children?: any
  type?: keyof typeof types
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx("px-4 py-1 rounded  text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all", types[type], className)}
    >
      {children}
    </button>
  )
}
