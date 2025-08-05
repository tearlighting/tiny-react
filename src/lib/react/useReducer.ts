import { Fiber, scheduleUpdateOnFiber } from "../reconciler"
import { currentlyRenderingFiber, updateWorkInProgressHook } from "./ReactHooks"
/**
 *归约器 「当前状态 + 动作」合成下一个状态。
 * @param reducer reducer函数,改变状态的纯函数
 * @param initialState 初始值
 */
export function useReducer<T extends any>(reducer: ((state: T) => T) | null, initialState: T | (() => T)) {
  const hook = updateWorkInProgressHook()
  //mount的时候需要手动挂，update的时候就自己带出来了
  if (!currentlyRenderingFiber?.alternate) {
    hook.memorizedState = initialState instanceof Function ? initialState() : initialState

    const dispatch = (action: T | ((pre: T) => T)) => {
      dispatchReducerAction(currentlyRenderingFiber!, hook, reducer, action)
    }
    hook.updateQueue = { pending: null, dispatch }
  }

  return [hook.memorizedState, hook.updateQueue.dispatch] as [T, (action: T | ((pre: T) => T)) => void]
}

/**
 *根据reducer函数改变状态,处理Fiber对象
 * @param fiber 当前正在渲染的fiber
 * @param hook  当前正在处理的hook
 * @param reducer  reducer函数,改变状态的纯函数
 * @param action  如果没有，就是useState,传入值就是最终值
 */
function dispatchReducerAction<T extends any>(fiber: Fiber, hook: Hook, reducer: ((state: T) => T) | null, action: T | ((pre: T) => T)) {
  const update: Update<T> = { action: reducer ?? action, next: null }
  if (hook.updateQueue?.pending === null) {
    hook.updateQueue.pending = update
  }
  const queue = hook.updateQueue.pending
  //生成环状链表
  if (queue.next === null) {
    update.next = update // 初始化环状链表
  } else {
    update.next = queue.next
    queue.next = update
  }
  hook.updateQueue.pending = update
  //   //更新状态,留给updateWorkInProgressHook()
  //   hook.memorizedState = reducer ? reducer(hook.memorizedState) : action instanceof Function ? action(hook.memorizedState) : action
  //此fiber变成旧fiber,挂到alternate
  //   用当前 Fiber 创建 workInProgress
  const wip = { ...fiber }
  wip.alternate = fiber
  fiber.alternate = wip
  //   //不去更新sibling,因为sibling的hook和当前hook不一样
  //   fiber.sibling = null
  scheduleUpdateOnFiber(wip)
}
