import { getUseMemoData } from "#/utils/useMemo"
import { createElement } from "@/lib/react-dom"

const { useMemoStr } = getUseMemoData()
export function UseMemo() {
  return (
    <div>
      <pre>
        <code>{useMemoStr}</code>
      </pre>
    </div>
  )
}
