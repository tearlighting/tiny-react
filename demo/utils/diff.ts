const diff = `
export function reconcilerChildren(returnFiber: Fiber, children: VNode | string | (VNode | string)[]) {
  //normalize
  const newChildren = normalizeChildren(children)
  /**
   * the fiber was handled last time.it use to create linked list.
   */
  let previousNewFiber: Fiber | null = null
  function linkFiber(newFiber: Fiber) {
    if (previousNewFiber) {
      previousNewFiber.sibling = newFiber
    } else {
      returnFiber.child = newFiber
    }
    previousNewFiber = newFiber
  }
  /**
   * child on the alternate tree
   */
  let oldFiber = returnFiber.alternate?.child ?? null
  /**
   *  newChildren's index
   */
  let i = 0
  /**
   * use to marking Placement if need.
   */
  let lastPlacedIndex = 0
  /**
   *is mount or update
   */
  let shouldTrackSideEffects = !!returnFiber.alternate
  /**
   * the fiber was handled next time.it use to create linked list.
   */
  let nextOldFiber = null
  /**
   * reuse alternate
   * @param newFiber
   * @param oldFiber
   */
  function reuseAlternateFiber(newFiber: Fiber, oldFiber: Fiber) {
    newFiber.alternate = oldFiber
    oldFiber.alternate = newFiber
  }
  //mount. don't need to reuse. just create new fiber
  if (!oldFiber) {
    for (; i < newChildren.length; i++) {
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null) {
        continue
      }
      const newFiber = createFiber(newChildrenVNode, returnFiber)
      //try to marking placeMent
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      linkFiber(newFiber)
    }
  } else {
    //update
    //try to reuse old fiber.
    for (; oldFiber && i < newChildren.length; i++) {
      const newChildrenVNode = newChildren[i]
      if (newChildrenVNode === null) {
        continue
      }

      //if the order is changed, we need break the loop by set oldFiber equal null.
      //for exmaple. when old fiber'child index is 1,2,3,4,5, but new order is 5,4,3,2,1.
      if (oldFiber.index && oldFiber.index > i) {
        nextOldFiber = oldFiber
        oldFiber = null
      } else {
        //prepare for next loop
        nextOldFiber = oldFiber.sibling
      }
      //compare key and tag.if they are same,that we can reuse it.
      if (!sameNode(newChildrenVNode, oldFiber)) {
        //if we can't reuse it. we need to recover the old fiber.
        if (!oldFiber) oldFiber = nextOldFiber
        break
      }
      //reuse it
      const newFiber = createFiber(newChildrenVNode, returnFiber)
      reuseAlternateFiber(newFiber, oldFiber!)
      //try to marking placeMent
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
      linkFiber(newFiber)
      oldFiber = nextOldFiber
    }

    //if all of new children can be reused, we need marking the rest old fiber to deletion.
    if (i === newChildren.length) {
      oldFiber && deleteRemainingChildren(returnFiber, oldFiber)
    } else {

     
     //create a map to cache the remaining old fiber. O(1) time to find the old fiber by key.
      const map = mapRemainingChildren(oldFiber)
     //start new loop to reuse old fiber
      while (i < newChildren.length) {
        const newChildrenVNode = newChildren[i]
        const newFiber = createFiber(newChildrenVNode, returnFiber)
        newFiber.index = i
        const key = newFiber.key ?? newFiber.index!.toString()
        if (map.has(key)) {
          const alternate = map.get(key)
          reuseAlternateFiber(newFiber, alternate!)
          map.delete(key)
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects)
        linkFiber(newFiber)
        i++
      }
      //marking the remaining old fiber to deletion.
      for (let [_, alternate] of map.entries()) {
        deleteRemainingChildren(returnFiber, alternate)
      }
    }
  }
}
`
export function getDiffData() {
  return {
    diff,
  }
}
