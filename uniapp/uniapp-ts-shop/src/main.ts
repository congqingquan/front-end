import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./stores";
import UniRequestExt from "./api/UniRequestExt";
export function createApp() {
  const app = createSSRApp(App);

  // 1. pinia
  app.use(store)

  // 2. uni-request-ext
  UniRequestExt.registerDefaultRequestInterceptor()
  UniRequestExt.registerDefaultResponseInterceptor()

  return {
    app,
  };
}
