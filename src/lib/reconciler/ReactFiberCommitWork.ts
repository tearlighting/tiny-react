import { EEffectTag, EFiberFlags, EFiberTags } from "../shared/constants"
import { patchRef } from "../shared/uploadNodeMiddleWares"
import { flushEffects, getFiberRoot } from "../shared/utils"
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
    const wipRoot = getFiberRoot(fiber)
    commitAttachRef(wipRoot.pendingChildren)
    // flushEffects(wipRoot.updateQueue, [EEffectTag.layoutEffect, EEffectTag.imperativeHandle])
  } else {
    //  如果当前节点和子树都没有副作用 → 直接返回
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
    patchRef(fiber.alternate?.ref!, null)
  }
  // 3. 其他需要在 DOM 改变前做的事
}
/**
 * 为flags更新dom
 * @param fiber
 */
function mutation(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Placement) {
    commitPlacement(fiber)
  }
  if (fiber.flags & EFiberFlags.Update) {
    // console.log(fiber.flags & EFiberFlags.Update, fiber)
    commitUpdate(fiber)
  }
  if (fiber.flags & EFiberFlags.Deletion) {
    console.log(fiber)

    commitDeletion(fiber)
  }
}
/**
 *
 * @param fiber
 * dom操作完成，开始绑定新ref，同步触发layoutEffect中有副作用，还有同步的useImperativeHandle
 */
function layout(fiber: Fiber) {
  if (fiber.flags & EFiberFlags.Ref) {
    // 绑定新 ref
    patchRef(fiber.ref!, fiber.stateNode)
  }
  //确实是layou阶段执行的，但是我这里是递归的，会执行多次，我就放双缓冲交互前去了
  //   const wipRoot = getFiberRoot(fiber)!
  //   flushEffects(wipRoot.updateQueue, [EEffectTag.layoutEffect, EEffectTag.imperativeHandle])
}

//mount阶段绑定ref
function commitAttachRef(fiber: Fiber | null) {
  while (fiber) {
    if (fiber.tag === EFiberTags.HostComponent && fiber.ref) {
      patchRef(fiber.ref, fiber.stateNode)
    }
    commitAttachRef(fiber.child)
    fiber = fiber.sibling
  }
}
