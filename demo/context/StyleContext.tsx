import { createContext, useContext, useEffect, useState } from "@/lib/react"

const context = createContext<{ className: string }>({
  className: "bg-blue-400",
})

export const StyleProvider = context.Provider

export const useStyle = () => {
  const item = useContext(context)
  if (!item) {
    throw new Error("useStyle  must be used within a createContext")
  }
  return item!
}
