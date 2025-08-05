import { type IPageItem, pages } from "#/route/settings"
import { createContext, useContext, useEffect, useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const context = createContext<IPageItem>({} as IPageItem)

export const RouterProvider = ({ children }: { children?: React.ReactNode }) => {
  const currentRoute = window.location.pathname
  const [currentItem, setCurrentItem] = useState(() => pages.find((x) => x.path === currentRoute)!)

  useEffect(() => {
    const path = currentRoute === "/" ? "/flow" : currentRoute
    setCurrentItem(() => pages.find((x) => x.path === path) || ({} as any))
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
