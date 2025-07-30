import { EFiberFlags, EFiberTags } from "../shared/constants"
import { isTextNode, updateNode } from "../shared/utils"
import type { Fiber } from "./ReactFiber"

export function completeWork(wip: Fiber | null) {
  if (!wip) return
  const current = wip.alternate
  const tag = wip.tag!
  //mount
  if (!current) {
    //createInstance
    tagsCreateInstanceStrategy[tag]?.(wip)
    //apendChild 也是只加一层
    if (wip.stateNode && tag === EFiberTags.HostComponent) {
      appendAllChildren(wip.stateNode as HTMLElement, wip.child)
      //加属性
    }
    finalizeInitialChildren(wip)
  } else {
    //更新路径：复用dom,diffProps打update的标记
    tagsUpdateComponetStrategy[tag]?.(wip)
  }
  //收集副作用，将子节点的flags标记到父节点上
  bubbleProperties(wip)
}
function finalizeInitialChildren(wip: Fiber) {
  wip.stateNode && updateNode(wip.stateNode!, {}, wip.props!)
}

const tagsCreateInstanceStrategy: Partial<Record<EFiberTags, (wip: Fiber) => any>> & {
  default: () => any
} = {
  default: () => {},
  [EFiberTags.Fragment]: () => {},
  [EFiberTags.HostComponent]: (wip) => {
    //创建原生dom
    wip.stateNode = document.createElement(wip.type as string)
  },
  [EFiberTags.ClassComponent]: () => {},
  [EFiberTags.FunctionComponent]: () => {},
  [EFiberTags.HostText]: (wip) => {
    if (wip && isTextNode(wip.props?.children)) {
      wip.stateNode = document.createTextNode(wip.props?.children! as any) as unknown as HTMLElement
    }
  },
}
/**
 * 只append一层
 * @param parent
 * @param child
 */
export function appendAllChildren(parent: HTMLElement, child: Fiber | null) {
  while (child) {
    if (child.tag === EFiberTags.HostComponent || child.tag === EFiberTags.HostText) {
      if (child.stateNode) {
        parent.appendChild(child.stateNode as HTMLElement)
      }
    } else if (child.child) {
      // 对 Fragment 或函数组件，递归找真实 DOM
      appendAllChildren(parent, child.child)
    }
    child = child.sibling
  }
}

function bubbleProperties(wip: Fiber) {
  let child = wip.child
  let subtreeFlags = 0
  while (child) {
    subtreeFlags |= child.subtreeFlags
    subtreeFlags |= child.flags
    child.return = wip
    child = child.sibling
  }
  wip.subtreeFlags |= subtreeFlags
}

/**
 * 复用dom
 * @param wip
 * @param current
 */
function reuseDom(wip: Fiber, current: Fiber) {
  wip.stateNode = current.stateNode
}

/**
 * 复用dom,diffProps打update的标记
 * @param current
 * @param wip
 */
function updateHostComponent(current: Fiber, wip: Fiber) {
  //复用dom
  reuseDom(wip, current)
  const oldProps = current.props || {}
  const newProps = wip.props || {}

  //diffProps
  const updatePayload = diffProps(oldProps, newProps)

  if (updatePayload) {
    wip.updateQueue = updatePayload
    wip.flags |= EFiberFlags.Update
  }
}

function diffProps(prev: Record<string, any>, next: Record<string, any>) {
  let payload: [string, any][] = []

  // 移除旧的
  for (let key in prev) {
    if (!(key in next)) {
      payload.push([key, null])
    }
  }
  // 添加/修改新的
  for (let key in next) {
    if (prev[key] !== next[key]) {
      payload.push([key, next[key]])
    }
  }

  return payload.length > 0 ? payload : null
}

const tagsUpdateComponetStrategy: Partial<Record<EFiberTags, (wip: Fiber) => any>> = {
  [EFiberTags.HostComponent]: (wip) => updateHostComponent(wip.alternate!, wip),
  [EFiberTags.HostText]: (wip) => {
    if (wip) {
      //复用dom
      reuseDom(wip, wip.alternate!)
      const value = wip.props?.children as string
      const old = wip.alternate?.props?.children as any
      //   console.log(value, old, value !== old)

      if (value !== old) {
        wip.flags |= EFiberFlags.Update
        wip.updateQueue = value
      }
    }
  },
}
