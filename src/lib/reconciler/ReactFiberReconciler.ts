import { renderWithHooks } from "../react/ReactHooks"
import { EFiberTags } from "../shared/constants"
import { getHostParentFiber, isFunction, updateNode } from "../shared/utils"
import { reconcilerChildren } from "./ReactChildFiber"
import { passiveEffects } from "./ReactEffects"
import type { Fiber } from "./ReactFiber"

/**
 *
 * @param wip
 * 处理原生节点
 */
export function reconcilerHostComponentChildren(wip: Fiber | null) {
  //初次渲染
  if (wip) {
    //加入子节点fiber,不是递归所有，只是当前节点的子节点
    reconcilerChildren(wip, wip.props?.children ?? [])
  }
}
/**
 *
 * @param wip
 * 处理文本节点
 */
export function reconcilerHostTextChildren(wip: Fiber | null) {}
/**
 *  处里函数组件
 * @param wip
 */
export function reconcilerFunctionComponentChildren(wip: Fiber | null) {
  if (wip && isFunction(wip.type)) {
    //先处理hooks
    renderWithHooks(wip)

    const children = wip.type(wip.props)
    // console.log(children)

    //加入子节点fiber,不是递归所有，只是当前节点的子节点
    reconcilerChildren(wip, children)
  }
}

export function reconcilerClassComponentChildren(wip: Fiber | null) {
  if (wip && !wip?.stateNode) {
    const instance = new (wip.type as any)(wip.props)
    const vnode = instance.render()
    reconcilerChildren(wip, vnode as any)
  }
}

/**
 *commit 更新
 * @param fiber
 * @returns
 */
export function commitPlacement(fiber: Fiber) {
  console.log("commitPlacement")
  const parentFiber = getHostParentFiber(fiber)
  const parentDom = parentFiber?.stateNode as HTMLElement
  if (!parentDom) return
  if (fiber.tag === EFiberTags.HostComponent || fiber.tag === EFiberTags.HostText) {
    parentDom.appendChild(fiber.stateNode!)
  }
}

export function commitDeletion(fiber: Fiber) {
  const deletions = fiber.deletions ?? []
  console.log("deletion:", [...deletions])
  for (let i of deletions) {
    removeFiber(i)
  }
}

function updateProperties(dom: HTMLElement, oldProps: Record<string, any>, updates: HostUpdateQueue) {
  const res = Object.fromEntries(updates)
  updateNode(dom, oldProps, res)
}
export function commitUpdate(fiber: Fiber) {
  const strategy: Partial<Record<EFiberTags, (wip: Fiber) => any>> = {
    [EFiberTags.HostComponent]: (wip) => {
      const dom = wip.stateNode as HTMLElement
      const updates = wip.updateQueue ?? ([] as HostUpdateQueue)
      updateProperties(dom, wip.alternate?.props ?? {}, updates)
    },
    [EFiberTags.HostText]: (wip) => {
      const dom = wip.stateNode as HTMLElement
      const updates = wip.updateQueue as TextUpdateQueue
      //   console.log(wip, wip.alternate?.props?.children)
      dom.nodeValue = updates
    },
  }
  const tag = fiber.tag!
  strategy[tag]?.(fiber)
}

function removeFiber(fiber: Fiber) {
  if (fiber.tag === EFiberTags.HostComponent || fiber.tag === EFiberTags.HostText) {
    fiber.stateNode?.remove()
  } else {
    let child = fiber.child
    while (child) {
      removeFiber(child)
      child = child.sibling
    }
  }
}

export function commitPassiveEffect(fiber: Fiber) {
  const effectList = fiber.effectList || []
  passiveEffects.push(...effectList)
}

/**
 * 为mount阶段收集effectList
 * @param fiber
 * @returns
 */
export function collectPassiveEffects(fiber: Fiber | null) {
  if (!fiber) return
  if (fiber.tag === EFiberTags.FunctionComponent && fiber.effectList) {
    passiveEffects.push(...fiber.effectList)
  }
  collectPassiveEffects(fiber.child)
  collectPassiveEffects(fiber.sibling)
}
