import { EClassComponent, EFiberFlags, EFiberTags, FORWARD_REF } from "../shared/constants"
import { isFunction, isStr, isUndefined } from "../shared/utils"

export class Fiber {
  ref: VNode["ref"] | null
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
   * 子树的冒泡的flags
   */
  subtreeFlags: number = 0
  /**
   * 删除的子节点数组
   */
  deletions: Fiber[] = []
  /**
   * 根据不同Hook保存不同的数据,指向Hooks的根节点,在ReactHook那边用
   */
  memoizedState: Hook | null = null
  /**
   * 副作用队列,要冒泡。 自己这个fiber上要执行的副作用.约定updateQueue指向环形链表的最后一个节点，next指向第一个
   */
  updateQueue: UpdateQueue = null
  // /**
  //  * 副作用的收集（收集useEffect）
  //  */
  // effectList?: Effect[]
  // /**
  //  * 副作用收集（收集useLayoutEffect）
  //  */
  // layoutEffectList?: Effect[]
  /**
   * 存context在fiber上，通过子fiber递归向上找到最近的contextType，做key用
   */
  contextType: any = null
  /**
   * 这就是存的具体值
   * 因为会出现一下覆盖的情况，不能相信contextType,而是相信fiber
   * 
   * ```tsx
   * <MyContext.Provider value="A">
       <Child1 />
      <MyContext.Provider value="B">
         <Child2 />
      </MyContext.Provider>
     </MyContext.Provider>
   * ```
   */
  contextValue: any = null
  constructor({
    key = null,
    type,
    stateNode = null,
    tag = null,
    props = null,
    sibling: sbibling = null,
    child = null,
    return: returnFiber = null,
    flags = EFiberFlags.NoFlags,
    index = null,
    alternate = null,
    ref = null,
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
    this.ref = ref
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
      if (type.$$typeof === FORWARD_REF) {
        tag = EFiberTags.ForwardRef
      } else {
        tag = EFiberTags.FunctionComponent
      }
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
    ref: vnode.ref,
    tag,
    return: returnFiber,
  })
}

export function createRootFiber(root: HTMLElement, vnode: ReactNode) {
  const rootNode = new FiberRoot({
    current: null,
    pendingChildren: null,
    stateNode: root,
  })
  const fiberNode = createFiber(vnode, rootNode as any)
  rootNode.pendingChildren = fiberNode
  fiberNode.index = 0
  return rootNode
}

export class FiberRoot implements IFiberRoot {
  current: Fiber
  pendingChildren: Fiber | null
  stateNode: HTMLElement
  pendingPassiveEffects: Effect[] = []
  pendingLayoutEffects: Effect[] = []
  updateQueue: Effect | null = null
  constructor({ current, pendingChildren, stateNode }: IFiberRoot) {
    this.current = current
    this.pendingChildren = pendingChildren
    this.stateNode = stateNode
  }
}
