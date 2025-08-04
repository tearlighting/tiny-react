import { useState, useEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
import { getUseEffectData } from "#/utils/useEffect"

const { example, useEffectStr, effectType } = getUseEffectData()
export function UseEffect() {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(1)
  useEffect(() => {
    setCount2(count1)
  }, [count1])
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
        <div className="flex flex-row gap-2 h-20">
          <div className=" grow text-center">
            <p>setData</p>
            <button onClick={() => setCount1(count1 + 1)} className="hover:cursor-pointer shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
              count:{count1}
            </button>
          </div>
          <div className="grow text-center">
            <p>useEffect</p>
            <button disabled className="hover:cursor-not-allowed shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
              count:{count2}
            </button>
          </div>
        </div>
      </div>
      <pre>
        <code>{effectType}</code>
      </pre>
      <pre>
        <code>{useEffectStr}</code>
      </pre>
    </div>
  )
}
