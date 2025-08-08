<template>
  <div class="modern-class-students-page">
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
                  {{ classInfo.name }} Students
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  View all students enrolled in {{ classInfo.name }}
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-account-group</v-icon>
                  {{ filteredStudents.length }} Students Enrolled
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
            <!-- Students List Section -->
            <v-row class="mb-8">
              <v-col cols="12">
                <div class="students-header mb-6">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <h2 class="text-h4 font-weight-bold primary--text mb-2">
                        Class Students
                      </h2>
                      <p class="text-subtitle-1 text-medium-emphasis">
                        Manage and monitor students in {{ classInfo.name }}
                      </p>
                    </div>
                    <div class="students-stats">
                      <v-chip
                        color="success"
                        size="large"
                        prepend-icon="mdi-check-circle"
                      >
                        {{ filteredStudents.length }} Students
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12">
                <v-card class="students-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8">
                    <!-- Search and Filter -->
                    <div class="search-section mb-6">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="searchQuery"
                            prepend-inner-icon="mdi-magnify"
                            label="Search students..."
                            outlined
                            rounded
                            class="search-input"
                            clearable
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="selectedGender"
                            :items="genderOptions"
                            label="Filter by gender"
                            outlined
                            rounded
                            class="filter-select promote-class-select"
                            clearable
                          ></v-select>
                        </v-col>
                      </v-row>
                    </div>

                    <div
                      v-if="filteredStudents.length === 0"
                      class="empty-state"
                    >
                      <v-icon size="64" color="grey-lighten-1" class="mb-4"
                        >mdi-account-group-outline</v-icon
                      >
                      <h3 class="text-h5 text-grey-darken-1 mb-2">
                        No Students Found
                      </h3>
                      <p class="text-body-1 text-grey">
                        No students are enrolled in this class yet.
                      </p>
                    </div>

                    <div v-else class="students-table-container">
                      <!-- Students Table Section -->
                      <v-card
                        class="table-card directory-section-with-border"
                        elevation="0"
                        rounded="xl"
                      >
                        <v-card-title class="pa-6 pb-4">
                          <div
                            class="d-flex align-center justify-space-between w-100"
                          >
                            <div class="section-title">
                              <div class="d-flex align-center">
                                <v-avatar
                                  size="50"
                                  class="mr-4 section-icon"
                                  color="primary"
                                >
                                  <v-icon size="24" color="white"
                                    >mdi-account-multiple</v-icon
                                  >
                                </v-avatar>
                                <div>
                                  <h2 class="text-h5 font-weight-bold mb-1">
                                    Students Directory
                                  </h2>
                                  <p
                                    class="text-caption text-medium-emphasis mb-0"
                                  >
                                    Showing {{ filteredStudents.length }} of
                                    {{ students.length }} students
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="d-flex align-center">
                              <v-chip
                                color="primary"
                                text-color="white"
                                class="mr-4"
                                small
                              >
                                {{ filteredStudents.length }} Students
                              </v-chip>
                              <v-btn
                                icon
                                small
                                @click="loadStudents"
                                :loading="loading"
                                class="refresh-btn"
                              >
                                <v-icon>mdi-refresh</v-icon>
                              </v-btn>
                            </div>
                          </div>
                        </v-card-title>

                        <!-- Action Buttons for Bulk Operations -->
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
                                    selectedStudents.length <
                                      filteredStudents.length
                                  "
                                  @change="toggleSelectAll"
                                  color="primary"
                                  hide-details
                                  class="mr-4"
                                ></v-checkbox>
                                <span class="text-body-2">
                                  {{ selectedStudents.length }} of
                                  {{ filteredStudents.length }} students
                                  selected
                                </span>
                              </div>
                            </v-col>
                            <v-col cols="12" md="6">
                              <div
                                class="d-flex justify-end action-button-container"
                              >
                                <v-btn
                                  color="success"
                                  size="small"
                                  class="mr-3 action-button promote-btn"
                                  :disabled="selectedStudents.length === 0"
                                  @click="showPromoteDialog = true"
                                  prepend-icon="mdi-arrow-up"
                                  elevation="2"
                                  rounded
                                >
                                  <span class="font-weight-bold">PROMOTE</span>
                                </v-btn>
                                <v-btn
                                  color="info"
                                  size="small"
                                  class="mr-3 action-button print-btn"
                                  :disabled="selectedStudents.length === 0"
                                  @click="showPrintDialog = true"
                                  prepend-icon="mdi-printer"
                                  elevation="2"
                                  rounded
                                >
                                  <span class="font-weight-bold">PRINT</span>
                                </v-btn>

                                <v-btn
                                  color="success"
                                  size="small"
                                  class="mr-3 action-button export-btn"
                                  :disabled="selectedStudents.length === 0"
                                  @click="showExportDialog = true"
                                  prepend-icon="mdi-download"
                                  elevation="2"
                                  rounded
                                >
                                  <span class="font-weight-bold">EXPORT</span>
                                </v-btn>

                                <v-btn
                                  color="warning"
                                  size="small"
                                  class="mr-3 action-button mark-left-btn"
                                  :disabled="selectedStudents.length === 0"
                                  @click="showLeftDialog = true"
                                  elevation="2"
                                  rounded
                                >
                                  <span class="font-weight-bold"
                                    >MARK LEFT</span
                                  >
                                </v-btn>

                                <v-btn
                                  color="secondary"
                                  size="small"
                                  class="mr-3 action-button fee-slip-btn"
                                  :disabled="selectedStudents.length === 0"
                                  :loading="generatingFeeSlips"
                                  @click="generateBulkFeeSlipsMethod"
                                  elevation="2"
                                  rounded
                                >
                                  <span class="font-weight-bold"
                                    >GENERATE FEE SLIPS</span
                                  >
                                </v-btn>
                              </div>
                            </v-col>
                          </v-row>
                        </div>

                        <v-data-table
                          v-model="selectedStudents"
                          :headers="headers"
                          :items="filteredStudents"
                          :loading="loading"
                          :search="searchQuery"
                          sort-by="created_at"
                          sort-desc
                          class="students-table"
                          :items-per-page="10"
                          :items-per-page-options="[10, 25, 50]"
                          loading-text="Loading students..."
                          no-data-text="No students found"
                          no-results-text="No students match your search"
                          show-select
                          item-key="id"
                        >
                          <template v-slot:item.name="{ item }">
                            <div class="d-flex align-center">
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
                              <div>
                                <div class="font-weight-medium">
                                  {{ item.name }}
                                </div>
                                <div class="text-caption text-medium-emphasis">
                                  ID: {{ item.id }}
                                </div>
                              </div>
                            </div>
                          </template>

                          <template v-slot:item.gender="{ item }">
                            <v-chip
                              :color="item.gender === 'Male' ? 'blue' : 'pink'"
                              text-color="white"
                              small
                              class="font-weight-medium"
                            >
                              <v-icon left x-small>
                                {{
                                  item.gender === "Male"
                                    ? "mdi-gender-male"
                                    : "mdi-gender-female"
                                }}
                              </v-icon>
                              {{ item.gender }}
                            </v-chip>
                          </template>

                          <template v-slot:item.class_name="{ item }">
                            <v-chip
                              color="primary"
                              outlined
                              small
                              class="font-weight-medium"
                            >
                              <v-icon left x-small>mdi-school</v-icon>
                              {{ item.class_name || "Not Assigned" }}
                            </v-chip>
                          </template>

                          <template v-slot:item.date_of_birth="{ item }">
                            <span class="text-body-2">{{
                              formatDate(item.date_of_birth)
                            }}</span>
                          </template>

                          <template v-slot:item.admission_date="{ item }">
                            <span class="text-body-2">{{
                              formatDate(item.admission_date)
                            }}</span>
                          </template>

                          <template v-slot:item.monthly_fee="{ item }">
                            <div class="text-right">
                              <span class="font-weight-bold primary--text">
                                ₨{{
                                  item && item.monthly_fee
                                    ? parseFloat(
                                        item.monthly_fee
                                      ).toLocaleString()
                                    : "0"
                                }}
                              </span>
                              <div class="text-caption text-medium-emphasis">
                                Monthly Fee
                              </div>
                            </div>
                          </template>

                          <template v-slot:item.arrears_amount="{ item }">
                            <div class="text-right">
                              <span
                                class="font-weight-bold"
                                :class="{
                                  'error--text':
                                    (parseFloat(item?.arrears_amount) || 0) > 0,
                                  'success--text':
                                    (parseFloat(item?.arrears_amount) || 0) ===
                                    0,
                                }"
                              >
                                ₨{{
                                  item && item.arrears_amount
                                    ? parseFloat(
                                        item.arrears_amount
                                      ).toLocaleString()
                                    : "0"
                                }}
                              </span>
                              <div class="text-caption text-medium-emphasis">
                                Arrears
                              </div>
                            </div>
                          </template>

                          <template v-slot:item.fee_status="{ item }">
                            <div class="text-center">
                              <v-chip
                                :color="getFeeStatusColor(item)"
                                text-color="white"
                                small
                                class="font-weight-medium"
                              >
                                <v-icon left x-small>
                                  {{ getFeeStatusIcon(item) }}
                                </v-icon>
                                {{ getFeeStatusText(item) }}
                              </v-chip>
                            </div>
                          </template>

                          <template v-slot:item.actions="{ item }">
                            <div class="d-flex">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    icon
                                    x-small
                                    color="primary"
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
                                    color="red"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="deleteStudent(item)"
                                  >
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </template>
                                <span>Delete Student</span>
                              </v-tooltip>
                            </div>
                          </template>
                        </v-data-table>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Student Details Dialog -->
    <v-dialog v-model="showStudentDialog" max-width="800">
      <v-card v-if="selectedStudent" class="student-details-dialog">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5 font-weight-bold">Student Details</span>
          <v-btn icon @click="showStudentDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-row>
            <!-- Student Profile Section -->
            <v-col cols="12" class="text-center mb-6">
              <v-avatar size="120" class="mb-4">
                <v-img
                  :src="getStudentAvatar(selectedStudent)"
                  alt="Student Avatar"
                  cover
                  @error="handleImageError"
                  @load="handleImageLoad"
                  :lazy-src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedStudent?.name || 'Unknown'
                  )}&background=1976d2&color=fff&size=200`"
                ></v-img>
              </v-avatar>
              <h3 class="text-h4 mb-2 primary--text font-weight-bold">
                {{ selectedStudent.name }}
              </h3>
              <p class="text-subtitle-1 text-medium-emphasis">
                Student ID: {{ selectedStudent.id }}
              </p>
            </v-col>

            <!-- Personal Information -->
            <v-col cols="12" md="6">
              <v-card class="info-card" elevation="0" rounded>
                <v-card-title class="text-h6 font-weight-bold primary--text">
                  Personal Information
                </v-card-title>
                <v-card-text>
                  <v-list dense>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary"
                          >mdi-card-account-details</v-icon
                        >
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Admission Number</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        selectedStudent.admission_number || "Not Assigned"
                      }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-account-check</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Status</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <v-chip
                          :color="
                            selectedStudent.status === 'Active'
                              ? 'success'
                              : 'warning'
                          "
                          text-color="white"
                          small
                        >
                          <v-icon left x-small>
                            {{
                              selectedStudent.status === "Active"
                                ? "mdi-check-circle"
                                : "mdi-alert-circle"
                            }}
                          </v-icon>
                          {{ selectedStudent.status }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-account</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Father's Name</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        selectedStudent.father_name
                      }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary"
                          >mdi-card-account-details</v-icon
                        >
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >CNIC</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        selectedStudent.cnic
                      }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-phone</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Phone</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        selectedStudent.phone
                      }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-gender-male-female</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Gender</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <v-chip
                          :color="
                            selectedStudent.gender === 'Male' ? 'blue' : 'pink'
                          "
                          text-color="white"
                          small
                        >
                          <v-icon left x-small>
                            {{
                              selectedStudent.gender === "Male"
                                ? "mdi-gender-male"
                                : "mdi-gender-female"
                            }}
                          </v-icon>
                          {{ selectedStudent.gender }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-calendar</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Date of Birth</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        formatDate(selectedStudent.date_of_birth)
                      }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-calendar-plus</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Admission Date</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        formatDate(selectedStudent.admission_date)
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Academic & Financial Information -->
            <v-col cols="12" md="6">
              <v-card class="info-card" elevation="0" rounded>
                <v-card-title class="text-h6 font-weight-bold primary--text">
                  Academic & Financial Information
                </v-card-title>
                <v-card-text>
                  <v-list dense>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-school</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Class</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <v-chip color="primary" outlined small>
                          <v-icon left x-small>mdi-school</v-icon>
                          {{ selectedStudent.class_name || "Not Assigned" }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-cash</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Admission Fee</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Rs{{
                          selectedStudent &&
                          selectedStudent.admission_fee_amount
                            ? parseFloat(
                                selectedStudent.admission_fee_amount
                              ).toLocaleString()
                            : "0"
                        }}
                        <v-chip
                          v-if="selectedStudent.is_admission_paid"
                          color="success"
                          outlined
                          x-small
                          class="ml-2"
                        >
                          Paid
                        </v-chip>
                        <v-chip
                          v-else-if="selectedStudent.admission_fee_amount > 0"
                          color="warning"
                          outlined
                          x-small
                          class="ml-2"
                        >
                          Unpaid
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-cash-multiple</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Monthly Fee</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Rs{{
                          selectedStudent && selectedStudent.monthly_fee
                            ? parseFloat(
                                selectedStudent.monthly_fee
                              ).toLocaleString()
                            : "0"
                        }}</v-list-item-subtitle
                      >
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-bus</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Transport Fee</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Rs{{
                          selectedStudent && selectedStudent.transport_fee
                            ? parseFloat(
                                selectedStudent.transport_fee
                              ).toLocaleString()
                            : "0"
                        }}
                        <v-chip
                          v-if="selectedStudent.transport_fee > 0"
                          color="success"
                          outlined
                          x-small
                          class="ml-2"
                        >
                          Active
                        </v-chip>
                        <v-chip
                          v-else
                          color="grey"
                          outlined
                          x-small
                          class="ml-2"
                        >
                          Inactive
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-cash-plus</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Annual Fund</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Rs{{
                          selectedStudent && selectedStudent.annual_fund
                            ? parseFloat(
                                selectedStudent.annual_fund
                              ).toLocaleString()
                            : "0"
                        }}</v-list-item-subtitle
                      >
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-calculator</v-icon>
                      </template>
                      <v-list-item-title class="font-weight-medium"
                        >Total Monthly Fee</v-list-item-title
                      >
                      <v-list-item-subtitle
                        class="success--text font-weight-bold"
                      >
                        Rs{{
                          (
                            parseFloat(selectedStudent.monthly_fee || 0) +
                            parseFloat(selectedStudent.transport_fee || 0)
                          ).toLocaleString()
                        }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Address Information -->
            <v-col cols="12">
              <v-card class="info-card" elevation="0" rounded>
                <v-card-title class="text-h6 font-weight-bold primary--text">
                  Address Information
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    :value="selectedStudent.address"
                    readonly
                    outlined
                    rows="3"
                    class="address-textarea"
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            @click="showStudentDialog = false"
            class="mr-3"
          >
            CLOSE
          </v-btn>
          <v-btn color="primary" @click="editStudent(selectedStudent)">
            EDIT STUDENT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Student Dialog -->
    <v-dialog v-model="showEditDialog" max-width="800">
      <v-card v-if="editingStudent" class="edit-student-dialog">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5 font-weight-bold">Edit Student</span>
          <v-btn icon @click="showEditDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="editForm" v-model="editFormValid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.name"
                  label="Student Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.father_name"
                  label="Father's Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.cnic"
                  label="CNIC"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.phone"
                  label="Phone"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editingStudent.gender"
                  :items="['Male', 'Female']"
                  label="Gender"
                  outlined
                  class="promote-class-select"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedClass"
                  :items="allClasses"
                  item-text="name"
                  item-value="id"
                  label="Class"
                  outlined
                  persistent-hint
                  hint="Select the student's class"
                  @change="onClassSelected"
                  :loading="!allClasses.length"
                  :disabled="!allClasses.length"
                  return-object
                  class="promote-class-select"
                ></v-select>
                <!-- Debug info - can be removed once confirmed working -->
                <div
                  v-if="showEditDialog"
                  style="font-size: 12px; color: #666; margin-top: 5px"
                >
                  Classes loaded: {{ allClasses.length }} | Selected:
                  {{ selectedClass?.name || "None" }}
                </div>

                <!-- Fallback elements - can be removed since dropdown is working -->
                <v-text-field
                  v-if="showEditDialog && !allClasses.length && false"
                  v-model="editingStudent.class_id"
                  label="Class ID (Fallback)"
                  outlined
                  type="number"
                  :rules="[(v) => !!v || 'Class is required']"
                  required
                  hint="Enter class ID manually if dropdown not working"
                  persistent-hint
                ></v-text-field>
                <!-- Manual load classes button -->
                <v-btn
                  v-if="showEditDialog && !allClasses.length && false"
                  @click="loadAllClasses"
                  color="primary"
                  size="small"
                  style="margin-top: 10px"
                >
                  Load Classes
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.date_of_birth"
                  label="Date of Birth"
                  type="text"
                  outlined
                  placeholder="dd/mm/yyyy"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.admission_date"
                  label="Admission Date"
                  type="text"
                  outlined
                  placeholder="dd/mm/yyyy"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.admission_fee_amount"
                  label="Admission Fee"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.monthly_fee"
                  label="Monthly Fee"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.transport_fee"
                  label="Transport Fee"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingStudent.annual_fund"
                  label="Annual Fund"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editingStudent.address"
                  label="Address"
                  outlined
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            outlined
            @click="showEditDialog = false"
            class="mr-3"
          >
            Cancel
          </v-btn>
          <v-btn color="primary" @click="handleSaveClick" :loading="saving">
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Professional Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="700" persistent>
      <v-card class="professional-delete-dialog" elevation="24" rounded="xl">
        <!-- Professional Header with Vuetify Grid -->
        <v-card-title class="professional-header pa-0">
          <v-container fluid class="pa-0">
            <v-row align="center" no-gutters>
              <v-col cols="auto" class="pa-6">
                <v-avatar size="56" class="header-avatar" color="error">
                  <v-icon size="28" color="white">mdi-delete-alert</v-icon>
                </v-avatar>
              </v-col>
              <v-col class="pa-6 pl-0">
                <h3 class="text-h4 font-weight-bold white--text mb-2">
                  Delete Student Record
                </h3>
                <p class="text-subtitle-1 white--text opacity-90">
                  Confirm permanent removal from database
                </p>
              </v-col>
              <v-col cols="auto" class="pa-6">
                <v-btn
                  icon
                  dark
                  variant="text"
                  @click="showDeleteDialog = false"
                  class="close-btn"
                  :disabled="deleting"
                  size="large"
                >
                  <v-icon size="24">mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>

        <!-- Content Section with Vuetify Components -->
        <v-card-text class="pa-8">
          <v-row>
            <v-col cols="12">
              <!-- Student Info Card using Vuetify Card -->
              <v-card class="student-info-card mb-6" elevation="4" rounded>
                <v-card-text class="pa-6">
                  <v-row align="center">
                    <v-col cols="auto">
                      <v-avatar size="64" class="student-avatar">
                        <v-img
                          :src="getStudentAvatar(deletingStudent)"
                          alt="Student Avatar"
                          cover
                          v-if="deletingStudent"
                          @error="handleImageError"
                          @load="handleImageLoad"
                          :lazy-src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            deletingStudent?.name || 'Unknown'
                          )}&background=1976d2&color=fff&size=200`"
                        ></v-img>
                        <v-icon v-else size="32" color="grey"
                          >mdi-account</v-icon
                        >
                      </v-avatar>
                    </v-col>
                    <v-col>
                      <h4 class="text-h5 font-weight-bold primary--text mb-1">
                        {{ deletingStudent?.name || "Unknown Student" }}
                      </h4>
                      <p class="text-body-2 text-medium-emphasis mb-0">
                        Student ID: {{ deletingStudent?.id || "N/A" }} | Class:
                        {{ deletingStudent?.class_name || "Not Assigned" }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Warning Section using Vuetify Alert and List -->
              <v-alert
                type="warning"
                class="mb-6"
                border="start"
                color="warning"
                icon="mdi-alert-triangle"
              >
                <template v-slot:title>
                  <span class="text-h6 font-weight-bold"
                    >Irreversible Action</span
                  >
                </template>
                <div class="text-body-1 mt-2">
                  This action will permanently delete the student record and all
                  associated data including:
                </div>
                <v-list class="mt-3" dense>
                  <v-list-item prepend-icon="mdi-account-remove" class="px-0">
                    <v-list-item-title class="text-body-2"
                      >Student profile and personal
                      information</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-book-remove" class="px-0">
                    <v-list-item-title class="text-body-2"
                      >Academic records and attendance
                      history</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-cash-remove" class="px-0">
                    <v-list-item-title class="text-body-2"
                      >Fee records and payment history</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-file-remove" class="px-0">
                    <v-list-item-title class="text-body-2"
                      >Uploaded documents and profile images</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-alert>

              <!-- Confirmation Text with Vuetify Chip -->
              <div class="confirmation-text text-center">
                <v-chip
                  color="error"
                  size="large"
                  class="mb-4"
                  prepend-icon="mdi-alert-circle"
                >
                  <span class="font-weight-bold"
                    >Final Confirmation Required</span
                  >
                </v-chip>
                <p class="text-body-1 text-medium-emphasis">
                  Are you absolutely sure you want to proceed with deleting
                  <span class="error--text font-weight-bold">{{
                    deletingStudent?.name || "this student"
                  }}</span
                  >?
                </p>
                <p class="text-caption text-medium-emphasis mt-2">
                  This action cannot be undone and will immediately remove all
                  data from the system.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Action Buttons with Vuetify Button Groups -->
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="grey-darken-1"
            @click="showDeleteDialog = false"
            :disabled="deleting"
            class="px-8 action-btn"
            rounded
            size="large"
          >
            <v-icon left size="20">mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDelete"
            :loading="deleting"
            :disabled="deleting"
            class="px-8 action-btn"
            rounded
            size="large"
            elevation="4"
          >
            <v-icon left size="20">mdi-delete</v-icon>
            Delete Student
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Promote Students Dialog -->
    <v-dialog v-model="showPromoteDialog" max-width="500" persistent>
      <v-card
        class="promote-dialog-card"
        elevation="24"
        rounded="xl"
        style="background-color: white"
      >
        <v-card-title class="promote-dialog-header pa-6">
          <div class="d-flex align-center">
            <v-avatar size="48" color="success" class="mr-4">
              <v-icon size="24" color="white">mdi-arrow-up</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold white--text mb-1">
                Promote Students
              </h3>
              <p class="text-subtitle-2 white--text opacity-80">
                Move students to a higher class
              </p>
            </div>
          </div>
          <v-btn
            icon
            dark
            @click="showPromoteDialog = false"
            class="close-btn"
            :disabled="promoting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6" style="background-color: white">
          <div class="text-center mb-6">
            <v-icon size="64" color="success" class="mb-3"
              >mdi-account-group</v-icon
            >
            <h4 class="text-h6 font-weight-bold mb-3">
              Promote {{ selectedStudents.length }} Students
            </h4>
            <p class="text-body-2 text-medium-emphasis">
              Select the target class for promotion
            </p>
          </div>

          <v-select
            v-model="selectedPromoteClass"
            :items="allClasses"
            item-text="name"
            item-value="id"
            label="Select Target Class"
            outlined
            :rules="[(v) => !!v || 'Target class is required']"
            required
            persistent-hint
            hint="Choose the class to promote students to"
            :loading="!allClasses.length"
            :disabled="!allClasses.length"
            return-object
            class="promote-class-select"
          ></v-select>

          <v-alert type="info" class="mt-4">
            <template v-slot:prepend>
              <v-icon>mdi-information</v-icon>
            </template>
            <div class="text-body-2">
              <strong>Note:</strong> Students will be moved from
              {{ classInfo.name }} to
              {{ selectedPromoteClass?.name || "the selected class" }}.
            </div>
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0" style="background-color: white">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="grey"
            @click="showPromoteDialog = false"
            :disabled="promoting"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="promoteStudents"
            :loading="promoting"
            :disabled="promoting || !selectedPromoteClass"
            class="px-6 action-btn"
            rounded
            elevation="2"
          >
            <v-icon left>mdi-arrow-up</v-icon>
            Promote Students
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Print Students Dialog -->
    <v-dialog v-model="showPrintDialog" max-width="500" persistent>
      <v-card class="print-dialog-card" elevation="24" rounded="xl">
        <v-card-title class="print-dialog-header pa-6">
          <div class="d-flex align-center">
            <v-avatar size="48" color="info" class="mr-4">
              <v-icon size="24" color="white">mdi-printer</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold white--text mb-1">
                Print Student Records
              </h3>
              <p class="text-subtitle-2 white--text opacity-80">
                Generate printable report
              </p>
            </div>
          </div>
          <v-btn
            icon
            dark
            @click="showPrintDialog = false"
            class="close-btn"
            :disabled="printing"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="64" color="info" class="mb-3"
              >mdi-file-document</v-icon
            >
            <h4 class="text-h6 font-weight-bold mb-3">
              Print {{ selectedStudents.length }} Student Records
            </h4>
            <p class="text-body-2 text-medium-emphasis">
              Select fields to include in the print report
            </p>
          </div>

          <v-card outlined class="pa-4 mb-4">
            <div class="text-h6 mb-3">Fee Status Filter</div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-radio-group
                  v-model="printFeeStatusFilter"
                  color="info"
                  hide-details
                >
                  <v-radio value="all" label="All Students"></v-radio>
                  <v-radio value="paid" label="Paid Students Only"></v-radio>
                  <v-radio
                    value="unpaid"
                    label="Unpaid Students Only"
                  ></v-radio>
                  <v-radio
                    value="partial"
                    label="Partial Payment Students Only"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>

          <v-card outlined class="pa-4 mb-4">
            <div class="text-h6 mb-3">Available Fields</div>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                v-for="field in availableFields"
                :key="field.value"
              >
                <v-checkbox
                  v-model="selectedFields"
                  :value="field.value"
                  :label="field.text"
                  color="info"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="grey"
            @click="showPrintDialog = false"
            :disabled="printing"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="info"
            @click="printStudents"
            :loading="printing"
            :disabled="printing || selectedFields.length === 0"
            class="px-6 action-btn"
            rounded
            elevation="2"
          >
            <v-icon left>mdi-printer</v-icon>
            Print Records ({{ selectedFields.length }} fields)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Export Students Dialog -->
    <v-dialog v-model="showExportDialog" max-width="500" persistent>
      <v-card class="print-dialog-card" elevation="24" rounded="xl">
        <v-card-title class="print-dialog-header pa-6">
          <div class="d-flex align-center">
            <v-avatar size="48" color="success" class="mr-4">
              <v-icon size="24" color="white">mdi-download</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold white--text mb-1">
                Export Student Records
              </h3>
              <p class="text-subtitle-2 white--text opacity-80">
                Generate CSV export
              </p>
            </div>
          </div>
          <v-btn
            icon
            dark
            @click="showExportDialog = false"
            class="close-btn"
            :disabled="exporting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="64" color="success" class="mb-3"
              >mdi-file-excel</v-icon
            >
            <h4 class="text-h6 font-weight-bold mb-3">
              Export {{ selectedStudents.length }} Student Records
            </h4>
            <p class="text-body-2 text-medium-emphasis">
              Select fields to include in the CSV export
            </p>
          </div>

          <v-card outlined class="pa-4 mb-4">
            <div class="text-h6 mb-3">Fee Status Filter</div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-radio-group
                  v-model="exportFeeStatusFilter"
                  color="success"
                  hide-details
                >
                  <v-radio value="all" label="All Students"></v-radio>
                  <v-radio value="paid" label="Paid Students Only"></v-radio>
                  <v-radio
                    value="unpaid"
                    label="Unpaid Students Only"
                  ></v-radio>
                  <v-radio
                    value="partial"
                    label="Partial Payment Students Only"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>

          <v-card outlined class="pa-4 mb-4">
            <div class="text-h6 mb-3">Available Fields</div>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                v-for="field in availableFields"
                :key="field.value"
              >
                <v-checkbox
                  v-model="selectedExportFields"
                  :value="field.value"
                  :label="field.text"
                  color="success"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="grey"
            @click="showExportDialog = false"
            :disabled="exporting"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="performBulkExport"
            :loading="exporting"
            :disabled="selectedExportFields.length === 0"
            class="px-6 action-btn"
            rounded
            elevation="2"
          >
            <v-icon left>mdi-download</v-icon>
            Export ({{ selectedExportFields.length }} fields)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mark Students Left Dialog -->
    <v-dialog v-model="showLeftDialog" max-width="500" persistent>
      <v-card class="left-dialog-card" elevation="24" rounded="xl">
        <v-card-title class="left-dialog-header pa-6">
          <div class="d-flex align-center">
            <v-avatar size="48" color="warning" class="mr-4">
              <v-icon size="24" color="white">mdi-account-remove</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold white--text mb-1">
                Mark Students Left
              </h3>
              <p class="text-subtitle-2 white--text opacity-80">
                Move students to left status
              </p>
            </div>
          </div>
          <v-btn
            icon
            dark
            @click="showLeftDialog = false"
            class="close-btn"
            :disabled="markingLeft"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="64" color="warning" class="mb-3"
              >mdi-account-remove</v-icon
            >
            <h4 class="text-h6 font-weight-bold mb-3">
              Mark {{ selectedStudents.length }} Students as Left
            </h4>
            <p class="text-body-2 text-medium-emphasis">
              Students will be moved to the left students list
            </p>
          </div>

          <v-alert type="warning" class="mb-4">
            <template v-slot:prepend>
              <v-icon>mdi-alert-triangle</v-icon>
            </template>
            <div class="text-body-2">
              <strong>Note:</strong> Students will be marked as left but not
              deleted from the database. They can be viewed in the left students
              section.
            </div>
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="grey"
            @click="showLeftDialog = false"
            :disabled="markingLeft"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="warning"
            @click="markStudentsLeft"
            :loading="markingLeft"
            :disabled="markingLeft"
            class="px-6 action-btn"
            rounded
            elevation="2"
          >
            <v-icon left>mdi-account-remove</v-icon>
            Mark as Left
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Fee Slip Dialog -->
    <v-dialog v-model="showFeeSlipDialogFlag" max-width="800" persistent>
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          Fee Slip Preview
        </v-card-title>

        <v-card-text v-if="selectedFeeSlip" class="pt-4">
          <v-row>
            <v-col cols="12">
              <div style="height: 600px; border: 1px solid #ddd">
                <iframe
                  v-if="selectedFeeSlip.id"
                  :src="`http://localhost:8081/api/fee-slips/${selectedFeeSlip.id}/pdf-with-barcode`"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border: none"
                ></iframe>
                <div v-else class="text-center pa-8">
                  <v-icon size="64" color="grey">mdi-file-pdf-box</v-icon>
                  <p class="text-h6 mt-4">Fee slip data available</p>
                  <p class="text-body-2">
                    Click "Generate PDF" to view the new design
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showFeeSlipDialogFlag = false">
            Close
          </v-btn>
          <v-btn color="info" @click="generateFeeSlipWithBarcode">
            <v-icon left>mdi-file-pdf-box</v-icon>
            Generate PDF
          </v-btn>
          <v-btn color="success" @click="printFeeSlip">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.barcode-container {
  text-align: center;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.barcode-text {
  font-family: "Courier New", monospace;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.barcode-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  height: 40px;
  background-color: white;
  padding: 5px;
  border-radius: 2px;
}

.barcode-bar {
  display: inline-block;
  background-color: #000;
  color: #000;
  font-family: monospace;
  font-size: 8px;
  line-height: 1;
  min-width: 2px;
}

.barcode-canvas {
  border: 1px solid #ddd;
  background: white;
  margin: 10px auto;
  display: block;
}
</style>

<script>
import axios from "axios";
import JsBarcode from "jsbarcode";
import { getAuthData } from "@/utils/cookies";

export default {
  name: "ClassStudents",
  data() {
    return {
      loading: false,
      students: [],
      classInfo: {},
      searchQuery: "",
      selectedGender: null,
      showStudentDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showPromoteDialog: false,
      showPrintDialog: false,
      showExportDialog: false,
      showLeftDialog: false,
      selectedStudent: null,
      editingStudent: null,
      deletingStudent: null,
      selectedClass: null,
      selectedPromoteClass: null,
      editFormValid: false,
      saving: false,
      deleting: false,
      promoting: false,
      printing: false,
      exporting: false,
      markingLeft: false,
      generatingFeeSlip: null,
      generatingFeeSlips: false,
      selectedStudents: [],
      selectedFields: [],
      selectedExportFields: [],
      printFeeStatusFilter: "all",
      exportFeeStatusFilter: "all",
      availableFields: [
        { text: "Student Name", value: "name" },
        { text: "Admission Number", value: "admission_number" },
        { text: "Father's Name", value: "father_name" },
        { text: "CNIC", value: "cnic" },
        { text: "Phone", value: "phone" },
        { text: "Gender", value: "gender" },
        { text: "Class", value: "class_name" },
        { text: "Date of Birth", value: "date_of_birth" },
        { text: "Admission Date", value: "admission_date" },
        { text: "Monthly Fee", value: "monthly_fee" },
        { text: "Fee Status", value: "fee_status" },
        { text: "Address", value: "address" },
      ],
      allClasses: [],
      showFeeSlipDialogFlag: false,
      selectedFeeSlip: null,
      feeStatusData: null,

      bulkFeeSlipResults: [],
      bulkConfirmDialog: {
        show: false,
        title: "",
        subtitle: "",
        message: "",
        confirmText: "",
        cancelText: "",
        confirmIcon: "",
        type: "",
        warning: "",
        warningTitle: "",
        loading: false,
        onConfirm: null,
        onCancel: null,
      },
      headers: [
        { text: "Student", value: "name", sortable: false, width: "250px" },
        { text: "Father's Name", value: "father_name", width: "200px" },
        { text: "CNIC", value: "cnic", width: "150px" },
        { text: "Phone", value: "phone", width: "150px" },
        { text: "Gender", value: "gender", width: "120px" },
        { text: "Class", value: "class_name", width: "120px" },
        { text: "Date of Birth", value: "date_of_birth", width: "130px" },
        { text: "Admission Date", value: "admission_date", width: "130px" },
        {
          text: "Monthly Fee",
          value: "monthly_fee",
          align: "right",
          width: "150px",
        },
        {
          text: "Arrears",
          value: "arrears_amount",
          align: "right",
          width: "150px",
        },
        {
          text: "Fee Status",
          value: "fee_status",
          align: "center",
          width: "120px",
        },
        { text: "Actions", value: "actions", sortable: false, width: "120px" },
      ],
    };
  },
  computed: {
    classId() {
      // Convert class name from URL to find the class ID
      const className = this.$route.params.className.replace(/-/g, " ");
      console.log("URL className:", className);
      console.log("Available classes:", this.allClasses);

      // First try exact match (case insensitive)
      let classItem = this.allClasses.find(
        (cls) => cls.name.toLowerCase() === className.toLowerCase()
      );

      // If not found, try partial match (case insensitive)
      if (!classItem) {
        classItem = this.allClasses.find(
          (cls) =>
            cls.name.toLowerCase().includes(className.toLowerCase()) ||
            className.toLowerCase().includes(cls.name.toLowerCase())
        );
      }

      // If still not found, try matching just the class number and color
      if (!classItem) {
        const urlParts = className.toLowerCase().split(" ");
        classItem = this.allClasses.find((cls) => {
          const clsParts = cls.name.toLowerCase().split(" ");
          return urlParts.every((part) =>
            clsParts.some((clsPart) => clsPart.includes(part))
          );
        });
      }

      console.log("Found classItem:", classItem);
      const result = classItem ? classItem.id : null;
      console.log("Returning classId:", result);
      return result;
    },
    filteredStudents() {
      console.log("=== FILTERED STUDENTS ===");
      console.log("Total students:", this.students.length);
      console.log("classId:", this.classId);
      console.log("All students:", this.students);

      let filtered = this.students.filter(
        (student) =>
          (this.classId ? student.class_id == this.classId : true) &&
          student.status === "Active"
      );
      console.log("Students after class and status filter:", filtered);

      if (this.searchQuery) {
        filtered = filtered.filter((student) =>
          student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedGender) {
        filtered = filtered.filter(
          (student) => student.gender === this.selectedGender
        );
      }

      console.log("Final filtered students:", filtered);
      return filtered;
    },
    genderOptions() {
      return ["Male", "Female"];
    },
    classNames() {
      return this.allClasses.map((cls) => ({
        id: cls.id,
        name: cls.name,
      }));
    },
    selectAll: {
      get() {
        return (
          this.selectedStudents.length === this.filteredStudents.length &&
          this.filteredStudents.length > 0
        );
      },
      set(value) {
        this.selectedStudents = value ? [...this.filteredStudents] : [];
      },
    },
  },
  watch: {
    allClasses: {
      handler(newClasses) {
        console.log("Classes updated, checking if we need to reload data...");
        if (newClasses.length > 0 && this.classId) {
          console.log(
            "Classes loaded and classId found, reloading students..."
          );
          this.loadStudents();
          this.loadClassInfo();
        }
      },
      immediate: true,
    },
    showEditDialog: {
      handler(newVal) {
        if (newVal && !this.allClasses.length) {
          console.log("Dialog opened but no classes loaded, loading now...");
          this.loadAllClasses();
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    console.log("Component mounted, starting data loading...");
    await this.loadAllClasses();
    console.log("Classes loaded, now loading students...");
    await this.loadStudents();
    console.log("Students loaded, now loading class info...");
    await this.loadClassInfo();
    console.log("Class info loaded, now loading fee status...");
    await this.loadFeeStatus();
    console.log("All data loaded successfully!");
  },
  methods: {
    // Load fee status for students in this class
    async loadFeeStatus() {
      if (!this.classId) {
        console.log("No class ID available, skipping fee status load");
        return;
      }

      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get(
          `/api/students/classes/${this.classId}/fee-status`,
          { headers }
        );

        this.feeStatusData = response.data;
        console.log("Fee status loaded:", this.feeStatusData);
      } catch (error) {
        console.error("Error loading fee status:", error);
        this.feeStatusData = null;
      }
    },

    // Fee slip generation methods
    async generateFeeSlip(student) {
      console.log("generateFeeSlip called with student:", student);

      if (!student || !student.id) {
        console.error("Invalid student data:", student);
        this.$toast.error("Invalid student data");
        return;
      }

      this.generatingFeeSlip = student.id;

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          console.error("No user token found");
          this.$toast.error("Please log in to generate fee slips");
          return;
        }

        console.log("User token:", user.token);
        console.log("Student ID:", student.id);
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.post(
          "/api/fee-slips/generate",
          {
            student_id: student.id,
            month: month,
            year: year,
          },
          {
            headers: headers,
          }
        );

        console.log("Fee slip generation response:", response.data);

        // Check if fee slip already existed or was newly generated
        if (response.data.exists) {
          if (response.data.is_fully_paid) {
            this.$toast.success("Fee slip exists - No Dues (Fully Paid)");
          } else {
            this.$toast.info("Fee slip exists - Partial Payment");
          }
        } else {
          this.$toast.success("Fee slip generated successfully!");
        }

        // Handle both old and new response structures
        let feeSlipData;
        console.log("🔍 Frontend Debug - Generation Response:", response.data);

        if (response.data.feeSlip) {
          // Use the fee slip data from the generation response (new structure)
          feeSlipData = response.data.feeSlip;
          console.log("✅ Frontend using feeSlip data:", feeSlipData);
        } else if (response.data.dynamic_fee_slip) {
          // Use the dynamic fee slip data from the generation response (old structure)
          feeSlipData = response.data.dynamic_fee_slip;
          console.log("✅ Frontend using dynamic_fee_slip data:", feeSlipData);
        } else if (response.data.slip_id) {
          // Only call PDF endpoint if slip_id is available (old structure)
          console.log("⚠️ No feeSlip data, calling PDF endpoint");
          const feeSlipResponse = await axios.get(
            `/api/fee-slips/${response.data.slip_id}/pdf`,
            {
              headers: headers,
            }
          );
          console.log(
            "🔍 Frontend Debug - PDF Response:",
            feeSlipResponse.data
          );
          feeSlipData = feeSlipResponse.data.feeSlip;
          console.log("✅ Frontend using PDF endpoint data:", feeSlipData);
        } else {
          console.error("❌ No fee slip data found in response");
          this.$toast.error("No fee slip data received");
          return;
        }

        console.log("🔍 Frontend Debug - Final feeSlipData:", feeSlipData);

        // Generate PDF with barcode design
        if (feeSlipData && feeSlipData.id) {
          try {
            // Open PDF in new tab for browser display
            const pdfUrl = `http://localhost:8081/api/fee-slips/${feeSlipData.id}/pdf-with-barcode`;
            window.open(pdfUrl, "_blank");

            this.$toast.success("Fee slip PDF opened in new tab!");
          } catch (pdfError) {
            console.error("Error generating PDF with barcode:", pdfError);
            // Fallback to showing dialog
            this.showFeeSlipDialog(feeSlipData);
          }
        } else if (feeSlipData && feeSlipData.slip_id) {
          // If we have slip_id but no id, try to get the fee slip by slip_id
          try {
            const authData = getAuthData();
            const headers =
              authData && authData.token
                ? { Authorization: `Bearer ${authData.token}` }
                : {};

            const feeSlipResponse = await axios.get(
              `/api/fee-slips/slip/${feeSlipData.slip_id}`,
              { headers: headers }
            );

            if (feeSlipResponse.data && feeSlipResponse.data.id) {
              const pdfUrl = `http://localhost:8081/api/fee-slips/${feeSlipResponse.data.id}/pdf-with-barcode`;
              window.open(pdfUrl, "_blank");
              this.$toast.success("Fee slip PDF opened in new tab!");
            } else {
              this.showFeeSlipDialog(feeSlipData);
            }
          } catch (error) {
            console.error("Error getting fee slip by slip_id:", error);
            this.showFeeSlipDialog(feeSlipData);
          }
        } else {
          // Display fee slip data in a dialog as fallback
          this.showFeeSlipDialog(feeSlipData);
        }
      } catch (error) {
        console.error("Error generating fee slip:", error);
        console.error("Error details:", error.response?.data);

        let errorMessage = "Failed to generate fee slip";

        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }

        // Check if it's an authentication error
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.$toast.error("Authentication failed. Please log in again.");
          // Don't redirect, just show error
          return;
        }

        if (errorMessage.includes("already exists")) {
          this.$toast.warning(
            "Fee slip already exists for this student and month."
          );
        } else {
          this.$toast.error(errorMessage);
        }
      } finally {
        this.generatingFeeSlip = null;
      }
    },

    showFeeSlipDialog(feeSlip) {
      console.log("🔍 Frontend Debug - showFeeSlipDialog received:", feeSlip);

      if (!feeSlip) {
        console.error("❌ No fee slip data provided to showFeeSlipDialog");
        this.$toast.error("No fee slip data to display");
        return;
      }

      this.selectedFeeSlip = feeSlip;
      console.log(
        "🔍 Frontend Debug - selectedFeeSlip set to:",
        this.selectedFeeSlip
      );

      this.showFeeSlipDialogFlag = true;
    },

    generateBarcode(slipId) {
      try {
        const canvas = document.getElementById(`barcode-${slipId}`);
        if (canvas) {
          JsBarcode(canvas, slipId, {
            format: "CODE128",
            width: 2,
            height: 50,
            displayValue: true,
            fontSize: 14,
            margin: 10,
          });
        }
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    },

    async printAllFeeSlips() {
      const successfulFeeSlips = this.bulkFeeSlipResults.filter(
        (r) => r.success && r.feeSlip
      );
      if (successfulFeeSlips.length === 0) {
        this.$toast.error("No fee slips to print");
        return;
      }

      // Use the new bulk educators endpoint
      try {
        const studentIds = successfulFeeSlips.map((result) => result.studentId);

        // Use axios to POST the student IDs to the bulk educators endpoint
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Make the POST request to get the PDF
        const response = await axios.post(
          "/api/fee-slips/bulk-educators",
          { student_ids: studentIds },
          {
            headers: headers,
            responseType: "blob", // Important for PDF download
          }
        );

        // Create blob URL and open in new tab
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");

        this.$toast.success("THE EDUCATORS Bulk Fee Slips opened in new tab!");
      } catch (error) {
        console.error("Error opening bulk fee slips:", error);
        this.$toast.error("Failed to open bulk fee slips");
      }
    },

    printFeeSlip() {
      console.log(
        "🔍 Frontend Debug - printFeeSlip using selectedFeeSlip:",
        this.selectedFeeSlip
      );

      if (!this.selectedFeeSlip || !this.selectedFeeSlip.id) {
        console.error("Invalid fee slip data:", this.selectedFeeSlip);
        this.$toast.error("Invalid fee slip data");
        return;
      }

      try {
        // Open THE EDUCATORS PDF in new tab for browser display
        const pdfUrl = `/api/fee-slips/${this.selectedFeeSlip.id}/pdf-educators`;
        window.open(pdfUrl, "_blank");

        this.$toast.success("THE EDUCATORS Fee slip PDF opened in new tab!");
      } catch (error) {
        console.error("Error generating PDF:", error);
        this.$toast.error("Failed to generate PDF");
      }
    },

    generateFeeSlipWithBarcode() {
      console.log(
        "🔍 Frontend Debug - generateFeeSlipWithBarcode using selectedFeeSlip:",
        this.selectedFeeSlip
      );

      if (!this.selectedFeeSlip || !this.selectedFeeSlip.id) {
        console.error("Invalid fee slip data:", this.selectedFeeSlip);
        this.$toast.error("Invalid fee slip data");
        return;
      }

      try {
        // Open THE EDUCATORS PDF in new tab for browser display
        const pdfUrl = `/api/fee-slips/${this.selectedFeeSlip.id}/pdf-educators`;
        window.open(pdfUrl, "_blank");

        this.$toast.success("THE EDUCATORS Fee slip PDF opened in new tab!");
      } catch (error) {
        console.error("Error generating PDF with barcode:", error);
        this.$toast.error("Failed to generate PDF");
      }
    },

    async generateBulkFeeSlipsMethod() {
      console.log("🔍 generateBulkFeeSlipsMethod called");

      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to generate fee slips");
        return;
      }

      this.generatingFeeSlips = true;
      try {
        const authData = getAuthData();
        console.log("🔍 Auth data:", authData);

        if (!authData || !authData.token) {
          this.$toast.error("Please log in to generate fee slips");
          return;
        }

        console.log(
          `Generating fee slips for ${this.selectedStudents.length} students`
        );

        // First, generate fee slips for each selected student
        const promises = this.selectedStudents.map(async (student) => {
          try {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            console.log("🔧 Generating fee slip for student:", {
              name: student.name,
              id: student.id,
              type: typeof student.id,
            });

            const authData = getAuthData();
            const headers =
              authData && authData.token
                ? { Authorization: `Bearer ${authData.token}` }
                : {};

            console.log("🔍 Making API call for student:", student.id);
            console.log("🔍 Request payload:", {
              student_id: student.id,
              month: month,
              year: year,
            });
            const response = await axios.post(
              "/api/fee-slips/generate",
              {
                student_id: student.id,
                month: month,
                year: year,
              },
              {
                headers: headers,
              }
            );
            console.log("🔍 API response received for student:", student.id);
            console.log("🔍 Bulk Generation Response:", response.data);
            console.log("🔍 Response structure:", {
              hasFeeSlip: !!response.data.feeSlip,
              hasPaymentStatus: !!response.data.payment_status,
              responseKeys: Object.keys(response.data),
              feeSlipKeys: response.data.feeSlip
                ? Object.keys(response.data.feeSlip)
                : null,
            });

            // Check if feeSlip exists in response (existing fee slip)
            if (response.data.feeSlip) {
              // Existing fee slip structure
              const feeSlipData = {
                id: response.data.feeSlip.id || `temp-${student.id}`,
                slip_id:
                  response.data.feeSlip.slip_id ||
                  `FS-${student.id}-${Date.now()}`,
                student_name: student.name,
                admission_number: student.admission_number,
                father_name: student.father_name,
                class_name: student.class_name,
                arrears_amount: response.data.feeSlip?.arrears_amount || 0,
                total_amount:
                  response.data.payment_status?.current_month_remaining ||
                  response.data.feeSlip?.total_amount ||
                  student.monthly_fee,
                due_date:
                  response.data.feeSlip?.due_date ||
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    10
                  ),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                // Current month payment information
                current_month_expected:
                  response.data.payment_status?.current_month_expected || 0,
                current_month_paid:
                  response.data.payment_status?.current_month_paid || 0,
                current_month_remaining:
                  response.data.payment_status?.current_month_remaining || 0,
                // Auto-arrears information
                is_past_due_date:
                  response.data.payment_status?.is_past_due_date || false,
                auto_arrears_added:
                  response.data.payment_status?.auto_arrears_added || false,
              };

              return {
                success: true,
                student: student.name,
                studentId: student.id,
                exists: response.data.exists || false,
                feeSlip: feeSlipData,
              };
            } else if (response.data.slip_id) {
              // New fee slip creation structure
              console.log("🔍 New fee slip created, fetching complete data...");

              // Fetch the complete fee slip data using the new slip_id
              try {
                const fetchResponse = await axios.get(
                  `/api/fee-slips/${response.data.slip_id}`,
                  { headers: headers }
                );

                if (fetchResponse.data.feeSlip) {
                  const feeSlipData = {
                    id: fetchResponse.data.feeSlip.id || response.data.slip_id,
                    slip_id:
                      fetchResponse.data.feeSlip.slip_id ||
                      response.data.slip_number,
                    student_name: student.name,
                    admission_number: student.admission_number,
                    father_name: student.father_name,
                    class_name: student.class_name,
                    arrears_amount:
                      fetchResponse.data.feeSlip?.arrears_amount || 0,
                    total_amount:
                      response.data.total_amount || student.monthly_fee,
                    due_date:
                      fetchResponse.data.feeSlip?.due_date ||
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        10
                      ),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    current_month_expected:
                      fetchResponse.data.payment_status
                        ?.current_month_expected || 0,
                    current_month_paid:
                      fetchResponse.data.payment_status?.current_month_paid ||
                      0,
                    current_month_remaining:
                      fetchResponse.data.payment_status
                        ?.current_month_remaining || 0,
                    is_past_due_date:
                      fetchResponse.data.payment_status?.is_past_due_date ||
                      false,
                    auto_arrears_added:
                      fetchResponse.data.payment_status?.auto_arrears_added ||
                      false,
                  };

                  return {
                    success: true,
                    student: student.name,
                    studentId: student.id,
                    exists: false,
                    feeSlip: feeSlipData,
                  };
                } else {
                  // Fallback if fetchResponse doesn't have feeSlip
                  const feeSlipData = {
                    id: response.data.slip_id,
                    slip_id: response.data.slip_number,
                    student_name: student.name,
                    admission_number: student.admission_number,
                    father_name: student.father_name,
                    class_name: student.class_name,
                    arrears_amount: 0,
                    total_amount:
                      response.data.total_amount || student.monthly_fee,
                    due_date: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      10
                    ),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    current_month_expected: 0,
                    current_month_paid: 0,
                    current_month_remaining:
                      response.data.total_amount || student.monthly_fee,
                    is_past_due_date: false,
                    auto_arrears_added: false,
                  };

                  return {
                    success: true,
                    student: student.name,
                    studentId: student.id,
                    exists: false,
                    feeSlip: feeSlipData,
                  };
                }
              } catch (fetchError) {
                console.error(
                  "Error fetching complete fee slip data:",
                  fetchError
                );
                // Fallback to basic data
                const feeSlipData = {
                  id: response.data.slip_id,
                  slip_id: response.data.slip_number,
                  student_name: student.name,
                  admission_number: student.admission_number,
                  father_name: student.father_name,
                  class_name: student.class_name,
                  arrears_amount: 0,
                  total_amount:
                    response.data.total_amount || student.monthly_fee,
                  due_date: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    10
                  ),
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                  current_month_expected: 0,
                  current_month_paid: 0,
                  current_month_remaining:
                    response.data.total_amount || student.monthly_fee,
                  is_past_due_date: false,
                  auto_arrears_added: false,
                };

                return {
                  success: true,
                  student: student.name,
                  studentId: student.id,
                  exists: false,
                  feeSlip: feeSlipData,
                };
              }
            } else {
              console.error(
                "❌ No feeSlip in response. Full response:",
                response.data
              );
              throw new Error("No fee slip data received from server");
            }
          } catch (error) {
            console.error(
              `Error generating fee slip for ${student.name}:`,
              error
            );
            console.error("Error details:", error.response?.data);
            console.error("Full error response:", error.response);
            return {
              success: false,
              student: student.name,
              studentId: student.id,
              error:
                error.response?.data?.error ||
                error.message ||
                "Failed to generate fee slip",
            };
          }
        });

        const results = await Promise.all(promises);
        console.log("🔍 Promise.all results:", results);
        console.log("🔍 Results length:", results.length);
        console.log(
          "🔍 Results structure:",
          results.map((r) => ({
            success: r?.success,
            student: r?.student,
            error: r?.error,
          }))
        );

        const successful = results.filter((r) => r && r.success);
        const failed = results.filter((r) => !r || !r.success);
        const existing = successful.filter((r) => r.exists);
        const newlyGenerated = successful.filter((r) => !r.exists);

        // Skip summary dialog - directly proceed to PDF generation

        // Generate PDFs with barcode for successful fee slips
        if (successful.length > 0) {
          try {
            console.log("🔍 Fee slips generated successfully");
            // Don't automatically open PDFs - just show success message
            this.$toast.success(
              `Generated ${successful.length} fee slips successfully!`
            );
          } catch (error) {
            console.error("Error with fee slip generation:", error);
            this.$toast.warning("Fee slips generated but there was an issue");
          }
        }

        if (successful.length > 0) {
          let message = `Processed ${successful.length} fee slips successfully`;
          if (newlyGenerated.length > 0) {
            message += ` (${newlyGenerated.length} newly generated`;
            if (existing.length > 0) {
              message += `, ${existing.length} already existed`;
            }
            message += ")";
          } else if (existing.length > 0) {
            message += ` (${existing.length} already existed)`;
          }
          this.$toast.success(message);
        }

        if (failed.length > 0) {
          this.$toast.error(`${failed.length} fee slips failed to generate.`);
        }

        // After generating all fee slips, open the bulk PDF with THE EDUCATORS design
        if (successful.length > 0) {
          try {
            const studentIds = successful.map((result) => result.studentId);

            // Use axios to POST the student IDs to the bulk educators endpoint
            const authData = getAuthData();
            const headers =
              authData && authData.token
                ? { Authorization: `Bearer ${authData.token}` }
                : {};

            // Make the POST request to get the PDF
            const response = await axios.post(
              "/api/fee-slips/bulk-educators",
              { student_ids: studentIds },
              {
                headers: headers,
                responseType: "blob", // Important for PDF download
              }
            );

            // Create blob URL and open in new tab
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");

            this.$toast.success(
              "THE EDUCATORS Bulk Fee Slips opened in new tab!"
            );
          } catch (error) {
            console.error("Error opening bulk fee slips:", error);
            this.$toast.error("Failed to open bulk fee slips");
          }
        }

        // Clear selection after generation
        this.selectedStudents = [];
        this.selectAll = false;
      } catch (error) {
        console.error("Error generating bulk fee slips:", error);

        // Check if it's an authentication error
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.$toast.error("Authentication failed. Please log in again.");
          // Don't redirect, just show error
          return;
        }

        this.$toast.error("Failed to generate fee slips");
      } finally {
        this.generatingFeeSlips = false;
      }
    },

    async loadStudents() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const [studentsResp, feeStatusResp] = await Promise.all([
          axios.get("/api/students", {
            headers: { Authorization: authData?.token },
          }),
          axios.get(`/api/students/classes/${this.classId}/fee-status`, {
            headers: { Authorization: authData?.token },
          }),
        ]);

        const students = studentsResp.data || [];
        const feeStatusMap = new Map(
          (feeStatusResp.data?.students || []).map((s) => [s.id, s])
        );

        this.students = students.map((s) => {
          const fs = feeStatusMap.get(s.id);
          return {
            ...s,
            arrears_amount: fs?.arrears_pending || 0,
            fee_status: fs?.fee_status || s.fee_status,
          };
        });
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        this.loading = false;
      }
    },

    async loadAllClasses() {
      try {
        const authData = getAuthData();
        console.log("Loading classes...");
        const response = await axios.get("/api/students/classes", {
          headers: { Authorization: authData?.token },
        });
        this.allClasses = response.data;
        console.log("Loaded classes:", this.allClasses);
        console.log("Number of classes loaded:", this.allClasses.length);

        // Ensure all classes have proper structure
        this.allClasses = this.allClasses.map((cls) => ({
          id: cls.id,
          name: cls.name || `Class ${cls.id}`,
        }));

        console.log(
          "Classes structure after mapping:",
          this.allClasses.map((c) => ({ id: c.id, name: c.name }))
        ); // Debug structure

        // Test if dropdown should work
        if (this.allClasses.length > 0) {
          console.log("First class:", this.allClasses[0]);
          console.log("First class name:", this.allClasses[0].name);
          console.log(
            "First class raw structure:",
            JSON.stringify(this.allClasses[0])
          );
        }
      } catch (error) {
        console.error("Error loading classes:", error);
        this.allClasses = []; // Ensure it's an array even on error
      }
    },

    async loadClassInfo() {
      try {
        const authData = getAuthData();
        const classId = this.classId;
        if (!classId) {
          throw new Error("Class not found");
        }
        const response = await axios.get(`/api/students/classes/${classId}`, {
          headers: { Authorization: authData?.token },
        });
        this.classInfo = response.data;
      } catch (error) {
        console.error("Error loading class info:", error);
        // Fallback class info
        const className = this.$route.params.className.replace(/-/g, " ");
        this.classInfo = {
          name: className,
          section: "A",
        };
      }
    },

    getStudentAvatar(student) {
      // Check if student exists
      if (!student) {
        return `https://ui-avatars.com/api/?name=Unknown&background=1976d2&color=fff&size=200`;
      }

      // If student has a profile image, use it
      if (student.profile_image && student.profile_image.trim() !== "") {
        const imageUrl = `http://localhost:8081/uploads/profile-images/${
          student.profile_image
        }?t=${Date.now()}`;
        return imageUrl;
      }
      // Otherwise, use initials
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.name || "Unknown"
      )}&background=1976d2&color=fff&size=200`;
    },

    // Fee status helper methods
    getFeeStatusColor(student) {
      if (!this.feeStatusData || !this.feeStatusData.students) {
        return "grey";
      }

      const studentFeeData = this.feeStatusData.students.find(
        (s) => s.id === student.id
      );
      if (!studentFeeData) {
        return "grey";
      }

      switch (studentFeeData.fee_status) {
        case "paid":
          return "success";
        case "partial":
          return "warning";
        case "unpaid":
          return "error";
        default:
          return "grey";
      }
    },

    getFeeStatusIcon(student) {
      if (!this.feeStatusData || !this.feeStatusData.students) {
        return "mdi-help-circle";
      }

      const studentFeeData = this.feeStatusData.students.find(
        (s) => s.id === student.id
      );
      if (!studentFeeData) {
        return "mdi-help-circle";
      }

      switch (studentFeeData.fee_status) {
        case "paid":
          return "mdi-check-circle";
        case "partial":
          return "mdi-alert-circle";
        case "unpaid":
          return "mdi-close-circle";
        default:
          return "mdi-help-circle";
      }
    },

    getFeeStatusText(student) {
      if (!this.feeStatusData || !this.feeStatusData.students) {
        return "Unknown";
      }

      const studentFeeData = this.feeStatusData.students.find(
        (s) => s.id === student.id
      );
      if (!studentFeeData) {
        return "Unknown";
      }

      switch (studentFeeData.fee_status) {
        case "paid":
          return "Paid";
        case "partial":
          return "Partial";
        case "unpaid":
          return "Unpaid";
        default:
          return "Unknown";
      }
    },

    // Filter students based on fee status
    getFilteredStudentsForPrint() {
      let students = this.selectedStudents;

      if (this.printFeeStatusFilter === "all") {
        return students;
      }

      if (!this.feeStatusData || !this.feeStatusData.students) {
        return students; // If no fee data, return all students
      }

      const filteredStudents = students.filter((student) => {
        const studentFeeData = this.feeStatusData.students.find(
          (s) => s.id === student.id
        );
        // If student has fee data and matches filter, include them
        if (
          studentFeeData &&
          studentFeeData.fee_status === this.printFeeStatusFilter
        ) {
          return true;
        }
        // If student has no fee data, include them (skip them gracefully)
        if (!studentFeeData) {
          return true;
        }
        return false;
      });

      // If no students match the filter, fall back to all selected students
      if (filteredStudents.length === 0) {
        console.log(
          "No students match fee status filter, falling back to all selected students"
        );
        return students;
      }

      return filteredStudents;
    },

    getFilteredStudentsForExport() {
      let students = this.selectedStudents;

      if (this.exportFeeStatusFilter === "all") {
        return students;
      }

      if (!this.feeStatusData || !this.feeStatusData.students) {
        return students; // If no fee data, return all students
      }

      const filteredStudents = students.filter((student) => {
        const studentFeeData = this.feeStatusData.students.find(
          (s) => s.id === student.id
        );
        // If student has fee data and matches filter, include them
        if (
          studentFeeData &&
          studentFeeData.fee_status === this.exportFeeStatusFilter
        ) {
          return true;
        }
        // If student has no fee data, include them (skip them gracefully)
        if (!studentFeeData) {
          return true;
        }
        return false;
      });

      // If no students match the filter, fall back to all selected students
      if (filteredStudents.length === 0) {
        console.log(
          "No students match fee status filter, falling back to all selected students"
        );
        return students;
      }

      return filteredStudents;
    },

    viewStudentDetails(student) {
      this.selectedStudent = student;
      this.showStudentDialog = true;
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

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedStudents = [...this.filteredStudents];
      } else {
        this.selectedStudents = [];
      }
    },

    async promoteStudents() {
      if (!this.selectedPromoteClass || this.selectedStudents.length === 0) {
        return;
      }

      this.promoting = true;
      try {
        const studentIds = this.selectedStudents.map((s) => s.id);
        const authData = getAuthData();

        // Handle both object and ID cases
        const newClassId =
          typeof this.selectedPromoteClass === "object"
            ? this.selectedPromoteClass.id
            : this.selectedPromoteClass;

        const response = await axios.put(
          `/api/students/promote`,
          {
            studentIds,
            newClassId: newClassId,
          },
          {
            headers: { Authorization: authData?.token },
          }
        );

        console.log("Promote response:", response.data);

        // Refresh students list
        await this.loadStudents();

        // Reset selection
        this.selectedStudents = [];
        this.selectedPromoteClass = null;
        this.showPromoteDialog = false;

        console.log("Students promoted successfully");
      } catch (error) {
        console.error("Error promoting students:", error);
        console.error("Failed to promote students");
      } finally {
        this.promoting = false;
      }
    },

    async markStudentsLeft() {
      if (this.selectedStudents.length === 0) {
        return;
      }

      this.markingLeft = true;
      try {
        const studentIds = this.selectedStudents.map((s) => s.id);
        const authData = getAuthData();

        const response = await axios.put(
          `/api/students/mark-left`,
          {
            studentIds,
          },
          {
            headers: { Authorization: authData?.token },
          }
        );

        console.log("Mark left response:", response.data);

        // Refresh students list
        await this.loadStudents();

        // Reset selection
        this.selectedStudents = [];
        this.showLeftDialog = false;

        console.log("Students marked as left successfully");
      } catch (error) {
        console.error("Error marking students left:", error);
        console.error("Failed to mark students as left");
      } finally {
        this.markingLeft = false;
      }
    },

    async markStudentLeft(student) {
      this.markingLeft = true;
      try {
        const authData = getAuthData();
        const response = await axios.put(
          `/api/students/mark-left`,
          {
            studentIds: [student.id],
          },
          {
            headers: { Authorization: authData?.token },
          }
        );

        console.log("Mark left response:", response.data);

        // Refresh students list
        await this.loadStudents();

        console.log("Student marked as left successfully");
      } catch (error) {
        console.error("Error marking student left:", error);
        console.error("Failed to mark student as left");
      } finally {
        this.markingLeft = false;
      }
    },

    async printStudents() {
      const filteredStudents = this.getFilteredStudentsForPrint();

      if (filteredStudents.length === 0) {
        this.$toast.error("No students selected for printing");
        return;
      }

      if (this.selectedFields.length === 0) {
        this.$toast.error("Please select fields to print");
        return;
      }

      this.printing = true;
      try {
        // Create print content with selected fields
        const printContent = this.generatePrintContent(
          this.selectedFields,
          filteredStudents
        );

        // Create a new window for printing
        const printWindow = window.open("", "_blank");
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = function () {
          printWindow.print();
          printWindow.close();
        };

        this.showPrintDialog = false;
        this.selectedFields = [];
        this.$toast.success(
          `Printed ${filteredStudents.length} students with ${this.selectedFields.length} fields`
        );
      } catch (error) {
        console.error("Error printing:", error);
        this.$toast.error("An error occurred during printing");
      } finally {
        this.printing = false;
      }
    },

    async performBulkExport() {
      if (this.selectedExportFields.length === 0) {
        this.$toast.error("Please select fields to export");
        return;
      }

      this.exporting = true;

      try {
        // Define the generateCSVContent method inline if it's not available
        const generateCSVContent = (students, selectedFields = null) => {
          console.log("generateCSVContent called with students:", students);

          // Use selected fields if provided, otherwise use all fields
          const fieldMappings = {
            name: { header: "Name", key: "name" },
            admission_number: {
              header: "Admission Number",
              key: "admission_number",
            },
            father_name: { header: "Father's Name", key: "father_name" },
            cnic: { header: "CNIC", key: "cnic" },
            phone: { header: "Phone", key: "phone" },
            gender: { header: "Gender", key: "gender" },
            class_name: { header: "Class", key: "class_name" },
            date_of_birth: { header: "Date of Birth", key: "date_of_birth" },
            admission_date: { header: "Admission Date", key: "admission_date" },
            monthly_fee: { header: "Monthly Fee", key: "monthly_fee" },
            fee_status: { header: "Fee Status", key: "fee_status" },
            address: { header: "Address", key: "address" },
          };

          // Build headers based on selected fields
          const headers = ["Sr.No"]; // Always include Sr.No
          const fieldKeys = ["sr_no"];

          if (selectedFields && selectedFields.length > 0) {
            selectedFields.forEach((field) => {
              if (fieldMappings[field]) {
                headers.push(fieldMappings[field].header);
                fieldKeys.push(fieldMappings[field].key);
              }
            });
          } else {
            // Default to all fields if no selection
            Object.values(fieldMappings).forEach((field) => {
              headers.push(field.header);
              fieldKeys.push(field.key);
            });
          }

          const csvRows = [headers.join(",")];

          students.forEach((student) => {
            console.log("Processing student:", student);

            const row = fieldKeys.map((key) => {
              if (key === "sr_no") {
                return csvRows.length.toString(); // Use the current row number
              } else if (key === "fee_status") {
                let value = this.getFeeStatusText(student) || "";
                return `"${value}"`;
              }
              let value = student[key] || "";
              return `"${value}"`;
            });
            csvRows.push(row.join(","));
          });

          const result = csvRows.join("\n");
          console.log("Generated CSV:", result);
          return result;
        };

        const filteredStudents = this.getFilteredStudentsForExport();

        if (filteredStudents.length === 0) {
          this.$toast.error("No students selected for export");
          return;
        }

        const csvContent = generateCSVContent(
          filteredStudents,
          this.selectedExportFields
        );
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `class_students_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${filteredStudents.length} students with ${this.selectedExportFields.length} fields successfully!`
        );

        this.showExportDialog = false;
        this.selectedExportFields = [];
      } catch (error) {
        console.error("Error exporting selected students:", error);
        this.$toast.error("An error occurred while exporting students");
      } finally {
        this.exporting = false;
      }
    },

    generatePrintContent(selectedFields = null, students = null) {
      const className = this.classInfo.name;
      const studentsToPrint = students || this.selectedStudents;

      // Use selected fields if provided, otherwise use all fields
      const fieldMappings = {
        name: { header: "Name", key: "name" },
        admission_number: {
          header: "Admission Number",
          key: "admission_number",
        },
        father_name: { header: "Father's Name", key: "father_name" },
        cnic: { header: "CNIC", key: "cnic" },
        phone: { header: "Phone", key: "phone" },
        gender: { header: "Gender", key: "gender" },
        class_name: { header: "Class", key: "class_name" },
        date_of_birth: { header: "Date of Birth", key: "date_of_birth" },
        admission_date: { header: "Admission Date", key: "admission_date" },
        monthly_fee: { header: "Monthly Fee", key: "monthly_fee" },
        address: { header: "Address", key: "address" },
      };

      // Build headers based on selected fields
      const headers = ["Sr.No"]; // Always include Sr.No
      const fieldKeys = ["sr_no"];

      if (selectedFields && selectedFields.length > 0) {
        selectedFields.forEach((field) => {
          if (fieldMappings[field]) {
            headers.push(fieldMappings[field].header);
            fieldKeys.push(fieldMappings[field].key);
          }
        });
      } else {
        // Default to all fields if no selection
        Object.values(fieldMappings).forEach((field) => {
          headers.push(field.header);
          fieldKeys.push(field.key);
        });
      }

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Class Students Report - ${className}</title>
          <style>
             body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
              background: white;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
              margin-top: 20px;
            }
            .school-name {
              font-size: 24px;
              font-weight: bold;
              color: #1e3a8a;
              margin-bottom: 5px;
            }
            .report-title {
              font-size: 18px;
              color: #333;
              margin-bottom: 5px;
            }
            .report-info {
              font-size: 12px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #333333;
              padding: 8px;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f8f9fa;
              font-weight: bold;
              color: #333;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .student-photo {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            .summary {
              margin-top: 20px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .summary-item {
              display: inline-block;
              margin-right: 20px;
              font-weight: bold;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
              @page {
                margin: 0;
                size: A4;
              }
            }
            /* Hide browser-generated footer */
            @media print {
              body::after {
                display: none !important;
              }
              body::before {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="school-name">The Educator School</div>
            <div class="report-title">Class Students Report - ${className}</div>
            <div class="report-info">
              Total Students: ${studentsToPrint.length}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${studentsToPrint
                .map(
                  (student, studentIndex) => `
                <tr>
                  ${fieldKeys
                    .map((key) => {
                      if (key === "sr_no") {
                        return `<td>${studentIndex + 1}</td>`;
                      } else if (key === "monthly_fee") {
                        return `<td>Rs${student[key] || ""}</td>`;
                      } else if (key === "fee_status") {
                        return `<td>${this.getFeeStatusText(student)}</td>`;
                      } else {
                        return `<td>${student[key] || ""}</td>`;
                      }
                    })
                    .join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>


        </body>
        </html>
      `;
    },

    async editStudent(student) {
      try {
        console.log("Edit button clicked for student:", student);

        this.editingStudent = { ...student }; // Create a copy to avoid direct mutation
        // Ensure class_id is a number for the select component
        if (this.editingStudent.class_id) {
          this.editingStudent.class_id = parseInt(this.editingStudent.class_id);
        }

        // Load classes if not already loaded
        if (!this.allClasses.length) {
          console.log("Loading classes...");
          await this.loadAllClasses();
        }

        // Set the selected class for the dropdown - find the class object
        const selectedClassObj = this.allClasses.find(
          (cls) => cls.id === this.editingStudent.class_id
        );
        this.selectedClass = selectedClassObj;

        console.log("Editing student:", this.editingStudent);
        console.log("Available classes:", this.allClasses);
        console.log("Selected class_id:", this.editingStudent.class_id);
        console.log("Selected class for dropdown:", this.selectedClass);

        // Wait for the next tick to ensure the dialog is rendered
        this.$nextTick(() => {
          this.showEditDialog = true;
          console.log("Edit dialog opened");
        });
      } catch (error) {
        console.error("Error in editStudent:", error);
      }
    },

    async saveStudent() {
      console.log("=== SAVE STUDENT START ===");
      console.log("selectedClass:", this.selectedClass);
      console.log("editingStudent:", this.editingStudent);

      this.saving = true;
      try {
        // Format dates for backend
        const studentData = { ...this.editingStudent };
        console.log("Initial studentData:", studentData);

        if (studentData.date_of_birth) {
          studentData.date_of_birth = this.formatDateForBackend(
            studentData.date_of_birth
          );
        }
        if (studentData.admission_date) {
          studentData.admission_date = this.formatDateForBackend(
            studentData.admission_date
          );
        }

        // Ensure class_id is set from selected class
        if (this.selectedClass) {
          if (typeof this.selectedClass === "object") {
            studentData.class_id = this.selectedClass.id;
            console.log("Setting class_id to:", this.selectedClass.id);
          } else {
            studentData.class_id = this.selectedClass;
            console.log("Setting class_id to:", this.selectedClass);
          }
        } else {
          console.log("No selectedClass found!");
        }
        console.log("Final studentData to save:", studentData);

        console.log(
          "Sending API request to update student:",
          this.editingStudent.id
        );
        console.log("Request data:", studentData);

        const authData = getAuthData();
        const response = await axios.put(
          `/api/students/${this.editingStudent.id}`,
          studentData,
          {
            headers: { Authorization: authData?.token },
          }
        );

        console.log("API response:", response.data);

        // Update the student in the local array
        const index = this.students.findIndex(
          (s) => s.id === this.editingStudent.id
        );
        if (index !== -1) {
          // Update with the new data including the class_id
          this.students[index] = { ...studentData };
        }

        this.showEditDialog = false;
        this.editingStudent = null;
        this.selectedClass = null;

        // Show success message
        const className = this.selectedClass
          ? this.selectedClass.name
          : "Unknown";
        this.$vuetify.theme.themes.light.success = `Student updated successfully. Class changed to: ${className}`;
      } catch (error) {
        console.error("Error updating student:", error);
        this.$vuetify.theme.themes.light.error = "Failed to update student";
      } finally {
        this.saving = false;
      }
    },

    formatDateForBackend(dateString) {
      // Handle ISO date strings (from database)
      if (dateString && dateString.includes("T")) {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      }

      // Convert dd/mm/yyyy to yyyy-mm-dd for backend
      if (dateString && dateString.includes("/")) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
          return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
            2,
            "0"
          )}`;
        }
      }
      return dateString;
    },

    getClassDisplayName(item) {
      if (!item) return "";
      if (item.raw && item.raw.name) return item.raw.name;
      if (item.name) return item.name;
      if (typeof item === "string") return item;
      if (typeof item === "object" && item.name) return item.name;
      return "Unknown Class";
    },

    getSelectedClassName() {
      console.log(
        "getSelectedClassName called, selectedClass:",
        this.selectedClass
      );
      if (!this.selectedClass) return "Select Class";
      if (typeof this.selectedClass === "object" && this.selectedClass.name) {
        console.log("Returning class name:", this.selectedClass.name);
        return this.selectedClass.name;
      }
      console.log("Returning Select Class");
      return "Select Class";
    },

    handleSaveClick() {
      console.log("Save button clicked!");
      this.saveStudent();
    },

    onClassSelected(value) {
      console.log("Class selected:", value);
      // Handle the object structure
      if (value && typeof value === "object") {
        this.editingStudent.class_id = value.id;
        console.log("Selected class ID:", value.id);
        console.log("Selected class name:", value.name);
      } else {
        this.editingStudent.class_id = value;
        console.log("Selected class ID (primitive):", value);
      }
    },

    deleteStudent(student) {
      this.deletingStudent = student;
      this.showDeleteDialog = true;
    },

    async confirmDelete() {
      if (!this.deletingStudent) return;

      this.deleting = true;
      try {
        const authData = getAuthData();
        const response = await axios.delete(
          `/api/students/${this.deletingStudent.id}`,
          {
            headers: { Authorization: authData?.token },
          }
        );

        console.log("Delete response:", response.data);

        // Remove student from local array
        const index = this.students.findIndex(
          (s) => s.id === this.deletingStudent.id
        );
        if (index !== -1) {
          this.students.splice(index, 1);
        }

        // Close dialog and reset
        this.showDeleteDialog = false;
        this.deletingStudent = null;

        // Show success message
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
      // You could set a fallback image here if needed
    },

    handleImageLoad(event) {
      if (event && event.target && event.target.src) {
        console.log("Image loaded successfully:", event.target.src);
      } else {
        console.log("Image loaded successfully: unknown source");
      }
    },
  },
  watch: {
    showPromoteDialog(newVal) {
      if (newVal) {
        console.log("Promote dialog opened");
        console.log("allClasses:", this.allClasses);
        console.log("selectedPromoteClass:", this.selectedPromoteClass);
        if (this.allClasses.length > 0) {
          console.log("Sample class object:", this.allClasses[0]);
        } else {
          console.log("No classes loaded, loading classes...");
          this.loadAllClasses();
        }
      }
    },
    showEditDialog(newVal) {
      if (newVal && this.allClasses.length === 0) {
        console.log(
          "Edit dialog opened but no classes loaded, loading classes..."
        );
        this.loadAllClasses();
      }
    },

    simpleTest() {
      alert("Simple test method working!");
    },

    testExport() {
      console.log("testExport method called");
      alert("Export method is working!");
    },

    // Simple test method
    testMethod() {
      alert("Test method is working!");
    },

    // Export Methods
    exportSelectedStudents() {
      alert("Export method called!");

      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to export");
        return;
      }

      try {
        const csvContent = this.generateCSVContent(this.selectedStudents);
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `selected-students-${this.classInfo.name || "class"}-${
            new Date().toISOString().split("T")[0]
          }.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${this.selectedStudents.length} selected students to CSV`
        );
      } catch (error) {
        console.error("Error exporting students:", error);
        this.$toast.error("An error occurred during export");
      }
    },

    exportAllStudents() {
      if (this.filteredStudents.length === 0) {
        this.$toast.error("No students to export");
        return;
      }

      try {
        const csvContent = this.generateCSVContent(this.filteredStudents);
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `all-class-students-${this.classInfo.name}-${
            new Date().toISOString().split("T")[0]
          }.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported all ${this.filteredStudents.length} students to CSV`
        );
      } catch (error) {
        console.error("Error exporting all students:", error);
        this.$toast.error("An error occurred during export");
      }
    },

    generateCSVContent(students, selectedFields = null) {
      console.log("generateCSVContent called with students:", students);

      // Use selected fields if provided, otherwise use all fields
      const fieldMappings = {
        name: { header: "Name", key: "name" },
        admission_number: {
          header: "Admission Number",
          key: "admission_number",
        },
        father_name: { header: "Father's Name", key: "father_name" },
        cnic: { header: "CNIC", key: "cnic" },
        phone: { header: "Phone", key: "phone" },
        gender: { header: "Gender", key: "gender" },
        class_name: { header: "Class", key: "class_name" },
        date_of_birth: { header: "Date of Birth", key: "date_of_birth" },
        admission_date: { header: "Admission Date", key: "admission_date" },
        monthly_fee: { header: "Monthly Fee", key: "monthly_fee" },
        address: { header: "Address", key: "address" },
      };

      // Build headers based on selected fields
      const headers = ["Sr.No"]; // Always include Sr.No
      const fieldKeys = ["sr_no"];

      if (selectedFields && selectedFields.length > 0) {
        selectedFields.forEach((field) => {
          if (fieldMappings[field]) {
            headers.push(fieldMappings[field].header);
            fieldKeys.push(fieldMappings[field].key);
          }
        });
      } else {
        // Default to all fields if no selection
        Object.values(fieldMappings).forEach((field) => {
          headers.push(field.header);
          fieldKeys.push(field.key);
        });
      }

      const csvRows = [headers.join(",")];

      students.forEach((student) => {
        console.log("Processing student:", student);

        const row = fieldKeys.map((key) => {
          if (key === "sr_no") {
            return csvRows.length.toString(); // Use the current row number
          }
          let value = student[key] || "";
          return `"${value}"`;
        });
        csvRows.push(row.join(","));
      });

      const result = csvRows.join("\n");
      console.log("Generated CSV:", result);
      return result;
    },

    deleteSelectedStudents() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to delete");
        return;
      }

      this.bulkConfirmDialog = {
        show: true,
        title: "Delete Selected Students",
        subtitle: "Permanently remove selected students",
        message: `Are you sure you want to delete ${this.selectedStudents.length} selected students? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmIcon: "mdi-delete",
        type: "error",
        warning:
          "This will permanently delete the selected students and all their associated data.",
        warningTitle: "Irreversible Action",
        loading: false,
        onConfirm: () => this.performBulkDelete(),
        onCancel: () => {},
      };
    },

    async performBulkDelete() {
      this.bulkConfirmDialog.loading = true;

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          this.$toast.error("Please log in to delete students");
          return;
        }

        let successCount = 0;
        let errorCount = 0;

        // Show progress notification
        this.$toast.info(
          `Deleting ${this.selectedStudents.length} students...`
        );

        for (const student of this.selectedStudents) {
          try {
            await axios.delete(`/api/students/${student.id}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
            successCount++;
          } catch (error) {
            console.error(`Error deleting student ${student.id}:`, error);
            errorCount++;
          }
        }

        if (successCount > 0) {
          this.$toast.success(`Successfully deleted ${successCount} students`);
          // Remove deleted students from the local list
          const deletedIds = this.selectedStudents.map((s) => s.id);
          this.students = this.students.filter(
            (s) => !deletedIds.includes(s.id)
          );
          this.selectedStudents = [];
          this.selectAll = false;
        }

        if (errorCount > 0) {
          this.$toast.error(`Failed to delete ${errorCount} students`);
        }
      } catch (error) {
        console.error("Error in bulk delete:", error);
        this.$toast.error("An error occurred during deletion");
      } finally {
        this.bulkConfirmDialog.loading = false;
        this.bulkConfirmDialog.show = false;
      }
    },
  },
};
</script>

