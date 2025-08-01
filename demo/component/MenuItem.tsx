import type { IPageItem } from "#/route/settings"
import { createElement } from "@/lib/react-dom"
import clsx from "clsx"
interface IMenuItem {
  item: IPageItem
  isActive?: boolean
  className?: string
}
export function MenuItem({ item, isActive, className = "" }: IMenuItem) {
  console.log(item)

  return (
    <a
      className={clsx(
        `flex items-center justify-center  py-4
    hover:text-gray-100
	text-gray-50
	m-1
    transition-all duration-200 
	`,
        className,
        isActive ? "bg-blue-500" : " hover:bg-blue-300 hover:opacity-50"
      )}
    >
      {item.name}
    </a>
  )
}
