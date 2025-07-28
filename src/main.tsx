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

scheduleCallbackWithPriority(() => {
  setTimeout(() => {
    const start = performance.now()
    console.log("我优先级最高")
    while (performance.now() - start < 1000) {
      // 忙等 3 秒
    }
  }, 100)
  return undefined
}, EPriorityLevel.Immediate)
