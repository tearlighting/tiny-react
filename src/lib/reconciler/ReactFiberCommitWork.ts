import { EFiberFlags, EFiberTags } from "../shared/constants"
import { patchRef } from "../shared/uploadNodeMiddleWares"
import type { Fiber } from "./ReactFiber"
import { appendAllChildren } from "./ReactFiberCompleteWork"
import { commitDeletion, commitPlacement, commitUpdate } from "./ReactFiberReconciler"

/**
 * mount阶段直接挂到根节点
 * update一层一层递归
 * @param fiber
 * @returns
 */
export function commitWork(fiber: Fiber | null) {
  if (!fiber) return
  //初次渲染Mount,直接加入root
  if (!fiber.alternate) {
    appendAllChildren(fiber.return!.stateNode!, fiber.child)
  } else {
    // 1️⃣ 如果当前节点和子树都没有副作用 → 直接返回
    if (!(fiber.flags === 0 && fiber.subtreeFlags === 0)) {
      beforeMutation(fiber)
      mutation(fiber)
      layout(fiber)
      commitWork(fiber.child)
    }
    commitWork(fiber.sibling)
  }
}

function beforeMutation(fiber: Fiber) {
  // 1. 只有类组件 getSnapshotBeforeUpdate
  // if (wip.tag === EFiberTags.ClassComponent && wip.instance?.getSnapshotBeforeUpdate) {
  //   const snapshot = wip.instance.getSnapshotBeforeUpdate()
  //   wip.instance.__snapshot = snapshot
  // }
  // 2. 预留：清理旧 ref
  if (fiber.flags! & EFiberFlags.Ref) {
    patchRef(fiber.alternate?.props?.ref, null)
  }
  // 3. 其他需要在 DOM 改变前做的事
}

function mutation(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Placement) {
    commitPlacement(fiber)
  }
  if (fiber.flags & EFiberFlags.Update) {
    console.log(fiber.flags & EFiberFlags.Update, fiber)
    commitUpdate(fiber)
  }
  if (fiber.flags & EFiberFlags.Deletion) {
    commitDeletion(fiber)
  }
}

function layout(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Ref) {
    // 绑定新 ref
    patchRef(fiber.props!.ref, fiber.stateNode)
  }
}
