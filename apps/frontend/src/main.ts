import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import { createLogto } from "@logto/vue";
import App from "./App.vue";
import { APP_CONFIG } from "./config.ts";
import router from "./router";

const app = createApp(App);

app.use(createLogto, APP_CONFIG.logtoConfig);

app.use(createPinia());
app.use(router);

app.mount("#app");
