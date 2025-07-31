type HostUpdateQueue = [string, any][] // DOM 属性差异
type FunctionUpdateQueue = Effect // 之后做 hooks 再具体化
type ClassUpdateQueue = any
type TextUpdateQueue = string

type UpdateQueue = HostUpdateQueue | FunctionUpdateQueue | ClassUpdateQueue | TextUpdateQueue
