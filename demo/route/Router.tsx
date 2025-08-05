import { getPathName } from "#/utils"
import { useState, useEffect } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
export interface RouteConfig {
  path: string
  element: JSX.Element
  name: string
}

interface RouterProps {
  routes: RouteConfig[]
}

export function Router({ routes }: RouterProps) {
  const [path] = useState(getPathName)

  // useEffect(() => {
  //   const handler = () => setPath(window.location.pathname)
  //   window.addEventListener("popstate", handler)
  //   return () => window.removeEventListener("popstate", handler)
  // }, [])

  const route = routes.find((r) => r.name.toLocaleLowerCase() === path.toLocaleLowerCase())

  return route ? route.element : <div>404 Not Found</div>
}

// 路由跳转 API
// export function navigate(to: string) {
//   window.history.pushState(null, "", to)
//   window.dispatchEvent(new PopStateEvent("popstate"))
// }
