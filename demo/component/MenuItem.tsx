import { type IPageItem } from "#/route/settings"
import { navigate } from "#/route/Router"
import { useCallback } from "@/lib/react"
import { createElement } from "@/lib/react-dom"
import clsx from "clsx"
interface IMenuItem {
  item: IPageItem
  isActive?: boolean
  className?: string
}
export function MenuItem({ item, isActive, className = "" }: IMenuItem) {
  const clickHandle = useCallback(() => {
    if (isActive) return
    navigate(item.path)
  }, [isActive])
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
      onClick={clickHandle}
    >
      {item.name}
    </a>
  )
}
