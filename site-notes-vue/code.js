import { createApp } from "vue";
import App from "./index.vue";

import { Store } from "./store.js";

window.Store = Store();

createApp(App).mount("#App");