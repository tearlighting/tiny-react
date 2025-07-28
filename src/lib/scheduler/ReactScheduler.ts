import { EPriorityLevel } from "../shared/constants"
import { createHeap, Heap } from "../shared/Heap"

function useCreateTask() {
  let taskIdCounter = 1
  function createTask(callback: ITask["callback"], priority: EPriorityLevel) {
    //精度更高
    const currentTime = performance.now()
    const timeout = priority
    const expireTime = currentTime + timeout
    const task: ITask = {
      id: taskIdCounter++,
      callback,
      expireTime,
      sortIndex: expireTime,
      priority,
    }
    return task
  }
  return {
    createTask,
  }
}

function useHasTimeRemaining(frameLength = 5) {
  let frameDeadline = 0

  function startFrame() {
    const now = performance.now()
    frameDeadline = now + frameLength // 每帧最多用 5ms
  }

  function hasTimeRemaining() {
    return performance.now() < frameDeadline
  }

  return { startFrame, hasTimeRemaining }
}

function useMacroTask({ scheduler }: { scheduler: Heap<ITask> }) {
  const { hasTimeRemaining, startFrame } = useHasTimeRemaining(2)
  const { port2, port1 } = new MessageChannel()
  let isHostCallbackScheduled = false
  port2.onmessage = () => {
    // console.log(count++)
    startFrame()
    isHostCallbackScheduled = false
    let task = scheduler.peek
    while (task) {
      const now = performance.now()
      //如果还有剩余时间，而且没有空闲时间
      if (!hasTimeRemaining()) {
        break
      }
      const cb = task.callback
      const next = cb?.(now - task.expireTime)
      if (typeof next === "function") {
        task.callback = next as ITask["callback"]
      } else {
        scheduler.extractTop()
      }
      task = scheduler.peek
    }
    // // 🔥 无论是 break 还是没完成，只要还有任务，必须继续调度
    if (task) {
      if (!isHostCallbackScheduled) {
        isHostCallbackScheduled = true
        port1.postMessage(null)
      }
    }
  }
  return {
    port2,
    port1,
  }
}
function glueScheduler() {
  const { createTask } = useCreateTask()
  const scheduler = createHeap<ITask>((a, b) => {
    const diff = a.sortIndex - b.sortIndex
    if (diff) {
      return diff > 0
    } else {
      return a.id > b.id
    }
  })

  const { port1 } = useMacroTask({ scheduler })
  /**
   *
   * @param callback 需要执行的任务
   */
  function scheduleCallback(callback: ITask["callback"]) {
    scheduleCallbackWithPriority(callback, EPriorityLevel.Normal)
  }
  function scheduleCallbackWithPriority(callback: ITask["callback"], priority: EPriorityLevel) {
    const task = createTask(callback, priority)
    scheduler.insert(task)
    //产生一个宏任务
    port1.postMessage(null)
  }

  return {
    scheduleCallback,
    scheduler,
    scheduleCallbackWithPriority,
  }
}

export const { scheduleCallback, scheduler, scheduleCallbackWithPriority } = glueScheduler()
