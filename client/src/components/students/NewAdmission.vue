<template>
  <div class="modern-admission-page">
    <!-- Header Section -->
    <div class="page-header">
      <v-container fluid>
        <v-row align="center" class="py-8">
          <v-col cols="12">
            <!-- Back Button -->
            <div class="d-flex justify-start mb-4">
              <v-btn
                icon
                variant="text"
                color="white"
                size="large"
                class="back-btn"
                @click="$router.push('/admin')"
              >
                <v-icon size="28">mdi-arrow-left</v-icon>
              </v-btn>
            </div>

            <div class="text-center">
              <div class="header-content">
                <v-avatar size="80" class="mb-4 header-avatar">
                  <v-img
                    src="@/assets/the-educators-seeklogo.png"
                    alt="The Educator School Logo"
                    contain
                    class="logo-image"
                  ></v-img>
                </v-avatar>
                <h1
                  class="text-h3 font-weight-bold text-white mb-3 elegant-title"
                >
                  New Student Admission
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Complete the registration form to enroll a new student
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-shield-check</v-icon>
                  Secure Registration Process
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Main Form Section -->
    <div class="form-container">
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="10" xl="8" class="mx-auto">
            <!-- Progress Steps -->
            <v-card class="mb-6 progress-card" elevation="0" rounded>
              <v-card-text class="pa-6">
                <div class="d-flex align-center justify-space-between mb-4">
                  <h3 class="text-h6 font-weight-bold">
                    Registration Progress
                  </h3>
                  <span class="text-caption text-medium-emphasis"
                    >Step 1 of 4</span
                  >
                </div>
                <v-progress-linear
                  :value="25"
                  color="primary"
                  height="6"
                  rounded
                ></v-progress-linear>
                <div class="d-flex justify-space-between mt-3">
                  <span class="text-caption text-success font-weight-medium"
                    >Personal Info</span
                  >
                  <span class="text-caption text-medium-emphasis">Fees</span>
                  <span class="text-caption text-medium-emphasis">Address</span>
                  <span class="text-caption text-medium-emphasis"
                    >Documents</span
                  >
                </div>
              </v-card-text>
            </v-card>

            <!-- Main Form -->
            <v-card class="main-form-card" elevation="0" rounded="xl">
              <v-card-text class="pa-8">
                <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                  <!-- Personal Information -->
                  <div class="form-section">
                    <div class="section-title mb-6">
                      <div class="d-flex align-center">
                        <v-avatar
                          size="50"
                          class="mr-4 section-icon"
                          color="primary"
                        >
                          <v-icon size="24" color="white">mdi-account</v-icon>
                        </v-avatar>
                        <div>
                          <h2 class="text-h5 font-weight-bold mb-1">
                            Personal Information
                          </h2>
                          <p class="text-body-2 text-medium-emphasis">
                            Basic student details and contact information
                          </p>
                        </div>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.name"
                          label="Student Name"
                          :rules="[rules.required]"
                          outlined
                          required
                          class="modern-input"
                          prepend-inner-icon="mdi-account"
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.admission_number"
                          label="Admission Number"
                          outlined
                          readonly
                          class="modern-input"
                          prepend-inner-icon="mdi-card-account-details"
                          dense
                          hint="Auto-generated admission number"
                          persistent-hint
                          color="primary"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.father_name"
                          label="Father's Name"
                          :rules="[rules.required]"
                          outlined
                          required
                          class="modern-input"
                          prepend-inner-icon="mdi-account-tie"
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.cnic"
                          label="CNIC (Format: 17301-XXXXXXX-X)"
                          :rules="[rules.required, rules.cnic]"
                          outlined
                          required
                          placeholder="17301-1234567-1"
                          class="modern-input"
                          prepend-inner-icon="mdi-card-account-details"
                          dense
                          @input="formatCNIC"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.phone"
                          label="Phone Number"
                          :rules="[rules.required, rules.phone]"
                          outlined
                          required
                          placeholder="Enter phone number"
                          class="modern-input"
                          prepend-inner-icon="mdi-phone"
                          dense
                          hint="Format: +923349393936"
                          persistent-hint
                          @blur="$refs.form.validate()"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.gender"
                          :items="genderOptions"
                          label="Gender"
                          :rules="[rules.required]"
                          outlined
                          required
                          class="modern-input"
                          prepend-inner-icon="mdi-gender-male-female"
                          dense
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-menu
                          ref="dobMenu"
                          v-model="dobMenu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.date_of_birth"
                              label="Date of Birth"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[rules.required]"
                              outlined
                              required
                              class="modern-input"
                              prepend-inner-icon="mdi-calendar"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.date_of_birth"
                            @input="dobMenu = false"
                            :max="maxDate"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-menu
                          ref="admissionMenu"
                          v-model="admissionMenu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.admission_date"
                              label="Admission Date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[rules.required]"
                              outlined
                              required
                              class="modern-input"
                              prepend-inner-icon="mdi-calendar-check"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.admission_date"
                            @input="admissionMenu = false"
                            :max="today"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.class_id"
                          :items="classes"
                          item-text="name"
                          item-value="id"
                          label="Class"
                          :rules="[rules.required]"
                          outlined
                          required
                          class="modern-input"
                          prepend-inner-icon="mdi-school"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Fee Information -->
                  <v-divider class="my-8"></v-divider>

                  <div class="form-section">
                    <div class="section-title mb-6">
                      <div class="d-flex align-center">
                        <v-avatar
                          size="50"
                          class="mr-4 section-icon"
                          color="success"
                        >
                          <v-icon size="24" color="white"
                            >mdi-cash-multiple</v-icon
                          >
                        </v-avatar>
                        <div>
                          <h2 class="text-h5 font-weight-bold mb-1">
                            Fee Information
                          </h2>
                          <p class="text-body-2 text-medium-emphasis">
                            Financial details and payment structure
                          </p>
                        </div>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="form.admission_fee"
                          label="Admission Fee (PKR) - Optional"
                          type="number"
                          :rules="[rules.optionalPositive]"
                          outlined
                          prefix="₨"
                          class="modern-input"
                          prepend-inner-icon="mdi-cash-plus"
                          dense
                          placeholder="Leave empty for default amount"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="form.monthly_fee"
                          label="Monthly Fee (PKR)"
                          type="number"
                          :rules="[rules.required, rules.positive]"
                          outlined
                          required
                          prefix="₨"
                          class="modern-input"
                          prepend-inner-icon="mdi-cash-multiple"
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="form.annual_fund"
                          label="Annual Fund (PKR) - Optional"
                          type="number"
                          outlined
                          prefix="₨"
                          class="modern-input"
                          prepend-inner-icon="mdi-cash"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Address Information -->
                  <v-divider class="my-8"></v-divider>

                  <div class="form-section">
                    <div class="section-title mb-6">
                      <div class="d-flex align-center">
                        <v-avatar
                          size="50"
                          class="mr-4 section-icon"
                          color="info"
                        >
                          <v-icon size="24" color="white"
                            >mdi-map-marker</v-icon
                          >
                        </v-avatar>
                        <div>
                          <h2 class="text-h5 font-weight-bold mb-1">
                            Address Information
                          </h2>
                          <p class="text-body-2 text-medium-emphasis">
                            Student's residential address details
                          </p>
                        </div>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="form.address"
                          label="Address"
                          :rules="[rules.required]"
                          outlined
                          rows="3"
                          required
                          class="modern-input"
                          prepend-inner-icon="mdi-map-marker"
                          dense
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Documents & Images -->
                  <v-divider class="my-8"></v-divider>

                  <div class="form-section">
                    <div class="section-title mb-6">
                      <div class="d-flex align-center">
                        <v-avatar
                          size="50"
                          class="mr-4 section-icon"
                          color="warning"
                        >
                          <v-icon size="24" color="white"
                            >mdi-file-document</v-icon
                          >
                        </v-avatar>
                        <div>
                          <h2 class="text-h5 font-weight-bold mb-1">
                            Documents & Images
                          </h2>
                          <p class="text-body-2 text-medium-emphasis">
                            Required documents and profile image
                          </p>
                        </div>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-file-input
                          v-model="form.profile_image"
                          label="Profile Image"
                          accept="image/*"
                          prepend-icon="mdi-camera"
                          outlined
                          @change="previewImage"
                          class="modern-input"
                          dense
                        ></v-file-input>

                        <v-card
                          v-if="imagePreview"
                          class="mt-4 preview-card"
                          elevation="0"
                          rounded
                        >
                          <v-img
                            :src="imagePreview"
                            max-height="200"
                            contain
                            class="rounded-lg"
                          ></v-img>
                        </v-card>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-file-input
                          v-model="form.admission_form"
                          label="Admission Form (PDF)"
                          accept=".pdf"
                          prepend-icon="mdi-file-pdf-box"
                          outlined
                          class="modern-input"
                          dense
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Action Buttons -->
                  <div class="form-actions">
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <v-btn
                          color="primary"
                          x-large
                          type="submit"
                          :loading="loading"
                          :disabled="!valid"
                          class="mr-6 action-btn"
                          elevation="4"
                          rounded
                        >
                          <v-icon left size="24">mdi-content-save</v-icon>
                          Save Admission
                        </v-btn>

                        <v-btn
                          color="secondary"
                          x-large
                          @click="resetForm"
                          :disabled="loading"
                          class="action-btn"
                          elevation="4"
                          rounded
                        >
                          <v-icon left size="24">mdi-refresh</v-icon>
                          Reset Form
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500" persistent>
      <v-card class="success-dialog" elevation="0" rounded="xl">
        <v-card-text class="pa-6 text-center">
          <v-avatar size="80" class="mb-4 success-avatar">
            <v-icon size="40" color="white">mdi-check-circle</v-icon>
          </v-avatar>
          <h3 class="text-h4 font-weight-bold mb-3">Success!</h3>
          <p class="text-body-1 text-medium-emphasis">
            Student admission has been saved successfully!
          </p>
          <v-btn
            color="primary"
            large
            @click="successDialog = false"
            class="mt-4 action-btn"
            elevation="4"
            rounded
          >
            Continue
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewAdmission",
  data() {
    return {
      valid: false,
      loading: false,
      successDialog: false,
      dobMenu: false,
      admissionMenu: false,
      classes: [],
      imagePreview: null,
      form: {
        name: "",
        father_name: "",
        cnic: "",
        phone: "",
        gender: "",
        date_of_birth: "",
        admission_date: "",
        class_id: "",
        admission_fee: "",
        monthly_fee: "",
        annual_fund: "",
        address: "",
        profile_image: null,
        admission_form: null,
        admission_number: "",
      },
      genderOptions: ["Male", "Female", "Other"],
      rules: {
        required: (v) => !!v || "This field is required",
        cnic: (v) =>
          /^\d{5}-\d{7}-\d$/.test(v) || "Invalid CNIC format (17301-1234567-1)",
        phone: (v) => {
          // Handle null/undefined values
          if (!v || v === null || v === undefined) {
            return true; // Allow empty values, required validation will handle it
          }

          // Validate the specific format +923349393936
          console.log("Phone validation input:", v);
          console.log("Phone length:", v.length);
          console.log("Phone value:", JSON.stringify(v));

          // Trim whitespace and check multiple formats
          const trimmed = v.trim();
          const formats = [
            /^\+92\d{11}$/, // +923349393936
            /^\+92 \d{3} \d{7}$/, // +92 334 9393936 (with spaces)
            /^\d{11}$/, // 03349393936 (without +92)
          ];

          const isValid = formats.some((format) => format.test(trimmed));
          console.log("Phone validation result:", isValid);

          return isValid || "Invalid phone format. Use: +923349393936";
        },
        positive: (v) => v > 0 || "Value must be positive",
        optionalPositive: (v) => !v || v > 0 || "Value must be positive",
      },
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      return today.toISOString().substr(0, 10);
    },
    today() {
      const today = new Date();
      return today.toISOString().substr(0, 10);
    },
  },
  async mounted() {
    await this.loadClasses();
    // Ensure form is properly initialized
    if (this.form) {
      this.form.admission_date = this.today;
      this.generateAdmissionNumber();
    }
  },
  methods: {
    generateAdmissionNumber() {
      const currentYear = new Date().getFullYear();
      const timestamp = Date.now();
      if (this.form) {
        this.form.admission_number = `ADM-${currentYear}-${timestamp}`;
      }
    },

    async loadClasses() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User token:", user?.token);
        console.log("User data:", user);

        const response = await axios.get(
          "http://localhost:8081/api/students/classes",
          {
            headers: { Authorization: user.token },
          }
        );
        console.log("Classes response:", response.data);
        this.classes = response.data;
      } catch (error) {
        console.error("Error loading classes:", error);
        console.error("Error details:", error.response?.data);
        this.$vuetify.theme.themes.light.error = "Failed to load classes";
      }
    },

    previewImage(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = null;
      }
    },

    async submitForm() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // Create FormData for file uploads
        const formData = new FormData();

        // Add all form fields to FormData
        Object.keys(this.form).forEach((key) => {
          if (this.form[key] !== null && this.form[key] !== "") {
            if (key === "profile_image" || key === "admission_form") {
              // Handle file uploads
              if (this.form[key] instanceof File) {
                formData.append(key, this.form[key]);
              }
            } else {
              // Handle regular form fields
              formData.append(key, this.form[key]);
            }
          }
        });

        // CNIC can be shared by multiple students (same parent)
        // No need to check for duplicates - proceed directly

        // Debug: Log form data
        console.log("🔍 Form data being sent:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        console.log("Submitting form data with files");

        await axios.post("http://localhost:8081/api/students", formData, {
          headers: {
            Authorization: user.token,
            "Content-Type": "multipart/form-data",
          },
        });

        this.successDialog = true;
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        console.error("Error response:", error.response?.data);
        this.error =
          error.response?.data?.error ||
          "Failed to submit form. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    formatCNIC() {
      // Check if cnic value exists and is not null
      if (!this.form.cnic) {
        return;
      }

      // Remove all non-digit characters
      let value = this.form.cnic.toString().replace(/\D/g, "");

      // Limit to 13 digits
      if (value.length > 13) {
        value = value.substring(0, 13);
      }

      // Format with dashes
      if (value.length >= 5) {
        value = value.substring(0, 5) + "-" + value.substring(5);
      }
      if (value.length >= 13) {
        value = value.substring(0, 13) + "-" + value.substring(13);
      }

      this.form.cnic = value;
    },

    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.form.admission_date = this.today;
      this.imagePreview = null;
    },
  },
};
</script>

