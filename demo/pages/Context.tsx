import { createElement } from "@/lib/react-dom"
import { StyleProvider, useStyle } from "#/context/StyleContext"
import clsx from "clsx"
import { getContextData } from "#/utils/context"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyCode } from "#/component/MyCode"
const { example, contextStr } = getContextData()
export function Context() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: css in js </p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <StyleProvider value={{ className: "bg-blue-400" }}>
        <Parent>
          <Child />
        </Parent>
      </StyleProvider>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{contextStr}</MyCode>
    </div>
  )
}

function Parent({ children }: { children?: ReactNode }) {
  const { className } = useStyle()
  return (
    <div className={clsx(className, "mx-auto w-50 h-50 flex items-center justify-center flex-col")}>
      parent
      <StyleProvider value={{ className: "bg-amber-400" }}>{children}</StyleProvider>
    </div>
  )
}

function Child() {
  const { className } = useStyle()
  return <div className={clsx(className, "w-20 h-20 flex items-center justify-center")}>child</div>
}
