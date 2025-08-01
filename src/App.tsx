import { createElement } from "./lib/react-dom"
import { TinyReact, useState, useReducer, useEffect, useLayoutEffect, useRef, useCallback, useSyncExternalStore } from "./lib/react"
import { MyInput } from "./MyInput"

const usePubSub = () => {
  let eventList = useRef(() => new Map<string, (...args: any) => any>())
  const publish = useCallback((event: string, ...args: any[]) => {
    console.log("publish", args, eventList)

    if (eventList.current.has(event)) {
      eventList.current.get(event)!.call(null, ...args)
    }
  }, [])
  const subscribe = useCallback((event: string, fn: (...args: any[]) => any) => {
    console.log("subscribe")

    eventList.current.set(event, fn)
    return () => {
      console.log("unsubscribe")
      console.log(eventList)

      eventList.current.delete(event)
    }
  }, [])
  return { publish, subscribe }
}

export default function App({ id }: { id: string }) {
  //   const [count, setCount] = useState(0)
  const { publish, subscribe } = usePubSub()
  const data = useRef(1)
  const getSnapShot = () => {
    return data.current
  }

  const state = useSyncExternalStore((sub) => subscribe("tttt", sub), getSnapShot)
  const onClick = () => {
    data.current++
    publish("tttt", data.current)
  }
  //   useEffect(() => {
  //     console.log(count, "useEffect")
  //     return () => {
  //       console.log("cleanup")
  //     }
  //   }, [count])
  //   useLayoutEffect(() => {
  //     console.log(count, "useLayoutEffect")
  //     publish("tttt", count)
  //     // return () => {
  //     //   console.log("cleanup useLayoutEffect")
  //     // }
  //   }, [count])
  //   const [count2, setCount2] = useReducer((x) => x + 1, 1)

  //   const buttonRef = useRef<Record<"focus", () => void> | null>(null)
  //   useEffect(() => {
  //     console.log(buttonRef, "useEffect")
  //   }, [buttonRef.current])
  return (
    <div>
      <button onClick={onClick} className=" bg-blue-400">
        count
      </button>
      {/* <button onClick={() => setCount2(count2 + 1)}>count2: {count2}</button> */}
      {/* <MyInput ref={buttonRef} className="bg-red-400" /> */}
      <button>{state}</button>
    </div>
  )
}

// export default class App extends TinyReact.Component<{ id: string }> {
//   render() {
//     return (
//       <ul className="test" id={this.props.id}>
//         "1"
//         <li>
//           <div>123</div>
//           456
//         </li>
//         "2"
//       </ul>
//     )
//   }
// }
