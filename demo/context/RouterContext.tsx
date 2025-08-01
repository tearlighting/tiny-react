import { useCurrentRoute } from "#/hooks/useCurrentRoute"
import { type IPageItem, pages } from "#/route/settings"
import { createContext, useContext, useEffect, useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const context = createContext<IPageItem>({} as IPageItem)

export const RouterProvider = ({ children }: { children?: React.ReactNode }) => {
  const { currentRoute } = useCurrentRoute()
  const [currentItem, setCurrentItem] = useState(() => pages.find((x) => x.path === currentRoute)!)

  useEffect(() => {
    setCurrentItem(() => pages.find((x) => x.path === currentRoute) || ({} as any))
  }, [currentRoute])
  //@ts-ignore
  return <context.Provider value={currentItem}>{children}</context.Provider>
}

export const useRouteInfo = () => {
  const item = useContext(context)

  if (!item) {
    throw new Error("useRouteInfo must be used within a RouterProvider")
  }
  return item!
}
