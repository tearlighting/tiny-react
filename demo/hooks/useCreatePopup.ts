import { useCallback, useRef } from "@/lib/react"
import clsx from "clsx"

export function useCreatePopup() {
  const popDoms = useRef<Set<HTMLElement>>(new Set())
  const createPopup = useCallback((type: "useEffect" | "useLayoutEffect", content: string | number, showType = true) => {
    const popup = document.createElement("div")
    try {
      popup.style.position = "fixed"
      popup.style.transform = `translateY(${50 + popDoms.current.size * 32}px)`
      popup.className = clsx(
        "h-[30px] w-[200px] top-0 flex justify-center items-center right-0 bg-blue-400  transition-all duration-100 rounded-lg shadow-lg text-white text-sm  animate-fade-in-out",
        type === "useEffect" ? "bg-red-400" : "bg-blue-400"
      )
      popup.innerText = `${showType ? type + ":" : ""}${content}`
      return popup
    } finally {
      popDoms.current.add(popup)
    }
  }, [])
  const clear = useCallback(() => {
    popDoms.current.forEach((dom) => {
      dom.remove()
    })
    popDoms.current.clear()
    console.log(popDoms)
  }, [])
  return {
    createPopup,
    clear,
  }
}
