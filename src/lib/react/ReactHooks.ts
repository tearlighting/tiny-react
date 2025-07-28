import { scheduleUpdateOnFiber, type Fiber } from "../reconciler"
/**
 * 当前正在渲染的 fiber
 */
let currentlyRenderingFiber: Fiber | null = null
/**
 * 当前正在处理的Hook
 */
let workInProgressHook: Hook | null = null
/**
 * 处理完成的Hook
 */
let currentHook: Hook | null = null
export function renderWithHooks(wip: Fiber) {
  //初始化
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memoizedState = null
  workInProgressHook = null
  currentlyRenderingFiber.updateQueue = []
}
/**
 *
 * @param reducer reducer函数,改变状态的纯函数
 * @param initialState 初始值
 */
export function useReducer<T extends any>(reducer: ((state: T) => void) | null, initialState: T) {
  const hook = updateWorkInProgressHook()
  if (!currentlyRenderingFiber?.alternate) {
    hook.memorizedState = initialState
  }
  const dispatch = (action: T) => {
    dispatchReducerAction(currentlyRenderingFiber!, hook, reducer, action)
  }
  return [hook.memorizedState, dispatch]
}
/**
 * 获取一个hook对象，并使workInProgressHook指向最后一个hook
 * @returns
 */
function updateWorkInProgressHook(): Hook {
  let hook: Hook | null = null
  const current = currentlyRenderingFiber?.alternate
  if (current) {
    currentlyRenderingFiber!.memoizedState = current.memoizedState
    if (workInProgressHook) {
      workInProgressHook = hook = workInProgressHook.next!
      currentHook = currentHook!.next!
    } else {
      workInProgressHook = hook = currentlyRenderingFiber?.memoizedState
      currentHook = current.memoizedState
    }
  } else {
    hook = {
      memorizedState: null,
      next: null,
    }
    if (workInProgressHook) {
      workInProgressHook.next = hook
    } else {
      currentlyRenderingFiber!.memoizedState = hook
    }
    workInProgressHook = hook
  }
  return {} as Hook
}
/**
 *根据reducer函数改变状态,处理Fiber对象
 * @param fiber 当前正在渲染的fiber
 * @param hook  当前正在处理的hook
 * @param reducer  reducer函数,改变状态的纯函数
 * @param action  如果没有，就是useState,传入值就是最终值
 */
function dispatchReducerAction<T extends any>(fiber: Fiber, hook: Hook, reducer: ((state: T) => void) | null, action: T) {
  //更新状态
  hook.memorizedState = reducer ? reducer(hook.memorizedState) : action
  //此fiber变成旧fiber,挂到alternate
  fiber.alternate = { ...fiber }
  //不去更新sibling,因为sibling的hook和当前hook不一样
  fiber.sibling = null
  scheduleUpdateOnFiber(fiber)
}
