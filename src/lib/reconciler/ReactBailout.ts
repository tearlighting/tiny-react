import type { Fiber } from "./ReactFiber"

export function bailoutOnAlreadyFinishedWork(wip: Fiber) {
  const current = wip.alternate
  // 🚨 bailout 检查
  if (current && wip.updateQueue?.pending) {
    // 没有 props/state 更新 → 直接复用子树
    wip.child = current.child
    return true
  }
  return false
}
