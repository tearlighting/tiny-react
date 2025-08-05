import { MyCode } from "#/component/MyCode"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getSchedulerData } from "#/utils/scheduler"
import { createElement } from "@/lib/react-dom"
const { schedulerOverAll, heap, messageChannel } = getSchedulerData()

export function Scheduler() {
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <div>
        <p className="text-xl font-bold pl-5 py-5">Overview</p>
        <MyCode>{schedulerOverAll}</MyCode>
      </div>

      <div>
        <p className="text-xl font-bold pl-5 py-5">Heap</p>
        <p className="pl-8 py-2">use an array like a binary tree</p>
        <MyCode>{heap}</MyCode>
      </div>
      <div>
        <p className="text-xl font-bold pl-5 py-5">MessageChannel</p>
        <p className="pl-8 py-2">create a macro task</p>
        <MyCode>{messageChannel}</MyCode>
      </div>
    </div>
  )
}
