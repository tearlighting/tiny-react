import beginWorkImg from "#/asset/beginWork.png"
import { MyCode } from "#/component/MyCode"
import { MyImg } from "#/component/MyImg"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getBeginWorkData } from "#/utils/beginWork"
import { createElement } from "@/lib/react-dom"
const { beginWork } = getBeginWorkData()
export function BeginWork() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">Flow</p>
      <MyImg className="w-150" src={beginWorkImg}></MyImg>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{beginWork}</MyCode>
    </div>
  )
}
