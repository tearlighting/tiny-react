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
  return (
    <div>
      <div>
        <p>example</p>
        <pre>
          <code>{example}</code>
        </pre>
      </div>

      <button onClick={() => addCount()} className="hover:cursor-pointer shadow-2xl py-1 px-2 bg-blue-400 rounded-xs text-white">
        count:{count}
      </button>
      <div>
        <pre>
          <code>{useSyncExternalStoreStr}</code>
        </pre>
      </div>
    </div>
  )
}
