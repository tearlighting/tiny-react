import { EFiberTags } from "../shared/constants"
import type { Fiber } from "./ReactFiber"

/**
 *
 * @param wip
 * 根据fiber的tag(class,function,原生的string,文本节点的undefined,Fragment等)来决定如何处理
 */
export function beginWork(wip: Fiber | null) {
  const tag = wip?.tag
  ;(tag && tagsStrategy[tag]?.(wip)) || tagsStrategy.default()
}

const tagsStrategy: Record<EFiberTags, (fiber: Fiber | null) => any> & {
  default: () => any
} = {
  default: () => {},
  [EFiberTags.Fragment]: () => {},
  [EFiberTags.HostComponent]: () => {},
  [EFiberTags.ClassComponent]: () => {},
  [EFiberTags.FunctionComponent]: () => {},
  [EFiberTags.HostText]: () => {},
}
