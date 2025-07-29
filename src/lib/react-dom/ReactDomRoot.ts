import { createFiber, createRootFiber, FiberRoot, scheduleUpdateOnFiber } from "../reconciler"
let rootNode: FiberRoot | null = null
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
  if (!rootNode) {
    rootNode = createRootFiber(container, children)
  } else {
    rootNode.pendingChildren = createFiber(children, rootNode as any)
    rootNode.pendingChildren.alternate = rootNode.current
  }
  //先生成父节点的fiblerNode,子Fiber在下面生成
  scheduleUpdateOnFiber(rootNode)
  // console.log(rootNode, children)
}

export const createRoot = (container: HTMLElement) => new ReactDomRoot(container)

// function createWorkInProgress(current: Fiber, pendingProps: VNode): Fiber {
//   const wip = new Fiber({
//     ...current,
//     props: pendingProps,
//     alternate: current,
//   })
//   current.alternate = wip
//   return wip
// }
