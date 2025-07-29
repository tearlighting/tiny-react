import { scheduleCallback } from "../scheduler"
import { getFiberRoot } from "../shared/utils"
import { FiberRoot, type Fiber } from "./ReactFiber"
import { beginWork } from "./ReactFiberBeginWork"
import { commitWork } from "./ReactFiberCommitWork"
import { completeWork } from "./ReactFiberCompleteWork"
/**
 * work in progress
 * 正在工作的fiber对象
 */
let wip: Fiber | null = null
/**
 * 根节点的wip对象
 */
let wipRoot: FiberRoot | null = null
export function scheduleUpdateOnFiber(fiber: Fiber | FiberRoot) {
  wipRoot = getFiberRoot(fiber)
  wip = wipRoot.pendingChildren
  //空闲时间执行workLoop，之后替换为Scheduler
  scheduleCallback(workLoop)
}

function workLoop(remainingTime: number) {
  //如果当前有正在工作的fiber对象，并且当前空闲时间还有剩余就执行，没有就退出
  while (wip) {
    if (remainingTime < 0) {
      console.log("剩余时间不足，退出")
      return workLoop
    }
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
  if (!wipRoot || !wipRoot.pendingChildren) return
  commitWork(wipRoot.pendingChildren)
  ;[wipRoot.pendingChildren, wipRoot.current] = [null, wipRoot.pendingChildren]
  wip = null
  //   throw new Error("Function not implemented.")
}
