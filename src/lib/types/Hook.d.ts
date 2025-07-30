interface Hook<T = any> {
  /**
   * The memorized state of the hook
   */
  memorizedState?: Effect | UseStateMemorizedState
  /**
   * The next hook in the chain
   */
  next?: Hook | null
  /**
   * 更新的环状链表
   */
  updateQueue: {
    /**
     * 约定pending指向环形链表的最后一个节点，next指向第一个
     */
    pending: Update<T> | null
  }
}

type UseStateMemorizedState = any

interface Effect {
  create: () => void | (() => void)
  destroy?: () => void
  deps?: any[]
}

interface Update<T> {
  action: T | ((prev: T) => T)
  next: Update<T> | null
}
