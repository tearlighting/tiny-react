import { createRoot, createElement } from "./lib/react-dom"

createRoot(document.getElementById("root")!).render(
  // <ul>
  //   <li>1</li>
  //   <li>2</li>
  //   <li>3</li>
  //   {false ? <li>4</li> : null}
  // </ul>
  `123`
)
