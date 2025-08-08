<template>
  <div class="admin-dashboard">
    <v-container fluid class="pa-0 pa-sm-4 h-100">
      <v-row>
        <v-col cols="12" class="h-100">
          <v-card class="dashboard-card h-100">
            <v-card-title class="dashboard-header pa-6">
              <v-row align="center" justify="space-between" no-gutters>
                <v-col cols="12" sm="8" md="6">
                  <div class="d-flex align-center">
                    <v-avatar size="64" color="primary" class="mr-4">
                      <v-icon size="32" color="white"
                        >mdi-view-dashboard</v-icon
                      >
                    </v-avatar>
                    <div>
                      <h1
                        class="text-h4 font-weight-bold text-primary mb-1 elegant-title"
                      >
                        Admin Dashboard
                      </h1>
                      <p
                        class="text-subtitle-1 text-white mb-0 elegant-subtitle"
                      >
                        Welcome back, Fakhr-e-Alam!
                      </p>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="4" md="6" class="text-right">
                  <div class="d-flex align-center justify-end">
                    <v-chip
                      color="info"
                      variant="tonal"
                      size="large"
                      class="mr-3 header-chip-border"
                    >
                      <v-icon left size="18" class="mr-2"
                        >mdi-calendar-today</v-icon
                      >
                      {{
                        new Date().toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    </v-chip>
                    <v-chip
                      color="info"
                      variant="tonal"
                      size="large"
                      class="mr-3 header-chip-border"
                    >
                      <v-icon left size="18" class="mr-2"
                        >mdi-clock-outline</v-icon
                      >
                      {{
                        new Date().toLocaleTimeString("en-US", {
                          hour12: false,
                        })
                      }}
                    </v-chip>
                    <v-btn
                      color="white"
                      variant="elevated"
                      prepend-icon="mdi-refresh"
                      size="large"
                      class="refresh-btn-header"
                      elevation="4"
                      rounded
                      @click="refreshData"
                    >
                      <v-icon left class="mr-2">mdi-refresh</v-icon>
                      Refresh
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text class="dashboard-content">
              <!-- Enhanced Statistics Dashboard -->
              <v-row class="mb-8">
                <!-- Total Admission -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container blue">
                        <v-icon size="32" color="white"
                          >mdi-account-plus</v-icon
                        >
                      </div>
                      <div class="stat-card__number">{{ totalAdmissions }}</div>
                      <div class="stat-card__label">TOTAL ADMISSIONS</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">This Year</span>
                        <span class="sub-value">{{
                          currentYearAdmissions
                        }}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Students -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container green">
                        <v-icon size="32" color="white"
                          >mdi-account-group</v-icon
                        >
                      </div>
                      <div class="stat-card__number">{{ totalStudents }}</div>
                      <div class="stat-card__label">TOTAL STUDENTS</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">Active</span>
                        <span class="sub-value">{{ activeStudents }}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Fee per Month (Target) -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container orange">
                        <v-icon size="32" color="white"
                          >mdi-cash-multiple</v-icon
                        >
                      </div>
                      <div class="stat-card__number">
                        ₨{{ totalFeePerMonth.toLocaleString() }}
                      </div>
                      <div class="stat-card__label">MONTHLY FEE TARGET</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">Per Student</span>
                        <span class="sub-value"
                          >₨{{ averageFeePerStudent.toLocaleString() }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Salaries (Target) -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container red">
                        <v-icon size="32" color="white"
                          >mdi-currency-usd</v-icon
                        >
                      </div>
                      <div class="stat-card__number">
                        ₨{{ totalSalaries.toLocaleString() }}
                      </div>
                      <div class="stat-card__label">TOTAL SALARIES</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">Monthly</span>
                        <span class="sub-value"
                          >₨{{ monthlySalaries.toLocaleString() }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Staff -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container purple">
                        <v-icon size="32" color="white">mdi-account-tie</v-icon>
                      </div>
                      <div class="stat-card__number">
                        {{ totalTeachers }}
                      </div>
                      <div class="stat-card__label">TOTAL STAFF</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">Active</span>
                        <span class="sub-value">{{ activeTeachers }}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Inflow -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container indigo">
                        <v-icon size="32" color="white">mdi-trending-up</v-icon>
                      </div>
                      <div class="stat-card__number">
                        ₨{{ (totalInflow || 0).toLocaleString() }}
                      </div>
                      <div class="stat-card__label">TOTAL INFLOW</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">This Month</span>
                        <span class="sub-value"
                          >₨{{ thisMonthInflow.toLocaleString() }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Expenses -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container deep-orange">
                        <v-icon size="32" color="white"
                          >mdi-trending-down</v-icon
                        >
                      </div>
                      <div class="stat-card__number">
                        ₨{{ (totalExpenses || 0).toLocaleString() }}
                      </div>
                      <div class="stat-card__label">TOTAL EXPENSES</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">This Month</span>
                        <span class="sub-value"
                          >₨{{ thisMonthExpenses.toLocaleString() }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Total Cash in Hand -->
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="enterprise-stat-card"
                    elevation="0"
                    rounded="xl"
                  >
                    <v-card-text class="pa-8 text-center">
                      <div class="stat-card__icon-container lime">
                        <v-icon size="32" color="white">mdi-cash</v-icon>
                      </div>
                      <div class="stat-card__number">
                        ₨{{ (totalCashInHand || 0).toLocaleString() }}
                      </div>
                      <div class="stat-card__label">CASH IN HAND</div>
                      <div class="stat-card__sub-metric">
                        <span class="sub-label">Available</span>
                        <span class="sub-value"
                          >₨{{ availableCash.toLocaleString() }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Enhanced Quick Actions -->
              <v-row class="mb-4">
                <v-col cols="12">
                  <div class="stats-header mb-4 quick-actions-header">
                    <h2 class="text-h4 font-weight-bold primary--text mb-3">
                      Quick Actions
                    </h2>
                    <p class="text-subtitle-1 text-medium-emphasis">
                      Access key administrative functions and management tools
                    </p>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="mb-4">
                  <v-card
                    class="glass-action-card animated-action-card"
                    @click="$router.push('/classes')"
                    hover
                    elevation="0"
                    rounded="xl"
                  >
                    <div class="glass-overlay"></div>
                    <v-card-text class="pa-6 text-center position-relative">
                      <v-avatar size="64" class="mb-4 glass-icon-avatar">
                        <v-icon size="32" color="primary"
                          >mdi-account-group</v-icon
                        >
                      </v-avatar>
                      <h3
                        class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                        style="font-size: 1.1rem"
                      >
                        Students
                      </h3>
                      <p
                        class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                      >
                        View, edit, and manage all student records
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="mb-4">
                  <v-card
                    class="glass-action-card animated-action-card"
                    @click="$router.push('/fees')"
                    hover
                    elevation="0"
                    rounded="xl"
                  >
                    <div class="glass-overlay"></div>
                    <v-card-text class="pa-6 text-center position-relative">
                      <v-avatar size="64" class="mb-4 glass-icon-avatar">
                        <v-icon size="32" color="primary"
                          >mdi-cash-multiple</v-icon
                        >
                      </v-avatar>
                      <h3
                        class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                        style="font-size: 1.1rem"
                      >
                        Fee Management
                      </h3>
                      <p
                        class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                      >
                        Collect fees and manage payment records
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="mb-4">
                  <v-card
                    class="glass-action-card animated-action-card"
                    @click="$router.push('/revenue')"
                    hover
                    elevation="0"
                    rounded="xl"
                  >
                    <div class="glass-overlay"></div>
                    <v-card-text class="pa-6 text-center position-relative">
                      <v-avatar size="64" class="mb-4 glass-icon-avatar">
                        <v-icon size="32" color="primary"
                          >mdi-chart-line</v-icon
                        >
                      </v-avatar>
                      <h3
                        class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                        style="font-size: 1.1rem"
                      >
                        Revenue Tracking
                      </h3>
                      <p
                        class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                      >
                        Monitor income, expenses, and financial reports
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="mb-4">
                  <v-card
                    class="glass-action-card animated-action-card"
                    @click="$router.push('/salaries')"
                    hover
                    elevation="0"
                    rounded="xl"
                  >
                    <div class="glass-overlay"></div>
                    <v-card-text class="pa-6 text-center position-relative">
                      <v-avatar size="64" class="mb-4 glass-icon-avatar">
                        <v-icon size="32" color="primary"
                          >mdi-currency-usd</v-icon
                        >
                      </v-avatar>
                      <h3
                        class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                        style="font-size: 1.1rem"
                      >
                        Salary Management
                      </h3>
                      <p
                        class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                      >
                        Manage staff salaries and payroll records
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Automatic Fee Slip Generation Status -->
              <v-row class="mb-4"> </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";

export default {
  name: "AdminDashboard",
  data() {
    return {
      totalStudents: 0,
      activeStudents: 0,
      totalClasses: 0,
      totalRevenue: 0,
      pendingFees: 0,
      thisMonthCollection: 0,
      userName: "",
      // Enhanced statistics
      totalAdmissions: 0,
      currentYearAdmissions: 0,
      totalTeachers: 0,
      activeTeachers: 0,
      totalFeePerMonth: 0,
      averageFeePerStudent: 0,
      totalSalaries: 0,
      monthlySalaries: 0,
      totalInflow: 0,
      thisMonthInflow: 0,
      totalExpenses: 0,
      thisMonthExpenses: 0,
      totalCashInHand: 0,
      availableCash: 0,
      thisMonthRevenue: 0,
      // Student and teacher data arrays
      students: [],
      teachers: [],
      fees: [],
      revenues: [],
      expenses: [],
    };
  },
  async mounted() {
    await this.loadDashboardData();
    const authData = getAuthData();
    this.userName = authData?.user?.name || "Administrator";
  },
  methods: {
    async loadDashboardData() {
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Load students data
        const studentsResponse = await axios.get("/api/students", {
          headers: headers,
        });

        this.students = studentsResponse.data;
        this.totalStudents = studentsResponse.data.length;
        this.activeStudents = studentsResponse.data.filter(
          (s) => s.status === "Active"
        ).length;
        this.totalAdmissions = studentsResponse.data.length; // All students are admissions

        // Calculate current year admissions
        const currentYear = new Date().getFullYear();
        this.currentYearAdmissions = studentsResponse.data.filter(
          (s) => new Date(s.admission_date).getFullYear() === currentYear
        ).length;

        // Load teachers data
        const teachersResponse = await axios.get("/api/teachers", {
          headers: headers,
        });

        this.teachers = teachersResponse.data;
        this.totalTeachers = teachersResponse.data.length;
        this.activeTeachers = teachersResponse.data.filter(
          (t) => t.status === "Active"
        ).length;

        // Calculate total fee per month (target) including transport fee
        const activeStudentRecords = studentsResponse.data.filter(
          (s) => s.status === "Active"
        );
        const monthlyFeeSum = activeStudentRecords.reduce(
          (sum, s) => sum + (parseFloat(s.monthly_fee) || 0),
          0
        );
        const transportFeeSum = activeStudentRecords.reduce(
          (sum, s) => sum + (parseFloat(s.transport_fee) || 0),
          0
        );
        this.totalFeePerMonth = monthlyFeeSum + transportFeeSum;
        this.averageFeePerStudent =
          activeStudentRecords.length > 0
            ? Math.round(
                (this.totalFeePerMonth / activeStudentRecords.length) * 100
              ) / 100
            : 0;

        // Calculate total salaries (target)
        this.totalSalaries = this.activeTeachers * 25000; // Assuming 25000 per teacher
        this.monthlySalaries = this.totalSalaries;

        // Load classes data
        const classesResponse = await axios.get("/api/students/classes", {
          headers: headers,
        });

        this.totalClasses = classesResponse.data.length;

        // Load fees data
        const feesResponse = await axios.get("/api/fees", {
          headers: headers,
        });

        this.fees = feesResponse.data;
        this.totalRevenue = feesResponse.data.reduce(
          (sum, fee) => sum + (parseFloat(fee.amount) || 0),
          0
        );

        // Calculate this month revenue
        const currentMonth = new Date().getMonth() + 1;
        const currentYearForFees = new Date().getFullYear();
        this.thisMonthRevenue = feesResponse.data
          .filter(
            (fee) =>
              fee.month === currentMonth && fee.year === currentYearForFees
          )
          .reduce((sum, fee) => sum + Number(fee.amount), 0);

        // Load pending fees
        const pendingResponse = await axios.get("/api/fees/pending", {
          headers: headers,
        });

        this.pendingFees = pendingResponse.data.reduce(
          (sum, student) => sum + student.arrears_amount,
          0
        );

        // Calculate this month collection
        this.thisMonthCollection = feesResponse.data
          .filter(
            (fee) =>
              fee.month === currentMonth && fee.year === currentYearForFees
          )
          .reduce((sum, fee) => sum + Number(fee.amount), 0);

        // Load revenue data for inflow
        const revenueResponse = await axios.get("/api/revenue", {
          headers: headers,
        });

        this.revenues = revenueResponse.data;
        this.totalInflow = revenueResponse.data.reduce(
          (sum, revenue) => sum + (parseFloat(revenue.amount) || 0),
          0
        );

        // Calculate this month inflow
        this.thisMonthInflow = revenueResponse.data
          .filter(
            (revenue) =>
              revenue.month === currentMonth &&
              revenue.year === currentYearForFees
          )
          .reduce((sum, revenue) => sum + Number(revenue.amount), 0);

        // Load expenses data
        const expensesResponse = await axios.get("/api/expenses", {
          headers: headers,
        });

        this.expenses = expensesResponse.data;
        this.totalExpenses = expensesResponse.data.reduce(
          (sum, expense) => sum + (parseFloat(expense.amount) || 0),
          0
        );

        // Calculate this month expenses
        this.thisMonthExpenses = expensesResponse.data
          .filter(
            (expense) =>
              expense.month === currentMonth &&
              expense.year === currentYearForFees
          )
          .reduce((sum, expense) => sum + Number(expense.amount), 0);

        // Calculate total cash in hand (inflow - expenses)
        this.totalCashInHand = Math.max(
          0,
          this.totalInflow - this.totalExpenses
        );
        this.availableCash = this.totalCashInHand;

        // Load salaries data
        const salariesResponse = await axios.get("/api/salaries", {
          headers: headers,
        });

        // Update total salaries from actual data
        this.totalSalaries = salariesResponse.data.reduce(
          (sum, salary) => sum + salary.salary_amount,
          0
        );
        this.monthlySalaries = this.totalSalaries;
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    },
    async refreshData() {
      const refreshBtn = document.querySelector(".refresh-btn");
      if (refreshBtn) {
        refreshBtn.classList.add("loading");
      }

      try {
        await this.fetchDashboardData();
        // Show success notification
        this.$vuetify.theme.global.currentTheme = "light";
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        if (refreshBtn) {
          refreshBtn.classList.remove("loading");
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap");

.admin-dashboard {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 50%, #0d47a1 100%);
  height: 100vh;
  width: 100%;
  padding: 0;
  font-family: "Inter", sans-serif;
  overflow-y: auto;
  position: relative;
}

.dashboard-card {
  border-radius: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  position: relative;
  overflow: hidden;
  max-width: 100%;
}

.dashboard-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="education" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23education)"/></svg>');
  opacity: 0.3;
}

.dashboard-content {
  padding: 16px;
  max-width: 100%;
  overflow-x: hidden;
  flex: 1;
  overflow-y: auto;
}

.welcome-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.welcome-icon {
  font-size: 28px;
  margin-right: 18px;
  color: #3b82f6;
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
}

.welcome-text strong {
  font-weight: 700;
  color: #1e40af;
  font-size: 1.1rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
}

.section-icon {
  font-size: 28px;
  margin-right: 15px;
  color: #3b82f6;
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
}

.section-title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.01em;
}

/* Animated Gradient Backgrounds - Professional Blue Theme with Layer Animation */
.animated-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: layerShift 8s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.animated-gradient-secondary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: layerShift 8s ease-in-out infinite;
  animation-delay: 2s;
  position: relative;
  overflow: hidden;
}

.animated-gradient-accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: layerShift 8s ease-in-out infinite;
  animation-delay: 4s;
  position: relative;
  overflow: hidden;
}

.animated-gradient-warm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: layerShift 8s ease-in-out infinite;
  animation-delay: 1s;
  position: relative;
  overflow: hidden;
}

@keyframes layerShift {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

/* Transparent Animated Icons */
.transparent-avatar {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transparent-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.animated-icon {
  animation: iconFloat 3s ease-in-out infinite;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-icon:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3));
}

@keyframes iconFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Enhanced Card Interactions */
.enterprise-stat-card {
  background: linear-gradient(
    145deg,
    #ffffff 0%,
    #f8f9fa 50%,
    #ffffff 100%
  ) !important;
  border: 2px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 60px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  animation: bounceIn 0.3s ease-out;
  transition: all 0.15s ease-out !important;
}

.enterprise-stat-card::before {
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

/* Text Color Utilities */
.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

.bg-white-20 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* Professional Typography */
.text-h3 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.text-h6 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.text-caption {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* Enhanced Stat Elements */
.stat-avatar {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.enhanced-stat-card:hover .stat-avatar {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.stat-chip {
  transition: all 0.3s ease;
  font-weight: 600;
}

.enhanced-stat-card:hover .stat-chip {
  transform: scale(1.05);
}

.stat-value {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.enhanced-stat-card:hover .stat-value {
  transform: scale(1.02);
}

.stat-title {
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
}

.enhanced-stat-card:hover .stat-title {
  transform: translateY(-1px);
}

.stat-subtitle {
  opacity: 0.8;
  font-weight: 500;
  transition: all 0.3s ease;
}

.enhanced-stat-card:hover .stat-subtitle {
  opacity: 1;
}

/* Enterprise Statistics Cards */
.enterprise-stat-card {
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 180px;
  height: 100%;
}

.enterprise-stat-card::before {
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

/* Enhanced Stat Card Elements */
.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 6px 3px 6px;
  position: relative;
  z-index: 2;
}

.stat-card__icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-card__icon-wrapper.primary-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card__icon-wrapper.blue-gradient {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
}

.stat-card__icon-wrapper.pink-gradient {
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
}

.stat-card__icon-wrapper.orange-gradient {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
}

.stat-card__icon-wrapper.green-gradient {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.stat-card__icon-wrapper.red-gradient {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
}

.stat-card__icon-wrapper.purple-gradient {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
}

.stat-card__icon-wrapper.teal-gradient {
  background: linear-gradient(135deg, #009688 0%, #00695c 100%);
}

.stat-card__icon-wrapper.indigo-gradient {
  background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
}

.stat-card__icon-wrapper.deep-orange-gradient {
  background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
}

.stat-card__icon-wrapper.lime-gradient {
  background: linear-gradient(135deg, #cddc39 0%, #afb42b 100%);
}

/* Classes Page Style Statistics */
.stat-card__icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stat-card__icon-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.stat-card__icon-container.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.stat-card__icon-container.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-card__icon-container.purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}

.stat-card__icon-container.orange {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.stat-card__icon-container.red {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.stat-card__icon-container.teal {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
}

.stat-card__icon-container.indigo {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.stat-card__icon-container.deep-orange {
  background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
}

.stat-card__icon-container.lime {
  background: linear-gradient(135deg, #cddc39 0%, #afb42b 100%);
}

.enterprise-stat-card:hover .stat-card__icon-container {
  transform: scale(1.15) translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-out !important;
}

/* Animation for admin stats icons */
.stat-card__icon-container {
  animation: bounceIn 0.4s ease-out;
}

.stat-card__icon-container .v-icon {
  animation: pulse 1.5s infinite;
}

/* Animation for stat card numbers */
.stat-card__number {
  animation: fadeInUp 0.5s ease-out;
}

/* Animation for stat card labels */
.stat-card__label {
  animation: slideInLeft 0.6s ease-out;
}

/* Animation for stat card sub-metrics */
.stat-card__sub-metric {
  animation: zoomIn 0.7s ease-out;
}

/* Fast Animation for Quick Actions header */
.quick-actions-header {
  animation: fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Fast Animation for action cards */
.animated-action-card {
  animation: slideInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animated-action-card:nth-child(1) {
  animation-delay: 0.1s;
}

.animated-action-card:nth-child(2) {
  animation-delay: 0.15s;
}

.animated-action-card:nth-child(3) {
  animation-delay: 0.2s;
}

.animated-action-card:nth-child(4) {
  animation-delay: 0.25s;
}

/* Fast hover animations for action cards */
.animated-action-card:hover {
  transform: translateY(-8px) scale(1.02);
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Fast icon animations */
.glass-icon-avatar {
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animated-action-card:hover .glass-icon-avatar {
  animation: iconFloat 1s ease-in-out infinite;
}

/* Fast text animations */
.glass-text {
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animated-action-card:hover .glass-text {
  transform: translateY(-1px);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(30px);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(-5px);
  }
  70% {
    transform: scale(0.9) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  25% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  75% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.stat-card__number {
  font-family: "Poppins", "Inter", sans-serif;
  font-weight: 900;
  font-size: clamp(1.6rem, 6vw, 2.8rem);
  color: #1e293b;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.15s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:hover .stat-card__number {
  transform: scale(1.08);
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.1s ease-out !important;
}

.stat-card__label {
  font-family: "Poppins", "Inter", sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition: all 0.15s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.enterprise-stat-card:hover .stat-card__label {
  color: #475569;
  transform: translateY(-3px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-out !important;
}

.stat-card__sub-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", "Inter", sans-serif;
  font-size: 0.8rem;
  color: #94a3b8;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.enterprise-stat-card:hover .stat-card__sub-metric {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.1s ease-out !important;
}

.sub-label {
  font-weight: 600;
  color: #64748b;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.sub-value {
  font-weight: 800;
  color: #1e293b;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
}

.kpi-header-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.stat-card__content {
  padding: 0 6px 6px 6px;
  position: relative;
  z-index: 2;
}

.stat-card__main-value {
  margin-bottom: 4px;
}

.stat-number {
  display: block;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.enterprise-stat-card:nth-child(2) .stat-number {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(3) .stat-number {
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(4) .stat-number {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Financial Analytics Gradient Text Colors */
.enterprise-stat-card:nth-child(5) .stat-number {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(6) .stat-number {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(7) .stat-number {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(8) .stat-number {
  background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(9) .stat-number {
  background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(10) .stat-number {
  background: linear-gradient(135deg, #cddc39 0%, #afb42b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enterprise-stat-card:nth-child(8) .stat-number {
  background: linear-gradient(135deg, #009688 0%, #00695c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  display: block;
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 2px;
}

.stat-card__details {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stat-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.5rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.detail-value {
  font-size: 0.55rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

/* Responsive adjustments for enterprise stat cards */
@media (max-width: 960px) {
  .stat-card__header {
    padding: 12px 12px 6px 12px;
  }

  .stat-card__icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-card__content {
    padding: 0 12px 12px 12px;
  }
}

@media (max-width: 600px) {
  .stat-card__header {
    padding: 10px 10px 5px 10px;
  }

  .stat-card__icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .stat-number {
    font-size: 1.25rem;
  }

  .stat-card__content {
    padding: 0 10px 10px 10px;
  }

  .stat-card__details {
    gap: 4px;
  }
}

/* Stats Header Styling */
.stats-header {
  text-align: center;
  margin-bottom: 0.125rem;
  padding: 0.25rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-header:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.6);
  border-width: 3px;
}

.stats-header h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
  font-family: "Poppins", sans-serif !important;
  font-weight: 800 !important;
  font-size: 1.8rem !important;
  letter-spacing: -0.02em !important;
  line-height: 1.2 !important;
  text-transform: uppercase !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  position: relative !important;
}

.stats-header h2::before {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.stats-header p {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  color: rgba(0, 0, 0, 0.7) !important;
  letter-spacing: 0.01em !important;
  line-height: 1.3 !important;
  margin-top: 0.5rem !important;
}

/* Enhanced Section Header Animations */
.stats-header:hover h2 {
  transform: scale(1.02);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-header:hover h2::before {
  width: 80px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive Font Sizes */
@media (max-width: 1200px) {
  .stats-header h2 {
    font-size: 2.2rem !important;
  }

  .stats-header p {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .stats-header h2 {
    font-size: 2rem !important;
  }

  .stats-header p {
    font-size: 0.95rem !important;
  }
}

@media (max-width: 600px) {
  .stats-header h2 {
    font-size: 1.8rem !important;
  }

  .stats-header p {
    font-size: 0.9rem !important;
  }
}

/* Main Dashboard Container */
.main-dashboard-container {
  padding: 0.25rem;
  background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  border-radius: 16px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border: 4px solid rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  margin-bottom: 0.25rem;
}

.main-dashboard-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.98);
  border-color: rgba(0, 0, 0, 0.8);
  border-width: 5px;
}

/* Section Container Shadows */
.section-container {
  padding: 0.25rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15),
    0 3px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 3px solid rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  margin-bottom: 0.125rem;
}

.section-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.3), 0 12px 32px rgba(0, 0, 0, 0.2),
    0 6px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.8);
  border-width: 4px;
}

/* Enhanced Focus States */
.enterprise-stat-card:focus {
  outline: none !important;
  border-width: 3px !important;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-6px) !important;
}

.enterprise-stat-card:focus::before {
  opacity: 1;
}

/* Color-specific borders and focus effects for each card */
.enterprise-stat-card:nth-child(1) {
  border-color: rgba(0, 0, 0, 0.6) !important;
}

.enterprise-stat-card:nth-child(1):hover {
  border-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), 0 12px 32px rgba(0, 0, 0, 0.2),
    0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.enterprise-stat-card:nth-child(1):focus {
  border-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.4) !important;
}

.enterprise-stat-card:nth-child(2) {
  border-color: rgba(0, 0, 0, 0.6) !important;
}

.enterprise-stat-card:nth-child(2):hover {
  border-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), 0 12px 32px rgba(0, 0, 0, 0.2),
    0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.enterprise-stat-card:nth-child(2):focus {
  border-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.4) !important;
}

.enterprise-stat-card:nth-child(3) {
  border-color: rgba(0, 0, 0, 0.6) !important;
}

.enterprise-stat-card:nth-child(3):hover {
  border-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), 0 12px 32px rgba(0, 0, 0, 0.2),
    0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.enterprise-stat-card:nth-child(3):focus {
  border-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.4) !important;
}

.enterprise-stat-card:nth-child(4) {
  border-color: rgba(0, 0, 0, 0.6) !important;
}

.enterprise-stat-card:nth-child(4):hover {
  border-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), 0 12px 32px rgba(0, 0, 0, 0.2),
    0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.enterprise-stat-card:nth-child(4):focus {
  border-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.4) !important;
}

/* Fast hover effect for all enterprise stat cards */
.enterprise-stat-card:hover {
  transform: translateY(-6px) scale(1.02) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(0, 0, 0, 0.95) !important;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.enterprise-stat-card:hover::before {
  opacity: 1;
}

/* Professional Action Cards */
.action-card {
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  min-height: 180px;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Enterprise Hover Effects - Enhanced Modern Gradients */
.students-card:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a5acd 50%, #e085f0 100%);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.admission-card:hover {
  background: linear-gradient(135deg, #3e9bfe 0%, #00e6fe 50%, #3ad97b 100%);
  box-shadow: 0 15px 40px rgba(79, 172, 254, 0.5);
}

.inflow-card:hover {
  background: linear-gradient(135deg, #f0609a 0%, #fee030 50%, #ff8a8e 100%);
  box-shadow: 0 15px 40px rgba(250, 112, 154, 0.5);
}

.expenses-card:hover {
  background: linear-gradient(135deg, #ff8a8e 0%, #febfef 50%, #febfef 100%);
  box-shadow: 0 15px 40px rgba(255, 154, 158, 0.5);
}

.cash-card:hover {
  background: linear-gradient(135deg, #98ddea 0%, #fec6e3 50%, #ffe2d2 100%);
  box-shadow: 0 15px 40px rgba(168, 237, 234, 0.5);
}

.monthly-fee-card:hover {
  background: linear-gradient(135deg, #ffe2d2 0%, #fca68f 50%, #ff8a8e 100%);
  box-shadow: 0 15px 40px rgba(255, 236, 210, 0.5);
}

.pending-fee-card:hover {
  background: linear-gradient(135deg, #ff8a8e 0%, #fac0c4 50%, #ffc1ff 100%);
  box-shadow: 0 15px 40px rgba(255, 154, 158, 0.5);
}

.teachers-card:hover {
  background: linear-gradient(135deg, #98ddea 0%, #fec6e3 50%, #ffe2d2 100%);
  box-shadow: 0 15px 40px rgba(168, 237, 234, 0.5);
}

.salaries-card:hover {
  background: linear-gradient(135deg, #ffe2d2 0%, #fca68f 50%, #ff8a8e 100%);
  box-shadow: 0 15px 40px rgba(255, 236, 210, 0.5);
}

.total-fee-card:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a5acd 50%, #e085f0 100%);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.revenue-card:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a5acd 50%, #e085f0 100%);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.classes-card:hover {
  background: linear-gradient(135deg, #3e9bfe 0%, #00e6fe 50%, #3ad97b 100%);
  box-shadow: 0 15px 40px rgba(79, 172, 254, 0.5);
}

.monthly-card:hover {
  background: linear-gradient(135deg, #f0609a 0%, #fee030 50%, #ff8a8e 100%);
  box-shadow: 0 15px 40px rgba(250, 112, 154, 0.5);
}

/* Status Cards */
.status-card {
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.status-info {
  flex: 1;
}

.status-name {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.status-desc {
  font-size: 0.8rem;
  color: #6c757d;
  margin: 0;
}

.status-chip {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 16px;
}

.primary-chip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.success-chip {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
  color: white !important;
}

.info-chip {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
  color: white !important;
}

.warning-chip {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  color: white !important;
}

/* Responsive Design for 100% Browser View */
@media (max-width: 1200px) {
  .enterprise-stat-card {
    min-height: 180px;
  }

  .action-card {
    min-height: 160px;
  }

  .text-h3 {
    font-size: 1.75rem !important;
  }

  .text-h6 {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .enterprise-stat-card {
    min-height: 160px;
  }

  .action-card {
    min-height: 140px;
  }

  .text-h3 {
    font-size: 1.5rem !important;
  }

  .text-h6 {
    font-size: 0.875rem !important;
  }
}

@media (max-width: 600px) {
  .admin-dashboard {
    padding: 0;
  }

  .dashboard-title {
    font-size: 1.4rem;
    line-height: 1.2;
  }

  .dashboard-subtitle {
    font-size: 0.8rem;
  }

  .header-icon {
    font-size: 32px;
    margin-right: 10px;
  }

  .dashboard-header {
    padding: 16px 12px;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-text {
    margin-top: 10px;
  }

  .dashboard-content {
    padding: 12px 8px;
    flex: 1;
    overflow-y: auto;
  }

  .enterprise-stat-card {
    min-height: 140px;
    padding: 12px;
  }

  .action-card {
    min-height: 120px;
    padding: 12px;
  }

  .text-h3 {
    font-size: 1.25rem !important;
  }

  .text-h6 {
    font-size: 0.8rem !important;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .section-icon {
    font-size: 24px;
    margin-right: 10px;
  }
}

/* Ensure all content is visible in 100% browser view */
/* Reduced Container Size - Compact Statistics */
.admin-dashboard {
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  padding: 8px;
}

.dashboard-card {
  border-radius: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  padding: 12px 16px;
}

.dashboard-content {
  padding: 8px;
  max-width: 100%;
  overflow-x: hidden;
  flex: 1;
  overflow-y: auto;
}

/* Container optimization */
.v-container {
  max-width: 100% !important;
  padding: 0 !important;
}

.v-container.fluid {
  padding: 0 !important;
}

/* Row and column optimization */
.v-row {
  margin: 0 !important;
  max-width: 100%;
}

.v-col {
  padding: 4px !important;
  max-width: 100%;
}

/* Card optimization */
.v-card {
  max-width: 100%;
  overflow: hidden;
}

.v-card-text {
  max-width: 100%;
  word-wrap: break-word;
  padding: 12px !important;
}

/* Text optimization for long numbers */
.text-h3 {
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Responsive grid optimization */
@media (max-width: 1200px) {
  .v-col {
    padding: 6px !important;
  }

  .dashboard-content {
    padding: 12px;
  }
}

@media (max-width: 960px) {
  .v-col {
    padding: 4px !important;
  }

  .dashboard-content {
    padding: 8px;
  }
}

@media (max-width: 600px) {
  .v-col {
    padding: 2px !important;
  }

  .dashboard-content {
    padding: 4px;
  }
}

/* Optimize for different screen sizes */
@media (min-width: 1920px) {
  .dashboard-content {
    padding: 12px;
  }

  .enterprise-stat-card {
    min-height: 160px;
  }
}

@media (min-width: 2560px) {
  .dashboard-content {
    padding: 16px;
  }

  .enterprise-stat-card {
    min-height: 180px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .enterprise-stat-card:active {
    transform: scale(0.98);
  }

  .action-card:active {
    transform: scale(0.98);
  }

  .enterprise-stat-card,
  .action-card {
    min-height: 44px;
    cursor: pointer;
  }

  .v-avatar,
  .v-icon {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .v-avatar {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .v-icon {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
}

/* Responsive Design for Compact Layout */
@media (max-width: 1200px) {
  .enterprise-stat-card {
    min-height: 120px;
  }

  .text-h5 {
    font-size: 1.125rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 960px) {
  .enterprise-stat-card {
    min-height: 100px;
  }

  .text-h5 {
    font-size: 1rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.75rem !important;
  }

  .v-col {
    padding: 2px !important;
  }

  .dashboard-content {
    padding: 4px;
  }
}

@media (max-width: 600px) {
  .admin-dashboard {
    padding: 4px;
  }

  .dashboard-title {
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .dashboard-subtitle {
    font-size: 0.7rem;
  }

  .header-icon {
    font-size: 24px;
    margin-right: 6px;
  }

  .dashboard-header {
    padding: 8px;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-text {
    margin-top: 6px;
  }

  .dashboard-content {
    padding: 2px;
    flex: 1;
    overflow-y: auto;
  }

  .enterprise-stat-card {
    min-height: 70px;
    padding: 6px;
  }

  .text-h5 {
    font-size: 0.875rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.7rem !important;
  }

  .section-title {
    font-size: 0.9rem;
  }

  .section-icon {
    font-size: 18px;
    margin-right: 6px;
  }
}

/* Optimize for different screen sizes */
@media (min-width: 1920px) {
  .dashboard-content {
    padding: 12px;
  }

  .enterprise-stat-card {
    min-height: 160px;
  }
}

@media (min-width: 2560px) {
  .dashboard-content {
    padding: 16px;
  }

  .enterprise-stat-card {
    min-height: 180px;
  }
}

/* Enterprise Statistics Cards - Optimized for 100% Browser View */
.enterprise-stat-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 100px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.enterprise-stat-card::before {
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

/* Professional Typography - Optimized for Compact Layout */
.text-h5 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  font-size: 1.5rem !important;
}

.text-subtitle-2 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: 1rem !important;
}

.text-caption {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: 0.875rem !important;
}

/* Responsive Design for 100% Browser View */
@media (max-width: 1200px) {
  .enterprise-stat-card {
    min-height: 90px;
  }

  .text-h5 {
    font-size: 1.375rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 960px) {
  .enterprise-stat-card {
    min-height: 80px;
  }

  .text-h5 {
    font-size: 1.25rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.85rem !important;
  }

  .v-col {
    padding: 2px !important;
  }

  .dashboard-content {
    padding: 4px;
  }
}

@media (max-width: 600px) {
  .admin-dashboard {
    padding: 4px;
  }

  .dashboard-title {
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .dashboard-subtitle {
    font-size: 0.7rem;
  }

  .header-icon {
    font-size: 24px;
    margin-right: 6px;
  }

  .dashboard-header {
    padding: 8px;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-text {
    margin-top: 6px;
  }

  .dashboard-content {
    padding: 2px;
    flex: 1;
    overflow-y: auto;
  }

  .enterprise-stat-card {
    min-height: 70px;
    padding: 6px;
  }

  .text-h5 {
    font-size: 1.125rem !important;
  }

  .text-subtitle-2 {
    font-size: 0.8rem !important;
  }

  .section-title {
    font-size: 0.9rem;
  }

  .section-icon {
    font-size: 18px;
    margin-right: 6px;
  }
}

/* Optimize for different screen sizes */
@media (min-width: 1920px) {
  .dashboard-content {
    padding: 12px;
  }

  .enterprise-stat-card {
    min-height: 160px;
  }
}

@media (min-width: 2560px) {
  .dashboard-content {
    padding: 16px;
  }

  .enterprise-stat-card {
    min-height: 180px;
  }
}

/* Refresh Button Styling */
.refresh-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #1976d2 !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.refresh-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s;
}

.refresh-btn:hover::before {
  left: 100%;
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  border-color: rgba(25, 118, 210, 0.5);
}

.refresh-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
}

.refresh-btn .v-icon {
  transition: transform 0.3s ease;
}

.refresh-btn:hover .v-icon {
  transform: rotate(180deg);
}

/* Loading animation for refresh button */
.refresh-btn.loading .v-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Glass Morphism Quick Actions Section */
.glass-action-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(25px) !important;
  border: 3px solid rgba(0, 0, 0, 0.6) !important;
  position: relative;
  overflow: hidden;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-height: 200px;
  height: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.glass-action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 1;
}

.glass-action-card:hover::before {
  opacity: 1;
}

.glass-action-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(0, 0, 0, 0.5),
    0 10px 25px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(0, 0, 0, 0.95) !important;
  border-width: 4px !important;
  background: rgba(255, 255, 255, 0.5) !important;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(236, 72, 153, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 0;
}

.glass-action-card:hover .glass-overlay {
  opacity: 1;
  transition: opacity 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.glass-icon-avatar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(0, 0, 0, 0.6);
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  z-index: 2;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 3px 12px rgba(0, 0, 0, 0.2),
    0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-icon-avatar:hover {
  background: rgba(255, 255, 255, 0.5) !important;
  transform: scale(1.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(0, 0, 0, 0.95) !important;
  border-width: 4px !important;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.glass-text {
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.glass-avatar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 0, 0, 0.4);
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 3px 12px rgba(0, 0, 0, 0.2),
    0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.25),
    0 3px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6) !important;
}

/* Position relative utility */
.position-relative {
  position: relative;
}

/* Text color utilities for glass effect */
.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Enhanced hover effects for glass cards */
.glass-action-card .v-card-text {
  position: relative;
  z-index: 2;
}

.glass-action-card:hover .glass-icon-avatar {
  animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {
  0% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-1px) scale(1.01);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
  75% {
    transform: translateY(-1px) scale(1.01);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

/* Responsive design for glass cards */
@media (max-width: 1200px) {
  .glass-action-card {
    min-height: 180px;
  }
}

/* Welcome text styling */
.welcome-text {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Playfair Display", serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  font-size: 1.25rem !important;
  line-height: 1.4 !important;
}

/* Elegant title styling */
.elegant-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.elegant-subtitle {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: 0.3px !important;
  text-transform: uppercase !important;
  font-size: 0.9rem !important;
}

.elegant-section-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.8px !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Special styling for white text (welcome message) */
.elegant-section-title.text-white {
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Special styling for primary text (section headers) */
.elegant-section-title.text-primary {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Special styling for grey-darken-3 text (section headers) */
.elegant-section-title.text-grey-darken-3 {
  background: linear-gradient(135deg, #424242 0%, #616161 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.elegant-card-title {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 960px) {
  .glass-action-card {
    min-height: 160px;
  }
}

@media (max-width: 600px) {
  .glass-action-card {
    min-height: 140px;
  }

  .glass-icon-avatar {
    size: 48px !important;
  }

  .glass-icon-avatar .v-icon {
    font-size: 24px !important;
  }
}

/* Modern Welcome Card Design */
.modern-welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-welcome-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 80px rgba(102, 126, 234, 0.4);
}

.welcome-card-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.welcome-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.welcome-card-content {
  position: relative;
  z-index: 2;
  color: white;
}

.welcome-text-section {
  flex: 1;
  min-width: 300px;
}

.welcome-avatar {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.welcome-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.welcome-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 700 !important;
  font-size: 2rem !important;
  color: white !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
}

.welcome-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 400 !important;
  font-size: 1.1rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.01em;
  line-height: 1.4;
  margin: 0;
}

.welcome-stats {
  margin-top: 16px;
}

.welcome-chip {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.welcome-chip:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.welcome-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 200px;
}

.refresh-btn-modern {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #667eea !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  font-size: 0.875rem !important;
  padding: 12px 24px !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.refresh-btn-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s;
}

.refresh-btn-modern:hover::before {
  left: 100%;
}

.refresh-btn-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(102, 126, 234, 0.5) !important;
}

.refresh-btn-modern:active {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
}

.refresh-btn-modern .v-icon {
  transition: transform 0.3s ease;
}

.refresh-btn-modern:hover .v-icon {
  transform: rotate(180deg);
}

/* Loading animation for refresh button */
.refresh-btn-modern.loading .v-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design for Welcome Card */
@media (max-width: 1200px) {
  .welcome-title {
    font-size: 1.75rem !important;
  }

  .welcome-subtitle {
    font-size: 1rem !important;
  }

  .welcome-card-content {
    padding: 24px !important;
  }
}

@media (max-width: 960px) {
  .welcome-title {
    font-size: 1.5rem !important;
  }

  .welcome-subtitle {
    font-size: 0.9rem !important;
  }

  .welcome-card-content {
    padding: 20px !important;
  }

  .welcome-text-section {
    min-width: 250px;
  }

  .welcome-actions {
    min-width: 180px;
  }
}

@media (max-width: 600px) {
  .modern-welcome-card {
    margin-bottom: 16px !important;
  }

  .welcome-card-content {
    padding: 16px !important;
  }

  .welcome-title {
    font-size: 1.25rem !important;
  }

  .welcome-subtitle {
    font-size: 0.8rem !important;
  }

  .welcome-avatar {
    size: 48px !important;
  }

  .welcome-avatar .v-icon {
    font-size: 24px !important;
  }

  .welcome-text-section {
    min-width: 200px;
  }

  .welcome-actions {
    min-width: 150px;
  }

  .refresh-btn-modern {
    padding: 8px 16px !important;
    font-size: 0.75rem !important;
  }

  .welcome-stats {
    flex-direction: column;
    align-items: flex-start;
  }

  .welcome-chip {
    margin-bottom: 8px !important;
  }
}

.date-chip-modern {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 12px 24px !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.date-chip-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.date-chip-modern:hover::before {
  left: 100%;
}

.date-chip-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.date-icon {
  margin-right: 8px !important;
  font-size: 1.1rem !important;
  transition: all 0.3s ease !important;
}

.date-chip-modern:hover .date-icon {
  transform: scale(1.1) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
}

.date-text {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}

.date-chip-modern:hover .date-text {
  transform: scale(1.02) !important;
}

.status-chip-modern {
  background: linear-gradient(
    135deg,
    #11998e 0%,
    #38ef7d 50%,
    #4ade80 100%
  ) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 12px 24px !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 8px 24px rgba(17, 153, 142, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.status-chip-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.status-chip-modern:hover::before {
  left: 100%;
}

.status-chip-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(17, 153, 142, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.status-icon {
  margin-right: 8px !important;
  font-size: 1.1rem !important;
  transition: all 0.3s ease !important;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.status-chip-modern:hover .status-icon {
  transform: scale(1.2) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
  animation: none;
}

.status-text {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}

.status-chip-modern:hover .status-text {
  transform: scale(1.02) !important;
}

/* Enhanced welcome stats container */
.welcome-stats {
  margin-top: 20px;
  gap: 12px;
}

/* Responsive design for chips */
@media (max-width: 1200px) {
  .date-chip-modern,
  .status-chip-modern {
    padding: 10px 20px !important;
    font-size: 0.85rem !important;
  }

  .date-icon,
  .status-icon {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .date-chip-modern,
  .status-chip-modern {
    padding: 8px 16px !important;
    font-size: 0.8rem !important;
  }

  .date-icon,
  .status-icon {
    font-size: 0.9rem !important;
    margin-right: 6px !important;
  }

  .welcome-stats {
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .welcome-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .date-chip-modern,
  .status-chip-modern {
    padding: 6px 12px !important;
    font-size: 0.75rem !important;
    border-radius: 16px !important;
  }

  .date-icon,
  .status-icon {
    font-size: 0.8rem !important;
    margin-right: 4px !important;
  }

  .date-text,
  .status-text {
    font-size: 0.75rem !important;
  }
}

/* Header Refresh Button Styling */
.refresh-btn-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  color: #1e3a8a !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

.refresh-btn-header:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4) !important;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%) !important;
}

.refresh-btn-header .v-icon {
  transition: transform 0.3s ease;
}

.refresh-btn-header:hover .v-icon {
  transform: rotate(180deg);
}

/* Header Chip Border Styling */
.header-chip-border {
  border: 2px solid rgba(0, 0, 0, 0.5) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
}

/* Professional Statistics Dashboard Styling */
.professional-avatar {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

.professional-title {
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.professional-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 400 !important;
  color: #64748b !important;
  letter-spacing: 0.01em !important;
}

.professional-chip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

/* Professional Stat Cards */
.professional-stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 3px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  overflow: hidden;
  position: relative;
  min-height: 220px;
}

.professional-stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.02) 0%,
    rgba(118, 75, 162, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.professional-stat-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
}

.professional-stat-card:hover::before {
  opacity: 1;
}

/* Gradient Backgrounds for Professional Cards */
.primary-gradient {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
}

.secondary-gradient {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
}

.accent-gradient {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
}

.warm-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
}

/* Professional Card Content Styling */
.professional-icon-avatar {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.professional-icon-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05) rotate(5deg) !important;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3) !important;
}

.professional-icon {
  transition: all 0.15s ease !important;
}

.professional-icon-avatar:hover .professional-icon {
  transform: scale(1.1) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
}

.professional-status-icon {
  opacity: 0.8;
  transition: all 0.15s ease;
}

.professional-stat-card:hover .professional-status-icon {
  opacity: 1;
  transform: scale(1.1);
}

.professional-card-title {
  font-family: "Inter", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: white !important;
  margin-bottom: 4px !important;
  letter-spacing: -0.01em !important;
  line-height: 1.2 !important;
}

.professional-card-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  color: rgba(255, 255, 255, 0.8) !important;
  letter-spacing: 0.01em !important;
  line-height: 1.3 !important;
}

.professional-stat-number {
  font-family: "Poppins", sans-serif !important;
  font-weight: 800 !important;
  font-size: 2.5rem !important;
  color: white !important;
  margin-bottom: 8px !important;
  letter-spacing: -0.02em !important;
  line-height: 1 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.professional-divider {
  background: rgba(255, 255, 255, 0.3) !important;
  height: 1px !important;
}

.professional-stat-label {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  letter-spacing: 0.01em !important;
}

.professional-mini-chip {
  font-weight: 600 !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

/* Responsive Professional Cards */
@media (max-width: 1200px) {
  .professional-stat-number {
    font-size: 2.2rem !important;
  }

  .professional-card-title {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .professional-stat-number {
    font-size: 2rem !important;
  }

  .professional-card-title {
    font-size: 0.95rem !important;
  }

  .professional-card-subtitle {
    font-size: 0.85rem !important;
  }
}

@media (max-width: 600px) {
  .professional-stat-number {
    font-size: 1.8rem !important;
  }

  .professional-card-title {
    font-size: 0.9rem !important;
  }

  .professional-card-subtitle {
    font-size: 0.8rem !important;
  }
}

/* Fast Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.auto-fee-slip-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px) !important;
  border: 3px solid rgba(0, 0, 0, 0.6) !important;
  position: relative;
  overflow: hidden;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-height: 200px;
  height: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.auto-fee-slip-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 1;
}

.auto-fee-slip-card:hover::before {
  opacity: 1;
}

.auto-fee-slip-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(0, 0, 0, 0.5),
    0 10px 25px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(0, 0, 0, 0.95) !important;
  border-width: 4px !important;
  background: rgba(255, 255, 255, 0.5) !important;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.auto-fee-slip-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(236, 72, 153, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 0;
}

.auto-fee-slip-card:hover .auto-fee-slip-overlay {
  opacity: 1;
  transition: opacity 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.auto-fee-slip-icon-avatar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(0, 0, 0, 0.6);
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  z-index: 2;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 3px 12px rgba(0, 0, 0, 0.2),
    0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.auto-fee-slip-icon-avatar:hover {
  background: rgba(255, 255, 255, 0.5) !important;
  transform: scale(1.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-color: rgba(0, 0, 0, 0.95) !important;
  border-width: 4px !important;
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.auto-fee-slip-text {
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.auto-fee-slip-avatar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 0, 0, 0.4);
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 3px 12px rgba(0, 0, 0, 0.2),
    0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.auto-fee-slip-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.25),
    0 3px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6) !important;
}

/* Position relative utility */
.position-relative {
  position: relative;
}

/* Text color utilities for glass effect */
.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Enhanced hover effects for glass cards */
.auto-fee-slip-card .v-card-text {
  position: relative;
  z-index: 2;
}

.auto-fee-slip-card:hover .auto-fee-slip-icon-avatar {
  animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {
  0% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-1px) scale(1.01);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
  75% {
    transform: translateY(-1px) scale(1.01);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

/* Responsive design for glass cards */
@media (max-width: 1200px) {
  .auto-fee-slip-card {
    min-height: 180px;
  }
}

/* Welcome text styling */
.welcome-text {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Playfair Display", serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  font-size: 1.25rem !important;
  line-height: 1.4 !important;
}

/* Elegant title styling */
.elegant-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.elegant-subtitle {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: 0.3px !important;
  text-transform: uppercase !important;
  font-size: 0.9rem !important;
}

.elegant-section-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.8px !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Special styling for white text (welcome message) */
.elegant-section-title.text-white {
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Special styling for primary text (section headers) */
.elegant-section-title.text-primary {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Special styling for grey-darken-3 text (section headers) */
.elegant-section-title.text-grey-darken-3 {
  background: linear-gradient(135deg, #424242 0%, #616161 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.elegant-card-title {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 960px) {
  .auto-fee-slip-card {
    min-height: 160px;
  }
}

@media (max-width: 600px) {
  .auto-fee-slip-card {
    min-height: 140px;
  }

  .auto-fee-slip-icon-avatar {
    size: 48px !important;
  }

  .auto-fee-slip-icon-avatar .v-icon {
    font-size: 24px !important;
  }
}

/* Modern Welcome Card Design */
.modern-welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-welcome-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 80px rgba(102, 126, 234, 0.4);
}

.welcome-card-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.welcome-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.welcome-card-content {
  position: relative;
  z-index: 2;
  color: white;
}

.welcome-text-section {
  flex: 1;
  min-width: 300px;
}

.welcome-avatar {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.welcome-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.welcome-title {
  font-family: "Playfair Display", serif !important;
  font-weight: 700 !important;
  font-size: 2rem !important;
  color: white !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
}

.welcome-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 400 !important;
  font-size: 1.1rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.01em;
  line-height: 1.4;
  margin: 0;
}

.welcome-stats {
  margin-top: 16px;
}

.welcome-chip {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.welcome-chip:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.welcome-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 200px;
}

.refresh-btn-modern {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #667eea !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  font-size: 0.875rem !important;
  padding: 12px 24px !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.refresh-btn-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s;
}

.refresh-btn-modern:hover::before {
  left: 100%;
}

.refresh-btn-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(102, 126, 234, 0.5) !important;
}

.refresh-btn-modern:active {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
}

.refresh-btn-modern .v-icon {
  transition: transform 0.3s ease;
}

.refresh-btn-modern:hover .v-icon {
  transform: rotate(180deg);
}

/* Loading animation for refresh button */
.refresh-btn-modern.loading .v-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design for Welcome Card */
@media (max-width: 1200px) {
  .welcome-title {
    font-size: 1.75rem !important;
  }

  .welcome-subtitle {
    font-size: 1rem !important;
  }

  .welcome-card-content {
    padding: 24px !important;
  }
}

@media (max-width: 960px) {
  .welcome-title {
    font-size: 1.5rem !important;
  }

  .welcome-subtitle {
    font-size: 0.9rem !important;
  }

  .welcome-card-content {
    padding: 20px !important;
  }

  .welcome-text-section {
    min-width: 250px;
  }

  .welcome-actions {
    min-width: 180px;
  }
}

@media (max-width: 600px) {
  .modern-welcome-card {
    margin-bottom: 16px !important;
  }

  .welcome-card-content {
    padding: 16px !important;
  }

  .welcome-title {
    font-size: 1.25rem !important;
  }

  .welcome-subtitle {
    font-size: 0.8rem !important;
  }

  .welcome-avatar {
    size: 48px !important;
  }

  .welcome-avatar .v-icon {
    font-size: 24px !important;
  }

  .welcome-text-section {
    min-width: 200px;
  }

  .welcome-actions {
    min-width: 150px;
  }

  .refresh-btn-modern {
    padding: 8px 16px !important;
    font-size: 0.75rem !important;
  }

  .welcome-stats {
    flex-direction: column;
    align-items: flex-start;
  }

  .welcome-chip {
    margin-bottom: 8px !important;
  }
}

.date-chip-modern {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 12px 24px !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.date-chip-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.date-chip-modern:hover::before {
  left: 100%;
}

.date-chip-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.date-icon {
  margin-right: 8px !important;
  font-size: 1.1rem !important;
  transition: all 0.3s ease !important;
}

.date-chip-modern:hover .date-icon {
  transform: scale(1.1) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
}

.date-text {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}

.date-chip-modern:hover .date-text {
  transform: scale(1.02) !important;
}

.status-chip-modern {
  background: linear-gradient(
    135deg,
    #11998e 0%,
    #38ef7d 50%,
    #4ade80 100%
  ) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 12px 24px !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 8px 24px rgba(17, 153, 142, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.status-chip-modern::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s;
}

.status-chip-modern:hover::before {
  left: 100%;
}

.status-chip-modern:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(17, 153, 142, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.status-icon {
  margin-right: 8px !important;
  font-size: 1.1rem !important;
  transition: all 0.3s ease !important;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.status-chip-modern:hover .status-icon {
  transform: scale(1.2) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
  animation: none;
}

.status-text {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}

.status-chip-modern:hover .status-text {
  transform: scale(1.02) !important;
}

/* Enhanced welcome stats container */
.welcome-stats {
  margin-top: 20px;
  gap: 12px;
}

/* Responsive design for chips */
@media (max-width: 1200px) {
  .date-chip-modern,
  .status-chip-modern {
    padding: 10px 20px !important;
    font-size: 0.85rem !important;
  }

  .date-icon,
  .status-icon {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .date-chip-modern,
  .status-chip-modern {
    padding: 8px 16px !important;
    font-size: 0.8rem !important;
  }

  .date-icon,
  .status-icon {
    font-size: 0.9rem !important;
    margin-right: 6px !important;
  }

  .welcome-stats {
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .welcome-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .date-chip-modern,
  .status-chip-modern {
    padding: 6px 12px !important;
    font-size: 0.75rem !important;
    border-radius: 16px !important;
  }

  .date-icon,
  .status-icon {
    font-size: 0.8rem !important;
    margin-right: 4px !important;
  }

  .date-text,
  .status-text {
    font-size: 0.75rem !important;
  }
}

/* Header Refresh Button Styling */
.refresh-btn-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  color: #1e3a8a !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

.refresh-btn-header:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4) !important;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%) !important;
}

.refresh-btn-header .v-icon {
  transition: transform 0.3s ease;
}

.refresh-btn-header:hover .v-icon {
  transform: rotate(180deg);
}

/* Header Chip Border Styling */
.header-chip-border {
  border: 2px solid rgba(0, 0, 0, 0.5) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
}

/* Professional Statistics Dashboard Styling */
.professional-avatar {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

.professional-title {
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.professional-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 400 !important;
  color: #64748b !important;
  letter-spacing: 0.01em !important;
}

.professional-chip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

/* Professional Stat Cards */
.professional-stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 3px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  overflow: hidden;
  position: relative;
  min-height: 220px;
}

.professional-stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.02) 0%,
    rgba(118, 75, 162, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.professional-stat-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
}

.professional-stat-card:hover::before {
  opacity: 1;
}

/* Gradient Backgrounds for Professional Cards */
.primary-gradient {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
}

.secondary-gradient {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
}

.accent-gradient {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
}

.warm-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
}

/* Professional Card Content Styling */
.professional-icon-avatar {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.professional-icon-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05) rotate(5deg) !important;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3) !important;
}

.professional-icon {
  transition: all 0.15s ease !important;
}

.professional-icon-avatar:hover .professional-icon {
  transform: scale(1.1) !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
}

.professional-status-icon {
  opacity: 0.8;
  transition: all 0.15s ease;
}

.professional-stat-card:hover .professional-status-icon {
  opacity: 1;
  transform: scale(1.1);
}

.professional-card-title {
  font-family: "Inter", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: white !important;
  margin-bottom: 4px !important;
  letter-spacing: -0.01em !important;
  line-height: 1.2 !important;
}

.professional-card-subtitle {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  color: rgba(255, 255, 255, 0.8) !important;
  letter-spacing: 0.01em !important;
  line-height: 1.3 !important;
}

.professional-stat-number {
  font-family: "Poppins", sans-serif !important;
  font-weight: 800 !important;
  font-size: 2.5rem !important;
  color: white !important;
  margin-bottom: 8px !important;
  letter-spacing: -0.02em !important;
  line-height: 1 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.professional-divider {
  background: rgba(255, 255, 255, 0.3) !important;
  height: 1px !important;
}

.professional-stat-label {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  letter-spacing: 0.01em !important;
}

.professional-mini-chip {
  font-weight: 600 !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

/* Responsive Professional Cards */
@media (max-width: 1200px) {
  .professional-stat-number {
    font-size: 2.2rem !important;
  }

  .professional-card-title {
    font-size: 1rem !important;
  }
}

@media (max-width: 960px) {
  .professional-stat-number {
    font-size: 2rem !important;
  }

  .professional-card-title {
    font-size: 0.95rem !important;
  }

  .professional-card-subtitle {
    font-size: 0.85rem !important;
  }
}

@media (max-width: 600px) {
  .professional-stat-number {
    font-size: 1.8rem !important;
  }

  .professional-card-title {
    font-size: 0.9rem !important;
  }

  .professional-card-subtitle {
    font-size: 0.8rem !important;
  }
}

/* Fast Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}
</style>
