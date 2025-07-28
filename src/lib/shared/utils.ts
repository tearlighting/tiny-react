import type { Fiber } from "../reconciler"
import { EFiberTags, type EFiberFlags } from "./constants"
import { updateNodeMiddleWare } from "./uploadNodeMiddleWares"

export const isStr = (value: any): value is string => typeof value === "string"
export const isUndefined = (value: any): value is undefined => value === undefined

export const isFunction = (value: any): value is Function => typeof value === "function"

export const isNumber = (value: any): value is number => typeof value === "number"

export const isFiberTag = (value: any): value is EFiberFlags => typeof value === "number"

export function shallowEqual<T>(preVal: T, nextVal: T): boolean {
  if (!preVal || !nextVal) return false

  if (Object.is(preVal, nextVal)) return true

  const keysA = Object.keys(preVal)
  const keysB = Object.keys(nextVal)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i]
    if (!Object.prototype.hasOwnProperty.call(nextVal, key)) return false
    if (!Object.is((preVal as any)[key], (nextVal as any)[key])) return false
  }
  return true
}

export function updateNode(node: HTMLElement, preVal: NonNullable<Fiber["props"]>, nextVal: NonNullable<Fiber["props"]>) {
  //反正不会触发reflow，你随便玩
  //先清理

  //太乱了，这不是我追求的东西
  //   Object.keys(preVal!).forEach((key) => {
  //     const propKey = key as keyof NonNullable<Fiber["props"]>
  //     if (!(propKey in nextVal)) return
  //     //我终于明白为啥要叫className了，原来是因为htmlelement上面就是className
  //     if (propKey === "className") return
  //     if (propKey === "children") {
  //       //如果是文本节点就清空
  //       if (isStr(preVal[propKey])) {
  //         node.textContent = ""
  //       }
  //     } else if (propKey.startsWith("on")) {
  //       //事件
  //       node.removeEventListener(normalizeEventKey(propKey), preVal[propKey])
  //     } else if (propKey === "ref") {
  //       patchRef(preVal[propKey], null)
  //     }
  //     if (propKey === "dangerouslySetInnerHTML") {
  //       node.innerHTML = ""
  //     } else if (propKey === "value") {
  //       if (propKey in nextVal) return
  //       if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
  //         node.value = ""
  //       }
  //     } else {
  //       ;(node as any)[propKey] = ""
  //     }
  //   })
  //   //再设置
  //   Object.keys(nextVal!).forEach((key) => {
  //     const propKey = key as keyof NonNullable<Fiber["props"]>
  //     if (propKey === "children") {
  //       if (isStr(nextVal[propKey])) {
  //         node.textContent = nextVal[propKey]
  //       }
  //     } else if (propKey.startsWith("on")) {
  //       node.addEventListener(normalizeEventKey(propKey), nextVal[propKey])
  //     } else {
  //       if (propKey === "className") {
  //         patchClass(node, preVal[propKey] || "", nextVal[propKey] || "")
  //       } else if (propKey === "ref") {
  //         patchRef(nextVal[propKey], node)
  //       }
  //       if (propKey === "dangerouslySetInnerHTML") {
  //         const rawHtml = nextVal[propKey] as { __html?: string } | null
  //         if (rawHtml?.__html != null) {
  //           node.innerHTML = rawHtml.__html
  //         }
  //       } else if (propKey === "value") {
  //         // 针对 input/textarea 等表单类控件处理
  //         if ("value" in node && (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) {
  //           if (document.activeElement !== node) {
  //             // 避免打断用户输入
  //             ;(node as HTMLInputElement | HTMLTextAreaElement).value = nextVal[propKey] as string
  //           }
  //         } else {
  //           ;(node as any)[propKey] = nextVal[propKey]
  //         }
  //       } else {
  //         ;(node as any)[propKey] = nextVal[propKey]
  //       }
  //     }
  //   })
  //想法一，上strategy
  //但是发现一个问题，这东西顺序是可能是有意义的，而且，你这样会在default里面处理很多，还是有很多if
  //   const clearStrategy = {
  //     //class不清，留着更新前diff
  //     className: () => {},
  //     children: (value: any, node: HTMLElement) => patchChildren(value, node, true),
  //     ref: (value: any) => patchRef(value, null),
  //     value:()=>{},
  //   default(){
  // if(event){}
  //   }

  //   }
  //想法二，直接上middleWare
  if (shallowEqual(preVal, nextVal)) return
  const keys = new Set([...Object.keys(preVal), ...Object.keys(nextVal)])

  for (let key of keys) {
    updateNodeMiddleWare.run({
      key,
      preVal,
      nextVal,
      node,
    })
  }
}

/**
 * 找有真实dom的父节点，这些知道return的意义了吧，要不然，你还要sibling去绕一圈
 * @param fiber
 * @returns
 */
export function getHostParentFiber(fiber: Fiber): Fiber | null {
  let parent = fiber.return
  while (parent) {
    if (parent.tag === EFiberTags.HostComponent || parent.tag === EFiberTags.HostRoot) {
      return parent
    }
    parent = parent.return
  }
  return null
}

export const debonce = <TPorps extends string[]>(fn: (...args: TPorps) => void, delay = 10) => {
  let timer: number | null = null
  return function (...args: TPorps) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