<style scoped>
/* Modern Admission Page Design */

/* Page Layout */
.modern-admission-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Header Section */
.page-header {
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.95) 0%,
    rgba(59, 130, 246, 0.95) 50%,
    rgba(96, 165, 250, 0.95) 100%
  );
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-avatar {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  border: 3px solid rgba(255, 255, 255, 0.3) !important;
}

.logo-image {
  padding: 8px !important;
  object-fit: contain !important;
}

.header-chip {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Form Container */
.form-container {
  background: #f8f9fa;
  padding: 40px 0;
}

/* Progress Card */
.progress-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
}

/* Main Form Card */
.main-form-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12) !important;
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
}

.section-title {
  margin-bottom: 2rem;
}

.section-icon {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Modern Inputs */
.modern-input {
  font-family: "Inter", sans-serif !important;
}

.modern-input :deep(.v-input__slot) {
  background: #f8f9fa !important;
  border: none !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.modern-input :deep(.v-input__slot:hover) {
  background: #ffffff !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15) !important;
}

.modern-input :deep(.v-input__slot:focus-within) {
  background: #ffffff !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25) !important;
}

.modern-input :deep(.v-label) {
  color: #6c757d !important;
  font-weight: 500 !important;
}

.modern-input :deep(.v-icon) {
  color: #667eea !important;
}

/* Action Buttons */
.action-btn {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.action-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
}

/* Success Dialog */
.success-dialog {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2) !important;
}

.success-avatar {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4) !important;
}

/* Preview Card */
.preview-card {
  background: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
}

/* Form Actions */
.form-actions {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

/* Responsive Design */
@media (max-width: 960px) {
  .page-header {
    padding: 40px 0;
  }

  .header-avatar {
    size: 60px !important;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 30px 0;
  }

  .header-avatar {
    size: 50px !important;
  }

  .section-title {
    flex-direction: column;
    text-align: center;
  }

  .section-title .v-avatar {
    margin-bottom: 1rem;
  }
}

/* Back Button */
.back-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateX(-3px) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
}

.back-btn .v-icon {
  transition: all 0.3s ease !important;
}

.back-btn:hover .v-icon {
  transform: scale(1.1) !important;
}

/* Elegant Typography */
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
  color: rgba(255, 255, 255, 0.8);
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");
</style>
