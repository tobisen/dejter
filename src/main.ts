import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";
import App from "./App.vue";
import "./style.css";
import { focusTrap } from "./services/focusTrap";
registerSW({ immediate: true });
createApp(App).directive("focus-trap", focusTrap).mount("#app");
