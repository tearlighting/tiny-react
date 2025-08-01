import { useState, useEffect } from "@/lib/react"
export function useCurrentRoute() {
  const pathname = window.location.pathname
  const [currentRoute, setCurrentRoute] = useState<string>(pathname)
  useEffect(() => {
    setCurrentRoute(pathname)
  }, [pathname])

  return { currentRoute }
}
