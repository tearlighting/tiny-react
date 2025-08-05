import { createElement } from "@/lib/react-dom"
import completeWorkImg from "#/asset/completeWork.png"
import { getCompleteWorkData } from "#/utils/completeWork"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyImg } from "#/component/MyImg"
import { MyCode } from "#/component/MyCode"
const { completeWork } = getCompleteWorkData()
export function CompleteWork() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">Flow</p>
      <MyImg className="w-180" src={completeWorkImg}></MyImg>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{completeWork}</MyCode>
    </div>
  )
}