<style scoped>
/* Modern Class Students Page Design */
.modern-class-students-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Student Details Dialog Styling */
.student-details-dialog {
  border-radius: 16px !important;
}

.student-details-dialog .v-card-title {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

/* Edit Student Dialog Styling */
.edit-student-dialog {
  border-radius: 16px !important;
}

.edit-student-dialog .v-card-title {
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.info-card {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.address-textarea {
  background-color: #f5f5f5;
}

.address-textarea .v-field__input {
  padding: 12px;
  font-family: inherit;
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

/* Content Container */
.content-container {
  background: #f8f9fa;
  padding: 40px 0;
}

/* Students List Styling */
.students-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(25px);
  border: 2px solid #000000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.students-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.18);
  border-color: #000000;
}

.students-stats {
  display: flex;
  align-items: center;
}

.students-stats .v-chip {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-state .v-icon {
  opacity: 0.6;
}

.search-section {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

.search-input,
.filter-select {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 2px solid #000000 !important;
  border-radius: 12px !important;
}

.search-input :deep(.v-input__slot),
.filter-select :deep(.v-input__slot) {
  border: none !important;
}

.search-input :deep(.v-input__slot:hover),
.filter-select :deep(.v-input__slot:hover) {
  border: none !important;
}

.search-input :deep(.v-input__slot:focus-within),
.filter-select :deep(.v-input__slot:focus-within) {
  border: none !important;
}

/* Students Table Styling */
.students-table-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
}

.students-table {
  background: transparent !important;
}

.students-table .v-data-table__wrapper {
  border-radius: 16px;
}

.students-table .v-data-table-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.students-table .v-data-table-header th {
  color: white !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

.students-table .v-data-table__tbody tr {
  transition: all 0.3s ease;
}

.students-table .v-data-table__tbody tr:hover {
  background: rgba(102, 126, 234, 0.05) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.students-table .v-data-table__tbody td {
  padding: 16px 12px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.view-student-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.view-student-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
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

/* Responsive Design */
@media (max-width: 768px) {
  .students-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .student-item {
    padding: 16px;
  }

  .student-name {
    font-size: 1.1rem;
  }

  .student-details {
    font-size: 0.85rem;
  }
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");

/* Search and Table Cards */
.search-card,
.table-card {
  background: white !important;
  border: 2px solid #000000 !important;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12) !important;
}

.search-section-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid #000000 !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.search-section-with-border:hover {
  border-color: #000000 !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.directory-section-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid #000000 !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.directory-section-with-border:hover {
  border-color: #000000 !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* Section Titles */
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
  border: none !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
}

.modern-input :deep(.v-input__slot:focus-within) {
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
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

/* Bulk Actions Styling */
.bulk-actions {
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 12px !important;
  padding: 16px !important;
  border: 1px solid #e0e0e0 !important;
  margin-bottom: 16px !important;
}

/* Promote Dialog Styling */
.promote-dialog-card {
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4) !important;
  background-color: white !important;
}

.promote-dialog-header {
  background: linear-gradient(
    135deg,
    #4caf50 0%,
    #66bb6a 50%,
    #388e3c 100%
  ) !important;
  position: relative;
  overflow: hidden;
}

.promote-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

/* Print Dialog Styling */
.print-dialog-card {
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4) !important;
  background-color: white !important;
}

.print-dialog-header {
  background: linear-gradient(
    135deg,
    #2196f3 0%,
    #42a5f5 50%,
    #1976d2 100%
  ) !important;
  position: relative;
  overflow: hidden;
}

.print-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

/* Left Dialog Styling */
.left-dialog-card {
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4) !important;
  background-color: white !important;
}

.left-dialog-header {
  background: linear-gradient(
    135deg,
    #ff9800 0%,
    #ffb74d 50%,
    #f57c00 100%
  ) !important;
  position: relative;
  overflow: hidden;
}

.left-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

/* Action Icons */
.action-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.action-icon:hover {
  transform: scale(1.1) !important;
}

/* Professional Delete Dialog Styling with Vuetify */
.professional-delete-dialog {
  border-radius: 24px !important;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(20px);
}

.professional-header {
  background: linear-gradient(
    135deg,
    #dc3545 0%,
    #e74c3c 50%,
    #c0392b 100%
  ) !important;
  position: relative;
  overflow: hidden;
}

.professional-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.professional-header > div {
  position: relative;
  z-index: 2;
}

.header-avatar {
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4) !important;
  transition: all 0.3s ease;
}

.header-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.5) !important;
}

.close-btn {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2) !important;
}

/* Student Info Card using Vuetify styling */
.student-info-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%) !important;
  border: 1px solid #e9ecef !important;
  transition: all 0.3s ease;
}

