import { createElement } from "@/lib/react-dom"
import { Router, pages } from "./route"
import { RouterProvider } from "#/context/RouterContext"
import { Menu } from "#/component/Menu"
export default function App() {
  //   return <BrowserRouter>{Routes}</BrowserRouter>
  return (
    // <RouterProvider>
    //   <Router routes={pages} />
    // </RouterProvider>
    <Menu />
  )
}
