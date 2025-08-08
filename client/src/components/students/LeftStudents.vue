<template>
  <div class="modern-left-students-page">
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
                <v-avatar size="120" class="mb-4 header-avatar">
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
                  Left Students Management
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Manage and monitor students who have left the school
                </p>
                <v-chip
                  color="white"
                  text-color="warning"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-account-remove</v-icon>
                  {{ leftStudentsCount }} Students Left
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Main Content Section -->
    <div class="content-container">
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="11" xl="10" class="mx-auto">
            <!-- Statistics Cards -->
            <v-row class="mb-8">
              <v-col cols="12">
                <div class="stats-header mb-6">
                  <h2 class="text-h4 font-weight-bold primary--text mb-2">
                    Left Students Overview
                  </h2>
                  <p class="text-subtitle-1 text-medium-emphasis">
                    Real-time insights into students who have left the school
                  </p>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                  rounded="xl"
                >
                  <div class="stat-card__header">
                    <div class="stat-card__icon-wrapper warning-gradient">
                      <v-icon size="28" color="white"
                        >mdi-account-remove</v-icon
                      >
                    </div>
                  </div>

                  <div class="stat-card__content">
                    <div class="stat-card__main-value">
                      <span class="stat-number">{{ leftStudentsCount }}</span>
                      <span class="stat-label">Left Students</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Total</span>
                        <span class="detail-value">{{
                          leftStudentsCount
                        }}</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                  rounded="xl"
                >
                  <div class="stat-card__header">
                    <div class="stat-card__icon-wrapper blue-gradient">
                      <v-icon size="28" color="white">mdi-gender-male</v-icon>
                    </div>
                  </div>

                  <div class="stat-card__content">
                    <div class="stat-card__main-value">
                      <span class="stat-number">{{ maleLeftStudents }}</span>
                      <span class="stat-label">Male Left</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Students</span>
                        <span class="detail-value">{{ maleLeftStudents }}</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                  rounded="xl"
                >
                  <div class="stat-card__header">
                    <div class="stat-card__icon-wrapper pink-gradient">
                      <v-icon size="28" color="white">mdi-gender-female</v-icon>
                    </div>
                  </div>

                  <div class="stat-card__content">
                    <div class="stat-card__main-value">
                      <span class="stat-number">{{ femaleLeftStudents }}</span>
                      <span class="stat-label">Female Left</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Students</span>
                        <span class="detail-value">{{
                          femaleLeftStudents
                        }}</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                  rounded="xl"
                >
                  <div class="stat-card__header">
                    <div class="stat-card__icon-wrapper orange-gradient">
                      <v-icon size="28" color="white">mdi-school</v-icon>
                    </div>
                  </div>

                  <div class="stat-card__content">
                    <div class="stat-card__main-value">
                      <span class="stat-number">{{ uniqueClasses }}</span>
                      <span class="stat-label">Affected Classes</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Classes</span>
                        <span class="detail-value">{{ uniqueClasses }}</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <!-- Search and Filters Section -->
            <v-card
              class="search-card mb-6 search-section-with-border"
              elevation="0"
              rounded="xl"
            >
              <v-card-text class="pa-6">
                <div class="section-title mb-6">
                  <div class="d-flex align-center">
                    <v-avatar size="50" class="mr-4 section-icon" color="info">
                      <v-icon size="24" color="white">mdi-magnify</v-icon>
                    </v-avatar>
                    <div>
                      <h3 class="text-h5 font-weight-bold mb-1">
                        Search & Filter
                      </h3>
                      <p class="text-body-2 text-medium-emphasis">
                        Find specific left students using advanced filters
                      </p>
                    </div>
                  </div>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="search"
                      label="Search students..."
                      prepend-inner-icon="mdi-magnify"
                      outlined
                      dense
                      clearable
                      class="search-input"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="genderFilter"
                      :items="genderOptions"
                      label="Filter by Gender"
                      outlined
                      dense
                      clearable
                      class="filter-select"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="classFilter"
                      :items="classOptions"
                      label="Filter by Class"
                      outlined
                      dense
                      clearable
                      class="filter-select"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Students Table Section -->
            <v-card
              class="students-card table-section-with-border"
              elevation="0"
              rounded="xl"
            >
              <v-card-text class="pa-6">
                <div class="section-title mb-6">
                  <div class="d-flex align-center">
                    <v-avatar
                      size="50"
                      class="mr-4 section-icon"
                      color="warning"
                    >
                      <v-icon size="24" color="white"
                        >mdi-account-remove</v-icon
                      >
                    </v-avatar>
                    <div>
                      <h3 class="text-h5 font-weight-bold mb-1">
                        Left Students Directory
                      </h3>
                      <p class="text-body-2 text-medium-emphasis">
                        View and manage all students who have left the school
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Bulk Actions for Selected Students -->
                <div
                  class="bulk-actions mb-4"
                  v-if="filteredStudents.length > 0"
                >
                  <v-row align="center">
                    <v-col cols="12" md="6">
                      <div class="d-flex align-center">
                        <v-checkbox
                          v-model="selectAll"
                          :indeterminate="
                            selectedStudents.length > 0 &&
                            selectedStudents.length < filteredStudents.length
                          "
                          @change="toggleSelectAll"
                          color="primary"
                          hide-details
                          class="mr-4"
                        ></v-checkbox>
                        <span class="text-body-2">
                          {{ selectedStudents.length }} of
                          {{ filteredStudents.length }} students selected
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="d-flex justify-end">
                        <v-btn
                          color="primary"
                          size="small"
                          class="mr-3 action-button"
                          :disabled="selectedStudents.length === 0"
                          @click="exportSelectedStudents"
                          prepend-icon="mdi-download"
                          elevation="2"
                          rounded
                        >
                          <span class="font-weight-bold">EXPORT</span>
                        </v-btn>
                        <v-btn
                          color="success"
                          size="small"
                          class="mr-3 action-button"
                          :disabled="
                            selectedStudents.length === 0 || reactivating
                          "
                          :loading="reactivating"
                          @click="reactivateSelectedStudents"
                          prepend-icon="mdi-account-check"
                          elevation="2"
                          rounded
                        >
                          <span class="font-weight-bold">{{
                            reactivating ? "REACTIVATING..." : "REACTIVATE"
                          }}</span>
                        </v-btn>
                        <v-btn
                          color="error"
                          size="small"
                          class="mr-3 action-button"
                          :disabled="selectedStudents.length === 0 || deleting"
                          :loading="deleting"
                          @click="deleteSelectedStudents"
                          prepend-icon="mdi-delete"
                          elevation="2"
                          rounded
                        >
                          <span class="font-weight-bold">{{
                            deleting ? "DELETING..." : "DELETE"
                          }}</span>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </div>

                <div class="d-flex justify-space-between align-center mb-4">
                  <div class="d-flex align-center">
                    <v-chip color="warning" variant="tonal" class="mr-3">
                      <v-icon left>mdi-account-remove</v-icon>
                      {{ filteredStudents.length }} students found
                    </v-chip>
                  </div>
                </div>

                <v-data-table
                  v-model="selectedStudents"
                  :headers="headers"
                  :items="filteredStudents"
                  :search="search"
                  :loading="loading"
                  class="modern-table"
                  :items-per-page="10"
                  :footer-props="{
                    'items-per-page-options': [10, 25, 50],
                    'items-per-page-text': 'Students per page',
                  }"
                  show-select
                  item-key="id"
                >
                  <!-- Profile Image Column -->
                  <template v-slot:item.profile_image="{ item }">
                    <v-avatar size="40" class="mr-3">
                      <v-img
                        :src="getStudentAvatar(item)"
                        alt="Student Avatar"
                        @error="handleImageError"
                        @load="handleImageLoad"
                        :lazy-src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item.name || 'Unknown'
                        )}&background=1976d2&color=fff&size=200`"
                      ></v-img>
                    </v-avatar>
                  </template>

                  <!-- Name Column -->
                  <template v-slot:item.name="{ item }">
                    <div class="d-flex align-center">
                      <div>
                        <div class="font-weight-medium">{{ item.name }}</div>
                        <div class="text-caption text-medium-emphasis">
                          ID: {{ item.id }}
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Gender Column -->
                  <template v-slot:item.gender="{ item }">
                    <v-chip
                      :color="item.gender === 'Male' ? 'blue' : 'pink'"
                      text-color="white"
                      small
                      rounded
                    >
                      {{ item.gender }}
                    </v-chip>
                  </template>

                  <!-- Class Column -->
                  <template v-slot:item.class_name="{ item }">
                    <v-chip color="primary" text-color="white" small rounded>
                      {{ item.class_name }}
                    </v-chip>
                  </template>

                  <!-- Status Column -->
                  <template v-slot:item.status>
                    <v-chip color="warning" text-color="white" small rounded>
                      Left
                    </v-chip>
                  </template>

                  <!-- Actions Column -->
                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            x-small
                            color="info"
                            v-bind="attrs"
                            v-on="on"
                            @click="viewStudentDetails(item)"
                          >
                            <v-icon>mdi-eye</v-icon>
                          </v-btn>
                        </template>
                        <span>View Details</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            x-small
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                            @click="confirmReactivate(item)"
                          >
                            <v-icon>mdi-account-check</v-icon>
                          </v-btn>
                        </template>
                        <span>Reactivate Student</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            x-small
                            color="error"
                            v-bind="attrs"
                            v-on="on"
                            @click="confirmDelete(item)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Delete Student</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Student Details Dialog -->
    <v-dialog v-model="studentDetailsDialog" max-width="600" persistent>
      <v-card class="student-details-dialog" elevation="24">
        <v-card-title class="pa-6 pb-0">
          <div class="d-flex align-center">
            <v-avatar size="60" class="mr-4">
              <v-img
                :src="getStudentAvatar(selectedStudent)"
                alt="Student Avatar"
                @error="handleImageError"
                @load="handleImageLoad"
                :lazy-src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selectedStudent?.name || 'Unknown'
                )}&background=1976d2&color=fff&size=200`"
              ></v-img>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold">
                {{ selectedStudent?.name }}
              </h3>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Student ID: {{ selectedStudent?.id }}
              </p>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon @click="studentDetailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis"
                  >Father's Name</label
                >
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.father_name }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">CNIC</label>
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.cnic }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">Phone</label>
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.phone }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">Gender</label>
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.gender }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis"
                  >Date of Birth</label
                >
                <p class="text-body-1 font-weight-medium">
                  {{ formatDate(selectedStudent?.date_of_birth) }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis"
                  >Admission Date</label
                >
                <p class="text-body-1 font-weight-medium">
                  {{ formatDate(selectedStudent?.admission_date) }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">Class</label>
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.class_name }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">Status</label>
                <v-chip color="warning" text-color="white" small rounded>
                  Left
                </v-chip>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="detail-item">
                <label class="text-caption text-medium-emphasis">Address</label>
                <p class="text-body-1 font-weight-medium">
                  {{ selectedStudent?.address }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="confirmReactivate(selectedStudent)"
            :loading="reactivating"
            class="mr-3"
            rounded
          >
            <v-icon left>mdi-account-check</v-icon>
            Reactivate Student
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDelete(selectedStudent)"
            :loading="deleting"
            rounded
          >
            <v-icon left>mdi-delete</v-icon>
            Delete Student
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reactivate Confirmation Dialog -->
    <v-dialog v-model="reactivateDialog" max-width="500" persistent>
      <v-card class="reactivate-dialog-card" elevation="24">
        <v-card-title class="pa-6 pb-0">
          <div class="d-flex align-center">
            <v-avatar size="50" color="success" class="mr-4">
              <v-icon size="24" color="white">mdi-account-check</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h6 font-weight-bold">Reactivate Student</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Are you sure you want to reactivate this student?
              </p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="text-center">
            <v-avatar size="80" class="mb-4">
              <v-img
                :src="getStudentAvatar(studentToReactivate)"
                alt="Student Avatar"
                @error="handleImageError"
                @load="handleImageLoad"
                :lazy-src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  studentToReactivate?.name || 'Unknown'
                )}&background=1976d2&color=fff&size=200`"
              ></v-img>
            </v-avatar>
            <h4 class="text-h6 font-weight-bold mb-2">
              {{ studentToReactivate?.name }}
            </h4>
            <p class="text-body-2 text-medium-emphasis">
              This will change the student's status from "Left" to "Active" and
              they will appear in the regular student lists again.
            </p>
          </div>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="reactivateDialog = false"
            :disabled="reactivating"
          >
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="reactivateStudent"
            :loading="reactivating"
            rounded
          >
            <v-icon left>mdi-account-check</v-icon>
            Reactivate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Bulk Confirmation Dialog -->
    <ConfirmationDialog
      :show="bulkConfirmDialog.show"
      @update:show="bulkConfirmDialog.show = $event"
      :title="bulkConfirmDialog.title"
      :subtitle="bulkConfirmDialog.subtitle"
      :message="bulkConfirmDialog.message"
      :confirm-text="bulkConfirmDialog.confirmText"
      :cancel-text="bulkConfirmDialog.cancelText"
      :confirm-icon="bulkConfirmDialog.confirmIcon"
      :type="bulkConfirmDialog.type"
      :warning="bulkConfirmDialog.warning"
      :warning-title="bulkConfirmDialog.warningTitle"
      :loading="bulkConfirmDialog.loading"
      :on-confirm="bulkConfirmDialog.onConfirm"
      :on-cancel="bulkConfirmDialog.onCancel"
    />
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";
import ConfirmationDialog from "../ConfirmationDialog.vue";

export default {
  name: "LeftStudents",
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      students: [],
      loading: false,
      search: "",
      genderFilter: null,
      classFilter: null,
      studentDetailsDialog: false,
      reactivateDialog: false,
      deleteDialog: false,
      selectedStudent: null,
      selectedStudents: [],
      selectAll: false,
      studentToReactivate: null,
      studentToDelete: null,
      bulkConfirmDialog: {
        show: false,
        title: "",
        subtitle: "",
        message: "",
        confirmText: "",
        cancelText: "",
        confirmIcon: "",
        type: "info",
        warning: "",
        warningTitle: "",
        loading: false,
        onConfirm: () => {},
        onCancel: () => {},
      },
      reactivating: false,
      deleting: false,
      headers: [
        {
          text: "Photo",
          value: "profile_image",
          sortable: false,
          width: "80px",
        },
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Father's Name",
          value: "father_name",
          sortable: true,
        },
        {
          text: "Phone",
          value: "phone",
          sortable: true,
        },
        {
          text: "Gender",
          value: "gender",
          sortable: true,
        },
        {
          text: "Class",
          value: "class_name",
          sortable: true,
        },
        {
          text: "Status",
          value: "status",
          sortable: true,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "150px",
        },
      ],
    };
  },
  computed: {
    filteredStudents() {
      let filtered = this.students.filter(
        (student) => student.status === "Left"
      );

      if (this.genderFilter) {
        filtered = filtered.filter(
          (student) => student.gender === this.genderFilter
        );
      }

      if (this.classFilter) {
        filtered = filtered.filter(
          (student) => student.class_name === this.classFilter
        );
      }

      return filtered;
    },
    leftStudentsCount() {
      return this.students.filter((student) => student.status === "Left")
        .length;
    },
    maleLeftStudents() {
      return this.students.filter(
        (student) => student.status === "Left" && student.gender === "Male"
      ).length;
    },
    femaleLeftStudents() {
      return this.students.filter(
        (student) => student.status === "Left" && student.gender === "Female"
      ).length;
    },
    uniqueClasses() {
      return [
        ...new Set(
          this.students
            .filter((s) => s.status === "Left")
            .map((s) => s.class_name)
        ),
      ].length;
    },
    genderOptions() {
      return [...new Set(this.students.map((s) => s.gender))].filter(Boolean);
    },
    classOptions() {
      return [...new Set(this.students.map((s) => s.class_name))].filter(
        Boolean
      );
    },
  },
  mounted() {
    this.loadStudents();
  },
  methods: {
    async loadStudents() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get("/api/students", {
          headers: headers,
        });
        this.students = response.data;
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        this.loading = false;
      }
    },
    getStudentAvatar(student) {
      if (!student) return "";
      if (student.profile_image) {
        return `http://localhost:8081/uploads/profile-images/${student.profile_image}`;
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.name || "Unknown"
      )}&background=1976d2&color=fff&size=200`;
    },
    viewStudentDetails(student) {
      this.selectedStudent = student;
      this.studentDetailsDialog = true;
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "N/A";
        return date.toLocaleDateString("en-GB");
      } catch (error) {
        console.error("Error formatting date:", error);
        return "N/A";
      }
    },
    confirmReactivate(student) {
      this.studentToReactivate = student;
      this.reactivateDialog = true;
      this.studentDetailsDialog = false;
    },
    async reactivateStudent() {
      if (!this.studentToReactivate) return;

      this.reactivating = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.put(
          `/api/students/${this.studentToReactivate.id}/reactivate`,
          {},
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log("Reactivate response:", response.data);
        await this.loadStudents(); // Refresh students list
        this.reactivateDialog = false;
        this.studentToReactivate = null;
        console.log("Student reactivated successfully");
      } catch (error) {
        console.error("Error reactivating student:", error);
        console.error("Failed to reactivate student");
      } finally {
        this.reactivating = false;
      }
    },
    confirmDelete(student) {
      this.studentToDelete = student;
      this.deleteDialog = true;
      this.studentDetailsDialog = false;
    },
    async deleteStudent() {
      if (!this.studentToDelete) return;

      this.deleting = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.delete(
          `/api/students/${this.studentToDelete.id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log("Delete response:", response.data);
        await this.loadStudents(); // Refresh students list
        this.deleteDialog = false;
        this.studentToDelete = null;
        console.log("Student deleted successfully");
      } catch (error) {
        console.error("Error deleting student:", error);
        console.error("Failed to delete student");
      } finally {
        this.deleting = false;
      }
    },
    handleImageError(event) {
      if (event && event.target && event.target.src) {
        console.error("Image failed to load:", event.target.src);
      } else {
        console.error("Image failed to load: unknown source");
      }
    },
    handleImageLoad(event) {
      if (event && event.target && event.target.src) {
        console.log("Image loaded successfully:", event.target.src);
      } else {
        console.log("Image loaded successfully: unknown source");
      }
    },

    // Select All functionality
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedStudents = [...this.filteredStudents];
      } else {
        this.selectedStudents = [];
      }
    },

    exportSelectedStudents() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to export");
        return;
      }

      // Create CSV content
      const headers = [
        "Name",
        "Father's Name",
        "CNIC",
        "Phone",
        "Gender",
        "Class",
        "Date of Birth",
        "Admission Date",
        "Monthly Fee",
        "Status",
      ];
      const csvContent = [
        headers.join(","),
        ...this.selectedStudents.map((student) =>
          [
            student.name,
            student.father_name,
            student.cnic,
            student.phone,
            student.gender,
            student.class_name,
            student.date_of_birth,
            student.admission_date,
            student.monthly_fee,
            student.status,
          ].join(",")
        ),
      ].join("\n");

      // Download CSV file
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `left_students_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      this.$toast.success(`Exported ${this.selectedStudents.length} students`);
    },

    async reactivateSelectedStudents() {
      console.log("Reactivate button clicked");
      console.log("Selected students:", this.selectedStudents);
      console.log("Selected students length:", this.selectedStudents.length);
      console.log("Reactivating state:", this.reactivating);
      console.log(
        "Button disabled:",
        this.selectedStudents.length === 0 || this.reactivating
      );

      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to reactivate");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Reactivate Students",
        subtitle: "Bring students back to active status",
        message: `Are you sure you want to reactivate ${this.selectedStudents.length} students?`,
        confirmText: "Reactivate",
        cancelText: "Cancel",
        confirmIcon: "mdi-account-check",
        type: "warning",
        warning:
          "This will change the status of selected students from 'Left' to 'Active'",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkReactivate(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkReactivate() {
      this.bulkConfirmDialog.loading = true;
      this.reactivating = true;

      let successCount = 0;
      let errorCount = 0;

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        for (const student of this.selectedStudents) {
          try {
            await axios.put(
              `http://localhost:8081/api/students/${student.id}/reactivate`,
              {},
              { headers: { Authorization: user.token } }
            );
            successCount++;
          } catch (error) {
            console.error(`Error reactivating student ${student.name}:`, error);
            errorCount++;
          }
        }

        // Refresh the students list
        await this.loadStudents();

        // Clear selection
        this.selectedStudents = [];
        this.selectAll = false;

        // Close dialog
        this.closeBulkConfirmDialog();

        if (successCount > 0) {
          this.$toast.success(
            `Successfully reactivated ${successCount} students`
          );
        }
        if (errorCount > 0) {
          this.$toast.error(`Failed to reactivate ${errorCount} students`);
        }
      } catch (error) {
        console.error("Error in bulk reactivate:", error);
        this.$toast.error("An error occurred during bulk reactivation");
      } finally {
        this.bulkConfirmDialog.loading = false;
        this.reactivating = false;
      }
    },

    async deleteSelectedStudents() {
      console.log("Delete button clicked");
      console.log("Selected students:", this.selectedStudents);
      console.log("Selected students length:", this.selectedStudents.length);
      console.log("Deleting state:", this.deleting);
      console.log(
        "Button disabled:",
        this.selectedStudents.length === 0 || this.deleting
      );

      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to delete");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Delete Students",
        subtitle: "Permanently remove students from the system",
        message: `Are you sure you want to permanently delete ${this.selectedStudents.length} students?`,
        confirmText: "Delete Permanently",
        cancelText: "Cancel",
        confirmIcon: "mdi-delete",
        type: "error",
        warning:
          "This action cannot be undone! All student data including fees, documents, and profile information will be permanently deleted.",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkDelete(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkDelete() {
      this.bulkConfirmDialog.loading = true;
      this.deleting = true;

      let successCount = 0;
      let errorCount = 0;

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        for (const student of this.selectedStudents) {
          try {
            await axios.delete(
              `http://localhost:8081/api/students/${student.id}`,
              { headers: { Authorization: user.token } }
            );
            successCount++;
          } catch (error) {
            console.error(`Error deleting student ${student.name}:`, error);
            errorCount++;
          }
        }

        // Refresh the students list
        await this.loadStudents();

        // Clear selection
        this.selectedStudents = [];
        this.selectAll = false;

        // Close dialog
        this.closeBulkConfirmDialog();

        if (successCount > 0) {
          this.$toast.success(`Successfully deleted ${successCount} students`);
        }
        if (errorCount > 0) {
          this.$toast.error(`Failed to delete ${errorCount} students`);
        }
      } catch (error) {
        console.error("Error in bulk delete:", error);
        this.$toast.error("An error occurred during bulk deletion");
      } finally {
        this.bulkConfirmDialog.loading = false;
        this.deleting = false;
      }
    },

    closeBulkConfirmDialog() {
      this.bulkConfirmDialog.show = false;
    },
  },
};
</script>

