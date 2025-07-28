import { createFiber, createRootFiber, Fiber, scheduleUpdateOnFiber } from "../reconciler"

export class ReactDomRoot {
  constructor(private _internalRoot: HTMLElement) {}
  /**
   *
   * @param children
   * 以前的stack架构称为Vnode
   * 现在的Fiber架构称为FiberNode
   */
  render(children: ReactNode) {
    updateContainer(this._internalRoot, children)
  }
}
//更新容器
function updateContainer(container: HTMLElement, children: ReactNode) {
  //todo
  const rootNode = createRootFiber(container, children)
  //先生成父节点的fiblerNode,子Fiber在下面生成
  scheduleUpdateOnFiber(rootNode)
  console.log(rootNode)
}

export const createRoot = (container: HTMLElement) => new ReactDomRoot(container)
