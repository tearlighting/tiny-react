import { createFiber, Fiber } from "../reconciler"
import { scheduleUpdateOnFiber } from "../reconciler/ReactFiberWorkLoop"

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
  //先生成父节点的fiblerNode,子Fiber在下面生成
  const fiberNode = createFiber(
    children,
    new Fiber({
      stateNode: container,
      type: container.nodeName.toLowerCase(),
    })
  )
  scheduleUpdateOnFiber(fiberNode)
  console.log(fiberNode, children)
}

export const createRoot = (container: HTMLElement) => new ReactDomRoot(container)
