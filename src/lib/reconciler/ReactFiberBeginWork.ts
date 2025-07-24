import { EFiberTags } from "../shared/constants"
import type { Fiber } from "./ReactFiber"
import { updateHostComponent, updateHostText } from "./ReactFiberReconciler"

/**
 *
 * @param wip
 * 根据fiber的tag(class,function,原生的string,文本节点的undefined,Fragment等)来决定如何处理
 */
export function beginWork(wip: Fiber | null) {
  const tag = wip?.tag
  ;(tag && tagsStrategy[tag]?.(wip)) || tagsStrategy.default()
}

const tagsStrategy: Record<EFiberTags, (wip: Fiber | null) => any> & {
  default: () => any
} = {
  default: () => {},
  [EFiberTags.Fragment]: () => {},
  [EFiberTags.HostComponent]: updateHostComponent,
  [EFiberTags.ClassComponent]: () => {},
  [EFiberTags.FunctionComponent]: () => {},
  [EFiberTags.HostText]: updateHostText,
}
