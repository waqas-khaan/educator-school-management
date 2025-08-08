import Vue from "vue";
import VueRouter from "vue-router";
import { getAuthData } from "@/utils/cookies";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import AdminDashboard from "../components/dashboard/AdminDashboard.vue";
import AccountsDashboard from "../components/dashboard/AccountsDashboard.vue";
import NewAdmission from "../components/students/NewAdmission.vue";
import AllStudents from "../components/students/AllStudents.vue";
import Classes from "../components/students/Classes.vue";
import ClassStudents from "../components/students/ClassStudents.vue";
import LeftStudents from "../components/students/LeftStudents.vue";
import AdmissionRecords from "../components/admissions/AdmissionRecords.vue";

import FeeManagement from "../components/fees/FeeManagement.vue";
import FeeSlipGenerator from "../components/fees/FeeSlipGenerator.vue";
import Revenue from "../components/revenue/Revenue.vue";
import SalaryManagement from "../components/salaries/SalaryManagement.vue";
import TestPage from "../views/TestPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true, title: "Login " },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, title: "Dashboard" },
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      role: "admin",
      title: "Admin Dashboard",
    },
  },
  {
    path: "/accounts",
    name: "AccountsDashboard",
    component: AccountsDashboard,
    meta: {
      requiresAuth: true,
      role: "accounts",
      title: "Accounts Dashboard",
    },
  },
  {
    path: "/admission",
    name: "NewAdmission",
    component: NewAdmission,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "New Admission",
    },
  },
  {
    path: "/students",
    name: "AllStudents",
    component: AllStudents,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "All Students",
    },
  },
  {
    path: "/classes",
    name: "Classes",
    component: Classes,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Classes",
    },
  },
  {
    path: "/classes/:className/students",
    name: "ClassStudents",
    component: ClassStudents,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Class Students",
    },
  },
  {
    path: "/left-students",
    name: "LeftStudents",
    component: LeftStudents,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Left Students",
    },
  },
  {
    path: "/fees",
    name: "FeeManagement",
    component: FeeManagement,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Fee Management",
    },
  },
  {
    path: "/fee-slips",
    name: "FeeSlipGenerator",
    component: FeeSlipGenerator,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Fee Slip Generator",
    },
  },
  {
    path: "/salaries",
    name: "SalaryManagement",
    component: SalaryManagement,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Salary Management",
    },
  },
  {
    path: "/revenue",
    name: "Revenue",
    component: Revenue,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Revenue",
    },
  },
  {
    path: "/admission-records",
    name: "AdmissionRecords",
    component: AdmissionRecords,
    meta: {
      requiresAuth: true,
      role: ["admin", "accounts"],
      title: "Admission Records",
    },
  },
  {
    path: "/test",
    name: "TestPage",
    component: TestPage,
    meta: {
      requiresAuth: false,
      title: "Test Page",
    },
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Navigation guard with hybrid authentication
router.beforeEach((to, from, next) => {
  const authData = getAuthData();
  const user = authData ? authData.user : null;

  // Set document title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "School Management System";
  }

  // If route requires guest (like login) and user is logged in
  if (to.meta.requiresGuest && user && authData.token) {
    // Redirect based on user role
    if (user.role === "admin") {
      return next("/admin");
    } else if (user.role === "accounts") {
      return next("/accounts");
    } else {
      return next("/dashboard");
    }
  }

  // If route requires auth and user is not logged in
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user || !authData.token) {
      return next("/login");
    }

    // Check role-based access
    const requiredRole = to.meta.role;

    if (requiredRole) {
      if (Array.isArray(requiredRole)) {
        // Multiple roles allowed
        if (!requiredRole.includes(user.role)) {
          // Redirect based on user role
          if (user.role === "admin") {
            return next("/admin");
          } else if (user.role === "accounts") {
            return next("/accounts");
          } else {
            return next("/dashboard");
          }
        }
      } else {
        // Single role required
        if (user.role !== requiredRole) {
          // Redirect based on user role
          if (user.role === "admin") {
            return next("/admin");
          } else if (user.role === "accounts") {
            return next("/accounts");
          } else {
            return next("/dashboard");
          }
        }
      }
    }
  }

  next();
});

export default router;
