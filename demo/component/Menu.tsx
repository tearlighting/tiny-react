import { pages } from "#/route/settings"
import { MenuItem } from "./MenuItem"
import { useRouteInfo } from "#/context/RouterContext"
import { createElement } from "@/lib/react-dom"
export function Menu() {
  //   const { path } = useRouteInfo()
  //   console.log(pages)

  return (
    <ul className=" max-h-[100%] overflow-y-auto grid grid-rows-[auto] grid-cols-1 bg-transparent">
      <li
        className="` flex items-center justify-center  py-4
    hover:text-gray-100
	text-gray-50
	m-1
    transition-colors duration-200 
	`"
      >
        <span>Tiny React</span>
      </li>

      {pages.map((page) => (
        //@ts-ignore
        <li key={page.path}>{page.name}</li>
      ))}
    </ul>
  )
}
