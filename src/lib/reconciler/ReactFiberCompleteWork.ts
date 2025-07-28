import { EFiberTags } from "../shared/constants"
import { isStr, updateNode } from "../shared/utils"
import type { Fiber } from "./ReactFiber"

export function completeWork(wip: Fiber | null) {
  if (!wip) return
  //mount
  if (wip && !wip?.stateNode) {
    const tag = wip.tag!
    //createInstance
    tagsCreateInstanceStrategy[tag]?.(wip)
    //apendChild 也是只加一层
    if (wip.stateNode && tag === EFiberTags.HostComponent) {
      appendAllChildren(wip.stateNode as HTMLElement, wip.child)
      //加属性
    }
    finalizeInitialChildren(wip)
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
    // //设置属性
  },
  [EFiberTags.ClassComponent]: () => {},
  [EFiberTags.FunctionComponent]: () => {},
  [EFiberTags.HostText]: (wip) => {
    if (wip && isStr(wip.props?.children)) {
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
