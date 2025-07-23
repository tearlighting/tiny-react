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
