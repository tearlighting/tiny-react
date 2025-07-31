import { forwardRef, useRef, useImperativeHandle } from "./lib/react"
import { createElement } from "./lib/react-dom"

export const MyInput = forwardRef<Ref<Record<"focus", () => void>>, { className?: string }>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null)

  useImperativeHandle(
    ref as any,
    () => ({
      focus: () => innerRef.current?.focus(),
    }),
    []
  )

  return <input ref={innerRef} />
})