<style scoped>
/* Modern Left Students Page Design - Matching AllStudents Page Style */

.modern-left-students-page {
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
  padding: 60px 0;
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
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.logo-image {
  border-radius: 50%;
}

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

.header-chip {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
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

/* Content Container */
.content-container {
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Statistics Header */
.stats-header {
  text-align: center;
  margin-bottom: 2rem;
}

/* Enterprise Stat Cards */
.enterprise-stat-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  height: 100%;
}

.stat-card-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.stat-card-with-border:hover {
  border-color: rgba(0, 0, 0, 0.95) !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.stat-card__header {
  padding: 1.5rem 1.5rem 0;
  text-align: center;
}

.stat-card__icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.primary-gradient {
  background: linear-gradient(135deg, #1976d2, #1565c0);
}

.blue-gradient {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.pink-gradient {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.orange-gradient {
  background: linear-gradient(135deg, #f97316, #ea580c);
}

.warning-gradient {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-card__content {
  padding: 1.5rem;
  text-align: center;
}

.stat-card__main-value {
  margin-bottom: 1rem;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.5rem;
  font-family: "Inter", sans-serif !important;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: "Inter", sans-serif !important;
}

.stat-card__details {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
}

.stat-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  font-family: "Inter", sans-serif !important;
}

.detail-label {
  color: #64748b;
  font-weight: 500;
  font-family: "Inter", sans-serif !important;
}

.detail-value {
  color: #1976d2;
  font-weight: 600;
  font-family: "Inter", sans-serif !important;
}

/* Search and Table Cards */
.search-card,
.students-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12) !important;
}

.search-section-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.search-section-with-border:hover {
  border-color: rgba(0, 0, 0, 0.95) !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.table-section-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.table-section-with-border:hover {
  border-color: rgba(0, 0, 0, 0.95) !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.section-title {
  margin-bottom: 1.5rem;
}

.section-icon {
  background: linear-gradient(135deg, #1976d2, #1565c0);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
}

/* Modern Inputs */
.search-input,
.filter-select {
  font-family: "Inter", sans-serif !important;
}

.search-input :deep(.v-input__slot),
.filter-select :deep(.v-input__slot) {
  background: #f8f9fa !important;
  border: none !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.search-input :deep(.v-input__slot:hover),
.filter-select :deep(.v-input__slot:hover) {
  background: #ffffff !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15) !important;
}

.search-input :deep(.v-input__slot:focus-within),
.filter-select :deep(.v-input__slot:focus-within) {
  background: #ffffff !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25) !important;
}

.search-input :deep(.v-label),
.filter-select :deep(.v-label) {
  color: #6c757d !important;
  font-weight: 500 !important;
}

.search-input :deep(.v-icon),
.filter-select :deep(.v-icon) {
  color: #667eea !important;
}

.modern-table {
  background: transparent;
  font-family: "Inter", sans-serif !important;
}

.modern-table ::v-deep .v-data-table__wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.modern-table ::v-deep .v-data-table {
  background: transparent;
}

.modern-table ::v-deep .v-data-table th {
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: "Inter", sans-serif !important;
}

.modern-table ::v-deep .v-data-table td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif !important;
}

.modern-table ::v-deep .v-data-table tbody tr:hover {
  background: rgba(25, 118, 210, 0.05);
}

/* Dialog Styling */
.student-details-dialog,
.reactivate-dialog-card,
.delete-dialog-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2) !important;
  font-family: "Inter", sans-serif !important;
}

.detail-item {
  margin-bottom: 1.5rem;
}

.detail-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-family: "Inter", sans-serif !important;
}

.detail-item p {
  margin: 0;
  padding: 0.5rem 0;
  font-family: "Inter", sans-serif !important;
}

.text-error {
  color: #f44336 !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .page-header {
    padding: 40px 0;
  }

  .header-avatar {
    size: 60px !important;
  }

  .stat-card__content {
    padding: 16px;
  }

  .stat-card__icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .stat-number {
    font-size: 1.75rem;
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

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");

/* Action Button Styling */
.action-button {
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border-radius: 12px !important;
  padding: 8px 16px !important;
  min-width: 120px !important;
  height: 36px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.action-button:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25) !important;
}

.action-button:active {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
}
</style>
