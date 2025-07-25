import { createRoot, createElement } from "./lib/react-dom"

createRoot(document.getElementById("root")!).render(
  <ul className="test" id="u">
    "1"
    <li>
      <div>123</div>
      456
    </li>
    "2"
  </ul>
  // `123`
)
