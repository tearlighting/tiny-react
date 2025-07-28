interface Hook {
  /**
   * The memorized state of the hook
   */
  memorizedState?: any
  /**
   * The next hook in the chain
   */
  next?: Hook | null
}
