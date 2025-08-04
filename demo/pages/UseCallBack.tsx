import { getUseCallbackData } from "#/utils/useCallback"
import { createElement } from "@/lib/react-dom"
const { useCallbackStr } = getUseCallbackData()
export function UseCallback() {
  return (
    <div>
      <pre>
        <code>{useCallbackStr}</code>
      </pre>
    </div>
  )
}
