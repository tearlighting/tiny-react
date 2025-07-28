import { EClassComponent, EFiberFlags, EFiberTags } from "../shared/constants"
import { isFunction, isStr, isUndefined } from "../shared/utils"

export class Fiber {
  /**
   * vnode上的key，直接拿
   */
  key: string | null
  /**
   * vnode上的type，直接拿,可能是string、function、undefined，fragment，class
   */
  type: string | Function | undefined | null
  /**
   * vnode上的props，直接拿
   */
  props: Partial<{ id: string; children: VNode[] | string; className: string } & Record<string, any>> | null
  /**
   * 真实dom
   */
  stateNode: HTMLElement | null
  /**
   * 由type决定，有FunctionComponent、ClassComponent、HostComponent、HostText等
   */
  tag: EFiberTags | null
  /**
   * 子fiber节点
   */
  child: Fiber | null
  /**
   * 兄弟fiber节点
   */
  sibling: Fiber | null
  /**
   * 父fiber节点
   */
  return: Fiber | null
  /**
   * 通过二进制的位运算来标记要进行的操作
   */
  flags: EFiberFlags
  /**
   * 当前节点在当前层级下的index
   */
  index: number | null
  /**
   * 双Fiber缓冲
   * 指向旧树上的fiber节点
   */
  alternate: Fiber | null
  /**
   * 子树的更新flags
   */
  subtreeFlags: number = 0
  constructor({
    key = null,
    type,
    stateNode = null,
    tag = null,
    props = null,
    sibling: sbibling = null,
    child = null,
    return: returnFiber = null,
    flags = EFiberFlags.Placement,
    index = null,
    alternate = null,
  }: Partial<Omit<Fiber, "">>) {
    this.key = key
    this.type = type
    this.stateNode = stateNode
    this.tag = tag
    this.props = props
    this.child = child
    this.sibling = sbibling
    this.return = returnFiber
    this.flags = flags
    this.index = index
    this.alternate = alternate
  }
}

/**
 *
 * @param vnode 当前虚拟dom
 * @param returnFiber 父FiberNode
 */
export function createFiber(vnode: ReactNode, returnFiber: Fiber) {
  const type = vnode.type
  let tag: EFiberTags
  //原生标签
  if (isStr(type)) {
    tag = EFiberTags.HostComponent
  } else if (isFunction(type)) {
    if (type.prototype && type.prototype[EClassComponent.isReactComponent]) {
      tag = EFiberTags.ClassComponent
    } else {
      tag = EFiberTags.FunctionComponent
    }
  }
  //文本节点
  else if (isUndefined(type)) {
    tag = EFiberTags.HostText
  } else {
    //<></>
    tag = EFiberTags.Fragment
  }
  return new Fiber({
    key: vnode.key,
    type: vnode.type,
    props: tag === EFiberTags.HostText ? { children: vnode } : vnode.props,
    tag,
    return: returnFiber,
  })
}

export function createRootFiber(root: HTMLElement, vnode: ReactNode) {
  const rootNode = new Fiber({
    stateNode: root,
    type: root.nodeName.toLowerCase(),
    tag: EFiberTags.HostRoot,
  })
  const fiberNode = createFiber(vnode, rootNode)
  rootNode.child = fiberNode
  return rootNode
}
