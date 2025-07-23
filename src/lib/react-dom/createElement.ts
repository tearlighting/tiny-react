export function createElement(type: string | Function, config: Record<string, any> | null, ...children: any[]): VNode {
  const props: Record<string, any> = {}
  let key: string | null = null
  let ref: any = null

  if (config != null) {
    for (const propName in config) {
      const value = config[propName]
      if (propName === "key") {
        key = value != null ? String(value) : null
      } else if (propName === "ref") {
        ref = value
      } else {
        props[propName] = value
      }
    }
  }

  if (children.length === 1) {
    props.children = children[0]
  } else if (children.length > 1) {
    props.children = children
  }

  return {
    type,
    key,
    ref,
    props,
  }
}
