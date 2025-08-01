import { createRoot, createElement } from "@/lib/react-dom"
import "./style"
import App from "./App"

createRoot(document.getElementById("root") as HTMLElement).render(<App />)
