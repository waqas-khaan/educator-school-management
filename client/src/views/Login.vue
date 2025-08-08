<template>
  <div class="login-wrapper">
    <!-- Animated Background -->
    <div class="animated-background">
      <div class="gradient-bg"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <v-container fluid fill-height class="login-container">
      <v-row align="center" justify="center" class="fill-height">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
          class="d-flex justify-center"
        >
          <v-card class="elevation-24 login-card">
            <!-- Logo Section -->
            <div class="logo-section text-center pa-8">
              <div class="logo-container mb-6">
                <v-img
                  src="@/assets/the-educators-seeklogo.png"
                  alt="The Educator School Logo"
                  max-height="140"
                  contain
                  class="logo-image"
                ></v-img>
              </div>
              <h1 class="text-h3 font-weight-bold welcome-text mb-3">
                Welcome Back
              </h1>
              <p class="text-h6 subtitle-text">Sign in to your account</p>
              <div class="decoration-line"></div>
            </div>

            <!-- Login Form -->
            <v-card-text class="pa-8">
              <v-form ref="form" v-model="valid" @submit.prevent="loginUser">
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  name="email"
                  prepend-inner-icon="mdi-email-outline"
                  type="email"
                  :rules="[rules.required, rules.email]"
                  outlined
                  rounded
                  required
                  :error="emailError"
                  color="primary"
                  hide-details="auto"
                  @blur="validateEmail"
                  @input="validateEmail"
                  class="mb-6"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[rules.required]"
                  outlined
                  rounded
                  required
                  :error="passwordError"
                  color="primary"
                  hide-details="auto"
                  @blur="validatePassword"
                  @input="validatePassword"
                  class="mb-8"
                ></v-text-field>

                <v-alert
                  v-if="error"
                  type="error"
                  class="mb-6 error-alert"
                  dismissible
                  @click:close="error = ''"
                  outlined
                  prominent
                >
                  <v-icon left>mdi-alert-circle</v-icon>
                  {{ error }}
                </v-alert>

                <div class="button-container">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    rounded
                    :loading="loading"
                    :disabled="!valid || loading"
                    @click="loginUser"
                    class="login-button"
                  >
                    {{ loading ? "Signing In..." : "Sign In" }}
                  </v-btn>
                </div>

                <!-- Additional Info -->
                <div class="text-center mt-6">
                  <div class="security-badge">
                    <v-icon small class="mr-2">mdi-shield-check</v-icon>
                    <span class="text-caption info-text"
                      >Secure login with encrypted connection</span
                    >
                  </div>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { setAuthCookies } from "@/utils/cookies";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      error: "",
      valid: false,
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      },
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    async loginUser() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      this.error = "";

      try {
        const response = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        const { token, user } = response.data;

        // Store user data in cookies
        setAuthCookies(token, {
          role: user.role,
          name: user.name,
          email: user.email,
        });

        // Redirect based on role
        if (user.role === "admin") {
          this.$router.push("/admin");
        } else if (user.role === "accounts") {
          this.$router.push("/accounts");
        } else {
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.error("Login error:", err);
        this.error =
          err.response?.data?.error || "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    validateEmail() {
      this.emailError = !this.email || !this.rules.email(this.email);
    },
    validatePassword() {
      this.passwordError = !this.password;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");

.login-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 20%,
    #f093fb 40%,
    #f5576c 60%,
    #4facfe 80%,
    #00f2fe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  z-index: -3;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 40%
    );
  z-index: -2;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.shape-1 {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 8%;
  animation-delay: 0s;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.15)
  );
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 70%;
  right: 10%;
  animation-delay: 2s;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.08)
  );
}

.shape-3 {
  width: 120px;
  height: 120px;
  top: 30%;
  left: 65%;
  animation-delay: 4s;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.3)
  );
}

.shape-4 {
  width: 180px;
  height: 180px;
  bottom: 20%;
  left: 20%;
  animation-delay: 1s;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.12)
  );
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-30px) rotate(180deg) scale(1.1);
    opacity: 1;
  }
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-card {
  backdrop-filter: blur(40px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideInUp 0.8s ease-out;
  position: relative;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.login-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.9),
    transparent
  );
}

.card-animations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.floating-particle {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
}

.particle-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 15%;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  animation-delay: 0s;
  animation-duration: 8s;
}

.particle-2 {
  width: 70px;
  height: 70px;
  top: 25%;
  right: 20%;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  animation-delay: 2s;
  animation-duration: 10s;
}

.particle-3 {
  width: 90px;
  height: 90px;
  bottom: 30%;
  left: 75%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  animation-delay: 4s;
  animation-duration: 12s;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 3px solid rgba(102, 126, 234, 0.5);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite;
  opacity: 0.7;
}

.pulse-ring::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite 1s;
}

.pulse-ring::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite 2s;
}

.logo-section {
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #e2e8f0 30%,
    #cbd5e1 60%,
    #f1f5f9 100%
  );
  position: relative;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.logo-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 0%,
    transparent 70%
  );
  animation: rotate 12s linear infinite;
}

.logo-container {
  position: relative;
  z-index: 1;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.4) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.logo-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 240px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: rotate 9s linear infinite reverse;
}

.logo-image {
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3));
  transition: transform 0.6s ease;
  position: relative;
  z-index: 2;
  animation: heartbeat 3s ease-in-out infinite;
}

.logo-image:hover {
  transform: scale(1.05);
}

@keyframes heartbeat {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-8px) scale(1.02);
  }
  50% {
    transform: translateY(0px) scale(1);
  }
  75% {
    transform: translateY(-4px) scale(1.01);
  }
}

.welcome-text {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 40%,
    #f093fb 70%,
    #f5576c 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.subtitle-text {
  color: #64748b;
  font-weight: 500;
  position: relative;
  z-index: 2;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.decoration-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
  margin: 24px auto 0;
  border-radius: 2px;
  position: relative;
  z-index: 2;
  box-shadow: 0 3px 12px rgba(102, 126, 234, 0.4);
}

/* Input field typography */
.v-text-field >>> .v-label {
  font-family: "Inter", sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0.01em !important;
}

.v-text-field >>> input {
  font-family: "Inter", sans-serif !important;
  font-weight: 400 !important;
  font-size: 1rem !important;
  letter-spacing: 0.01em !important;
}

.button-container {
  position: relative;
}

.login-button {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 30%,
    #f093fb 60%,
    #f5576c 90%
  );
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  height: 56px;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.02em;
}

.login-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.login-button:hover::before {
  left: 100%;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
}

.error-alert {
  border-radius: 16px;
  backdrop-filter: blur(15px);
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.2);
  font-family: "Inter", sans-serif;
}

.security-badge {
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.security-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.info-text {
  color: #64748b;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .login-card {
    margin: 16px;
    border-radius: 20px;
  }

  .logo-section {
    padding: 20px !important;
  }

  .v-card-text {
    padding: 20px !important;
  }

  .welcome-text {
    font-size: 1.8rem !important;
  }
}
</style>
