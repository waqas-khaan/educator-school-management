<template>
  <div id="app">
    <v-app>
      <!-- Navigation component for all pages except login -->
      <MainNavigation v-if="showNavigation" />

      <!-- Main content -->
      <v-main>
        <router-view />
      </v-main>
    </v-app>

    <!-- Server Offline Component - Shows on all routes when server is down -->
    <ServerOffline />

    <!-- Route Loading Overlay -->
    <v-overlay
      v-model="isRouteLoading"
      class="route-loading-overlay"
      persistent
      opacity="0.8"
    >
      <v-card class="loading-card" elevation="0" rounded="xl">
        <div class="loading-content">
          <!-- School Logo with Rotating Ring -->
          <div class="loading-logo-container">
            <div class="loading-logo-circle">
              <div class="rotating-ring"></div>
              <v-img
                src="@/assets/the-educators-seeklogo.png"
                alt="The Educator School Logo"
                width="60"
                height="60"
                contain
                class="loading-logo"
              ></v-img>
            </div>
          </div>

          <!-- Loading Animation -->
          <div class="loading-animation-container">
            <div class="loading-circles">
              <div class="loading-circle circle-1"></div>
              <div class="loading-circle circle-2"></div>
              <div class="loading-circle circle-3"></div>
            </div>
          </div>

          <!-- Loading Text -->
          <div class="loading-text-container">
            <h3 class="loading-title">Loading...</h3>
            <p class="loading-subtitle">
              Please wait while we prepare your page
            </p>
          </div>
        </div>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import MainNavigation from "./components/Navigation.vue";
import ServerOffline from "./components/ServerOffline.vue";

export default {
  name: "App",
  components: {
    MainNavigation,
    ServerOffline,
  },
  data() {
    return {
      isRouteLoading: false,
    };
  },
  computed: {
    isAuthenticated() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user && user.token && this.$route.path !== "/login";
    },
    showNavigation() {
      return this.$route.path !== "/login";
    },
  },
  mounted() {
    // Listen for router events
    this.$router.beforeEach((to, from, next) => {
      // Show loading when route changes (except for login and initial load)
      if (to.path !== from.path && to.path !== "/login" && from.path !== "/") {
        this.isRouteLoading = true;
      }
      next();
    });

    this.$router.afterEach((to, from) => {
      // Hide loading after route change is complete
      if (to.path !== from.path && to.path !== "/login") {
        setTimeout(() => {
          this.isRouteLoading = false;
        }, 1000);
      }
    });
  },
  methods: {
    // Method to manually test loading (for debugging)
    testLoading() {
      this.isRouteLoading = true;
      setTimeout(() => {
        this.isRouteLoading = false;
      }, 3000);
    },
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Global styles */
.v-application {
  font-family: "Roboto", sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Route Loading Overlay Styles */
.route-loading-overlay {
  z-index: 9999;
}

.loading-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 40px;
  min-width: 300px;
  text-align: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-logo-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
  position: relative;
}

.rotating-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 116px;
  height: 116px;
  border: 3px solid transparent;
  border-top: 3px solid #1976d2;
  border-right: 3px solid #42a5f5;
  border-radius: 50%;
  animation: rotate 1.5s linear infinite;
}

.loading-logo {
  opacity: 0.9;
  transition: all 0.3s ease;
}

.loading-animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.loading-circles {
  display: flex;
  gap: 12px;
  align-items: center;
}

.loading-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  animation: bounce 1.4s ease-in-out infinite both;
}

.circle-1 {
  animation-delay: -0.32s;
}

.circle-2 {
  animation-delay: -0.16s;
}

.circle-3 {
  animation-delay: 0s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.loading-text-container {
  text-align: center;
}

.loading-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
}

.loading-subtitle {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
