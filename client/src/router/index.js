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
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/accounts",
    name: "AccountsDashboard",
    component: AccountsDashboard,
    meta: { requiresAuth: true, role: "accounts" },
  },
  {
    path: "/admission",
    name: "NewAdmission",
    component: NewAdmission,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/students",
    name: "AllStudents",
    component: AllStudents,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/classes",
    name: "Classes",
    component: Classes,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/classes/:className/students",
    name: "ClassStudents",
    component: ClassStudents,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/left-students",
    name: "LeftStudents",
    component: LeftStudents,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/fees",
    name: "FeeManagement",
    component: FeeManagement,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/fee-slips",
    name: "FeeSlipGenerator",
    component: FeeSlipGenerator,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/salaries",
    name: "SalaryManagement",
    component: SalaryManagement,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/revenue",
    name: "Revenue",
    component: Revenue,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
  },
  {
    path: "/admission-records",
    name: "AdmissionRecords",
    component: AdmissionRecords,
    meta: { requiresAuth: true, role: ["admin", "accounts"] },
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

// Navigation guard with cookie-based authentication
router.beforeEach((to, from, next) => {
  const authData = getAuthData();
  const user = authData ? authData.user : null;

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
      console.log("No user or token found, redirecting to login");
      return next("/login");
    }

    // Check role-based access
    if (to.meta.role) {
      const requiredRoles = Array.isArray(to.meta.role)
        ? to.meta.role
        : [to.meta.role];
      if (!requiredRoles.includes(user.role)) {
        console.log("Insufficient role, redirecting based on user role");
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

  next();
});

export default router;
