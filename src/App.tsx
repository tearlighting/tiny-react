import { createElement } from "./lib/react-dom"
import { TinyReact, useState } from "./lib/react"

export default function App({ id }: { id: string }) {
  const [count, setCount] = useState(0)
  return (
    <ul className="test" id={id}>
      "1"
      <li>
        <div>{id}</div>
        456
      </li>
      <li>{count}</li>
      <li>
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
      </li>
    </ul>
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
