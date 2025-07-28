import { Component } from "../react"
import { renderWithHooks } from "../react/ReactHooks"
import { EFiberTags } from "../shared/constants"
import { getHostParentFiber, isFunction } from "../shared/utils"
import { reconcilerChildren } from "./ReactChildFiber"
import type { Fiber } from "./ReactFiber"

/**
 *
 * @param wip
 * 处理原生节点
 */
export function reconcilerHostComponentChildren(wip: Fiber | null) {
  //初次渲染
  if (wip && !wip?.stateNode) {
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
  //初次渲染
  if (wip && !wip?.stateNode && isFunction(wip.type)) {
    //先处理hooks
    renderWithHooks(wip)
    const children = wip.type(wip.props)
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
  const parentFiber = getHostParentFiber(fiber)
  const parentDom = parentFiber?.stateNode as HTMLElement
  if (!parentDom) return
  console.log(parentDom)

  if (fiber.tag === EFiberTags.HostComponent || fiber.tag === EFiberTags.HostText) {
    parentDom.appendChild(fiber.stateNode!)
  }
}
