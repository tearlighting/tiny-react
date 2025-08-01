import { type Fiber } from "../reconciler"
import { cloneHook } from "../shared/utils"
/**
 * 当前正在渲染的 FunctionComponent fiber
 */
export let currentlyRenderingFiber: Fiber | null = null
/**
 * 当前正在处理的Hook，就是靠它来生成hooks链表的
 */
let workInProgressHook: Hook | null = null
/**
 * undate时，复用的当前hook
 */
export let currentHook: Hook | null = null
export function renderWithHooks(wip: Fiber) {
  //初始化
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memoizedState = null
  workInProgressHook = null
  currentlyRenderingFiber.updateQueue = null
}

/**
 * 获取一个hook对象，并通过更新workInProgressHook来构建Hooks链表
 * @returns
 */
export function updateWorkInProgressHook(): Hook {
  let hook: Hook

  const current = currentlyRenderingFiber!.alternate

  // Mount
  if (!current) {
    hook = { memorizedState: null, next: null, updateQueue: { pending: null } }
    //生成hooks链表
    if (workInProgressHook) {
      //  //如果有就往后加
      //  workInProgressHook.next = hook
      //  //加完再往后移动
      //  workInProgressHook = workInProgressHook.next
      //可以简写为
      workInProgressHook = workInProgressHook.next = hook
    } else {
      //一开始是空链表，直接挂上去
      currentlyRenderingFiber!.memoizedState = workInProgressHook = hook
    }
  } else {
    //Update 阶段：复用 current.memoizedState 链表
    //如果有值就拿下一个，没有值就从头开始
    currentHook = currentHook?.next ?? current.memoizedState!
    //copy current的值，避免diff阶段污染旧值
    hook = cloneHook(currentHook)
    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentlyRenderingFiber!.memoizedState = hook
    }
  }
  //消费hook的updateQueue,生成新的memoriedState
  processUpdateQueue(hook)
  return hook
}

function processUpdateQueue<T>(hook: Hook<T>) {
  if (hook.updateQueue?.pending) {
    let update = hook.updateQueue.pending.next!
    let state = hook.memorizedState
    do {
      const action = update.action
      state = action instanceof Function ? action(state) : action
      update = update.next!
    } while (update !== hook.updateQueue.pending.next)
    hook.memorizedState = state

    hook.updateQueue.pending = null // 清空队列
  }
}