.student-info-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-2px);
}

.student-avatar {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  border: 3px solid #ffffff !important;
}

/* Professional Alert Styling with Vuetify */
.v-alert {
  border-radius: 16px !important;
  border-left: 4px solid #ffc107 !important;
  background: rgba(255, 193, 7, 0.05) !important;
}

.v-list {
  background: transparent !important;
}

.v-list-item {
  border-radius: 8px !important;
  margin-bottom: 4px !important;
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background: rgba(255, 193, 7, 0.1) !important;
}

.v-list-item-title {
  font-weight: 500 !important;
}

/* Confirmation Text with Vuetify Chip */
.confirmation-text {
  background: rgba(220, 53, 69, 0.05) !important;
  border-radius: 12px !important;
  padding: 16px !important;
  border: 1px solid rgba(220, 53, 69, 0.2) !important;
}

/* Vuetify Chip Styling */
.v-chip {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

/* Action Buttons with Vuetify styling */
.action-btn {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.action-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
}

/* Modern Action Button Styling */
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

/* Promote Button Styling */
.promote-btn {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%) !important;
  color: white !important;
  border: none !important;
}

.promote-btn:hover {
  background: linear-gradient(135deg, #43a047 0%, #5cb85c 100%) !important;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4) !important;
}

.promote-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Print Button Styling */
.print-btn {
  background: linear-gradient(135deg, #2196f3 0%, #42a5f5 100%) !important;
  color: white !important;
  border: none !important;
}

.print-btn:hover {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%) !important;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4) !important;
}

