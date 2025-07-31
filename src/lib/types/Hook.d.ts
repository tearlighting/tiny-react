import type { EEffectTag } from "../shared/constants"

declare global {
  interface Hook<T = any> {
    /**
     * The memorized state of the hook
     */
    memorizedState?: Effect | State | Ref | Memo | Callback
    /**
     * The queue of updates for the hook
     */
    queue?: Update<T> | null
    /**
    /**
     * The next hook in the chain
     */
    next?: Hook | null
    /**
     * 这是useState,useRef的update更新队列。useEffect这种副作用队列不挂在这里，挂在外部的fiber。
     */
    updateQueue: {
      /**
       * 约定pending指向环形链表的最后一个节点，next指向第一个
       */
      pending: Update<T> | null
    }
  }

  type State = any

  interface Effect {
    create: () => void | (() => void)
    destroy?: () => void
    deps?: any[]
    tag: EEffectTag
    next?: Effect
  }

  interface Ref<T> {
    current: T
  }

  interface Update<T> {
    action: T | ((prev: T) => T)
    next: Update<T> | null
  }

  interface Memo<T> {
    deps: any[]
    value: T
  }
  interface Callback<T extends (...args: any[]) => any> {
    deps?: any[]
    callback: T
  }
}
