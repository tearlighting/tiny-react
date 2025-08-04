import { createElement } from "@/lib/react-dom"
import commitWorkImg from "#/asset/commitWork.png"
import { getCommitWortData } from "#/utils/commitWork"
const { commitWork, commitRoot } = getCommitWortData()
export function CommitWork() {
  return (
    <div>
      <img src={commitWorkImg} alt="commitWork"></img>
      <pre>
        <code>{commitWork}</code>
      </pre>
      <pre>
        <code> {commitRoot}</code>
      </pre>
    </div>
  )
}
