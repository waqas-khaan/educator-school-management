<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 primary white--text">
        <v-icon left>mdi-view-dashboard</v-icon>
        Dashboard
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-card class="pa-3" color="primary" dark>
              <v-card-title class="text-h6">Welcome!</v-card-title>
              <v-card-text class="text-h4">{{ userRole }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="9">
            <v-card class="pa-3" color="success" dark>
              <v-card-title class="text-h6">Quick Actions</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      block
                      color="white"
                      text
                      @click="$router.push('/students')"
                      class="mb-2"
                    >
                      <v-icon left>mdi-account-group</v-icon>
                      View Students
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      block
                      color="white"
                      text
                      @click="$router.push('/fees')"
                      class="mb-2"
                    >
                      <v-icon left>mdi-cash-multiple</v-icon>
                      Manage Fees
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      block
                      color="white"
                      text
                      @click="$router.push('/revenue')"
                      class="mb-2"
                    >
                      <v-icon left>mdi-chart-line</v-icon>
                      Revenue
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn
                      block
                      color="white"
                      text
                      @click="$router.push('/admission')"
                      class="mb-2"
                    >
                      <v-icon left>mdi-account-plus</v-icon>
                      New Admission
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <!-- Comprehensive Quick Actions Grid -->
        <v-row>
          <v-col cols="12">
            <v-card class="quick-actions-card" elevation="0">
              <v-card-title class="text-h6 d-flex align-center">
                <v-icon left class="mr-2">mdi-lightning-bolt</v-icon>
                Quick Actions
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <!-- Student Management -->
                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/admission')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar primary-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-account-plus</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6">New Admission</v-card-title>
                      <v-card-text class="text-body-2">
                        Register new students with complete information
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/students')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar info-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-account-group</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6">All Students</v-card-title>
                      <v-card-text class="text-body-2">
                        View, edit, and manage all student records
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/admission-records')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar info-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-clipboard-list</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >All Admission Records</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        View all admission form records
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Financial Management -->
                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/fees')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar success-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-cash-multiple</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >Fee Management</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        Collect fees and manage payment records
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/revenue')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar warning-gradient"
                      >
                        <v-icon size="32" color="white">mdi-chart-line</v-icon>
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >Revenue Tracking</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        Monitor income, expenses, and financial reports
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Admin Only Features -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-if="userRole === 'admin'"
                  >
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/salaries')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar secondary-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-currency-usd</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >Salary Management</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        Manage staff salaries and payroll records
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Quick Access Features -->
                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/students')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar info-gradient"
                      >
                        <v-icon size="32" color="white"
                          >mdi-account-search</v-icon
                        >
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >Search Students</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        Find and view student information quickly
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/fees')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar success-gradient"
                      >
                        <v-icon size="32" color="white">mdi-cash-check</v-icon>
                      </v-avatar>
                      <v-card-title class="text-h6">Collect Fees</v-card-title>
                      <v-card-text class="text-body-2">
                        Process fee payments and generate receipts
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="3">
                    <v-card
                      class="text-center pa-4 action-card glass-card"
                      @click="$router.push('/revenue')"
                      hover
                      elevation="0"
                    >
                      <v-avatar
                        size="64"
                        class="mb-3 glass-avatar warning-gradient"
                      >
                        <v-icon size="32" color="white">mdi-chart-pie</v-icon>
                      </v-avatar>
                      <v-card-title class="text-h6"
                        >Financial Reports</v-card-title
                      >
                      <v-card-text class="text-body-2">
                        Generate comprehensive financial analytics
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>System Status</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Backend Connected</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-check-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Database Online</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    userRole() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? user.role.toUpperCase() : "USER";
    },
  },
};
</script>

<style scoped>
.action-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Glass Morphism Design for Quick Actions */
.quick-actions-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glass-card:hover::before {
  opacity: 1;
}

.glass-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2) !important;
}

/* Glass Avatars with Gradients */
.glass-avatar {
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-avatar:hover {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.6);
}

.primary-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.info-gradient {
  background: linear-gradient(135deg, #0288d1 0%, #29b6f6 100%);
}

.success-gradient {
  background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
}

.warning-gradient {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%);
}

.secondary-gradient {
  background: linear-gradient(135deg, #7b1fa2 0%, #ab47bc 100%);
}

/* Card Content Styling */
.glass-card .v-card-title {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.glass-card .v-card-text {
  color: #5a6c7d;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 960px) {
  .glass-card {
    margin-bottom: 16px;
  }

  .glass-card:hover {
    transform: translateY(-4px);
  }
}

@media (max-width: 600px) {
  .glass-card {
    margin-bottom: 12px;
  }

  .glass-card .v-card-title {
    font-size: 1rem;
  }

  .glass-card .v-card-text {
    font-size: 0.8rem;
  }
}
</style>