.print-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Export Button Styling */
.export-btn {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%) !important;
  color: white !important;
  border: none !important;
}

.export-btn:hover {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 100%) !important;
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.4) !important;
}

.export-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Delete Button Styling */
.delete-btn {
  background: linear-gradient(135deg, #f44336 0%, #ff5722 100%) !important;
  color: white !important;
  border: none !important;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%) !important;
  box-shadow: 0 8px 25px rgba(244, 67, 54, 0.4) !important;
}

.delete-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Mark Left Button Styling */
.mark-left-btn {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%) !important;
  color: white !important;
  border: none !important;
}

.mark-left-btn:hover {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%) !important;
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4) !important;
}

.mark-left-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Button Container Styling */
.action-button-container {
  display: flex !important;
  gap: 12px !important;
  align-items: center !important;
  padding: 8px 0 !important;
}

/* Button Icon Styling */
.action-button .v-icon {
  margin-right: 6px !important;
  font-size: 16px !important;
}

/* Button Text Styling */
.action-button span {
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
}

/* Refresh Button */
.refresh-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border-radius: 50% !important;
  background: rgba(102, 126, 234, 0.1) !important;
}

.refresh-btn:hover {
  background: rgba(102, 126, 234, 0.2) !important;
  transform: rotate(180deg) !important;
}

