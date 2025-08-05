import { MyImg } from "#/component/MyImg"
import { createElement } from "@/lib/react-dom"
import reactPartImg from "#/asset/react-part.png"
import { MyCode } from "#/component/MyCode"
import { getFlowData } from "#/utils/flow"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
const { overView, fiber } = getFlowData()

export function Flow() {
  useSetCodeStyle()
  return (
    <div className="h-full overflow-y-auto  ">
      <div>
        <p className="text-xl font-bold pl-5 py-5">React Parts</p>
        <MyImg src={reactPartImg}></MyImg>
        <p className="text font-bold pl-10 py-2">scheduler</p>
        <p className="pl-10">use min heap and MessageChannel to schedule task</p>
        <p className="text font-bold pl-10 py-2">reconciler</p>
        <p className="pl-10">generate fiber tree</p>
        <p className="text font-bold pl-10 py-2">renderer</p>
        <p className="pl-10">update real dom by fiber's flags and execute effect list</p>
      </div>
      <div>
        <p className="text-xl font-bold pl-5 py-5">Overview</p>
        <MyCode>{overView}</MyCode>
      </div>
      <div>
        <p className="text-xl font-bold pl-5 py-5">what's Fiber</p>
        <p className=" pl-8 py-2">linked list</p>
        <MyCode>{fiber}</MyCode>
      </div>
    </div>
  )
}
