import type { Fiber } from "./ReactFiber"
import { beginWork } from "./ReactFiberBeginWork"
import { completeWork } from "./ReactFiberCommitWork"
/**
 * work in progress
 * 正在工作的fiber对象
 */
let wip: Fiber | null = null
/**
 * 根节点的wip对象
 */
let wipRoot: Fiber | null = null
export function scheduleUpdateOnFiber(fiber: Fiber) {
  wip = fiber
  wipRoot = fiber
  //空闲时间执行workLoop，之后替换为Scheduler
  requestIdleCallback(workLoop)
}

function workLoop(deadline: IdleDeadline) {
  //如果当前有正在工作的fiber对象，并且当前空闲时间还有剩余
  while (wip && deadline.timeRemaining()) {
    //执行workLoop
    performUnitOfWork()
  }

  //如果当前没有正在工作的fiber对象，则提交更新
  if (!wip) {
    commitRoot()
  }
}
/**
 * 1.处理Fiber对象，
 * 2.深度优先子节点
 * 3.提交副作用
 * 4.commit
 */
function performUnitOfWork() {
  beginWork(wip)
  //深度优先子元素
  if (wip?.child) {
    wip = wip.child
    return
  }
  completeWork(wip)

  let next = wip
  //这里的while是应对多次回溯找sibling的情况
  while (next) {
    //看sibling是否存在
    if (next.sibling) {
      wip = next.sibling
      return
    }
    //再寻找父节点的sibling
    next = next.return
    completeWork(next)
  }
  wip = null
}

/**
 * commit阶段
 */
function commitRoot() {
  completeWork(wipRoot)
  wip = null
  //   throw new Error("Function not implemented.")
}
