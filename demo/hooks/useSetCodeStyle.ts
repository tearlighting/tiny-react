import { useEffect } from "@/lib/react"
import { highlightAll } from "prismjs"

export function useSetCodeStyle() {
  useEffect(() => {
    highlightAll()
  }, [])
}
