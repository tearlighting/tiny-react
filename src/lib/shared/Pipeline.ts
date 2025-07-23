type Transform<I, O> = (input: I) => O

class Pipeline<I, O = I> {
  private _transforms: Transform<any, any>[] = []
  use<Next>(fn: Transform<O, Next | Promise<Next>>): Pipeline<I, Next> {
    this._transforms.push(fn)
    return this as any as Pipeline<I, Next>
  }

  async run(input: I): Promise<O> {
    let result: any = input
    for (const transform of this._transforms) {
      result = await transform(result)
    }
    return result
  }
}

export function createPipeline<Initial>() {
  return new Pipeline<Initial>()
}
