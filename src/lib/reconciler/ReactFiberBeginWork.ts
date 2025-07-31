import { EFiberTags } from "../shared/constants"
import { isFiberTag } from "../shared/utils"
import { bailoutOnAlreadyFinishedWork } from "./ReactBailout"
import type { Fiber } from "./ReactFiber"
import { reconcilerClassComponentChildren, reconcilerFunctionComponentChildren, reconcilerHostComponentChildren, reconcilerHostTextChildren } from "./ReactFiberReconciler"

/**
 *
 * @param wip
 * 根据fiber的tag(class,function,原生的string,文本节点的undefined,Fragment等)来决定如何处理
 */
export function beginWork(wip: Fiber | null) {
  if (!wip) return
  //预留剪枝优化diff位置
  if (bailoutOnAlreadyFinishedWork(wip)) return
  const tag = wip.tag!
  const func = (isFiberTag(tag) ? tagsStrategy[tag] : null) ?? tagsStrategy.default
  func(wip)
}

const tagsStrategy: Partial<Record<EFiberTags, (wip: Fiber | null) => any>> & {
  default: (wip: Fiber | null) => any
} = {
  default: () => {},
  [EFiberTags.Fragment]: () => {},
  [EFiberTags.HostComponent]: reconcilerHostComponentChildren,
  [EFiberTags.ClassComponent]: reconcilerClassComponentChildren,
  [EFiberTags.FunctionComponent]: reconcilerFunctionComponentChildren,
  [EFiberTags.HostText]: reconcilerHostTextChildren,
  [EFiberTags.ForwardRef]: reconcilerFunctionComponentChildren,
}
