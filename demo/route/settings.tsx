import { DefaultLayout } from "#/layout/DefaultLayout"
import { createElement } from "@/lib/react-dom"
import {
  Flow,
  Scheduler,
  Reconciler,
  BeginWork,
  Diff,
  CompleteWork,
  CommitWork,
  Hooks,
  UseReducer,
  UseState,
  UseEffect,
  UseLayoutEffect,
  UseCallback,
  UseRef,
  UseMemo,
  ForwardRefAndUseImpretiveHandle,
  UseSyncExternalStore,
  Context,
  Reflection,
} from "#/pages"
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
        <Scheduler />
      </DefaultLayout>
    ),
  },
  {
    path: "/reconciler",
    name: "reconciler",
    element: (
      <DefaultLayout>
        <Reconciler />
      </DefaultLayout>
    ),
  },
  {
    path: "/beginWork",
    name: "beginWork",
    element: (
      <DefaultLayout>
        <BeginWork />
      </DefaultLayout>
    ),
  },
  {
    path: "/diff",
    name: "diff",
    element: (
      <DefaultLayout>
        <Diff />
      </DefaultLayout>
    ),
  },
  {
    path: "/completeWork",
    name: "completeWork",
    element: (
      <DefaultLayout>
        <CompleteWork />
      </DefaultLayout>
    ),
  },
  {
    path: "/commitWork",
    name: "commitWork",
    element: (
      <DefaultLayout>
        <CommitWork />
      </DefaultLayout>
    ),
  },
  {
    path: "/hooks",
    name: "hooks",
    element: (
      <DefaultLayout>
        <Hooks />
      </DefaultLayout>
    ),
  },
  {
    path: "/useReducer",
    name: "useReducer",
    element: (
      <DefaultLayout>
        <UseReducer />
      </DefaultLayout>
    ),
  },
  {
    path: "/useState",
    name: "useState",
    element: (
      <DefaultLayout>
        <UseState />
      </DefaultLayout>
    ),
  },
  {
    path: "/useEffect",
    name: "useEffect",
    element: (
      <DefaultLayout>
        <UseEffect />
      </DefaultLayout>
    ),
  },
  {
    path: "/useLayoutEffect",
    name: "useLayoutEffect",
    element: (
      <DefaultLayout>
        <UseLayoutEffect />
      </DefaultLayout>
    ),
  },
  {
    path: "/useCallback",
    name: "useCallback",
    element: (
      <DefaultLayout>
        <UseCallback />
      </DefaultLayout>
    ),
  },
  {
    path: "/useMemo",
    name: "useMemo",
    element: (
      <DefaultLayout>
        <UseMemo />
      </DefaultLayout>
    ),
  },
  {
    path: "/useRef",
    name: "useRef",
    element: (
      <DefaultLayout>
        <UseRef />
      </DefaultLayout>
    ),
  },
  {
    path: "/useImpretiveHandle",
    name: "useImpretiveHandle",
    element: (
      <DefaultLayout>
        <ForwardRefAndUseImpretiveHandle />
      </DefaultLayout>
    ),
  },
  {
    path: "/useSyncExternalStore",
    name: "useSyncExternalStore",
    element: (
      <DefaultLayout>
        <UseSyncExternalStore />
      </DefaultLayout>
    ),
  },
  {
    path: "/context",
    name: "context",
    element: (
      <DefaultLayout>
        <Context />
      </DefaultLayout>
    ),
  },
  {
    path: "/reflection",
    name: "reflection",
    element: (
      <DefaultLayout>
        <Reflection />
      </DefaultLayout>
    ),
  },
]
