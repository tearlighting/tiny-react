import { EClassComponent } from "../shared/constants"
export { useState } from "./useState"
export { useReducer } from "./useReducer"
export { useEffect } from "./useEffect"
export { useLayoutEffect } from "./useLayoutEffect"
export { useRef } from "./useRef"
export * from "./forwardRef"
export * from "./useSyncExternalStore"
export * from "./useMemo"
export * from "./useCallback"
export * from "./context"
export abstract class Component<TProp extends Record<string, any>> {
  constructor(protected props: TProp) {}
  state: any
  setState(state: any) {
    this.state = state
  }
  abstract render(): ReactNode
}

Reflect.set(Component.prototype, EClassComponent.isReactComponent, true)

export const TinyReact = {
  Component,
}
