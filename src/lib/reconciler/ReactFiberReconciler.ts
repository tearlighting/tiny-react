import type { Fiber } from "./ReactFiber"

/**
 *
 * @param wip
 * 处理原生节点
 */
function updateHostComponent(wip: Fiber) {
  //创建原生dom
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type as string)
    //设置属性
  }
}
/**
 *
 * @param wip
 * 处理文本节点
 */
export function updateHostText(wip: Fiber) {
  if (wip && !Array.isArray(wip.props?.children)) {
    wip.stateNode = document.createTextNode(wip.props?.children!) as unknown as HTMLElement
  }
}
