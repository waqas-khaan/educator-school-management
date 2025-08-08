import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { getAuthData } from "@/utils/cookies";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

// Configure axios defaults
const apiUrl =
  process.env.VUE_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "http://localhost:8081");

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add request interceptor to include auth token from cookies
axios.interceptors.request.use(
  (config) => {
    const authData = getAuthData();
    if (authData && authData.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add axios to Vue prototype for global access
Vue.prototype.$axios = axios;

// Add toast notification functionality
Vue.prototype.$toast = {
  success: (message) => {
    console.log("Success:", message);
    // You can implement a proper toast library here
  },
  error: (message) => {
    console.error("Error:", message);
    // You can implement a proper toast library here
  },
  warning: (message) => {
    console.warn("Warning:", message);
    // You can implement a proper toast library here
  },
  info: (message) => {
    console.info("Info:", message);
    // You can implement a proper toast library here
  },
};

// Add confirmation dialog functionality
Vue.prototype.$confirm = (message, title = "Confirm") => {
  return new Promise((resolve) => {
    // For now, use browser confirm, but we'll implement proper Vue dialogs
    const confirmed = window.confirm(`${title}\n\n${message}`);
    resolve(confirmed);
  });
};

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
