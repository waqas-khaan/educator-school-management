<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-img
            src="@/assets/the-educators-seeklogo.png"
            alt="The Educator School Logo"
            width="50"
            height="50"
            class="mr-4"
          ></v-img>
          <span>The Educator School</span>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- User Info -->
      <v-menu offset-y v-if="isAuthenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon left>mdi-account-circle</v-icon>
            {{ userName }}
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ userName }}</v-list-item-title>
              <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-chip small :color="roleColor" text-color="white">
                  {{ userRole }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Login Button for non-authenticated users -->
      <v-btn text v-if="!isAuthenticated" @click="$router.push('/login')">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { getAuthData, clearAuthCookies } from "@/utils/cookies";

export default {
  name: "MainNavigation",
  data() {
    return {
      allAdmissions: 0,
      totalStudents: 0,
      totalTeachers: 0,
      totalClasses: 0,
      totalRevenue: 0,
      pendingFees: 0,
      totalFeePerMonth: 0,
      totalSalaries: 0,
      totalInflow: 0,
      totalExpenses: 0,
      thisMonthCollection: 0,
    };
  },
  computed: {
    user() {
      const authData = getAuthData();
      return authData ? authData.user : {};
    },
    userName() {
      return this.user.name || "User";
    },
    userEmail() {
      return this.user.email || "";
    },
    userRole() {
      return this.user.role || "";
    },
    roleColor() {
      const colors = {
        admin: "primary",
        accounts: "success",
        cash: "warning",
      };
      return colors[this.userRole] || "grey";
    },
    isAuthenticated() {
      const authData = getAuthData();
      return authData && authData.token;
    },
  },
  async mounted() {
    if (this.isAuthenticated && this.userRole === "admin") {
      await this.fetchDashboardData();
    }
  },
  methods: {
    logout() {
      clearAuthCookies();
      this.$router.push("/login");
    },
    async fetchDashboardData() {
      try {
        const authData = getAuthData();
        const token = authData ? authData.token : null;
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all dashboard data
        const [studentsRes, feesRes, salariesRes, revenueRes, expensesRes] =
          await Promise.all([
            fetch("http://localhost:8081/api/students", { headers }),
            fetch("http://localhost:8081/api/fees", { headers }),
            fetch("http://localhost:8081/api/salaries", { headers }),
            fetch("http://localhost:8081/api/revenue", { headers }),
            fetch("http://localhost:8081/api/expenses", { headers }),
          ]);

        const [students, fees, salaries, revenue, expenses] = await Promise.all(
          [
            studentsRes.json(),
            feesRes.json(),
            salariesRes.json(),
            revenueRes.json(),
            expensesRes.json(),
          ]
        );

        // Calculate statistics
        this.allAdmissions = students.length;
        this.totalStudents = students.filter(
          (s) => s.status === "active"
        ).length;
        this.totalTeachers = 25; // Mock data
        this.totalClasses = 12; // Mock data
        this.totalRevenue = fees.reduce(
          (sum, fee) => sum + Number(fee.amount || 0),
          0
        );
        this.pendingFees = fees
          .filter((f) => f.status === "pending")
          .reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
        this.totalFeePerMonth = fees
          .filter((f) => {
            const feeDate = new Date(f.date);
            const now = new Date();
            return (
              feeDate.getMonth() === now.getMonth() &&
              feeDate.getFullYear() === now.getFullYear()
            );
          })
          .reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
        this.totalSalaries = salaries.reduce(
          (sum, salary) => sum + (salary.amount || 0),
          0
        );
        this.totalInflow = revenue.reduce(
          (sum, rev) => sum + (rev.amount || 0),
          0
        );
        this.totalExpenses = expenses.reduce(
          (sum, exp) => sum + (exp.amount || 0),
          0
        );
        this.thisMonthCollection = this.totalFeePerMonth;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Navigation drawer styling */
.v-navigation-drawer {
  border-right: 2px solid #e0e0e0;
}

.v-list-item {
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.v-list-group__header {
  transition: all 0.3s ease;
}

.v-list-group__header:hover {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>
