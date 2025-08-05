import reconcilerImg from "#/asset/reconciler.png"
import { MyImg } from "#/component/MyImg"

import { createElement } from "@/lib/react-dom"
export function Reconciler() {
  return (
    <div>
      <div className="h-full w-full overflow-y-auto">
        <p className="text-xl font-bold pl-5 py-5">Flow</p>
        <MyImg className="w-300 h-150" src={reconcilerImg}></MyImg>
      </div>
    </div>
  )
}
