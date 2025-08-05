import router from "../route"

export function listenRouteChange() {
  window.addEventListener("message", (event) => {
    if (event.data?.type === "click-from-react") {
      const name = event.data?.dataId
      router.push({ name })
    }
  })
}
