import { createElement } from "@/lib/react-dom"
import completeWorkImg from "#/asset/completeWork.png"
import { getCompleteWorkData } from "#/utils/completeWork"
const { completeWork } = getCompleteWorkData()
export function CompleteWork() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={completeWorkImg} alt="" />
      <pre>
        <code>{completeWork}</code>
      </pre>
    </div>
  )
}
