import { Menu } from "#/component/Menu"
import { useRouteInfo } from "#/context/RouterContext"
import { createElement } from "@/lib/react-dom"

export const DefaultLayout = ({ children }: { children?: JSX.Element | VNode }) => {
  const { name } = useRouteInfo()

  return (
    <div className="layout-container">
      <div className="nav-container">
        <Menu></Menu>
      </div>
      <div className="name-container">{name}</div>
      <div className="content-container">{children}</div>
    </div>
  )
}
