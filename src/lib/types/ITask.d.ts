import type { EPriorityLevel } from "../shared/constants"
declare global {
  interface ITask {
    sortIndex: number
    id: number
    callback: ((remainingTime: number) => ((remainingTime: number) => void) | undefined) | null
    expireTime: number
    priority: EPriorityLevel
  }
}
