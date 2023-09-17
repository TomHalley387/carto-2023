import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";

import Equal from "equal-vue";
import Config from "equal-vue/dist/theme/full"; // or light / dark theme

//createApp.use(Equal, Config);

const app = createApp(App);
app.use(Equal, Config);
app.use(router);

app.mount("#app");
