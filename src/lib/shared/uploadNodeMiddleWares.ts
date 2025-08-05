import { createMiddleWare, type PatchMiddleware } from "./MiddleWare"
import { isTextNode } from "./utils"

interface PatchCtx {
  key: string
  preVal: Record<string, any>
  nextVal: Record<string, any>
  node: HTMLElement
}
enum EPatchType {
  event = "on",
  class = "className",
  ref = "ref",
  html = "dangerouslySetInnerHTML",
  value = "value",
  children = "children",
}

const patchableKeys = Object.values(EPatchType)

export const eventMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  const { key, preVal, nextVal, node } = ctx
  if (!key.startsWith(EPatchType.event)) return next()
  const event = key.slice(2).toLowerCase()
  if (preVal[key] && nextVal[key]) node.removeEventListener(event, preVal[key])
  if (nextVal[key]) node.addEventListener(event, nextVal[key])
}
export const classMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  const { key, preVal, nextVal, node } = ctx
  if (key !== EPatchType.class) return next()
  if (nextVal[key] && preVal[key] !== nextVal[key]) {
    patchClass(node, preVal[key], nextVal[key])
  }
}
export const refMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  const { key, preVal, nextVal, node } = ctx
  if (key !== EPatchType.ref) return next()
  patchRef(preVal[key], null)
  patchRef(nextVal[key], node)
}
export const htmlMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  if (ctx.key !== EPatchType.html) return next()
  const html = ctx.nextVal.dangerouslySetInnerHTML?.__html
  if (html != null) ctx.node.innerHTML = html
}

export const valueMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  if (ctx.key !== EPatchType.value) return next()
  const { node, nextVal } = ctx
  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    if (document.activeElement !== node) {
      node.value = nextVal.value
    }
  } else {
    ;(node as any).value = nextVal.value
  }
}

export const childrenMiddleware: PatchMiddleware<PatchCtx> = (ctx, next) => {
  if (ctx.key !== EPatchType.children) return next()
  const child = ctx.nextVal.children
  if (isTextNode(child)) {
    ctx.node.textContent = child as string
  }
}
export const defaultMiddleware: PatchMiddleware<PatchCtx> = (ctx) => {
  const { key, nextVal, node } = ctx
  if (patchableKeys.includes(key as any) || key.startsWith(EPatchType.event)) return
  if (nextVal[key]) (node as any)[key] = nextVal[key]
}

export const updateNodeMiddleWare = createMiddleWare<PatchCtx>()
  .use(eventMiddleware)
  .use(classMiddleware)
  // .use(refMiddleware)
  .use(htmlMiddleware)
  .use(valueMiddleware)
  .use(childrenMiddleware)
  .use(defaultMiddleware)
/**
 * diff className
 * @param el
 * @param prev
 * @param next
 */
function patchClass(el: HTMLElement, prev: string, next: string) {
  const prevArr = prev?.trim().split(/\s+/).filter(Boolean) ?? []
  const nextArr = next?.trim().split(/\s+/).filter(Boolean) ?? []
  for (const cls of prevArr) {
    if (!nextArr.includes(cls) && el.classList) {
      el.classList.remove(cls)
    }
  }

  for (const cls of nextArr) {
    if (!prevArr.includes(cls)) {
      el.classList.add(cls)
    }
  }
}
export function patchRef(ref: Function | { current: any }, dom: HTMLElement | null) {
  console.log(ref)
  if (!ref) return
  if (typeof ref === "function") {
    ref(dom)
  } else {
    ref.current = dom
  }
}
