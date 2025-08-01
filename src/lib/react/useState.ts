import { useReducer } from "./useReducer"

export function useState<T>(initialValue: T | (() => T)) {
  return useReducer(null, initialValue)
}