/* Students Table */
.students-table {
  border-radius: 8px;
}

.students-table :deep(.v-data-table__wrapper) {
  transition: opacity 0.3s ease;
}

/* Custom scrollbar for table */
.students-table :deep(::-webkit-scrollbar) {
  height: 8px;
}

.students-table :deep(::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 4px;
}

.students-table :deep(::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 4px;
}

.students-table :deep(::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}

/* Dropdown Menu Styling - White Background */
.promote-class-select :deep(.v-menu__content) {
  background-color: white !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.promote-class-select :deep(.v-list) {
  background-color: white !important;
  border-radius: 8px !important;
}

.promote-class-select :deep(.v-list-item) {
  background-color: white !important;
  border-radius: 4px !important;
  margin: 2px 4px !important;
}

.promote-class-select :deep(.v-list-item:hover) {
  background-color: #f5f5f5 !important;
}

.promote-class-select :deep(.v-list-item--active) {
  background-color: #e3f2fd !important;
  color: #1976d2 !important;
}

.promote-class-select :deep(.v-list-item--active:hover) {
  background-color: #bbdefb !important;
}

/* General Dropdown Styling for all v-select components */
.v-select :deep(.v-menu__content) {
  background-color: white !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.v-select :deep(.v-list) {
  background-color: white !important;
  border-radius: 8px !important;
}

.v-select :deep(.v-list-item) {
  background-color: white !important;
  border-radius: 4px !important;
  margin: 2px 4px !important;
}

.v-select :deep(.v-list-item:hover) {
  background-color: #f5f5f5 !important;
}

.v-select :deep(.v-list-item--active) {
  background-color: #e3f2fd !important;
  color: #1976d2 !important;
}

.v-select :deep(.v-list-item--active:hover) {
  background-color: #bbdefb !important;
}

/* Force white background on all dropdown content */
.v-select :deep(.v-menu__content .v-list) {
  background-color: white !important;
}

.v-select :deep(.v-menu__content .v-list-item) {
  background-color: white !important;
}

.v-select :deep(.v-menu__content .v-list-item__content) {
  background-color: white !important;
}

.v-select :deep(.v-menu__content .v-list-item__title) {
  background-color: white !important;
  color: #333 !important;
}

/* Ensure dropdown menu has solid white background */
.v-menu__content {
  background-color: white !important;
}

.v-menu__content .v-list {
  background-color: white !important;
}

.v-menu__content .v-list-item {
  background-color: white !important;
}

/* Fee Slip Button Styling */
.fee-slip-btn {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important;
  color: white !important;
  border: none !important;
}

.fee-slip-btn:hover {
  background: linear-gradient(135deg, #5a6268 0%, #343a40 100%) !important;
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4) !important;
}

.fee-slip-btn:disabled {
  background: linear-gradient(135deg, #cccccc 0%, #dddddd 100%) !important;
  color: #999999 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* Additional styling for better visibility */
.v-select :deep(.v-input__slot) {
  background-color: white !important;
}

.v-select :deep(.v-input__control) {
  background-color: white !important;
}

.v-select :deep(.v-input__control .v-input__slot) {
  background-color: white !important;
}

/* Force white background on all v-select dropdowns */
.v-select :deep(.v-menu__content),
.v-select :deep(.v-menu__content .v-list),
.v-select :deep(.v-menu__content .v-list-item),
.v-select :deep(.v-menu__content .v-list-item__content),
.v-select :deep(.v-menu__content .v-list-item__title) {
  background-color: white !important;
  color: #333 !important;
}
</style>
