import { createElement } from "@/lib/react-dom"
import diffImg from "#/asset/diff.png"
import { getDiffData } from "#/utils/diff"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { MyImg } from "#/component/MyImg"
import { MyCode } from "#/component/MyCode"
const { diff } = getDiffData()
export function Diff() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">Flow</p>
      <MyImg className="w-200" src={diffImg}></MyImg>
      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{diff}</MyCode>
    </div>
  )
}
