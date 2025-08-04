import { createElement } from "@/lib/react-dom"
import { StyleProvider, useStyle } from "#/context/StyleContext"
import clsx from "clsx"
import { getContextData } from "#/utils/context"
const { example, contextStr } = getContextData()
export function Context() {
  return (
    <div>
      <div>
        <p>example: css in js</p>
        <pre>
          <code>{example}</code>
        </pre>
      </div>
      <StyleProvider value={{ className: "bg-blue-400" }}>
        <Parent>
          <Child />
        </Parent>
      </StyleProvider>
      <div>
        <pre>
          <code>{contextStr}</code>
        </pre>
      </div>
    </div>
  )
}

function Parent({ children }: { children?: ReactNode }) {
  const { className } = useStyle()
  return (
    <div className={clsx(className, "w-50 h-50 flex items-center justify-center flex-col")}>
      parent
      <StyleProvider value={{ className: "bg-amber-400" }}>{children}</StyleProvider>
    </div>
  )
}

function Child() {
  const { className } = useStyle()
  return <div className={clsx(className, "w-20 h-20 flex items-center justify-center")}>child</div>
}
