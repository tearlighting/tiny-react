import { EClassComponent } from "../shared/constants"

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
