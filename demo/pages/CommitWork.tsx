import { createElement } from "@/lib/react-dom"
import commitWorkImg from "#/asset/commitWork.png"
import { getCommitWortData } from "#/utils/commitWork"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyImg } from "#/component/MyImg"
import { MyCode } from "#/component/MyCode"
const { commitWork, commitRoot } = getCommitWortData()
export function CommitWork() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">Flow</p>
      <MyImg className="w-150" src={commitWorkImg}></MyImg>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{commitRoot}</MyCode>
      <MyCode>{commitWork}</MyCode>
    </div>
  )
}
