import { currentlyRenderingFiber } from "./ReactHooks"

// 创建 Context
export function createContext<T>(defaultValue: T) {
  const res = {
    _currentValue: defaultValue,
    Provider: null as unknown as ReturnType<typeof createProvider<T>>,
  }
  createProvider(res)
  return res
}

// Provider 组件,就相当于多了一层函数组件，这个组件生成的fiber就是用来挂contextValue的
function createProvider<T>(context: any) {
  function Provider({ value, children }: { value: T; children?: ReactNode }) {
    const fiber = currentlyRenderingFiber!
    fiber.contextValue = value // 挂到当前 Fiber
    fiber.contextType = context // 标记是哪一个 context
    return children
  }
  context.Provider = Provider
  return Provider
}

// useContext Hook
export function useContext<T>(context: { _currentValue: T }): T | null {
  let fiber = currentlyRenderingFiber!
  while (fiber) {
    if (fiber.contextType === context) {
      return fiber.contextValue
    }
    fiber = fiber.return!
  }
  return null
}
