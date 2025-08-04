import { scheduleCallback } from "../scheduler"
import { EEffectTag, EFiberFlags } from "../shared/constants"
import { flushEffects, getFiberRoot } from "../shared/utils"

import { Fiber, FiberRoot } from "./ReactFiber"
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
  console.log("scheduleUpdateOnFiber", wipRoot)

  wip = wipRoot.pendingChildren
  //空闲时间执行workLoop，之后替换为Scheduler
  scheduleCallback(workLoop)
}

function workLoop(remainingTime: number) {
  //如果当前有正在工作的fiber对象，并且当前空闲时间还有剩余就执行，没有就退出
  while (wip) {
    if (remainingTime < 0) {
      //   console.log("剩余时间不足，退出")
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
  //excharge alternate
  wipRoot.current = wipRoot.pendingChildren
  wipRoot.pendingChildren = createWorkInProgress(wipRoot.current)
  wipRoot.pendingChildren.return = wipRoot as any
  /**
   * commit阶段，执行副作用,只是我里面是递归，我只好提出来了
   */
  flushEffects(wipRoot.updateQueue, [EEffectTag.layoutEffect, EEffectTag.imperativeHandle, EEffectTag.syncExternalStore])
  const rootEffects = wipRoot.updateQueue as Effect | null
  setTimeout(() => {
    flushEffects(rootEffects, [EEffectTag.passiveEffect])
  })
  wipRoot!.updateQueue = null
  wip = null
  //   throw new Error("Function not implemented.")
}

function createWorkInProgress(fiber: Fiber) {
  const res = new Fiber({
    tag: fiber.tag,
    props: fiber.props,
    type: fiber.type,
    key: fiber.key,
    index: fiber.index,
    memoizedState: fiber.memoizedState,
  })
  res.alternate = fiber
  fiber.alternate = res
  return res
}
