import { createElement } from "@/lib/react-dom"
import clsx from "clsx"

export function MyImg({ src, className = "w-200 h-100" }: { src: string; className?: string }) {
  return (
    <div className={clsx("w-full flex justify-center ")}>
      <img src={src} className={clsx("rounded-md object-contain ", className)} alt="My Image" />
    </div>
  )
}
