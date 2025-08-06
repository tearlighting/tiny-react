import { MyButton } from "#/component/MyButton"
import { MyCode } from "#/component/MyCode"
import { useSetCodeStyle } from "#/hooks/useSetCodeStyle"
import { getUseSyncExternalStoreData } from "#/utils/useSyncExternalStore"
import { useCallback, useRef, useSyncExternalStore } from "@/lib/react"
import { createElement } from "@/lib/react-dom"

const usePubSub = () => {
  let eventList = useRef(() => new Map<string, (...args: any) => any>())
  const publish = useCallback((event: string, ...args: any[]) => {
    if (eventList.current.has(event)) {
      eventList.current.get(event)!.call(null, ...args)
    }
  }, [])
  const subscribe = useCallback((event: string, fn: (...args: any[]) => any) => {
    console.log("subscribe")
    eventList.current.set(event, fn)
    return () => {
      console.log("unsubscribe")
      eventList.current.delete(event)
    }
  }, [])
  return { publish, subscribe }
}

const useAddCount = () => {
  const countRef = useRef(0)
  const { publish, subscribe } = usePubSub()
  const addCount = useCallback(() => {
    countRef.current++
    console.log(countRef.current)

    publish("addCount", countRef.current)
  }, [])
  const getSnapshot = () => countRef.current
  return { addCount, subscribe, getSnapshot }
}

const { example, useSyncExternalStoreStr } = getUseSyncExternalStoreData()
export function UseSyncExternalStore() {
  const { addCount, subscribe, getSnapshot } = useAddCount()
  const count = useSyncExternalStore((onStoreChange) => subscribe("addCount", onStoreChange), getSnapshot)
  useSetCodeStyle()
  return (
    <div className="h-full w-full overflow-y-auto">
      <p className="text-xl font-bold pl-5 py-5">example: count by publish </p>
      <p className="pl-8 pb-3">code</p>
      <MyCode>{example}</MyCode>
      <div className="text-center ">
        <label className="mr-3 sm:inline hidden">click me:</label>
        <MyButton onClick={addCount}>count:{count}</MyButton>
      </div>

      <p className="text-xl font-bold pl-5 py-5">Overview</p>
      <MyCode>{useSyncExternalStoreStr}</MyCode>
    </div>
  )
}
