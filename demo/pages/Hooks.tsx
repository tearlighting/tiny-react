import { createElement } from "@/lib/react-dom"
import hooksImg from "#/asset/hook.png"
import { getHooksData } from "#/utils/hooks"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyImg } from "#/component/MyImg"
import { MyCode } from "#/component/MyCode"

const { hooks } = getHooksData()
export function Hooks() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">Flow</p>
      <MyImg className="w-150" src={hooksImg}></MyImg>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{hooks}</MyCode>
    </div>
  )
}
