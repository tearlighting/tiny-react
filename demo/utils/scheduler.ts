export const getSchedulerData = () => {
  return {
    messageChannel,
    schedulerOverAll,
    heap,
  }
}
const messageChannel = `
function useMacroTask({ scheduler }: { scheduler: Heap<ITask> }) {
  const { port2, port1 } = new MessageChannel()
  port2.onmessage = () => {
	let task = scheduler.peek
	while (task) {
	  //if do't have time,then break
	  if (!haveTime()) {
		break
	  }
	  const cb = task.callback
	  const next = cb?.()
	  if (typeof next === "function") {
		task.callback = next as ITask["callback"]
	  } else {
		scheduler.extractTop()
	  }
	  task = scheduler.peek
	}
	// if has remaining task,then schedule again
	if (task) {  
		port1.postMessage(null)
	}
  }
  return {
	port2,
	port1,
  }
}
`

const schedulerOverAll = `
function glueScheduler() {
  const { createTask } = useCreateTask()
  const scheduler = createHeap<ITask>()
  const { port1 } = useMacroTask({ scheduler })
  //add task to scheduler and schedule
  function scheduleCallback(callback: ITask["callback"], priority: EPriorityLevel = EPriorityLevel.normal) {
	const task = createTask(callback, priority)
	scheduler.insert(task)
	port1.postMessage(null)
  }

  return {
	scheduleCallback,
  }
}
`

const heap = `
interface IHeap<T> {
  size: number
  peek: T | undefined
  //inert to array's end. then heapify up
  insert(payload: T): void
  //delete the heap's top.  then put the end of heap to top and heapify down
  extractTop(): T | undefined
}
`
