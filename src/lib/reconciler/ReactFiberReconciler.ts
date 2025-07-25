import { isStr, updateNode } from "../shared/utils"
import { reconcilerChildren } from "./ReactChildFiber"
import type { Fiber } from "./ReactFiber"

/**
 *
 * @param wip
 * 处理原生节点
 */
export function updateHostComponent(wip: Fiber | null) {
  //初次渲染
  if (wip && !wip?.stateNode) {
    //创建原生dom
    wip.stateNode = document.createElement(wip.type as string)
    //设置属性
    updateNode(wip.stateNode, {}, wip.props!)
    //加入子节点fiber,不是递归所有，只是当前节点的子节点
    reconcilerChildren(wip, wip.props?.children ?? [])
  }
}
/**
 *
 * @param wip
 * 处理文本节点
 */
export function updateHostText(wip: Fiber | null) {
  if (wip && !isStr(wip.props?.children)) {
    wip.stateNode = document.createTextNode(wip.props?.children! as any) as unknown as HTMLElement
  }
}
