import { navigate } from "#/route/Router"
import { type IPageItem } from "#/route/settings"
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
    navigate(item.name)
  }, [isActive])
  return (
    <a
      onClick={clickHandle}
      className={clsx(
        `flex items-center justify-center  py-[5px]
    hover:text-gray-100
    hover:cursor-pointer
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
