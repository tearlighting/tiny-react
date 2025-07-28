import { createRoot, createElement } from "./lib/react-dom"
import App from "./App"
import { scheduleCallbackWithPriority } from "./lib/scheduler"
import { EPriorityLevel } from "./lib/shared/constants"

createRoot(document.getElementById("root")!).render(
  // <ul className="test" id="u">
  //   "1"
  //   <li>
  //     <div>123</div>
  //     456
  //   </li>
  //   "2"
  // </ul>
  <App id="123" />
  // `123`
)
// setTimeout(() => {
scheduleCallbackWithPriority(() => {
  const start = performance.now()
  while (performance.now() - start < 100) {
    // 忙等 3 秒
  }
  console.log("我优先级最高")
  return undefined
}, EPriorityLevel.Immediate)
// }, 0)
