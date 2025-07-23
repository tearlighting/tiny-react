export type PatchMiddleware<T extends Record<string, any>> = (ctx: T, next: () => void) => void
export class MiddleWare<T extends Record<string, any>> {
  private _middlewares: PatchMiddleware<T>[] = []
  private _onBeforeEach: null | ((ctx: T) => void) = null
  private _onAfterEach: ((ctx: T) => void | Promise<void>) | null = null
  use(mw: PatchMiddleware<T>) {
    this._middlewares.push(mw)
    return this
  }
  onBeforeEach(fn: (ctx: T) => void | Promise<void>) {
    this._onBeforeEach = fn
  }
  onAfterEach(fn: (ctx: T) => void | Promise<void>) {
    this._onAfterEach = fn
  }
  async run(ctx: T) {
    const dispatch = async (i: number) => {
      const mw = this._middlewares[i]
      if (!mw) return
      const next = () => dispatch(i + 1)
      this._onBeforeEach && (await this._onBeforeEach(ctx))
      await mw(ctx, next)
      this._onAfterEach && (await this._onAfterEach(ctx))
    }
    await dispatch(0)
  }
}

export function createMiddleWare<T extends Record<string, any>>() {
  return new MiddleWare<T>()
}
