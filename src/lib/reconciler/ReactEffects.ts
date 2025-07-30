export let passiveEffects: Effect[] = []

export function flushPassiveEffects() {
  passiveEffects.forEach((effect) => {
    effect.destroy?.()
    const cleanup = effect.create()
    if (typeof cleanup === "function") {
      effect.destroy = cleanup
    }
  })
  passiveEffects = []
}
