import beginWorkImg from "#/asset/beginWork.png"
import { getBeginWorkData } from "#/utils/beginWork"
import { createElement } from "@/lib/react-dom"
const { beginWork } = getBeginWorkData()
export function BeginWork() {
  return (
    <div>
      <img src={beginWorkImg} alt="" />
      <div>
        <pre>
          <code>{beginWork}</code>
        </pre>
      </div>
    </div>
  )
}
