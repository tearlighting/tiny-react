import { createElement } from "./lib/react-dom"
import { TinyReact } from "./lib/react"
export default function App({ id }: { id: string }) {
  return (
    <ul className="test" id={id}>
      "1"
      <li>
        <div>{id}</div>
        456
      </li>
      "2"
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
