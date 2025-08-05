import { DefaultLayout } from "#/layout/DefaultLayout"
import { Flow, Scheduler } from "#/pages"
import { createElement } from "@/lib/react-dom"

export interface IPageItem {
  path: string
  name: string
  element: JSX.Element
  children?: Array<IPageItem>
}
export const pages: Array<IPageItem> = [
  {
    path: "/flow",
    name: "flow",
    element: (
      <DefaultLayout>
        <Flow />
      </DefaultLayout>
    ),
  },
  {
    path: "/",
    name: "flow",
    element: (
      <DefaultLayout>
        <Flow />
      </DefaultLayout>
    ),
  },
  {
    path: "/scheduler",
    name: "scheduler",
    element: (
      <DefaultLayout>
        <Scheduler></Scheduler>
      </DefaultLayout>
    ),
  },
]
