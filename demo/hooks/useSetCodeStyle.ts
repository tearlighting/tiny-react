import { useEffect } from "@/lib/react"
import { highlightAll } from "prismjs"

export function useSetCodeStyle() {
  useEffect(() => {
    console.log("mount")

    highlightAll()
    return () => {
      console.log("unmount")
    }
  }, [])
}
