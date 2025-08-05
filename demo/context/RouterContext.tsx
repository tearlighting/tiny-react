import { type IPageItem, pages } from "#/route/settings"
import { getPathName } from "#/utils"
import { createContext, useContext, useEffect, useState } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
const context = createContext<IPageItem>({} as IPageItem)

export const RouterProvider = ({ children }: { children?: React.ReactNode }) => {
  const currentRoute = getPathName()
  const [currentItem, setCurrentItem] = useState(() => pages.find((x) => x.name.toLocaleLowerCase() === currentRoute.toLocaleLowerCase())!)

  // useEffect(() => {
  //   const path = currentRoute === "/" ? "/flow" : currentRoute
  //   setCurrentItem(() => pages.find((x) => x.path === path) || ({} as any))
  // }, [currentRoute])
  return <context.Provider value={currentItem}>{children}</context.Provider>
}

export const useRouteInfo = () => {
  const item = useContext(context)
  if (!item) {
    throw new Error("useRouteInfo must be used within a RouterProvider")
  }
  return item!
}
