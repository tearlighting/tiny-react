import { getUseStateData } from "#/utils/useState"
import { useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const { example, useStateStr } = getUseStateData()
export function UseState() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
        <button onClick={() => setCount(count + 1)} className="hover:cursor-pointer shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
          count:{count}
        </button>
      </div>
      <pre>
        <code>{useStateStr}</code>
      </pre>
    </div>
  )
}
