import { getUseLayoutEffect } from "#/utils/useLayoutEffect"
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const { example, useLayoutEffectStr } = getUseLayoutEffect()
export function UseLayoutEffect() {
  const root = useRef<HTMLElement | null>(null)
  useEffect(() => {
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
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
        <button onClick={() => setCount(count + 1)} className="hover:cursor-pointer  shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          count:{count}
        </button>
        <button onClick={() => clear()} className="hover:cursor-pointer ml-10  shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          clear
        </button>
      </div>
      <pre>
        <code>{useLayoutEffectStr}</code>
      </pre>
    </div>
  )
}

function useCreatePopup() {
  const popDoms = useRef<Set<HTMLElement>>(new Set())
  const createPopup = useCallback((type: "useEffect" | "useLayoutEffect", content: string | number) => {
    const popup = document.createElement("div")
    try {
      popup.style.position = "fixed"
      popup.style.transform = `translateY(${popDoms.current.size * 30}px)`
      popup.className = "h-[30px] w-[200px] top-0 mt-5 right-0 bg-blue-400 rounded text-white text-center transition-all duration-100"
      popup.innerText = `${type}:${content}`
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
