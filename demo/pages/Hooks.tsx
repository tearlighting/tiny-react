import { createElement } from "@/lib/react-dom"
import hooksImg from "#/asset/hook.png"
import { getHooksData } from "#/utils/hooks"

const { hookType, hooks } = getHooksData()
export function Hooks() {
  return (
    <div>
      <img src={hooksImg} alt="" />
      <pre>
        <code>{hooks}</code>
      </pre>
      <pre>
        <code>{hookType}</code>
      </pre>
    </div>
  )
}
// export default Hooks
