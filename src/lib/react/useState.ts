import { useReducer } from "./useReducer"

export function useState<T>(initialValue: T) {
  return useReducer(null, initialValue)
}
