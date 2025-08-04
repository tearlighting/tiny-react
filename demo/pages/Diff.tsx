import { createElement } from "@/lib/react-dom"
import diffImg from "#/asset/diff.png"
import { getDiffData } from "#/utils/diff"
const { diff } = getDiffData()
export function Diff() {
  return (
    <div>
      <img src={diffImg} />
      <pre>
        <code>{diff}</code>
      </pre>
    </div>
  )
}
