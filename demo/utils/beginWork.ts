const beginWork = `

function beginWork(wip: Fiber) {
  //refine diff logic.if don't have update,just return
  if (bailoutOnAlreadyFinishedWork(wip)) return
  const tag = wip.tag!
  const func = (isFiberTag(tag) ? tagsStrategy[tag] : null) ?? tagsStrategy.default
  func(wip)
}

//different tag has different diff logic.I don't like switch case,so I use a strategy to handle it.
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


export function reconcilerFunctionComponentChildren(wip: Fiber) {
    //handle hooks. I will explain it in hooks chapter.
    renderWithHooks(wip)
    //nomally, ref is not in props.if you want to use ref,you need to use forwardRef to pass it.
    const children = wip.tag === EFiberTags.ForwardRef ? wip.type(wip.props, wip.ref) : wip.type(wip.props)
    //diff Fiber with VNode
    reconcilerChildren(wip, children)
}
`
export function getBeginWorkData() {
  return {
    beginWork,
  }
}
