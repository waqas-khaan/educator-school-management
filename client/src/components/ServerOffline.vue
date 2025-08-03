<template>
  <div class="server-offline-overlay" v-if="isServerOffline">
    <div class="server-offline-container">
      <!-- School Logo -->
      <div class="school-logo-container">
        <div class="logo-circle">
          <v-img
            src="@/assets/the-educators-seeklogo.png"
            alt="The Educator School Logo"
            width="80"
            height="80"
            contain
            class="school-logo"
          ></v-img>
        </div>
      </div>

      <!-- Server Offline Icon -->
      <div class="server-offline-icon">
        <v-icon size="60" color="white">mdi-server-off</v-icon>
      </div>

      <!-- Main Heading -->
      <h1 class="server-offline-title">Backend Server Offline</h1>

      <!-- Description -->
      <p class="server-offline-description">
        The backend server is not running. Please start the server to continue.
      </p>

      <!-- Action Buttons -->
      <div class="server-offline-actions">
        <v-btn
          color="white"
          variant="outlined"
          size="large"
          class="retry-btn"
          @click="retryConnection"
          :loading="retrying"
          :disabled="retrying"
          tabindex="0"
          aria-label="Retry server connection"
        >
          <v-icon left>mdi-refresh</v-icon>
          RETRY CONNECTION
        </v-btn>

        <v-btn
          color="white"
          variant="outlined"
          size="large"
          class="help-btn"
          @click="showHelp"
          tabindex="0"
          aria-label="Show server startup instructions"
        >
          <v-icon left>mdi-help-circle</v-icon>
          HOW TO START SERVER
        </v-btn>
      </div>

      <!-- Help Dialog -->
      <v-dialog v-model="showHelpDialog" max-width="600" persistent>
        <v-card class="professional-help-dialog" elevation="8" rounded="lg">
          <!-- Header -->
          <v-card-title class="dialog-header">
            <div class="header-content">
              <v-icon size="32" color="primary" class="header-icon"
                >mdi-server</v-icon
              >
              <div class="header-text">
                <h2 class="header-title">Server Startup Guide</h2>
                <p class="header-subtitle">
                  Backend server configuration instructions
                </p>
              </div>
            </div>
            <v-btn
              icon
              variant="text"
              @click="showHelpDialog = false"
              class="close-btn"
              tabindex="0"
              aria-label="Close dialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <!-- Content -->
          <v-card-text class="dialog-content">
            <!-- Step 1 -->
            <div class="instruction-step">
              <div class="step-header">
                <v-chip color="primary" size="small" class="step-chip"
                  >1</v-chip
                >
                <h3 class="step-title">Open Terminal</h3>
              </div>
              <p class="step-description">
                Open your terminal/command prompt and navigate to the backend
                directory.
              </p>
              <v-sheet class="code-block" rounded="md">
                <div class="code-header">
                  <v-icon size="16" color="grey-darken-1">mdi-console</v-icon>
                  <span class="code-label">Terminal Command</span>
                </div>
                <code class="code-text">cd "path/to/your/project/backend"</code>
              </v-sheet>
            </div>

            <!-- Step 2 -->
            <div class="instruction-step">
              <div class="step-header">
                <v-chip color="success" size="small" class="step-chip"
                  >2</v-chip
                >
                <h3 class="step-title">Start the Server</h3>
              </div>
              <p class="step-description">
                Start the backend server using nodemon for development.
              </p>
              <v-sheet class="code-block" rounded="md">
                <div class="code-header">
                  <v-icon size="16" color="grey-darken-1"
                    >mdi-play-circle</v-icon
                  >
                  <span class="code-label">Server Command</span>
                </div>
                <code class="code-text">nodemon index.js</code>
              </v-sheet>
            </div>

            <!-- Step 3 -->
            <div class="instruction-step">
              <div class="step-header">
                <v-chip color="info" size="small" class="step-chip">3</v-chip>
                <h3 class="step-title">Verify Connection</h3>
              </div>
              <p class="step-description">
                The server should start on port 8081. You should see:
              </p>
              <v-sheet class="code-block success-block" rounded="md">
                <div class="code-header">
                  <v-icon size="16" color="success">mdi-check-circle</v-icon>
                  <span class="code-label">Expected Output</span>
                </div>
                <code class="code-text"
                  >Server is running on port 8081 ✅ MySQL Connected
                  Successfully!</code
                >
              </v-sheet>
            </div>

            <!-- Troubleshooting -->
            <v-divider class="my-6"></v-divider>

            <div class="troubleshooting-section">
              <div class="section-header">
                <v-icon color="warning" size="20">mdi-alert-circle</v-icon>
                <h3 class="section-title">Troubleshooting</h3>
              </div>
              <v-list class="troubleshooting-list" density="compact">
                <v-list-item
                  v-for="(item, index) in troubleshootingItems"
                  :key="index"
                  class="troubleshooting-item"
                >
                  <template v-slot:prepend>
                    <v-icon color="grey-darken-1" size="small"
                      >mdi-circle-small</v-icon
                    >
                  </template>
                  <v-list-item-title class="troubleshooting-text">{{
                    item
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>

          <!-- Actions -->
          <v-card-actions class="dialog-actions">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="elevated"
              @click="showHelpDialog = false"
              class="confirm-btn"
            >
              <v-icon left>mdi-check</v-icon>
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerOffline",
  data() {
    return {
      isServerOffline: false,
      retrying: false,
      showHelpDialog: false,
      checkInterval: null,
      troubleshootingItems: [
        "Make sure MySQL is running",
        "Check your database credentials in .env file",
        "Ensure port 8081 is not in use",
        "Make sure nodemon is installed globally",
      ],
    };
  },
  mounted() {
    this.checkServerStatus();
    // Check server status every 10 seconds
    this.checkInterval = setInterval(this.checkServerStatus, 10000);
  },
  beforeUnmount() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  },
  methods: {
    async checkServerStatus() {
      try {
        const response = await fetch("http://localhost:8081/api/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Short timeout to detect offline quickly
          signal: AbortSignal.timeout(3000),
        });

        if (response.ok) {
          this.isServerOffline = false;
        } else {
          this.isServerOffline = true;
        }
      } catch (error) {
        // Server is offline or unreachable
        this.isServerOffline = true;
      }
    },

    async retryConnection() {
      this.retrying = true;
      await this.checkServerStatus();

      // Add a small delay to show the retry animation
      setTimeout(() => {
        this.retrying = false;
      }, 1000);
    },

    showHelp() {
      this.showHelpDialog = true;
    },
  },
};
</script>

