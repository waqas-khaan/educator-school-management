<template>
  <div class="test-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6">
            <v-card-title class="text-h4 mb-4">
              🧪 LAN Authentication Test
            </v-card-title>

            <v-card-text>
              <v-alert
                :type="testResult.type"
                :text="testResult.message"
                class="mb-4"
              ></v-alert>

              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-web</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Current Hostname</v-list-item-title>
                    <v-list-item-subtitle>{{ hostname }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-shield-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Authentication Status</v-list-item-title>
                    <v-list-item-subtitle>{{
                      authStatus
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-cookie</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Cookies</v-list-item-title>
                    <v-list-item-subtitle>{{ cookies }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider class="my-4"></v-divider>

              <v-btn color="primary" @click="testNavigation" class="mr-4">
                Test Navigation to /students
              </v-btn>

              <v-btn color="secondary" @click="goToStudents">
                Go to Students Page
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuthData } from "@/utils/cookies";

export default {
  name: "TestPage",
  data() {
    return {
      hostname: window.location.hostname,
      authStatus: "Checking...",
      cookies: "Loading...",
      testResult: {
        type: "info",
        message: "Ready to test LAN authentication",
      },
    };
  },
  mounted() {
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      const authData = getAuthData();
      this.authStatus = authData
        ? `Authenticated as ${authData.user?.role || "unknown"}`
        : "Not authenticated";

      this.cookies = document.cookie || "No cookies found";

      if (this.hostname === "localhost") {
        this.testResult = {
          type: "success",
          message: "✅ LAN IP detected - Authentication bypass should work!",
        };
      } else {
        this.testResult = {
          type: "warning",
          message: "⚠️ Not on LAN IP - Normal authentication required",
        };
      }
    },

    testNavigation() {
      this.$router.push("/students").catch((err) => {
        console.error("Navigation error:", err);
        this.testResult = {
          type: "error",
          message: `❌ Navigation failed: ${err.message}`,
        };
      });
    },

    goToStudents() {
      this.$router.push("/students");
    },
  },
};
</script>

<style scoped>
.test-page {
  padding: 20px;
}
</style>
