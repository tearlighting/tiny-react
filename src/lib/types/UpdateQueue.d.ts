type HostUpdateQueue = [string, any][] // DOM 属性差异
type FunctionUpdateQueue = {
  pending: Update<any> | null
} // 之后做 hooks 再具体化
type ClassUpdateQueue = any
type TextUpdateQueue = string
interface Update<T> {
  action: T | ((prev: T) => T)
  next: Update<T> | null
}
type UpdateQueue = HostUpdateQueue | FunctionUpdateQueue | ClassUpdateQueue | TextUpdateQueue