<style scoped>
.server-offline-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.server-offline-container {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.server-offline-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.school-logo-container {
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.logo-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  padding: 15px;
  box-sizing: border-box;
  animation: heartbeat 2s ease-in-out infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
}

.logo-circle:hover {
  background: white;
  animation-play-state: paused;
  transform: scale(1.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.school-logo {
  opacity: 0.9;
  transition: all 0.3s ease;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.school-logo:hover {
  opacity: 1;
}

.server-offline-icon {
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.server-offline-title {
  color: white;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.server-offline-description {
  color: rgba(255, 255, 255, 0.9);
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  margin: 0 0 32px 0;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.server-offline-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.retry-btn,
.help-btn {
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.retry-btn:hover,
.help-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.retry-btn:focus,
.help-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
}

.retry-btn:focus-visible,
.help-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.retry-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Professional Help Dialog Styles */
.professional-help-dialog {
  background: #ffffff;
  border: 1px solid #e0e0e0;
}

.dialog-header {
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  background: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
}

.header-text {
  color: #333333;
}

.header-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 2px 0;
  color: #212121;
}

.header-subtitle {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  margin: 0;
  color: #666666;
}

.close-btn {
  color: #666666;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333333;
}

.close-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
  background: rgba(25, 118, 210, 0.1);
}

.close-btn:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.dialog-content {
  padding: 24px;
  background: #ffffff;
}

.instruction-step {
  margin-bottom: 24px;
}

.instruction-step:last-child {
  margin-bottom: 0;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.step-chip {
  font-weight: 500;
}

.step-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #212121;
}

.step-description {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  color: #666666;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0;
  overflow: hidden;
}

.success-block {
  background: #f0f8f0;
  border: 1px solid #d4edda;
}

.code-header {
  background: #e9ecef;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #dee2e6;
}

.success-block .code-header {
  background: #d4edda;
  border-bottom: 1px solid #c3e6cb;
}

.code-label {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-text {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  color: #212529;
  margin: 0;
  padding: 12px;
  display: block;
  background: transparent;
}

.troubleshooting-section {
  margin-top: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  color: #856404;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.troubleshooting-list {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 8px 0;
}

.troubleshooting-item {
  padding: 4px 16px;
  min-height: 32px;
}

.troubleshooting-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  color: #856404;
  line-height: 1.4;
}

.dialog-actions {
  padding: 16px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.confirm-btn {
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
}

.confirm-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.confirm-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.confirm-btn:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap");
</style>
