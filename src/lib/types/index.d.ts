interface ReactElement<P = unknown, T extends string> {
  type: T
  props: P
  key: string | null
}
type ReactNode = ReactElement | string | number | bigint | boolean | null

type VNode = {
  type: string | Function
  props: Record<string, any>
  key: string | null
  ref: any
}

interface IFiberRoot {
  current: Fiber // 当前渲染完成的 Fiber 树根
  pendingChildren: Fiber | null
  stateNode: HTMLElement
}
