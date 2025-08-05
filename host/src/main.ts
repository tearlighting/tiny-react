import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./route"
import { listenRouteChange } from "./plugins/listenRouteChange"

createApp(App).use(router).mount("#app")

listenRouteChange()
