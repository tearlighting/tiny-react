const contextStr = `
export function createContext<T>(defaultValue: T) {
  const res = {
    _currentValue: defaultValue,
    Provider: null as unknown as ReturnType<typeof createProvider<T>>,
  }
  createProvider(res)
  return res
}

// Provider is just a function component. it will cause to generate a new fiber which is used to store context value
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

// useContext Hook.it use context as key to find the nearest context value.
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
`
const example = `
const context = createContext<{ className: string }>({
  className: "bg-blue-400",
})

export const StyleProvider = context.Provider

export const useStyle = () => {
  const item = useContext(context)
  if (!item) {
    throw new Error("useStyle  must be used within a createContext")
  }
  return item!
}

//usage
export function Context() {
  return (
    <div>
      <StyleProvider value={{ className: "bg-blue-400" }}>
        <Parent>
          <Child />
        </Parent>
      </StyleProvider>
    </div>
  )
}

function Parent({ children }: { children?: ReactNode }) {
  const { className } = useStyle()
  return (
    <div className={clsx(className, "w-50 h-50 flex items-center justify-center flex-col")}>
      parent
      <StyleProvider value={{ className: "bg-amber-400" }}>{children}</StyleProvider>
    </div>
  )
}

function Child() {
  const { className } = useStyle()
  return <div className={clsx(className, "w-20 h-20 flex items-center justify-center")}>child</div>
}

`

export const getContextData = () => {
  return {
    contextStr,
    example,
  }
}
