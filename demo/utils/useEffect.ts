const useEffectStr = `interface Effect {
    create: () => void | (() => void)
    destroy?: () => void
    deps?: any[]
    tag: EEffectTag
    next?: Effect
}
export function useEffect(create: () => void | (() => void), deps?: any[]) {
  const hook = updateWorkInProgressHook()
  const prev = hook.memorizedState as Effect
  let changed = !(deps && prev?.deps && areHookInputsEqual(deps, prev.deps))

  if (changed) {
    const effect: Effect = { create, deps, tag: EEffectTag.passiveEffect }
    effect.destroy = prev?.destroy
    hook.memorizedState = effect
    //add to fiber's updateQueue
    pushEffect(currentlyRenderingFiber!, cloneEffect(effect))
  }
}

/**
 * generate circular linked list to updateQueue
 * /
export function pushEffect(fiber: Fiber, effect: Effect) {
  const updateQueue = fiber.updateQueue as Effect | undefined
  if (!updateQueue) {
    effect.next = effect
    fiber.updateQueue = effect
  } else {
    const first = updateQueue.next!
    updateQueue.next = effect
    effect.next = first
    fiber.updateQueue = effect
  }
}
`

const example = `const [count1, setCount1] = useState(1)
const [count2, setCount2] = useState(1)
useEffect(() => {
  setCount2(count1)
}, [count1])

//vnode
<div className=" text-center">
    <p>setData</p>
    <MyButton onClick={() => setCount1(count1 + 1)}> count:{count1}</MyButton>
</div>
<div className=" text-center">
    <p>useEffect</p>
    <MyButton type="info" disabled>count:{count2}</MyButton>
</div>
`

export const getUseEffectData = () => {
  return {
    useEffectStr,
    example,
  }
}
