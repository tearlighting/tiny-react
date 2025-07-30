import { createElement } from "./lib/react-dom"
import { TinyReact, useState, useReducer, useEffect } from "./lib/react"

export default function App({ id }: { id: string }) {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    console.log(count, "useEffect")
    return () => {
      console.log("cleanup")
    }
  }, [count])
  const [count2, setCount2] = useReducer((x) => x + 1, 1)
  return (
    <div>
      <button onClick={onClick}>count: {count}</button>
      <button onClick={() => setCount2(count2 + 1)}>count2: {count2}</button>
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
