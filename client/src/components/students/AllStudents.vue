<template>
  <div class="modern-students-page">
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
                  Student Management
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Manage and monitor all student records efficiently
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-account-group</v-icon>
                  {{ totalStudents }} Students Enrolled
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
                    Key Performance Indicators
                  </h2>
                  <p class="text-subtitle-1 text-medium-emphasis">
                    Real-time insights into student enrollment and academic
                    metrics
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
                    <div class="stat-card__icon-wrapper primary-gradient">
                      <v-icon size="28" color="white">mdi-account-group</v-icon>
                    </div>
                  </div>

                  <div class="stat-card__content">
                    <div class="stat-card__main-value">
                      <span class="stat-number">{{ totalStudents }}</span>
                      <span class="stat-label">Total Students</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Active</span>
                        <span class="detail-value">{{ totalStudents }}</span>
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
                      <span class="stat-number">{{ maleStudents }}</span>
                      <span class="stat-label">Male Students</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Enrolled</span>
                        <span class="detail-value">{{ maleStudents }}</span>
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
                      <span class="stat-number">{{ femaleStudents }}</span>
                      <span class="stat-label">Female Students</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Enrolled</span>
                        <span class="detail-value">{{ femaleStudents }}</span>
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
                      <span class="stat-label">Active Classes</span>
                    </div>

                    <div class="stat-card__details">
                      <div class="stat-detail-item">
                        <span class="detail-label">Running</span>
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
                      <h2 class="text-h5 font-weight-bold mb-1">
                        Search & Filter
                      </h2>
                      <p class="text-body-2 text-medium-emphasis">
                        Find students by name, CNIC, or apply filters
                      </p>
                    </div>
                  </div>
                </div>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="searchQuery"
                      label="Search students by name, CNIC, or phone..."
                      prepend-inner-icon="mdi-magnify"
                      outlined
                      clearable
                      dense
                      @input="searchStudents"
                      class="modern-input"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="selectedClass"
                      :items="classesList"
                      item-text="name"
                      item-value="id"
                      label="Filter by Class"
                      outlined
                      clearable
                      dense
                      @change="filterStudents"
                      class="modern-input"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="selectedGender"
                      :items="genderOptions"
                      label="Filter by Gender"
                      outlined
                      clearable
                      dense
                      @change="filterStudents"
                      class="modern-input"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Students Table Section -->
            <v-card
              class="table-card directory-section-with-border"
              elevation="0"
              rounded="xl"
            >
              <v-card-title class="pa-6 pb-4">
                <div class="d-flex align-center justify-space-between w-100">
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
                        <p class="text-caption text-medium-emphasis mb-0">
                          Showing {{ filteredStudents.length }} of
                          {{ totalStudents }} students
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
                      class="refresh-btn mr-2"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-title>

              <!-- Bulk Actions for Selected Students -->
              <div class="bulk-actions mb-4" v-if="filteredStudents.length > 0">
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
                    <div class="d-flex justify-end action-button-container">
                      <v-btn
                        color="info"
                        size="small"
                        class="mr-3 action-button print-btn"
                        :disabled="selectedStudents.length === 0"
                        @click="printSelectedStudents"
                        prepend-icon="mdi-printer"
                        elevation="2"
                        rounded
                      >
                        <span class="font-weight-bold">PRINT</span>
                      </v-btn>

                      <v-btn
                        color="primary"
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
                        color="error"
                        size="small"
                        class="mr-3 action-button delete-btn"
                        :disabled="selectedStudents.length === 0"
                        @click="deleteSelectedStudents"
                        prepend-icon="mdi-delete"
                        elevation="2"
                        rounded
                      >
                        <span class="font-weight-bold">DELETE</span>
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
                      ></v-img>
                    </v-avatar>
                    <div>
                      <div class="font-weight-medium">{{ item.name }}</div>
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
                    {{ item.class_name }}
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
                      ₨{{ item.monthly_fee.toLocaleString() }}
                    </span>
                    <div class="text-caption text-medium-emphasis">
                      Monthly Fee
                    </div>
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
                          @click="viewStudent(item)"
                          class="mr-1 action-icon"
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
                          color="error"
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteStudent(item)"
                          class="action-icon"
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
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Student Details Dialog -->
    <v-dialog v-model="studentDialog" max-width="700" persistent>
      <v-card class="dialog-card" elevation="0" rounded="xl">
        <v-card-title class="primary white--text pa-6">
          <v-icon left>mdi-account-details</v-icon>
          Student Details
          <v-spacer></v-spacer>
          <v-btn icon dark @click="studentDialog = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6" v-if="selectedStudent">
          <v-row>
            <v-col cols="12" class="text-center mb-4">
              <v-avatar size="120" class="mb-3">
                <v-img
                  :src="getStudentAvatar(selectedStudent)"
                  alt="Student Avatar"
                  @error="handleImageError"
                  @load="handleImageLoad"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 font-weight-bold primary--text">
                {{ selectedStudent.name }}
              </h3>
              <p class="text-subtitle-1 text-medium-emphasis">
                Student ID: {{ selectedStudent.id }}
              </p>
            </v-col>

            <v-col cols="12" md="6">
              <v-card outlined class="pa-4 info-card" rounded>
                <h4 class="text-h6 font-weight-bold mb-3 primary--text">
                  Personal Information
                </h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Admission Number:</span>
                    <span class="info-value font-weight-bold primary--text">
                      {{ selectedStudent.admission_number }}
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Status:</span>
                    <v-chip
                      :color="
                        selectedStudent.status === 'Active'
                          ? 'success'
                          : 'error'
                      "
                      text-color="white"
                      small
                    >
                      {{ selectedStudent.status }}
                    </v-chip>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Father's Name:</span>
                    <span class="info-value">{{
                      selectedStudent.father_name
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">CNIC:</span>
                    <span class="info-value">{{ selectedStudent.cnic }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">{{ selectedStudent.phone }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Gender:</span>
                    <v-chip
                      :color="
                        selectedStudent.gender === 'Male' ? 'blue' : 'pink'
                      "
                      text-color="white"
                      small
                    >
                      {{ selectedStudent.gender }}
                    </v-chip>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Date of Birth:</span>
                    <span class="info-value">{{
                      formatDate(selectedStudent.date_of_birth)
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Admission Date:</span>
                    <span class="info-value">{{
                      formatDate(selectedStudent.admission_date)
                    }}</span>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card outlined class="pa-4 info-card" rounded>
                <h4 class="text-h6 font-weight-bold mb-3 primary--text">
                  Academic & Financial Information
                </h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Class:</span>
                    <v-chip color="primary" outlined small>
                      {{ selectedStudent.class_name }}
                    </v-chip>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Admission Fee:</span>
                    <span class="info-value font-weight-bold">
                      ₨{{
                        selectedStudent.admission_fee_amount
                          ? selectedStudent.admission_fee_amount.toLocaleString()
                          : "0.00"
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
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Monthly Fee:</span>
                    <span class="info-value font-weight-bold primary--text">
                      ₨{{
                        selectedStudent.monthly_fee
                          ? selectedStudent.monthly_fee.toLocaleString()
                          : "0.00"
                      }}
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Transport Fee:</span>
                    <span
                      class="info-value font-weight-bold"
                      :class="
                        selectedStudent.transport_fee > 0
                          ? 'success--text'
                          : 'grey--text'
                      "
                    >
                      ₨{{
                        selectedStudent.transport_fee
                          ? selectedStudent.transport_fee.toLocaleString()
                          : "0.00"
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
                      <v-chip v-else color="grey" outlined x-small class="ml-2">
                        Inactive
                      </v-chip>
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Annual Fund:</span>
                    <span class="info-value font-weight-bold">
                      ₨{{
                        selectedStudent.annual_fund
                          ? selectedStudent.annual_fund.toLocaleString()
                          : "0.00"
                      }}
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Total Monthly Fee:</span>
                    <span class="info-value font-weight-bold success--text">
                      ₨{{
                        (
                          parseFloat(selectedStudent.monthly_fee || 0) +
                          parseFloat(selectedStudent.transport_fee || 0)
                        ).toLocaleString()
                      }}
                    </span>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card outlined class="pa-4 info-card" rounded>
                <h4 class="text-h6 font-weight-bold mb-3 primary--text">
                  Address Information
                </h4>
                <p class="text-body-1">{{ selectedStudent.address }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="studentDialog = false"
            class="px-6 action-btn"
            rounded
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            @click="editStudent(selectedStudent)"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-pencil</v-icon>
            Edit Student
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500" persistent>
      <v-card class="dialog-card" elevation="0" rounded="xl">
        <v-card-title class="error white--text pa-6">
          <v-icon left>mdi-alert-circle</v-icon>
          Confirm Delete
          <v-spacer></v-spacer>
          <v-btn icon dark @click="deleteDialog = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="text-center mb-4">
            <v-icon size="64" color="error" class="mb-3"
              >mdi-delete-alert</v-icon
            >
            <h3 class="text-h5 font-weight-bold mb-2">Delete Student</h3>
            <p class="text-body-1 text-medium-emphasis">
              Are you sure you want to delete
              <strong>{{ studentToDelete?.name }}</strong
              >? This action cannot be undone and will permanently remove all
              student data.
            </p>
          </div>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            outlined
            @click="deleteDialog = false"
            class="px-6 action-btn"
            rounded
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDelete"
            :loading="deleteLoading"
            class="px-6 action-btn"
            rounded
          >
            <v-icon left>mdi-delete</v-icon>
            Delete Student
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Student Dialog -->
    <v-dialog v-model="editDialog" max-width="800" persistent>
      <v-card
        class="edit-dialog-card"
        elevation="24"
        rounded="xl"
        v-if="selectedStudent"
      >
        <v-card-title class="dialog-header">
          <div class="dialog-title">
            <v-icon size="32" class="mr-3">mdi-account-edit</v-icon>
            <span>Edit Student</span>
          </div>
          <v-btn icon @click="editDialog = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="dialog-content pa-6">
          <v-form ref="editForm" v-model="editFormValid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedStudent.name"
                  label="Student Name"
                  outlined
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedStudent.father_name"
                  label="Father's Name"
                  outlined
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedStudent.cnic"
                  label="CNIC"
                  outlined
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedStudent.phone"
                  label="Phone Number"
                  outlined
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedStudent.gender"
                  :items="genderOptions"
                  label="Gender"
                  outlined
                  class="form-field"
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
                      v-model="selectedStudent.date_of_birth"
                      label="Date of Birth"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      class="form-field"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedStudent.date_of_birth"
                    @input="dobMenu = false"
                    :max="today"
                    :min="'1900-01-01'"
                    :value="selectedStudent.date_of_birth || ''"
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
                      v-model="selectedStudent.admission_date"
                      label="Admission Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      class="form-field"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedStudent.admission_date"
                    @input="admissionMenu = false"
                    :max="today"
                    :min="'1900-01-01'"
                    :value="selectedStudent.admission_date || ''"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedStudent.class_id"
                  :items="classesList"
                  item-text="name"
                  item-value="id"
                  label="Class"
                  outlined
                  class="form-field"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="selectedStudent.monthly_fee"
                  label="Monthly Fee"
                  type="number"
                  outlined
                  prefix="₨"
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="selectedStudent.admission_fee_amount"
                  label="Admission Fee"
                  type="number"
                  outlined
                  prefix="₨"
                  class="form-field"
                  placeholder="Enter admission fee amount"
                  hint="Enter 0 or leave empty for no admission fee"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="selectedStudent.transport_required"
                  label="Transport Required"
                  color="primary"
                  class="modern-checkbox"
                  prepend-icon="mdi-bus"
                  dense
                  hint="Check if student requires transport service"
                  persistent-hint
                ></v-checkbox>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="selectedStudent.transport_fee"
                  label="Transport Fee"
                  type="number"
                  :rules="[rules.optionalPositive]"
                  outlined
                  prefix="₨"
                  class="form-field"
                  placeholder="Enter transport fee amount"
                  hint="Enter 0 or leave empty for no transport fee"
                  persistent-hint
                  :disabled="!selectedStudent.transport_required"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="selectedStudent.address"
                  label="Address"
                  outlined
                  rows="3"
                  class="form-field"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="dialog-actions pa-6">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            outlined
            @click="editDialog = false"
            class="cancel-btn"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="saveStudentEdit"
            :loading="editLoading"
            class="save-btn"
          >
            <v-icon left>mdi-content-save</v-icon>
            Save Changes
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
              Select fields to include in the printout
            </p>
          </div>

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
                  color="primary"
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
            @click="performBulkPrint"
            :loading="printing"
            :disabled="selectedFields.length === 0"
            class="px-6 action-btn"
            rounded
            elevation="2"
          >
            <v-icon left>mdi-printer</v-icon>
            Print ({{ selectedFields.length }} fields)
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
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";
import ConfirmationDialog from "../ConfirmationDialog.vue";

export default {
  name: "AllStudents",
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      loading: false,
      students: [],
      classesList: [],
      searchQuery: "",
      selectedClass: null,
      selectedGender: null,
      studentDialog: false,
      editDialog: false,
      editLoading: false,
      editFormValid: false,
      deleteDialog: false,
      deleteLoading: false,
      selectedStudent: null,
      studentToDelete: null,
      selectedStudents: [],
      selectAll: false,
      promoting: false,
      markingLeft: false,
      generatingFeeSlips: false,
      showPromoteDialog: false,
      showPrintDialog: false,
      showExportDialog: false,
      showLeftDialog: false,
      printing: false,
      exporting: false,
      selectedFields: [],
      selectedExportFields: [],
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
        { text: "Address", value: "address" },
      ],
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
      dobMenu: false,
      admissionMenu: false,
      genderOptions: ["Male", "Female", "Other"],
      rules: {
        required: (v) => !!v || "This field is required",
        positive: (v) => v > 0 || "Amount must be positive",
        optionalPositive: (v) =>
          !v || v >= 0 || "Value must be zero or positive",
        cnic: (v) =>
          /^\d{5}-\d{7}-\d$/.test(v) ||
          "CNIC must be in format: 12345-1234567-1",
        phone: (v) => /^\d{11}$/.test(v) || "Phone must be 11 digits",
      },
      headers: [
        { text: "Student", value: "name", sortable: false, width: "250px" },
        { text: "Admission Number", value: "admission_number", width: "180px" },
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
        { text: "Actions", value: "actions", sortable: false, width: "120px" },
      ],
    };
  },
  computed: {
    filteredStudents() {
      let filtered = this.students.filter(
        (student) => student.status === "Active"
      );

      if (this.selectedClass) {
        filtered = filtered.filter(
          (student) => student.class_id === this.selectedClass
        );
      }

      if (this.selectedGender) {
        filtered = filtered.filter(
          (student) => student.gender === this.selectedGender
        );
      }

      return filtered;
    },
    totalStudents() {
      return this.students.filter((s) => s.status === "Active").length;
    },
    maleStudents() {
      return this.students.filter(
        (s) => s.gender === "Male" && s.status === "Active"
      ).length;
    },
    femaleStudents() {
      return this.students.filter(
        (s) => s.gender === "Female" && s.status === "Active"
      ).length;
    },
    uniqueClasses() {
      return [
        ...new Set(
          this.students
            .filter((s) => s.status === "Active")
            .map((s) => s.class_name)
        ),
      ].length;
    },
    today() {
      return new Date().toISOString().substr(0, 10);
    },
  },
  async mounted() {
    // Check authentication status
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      console.error("No authentication found, redirecting to login");
      this.$router.push("/login");
      return;
    }

    await this.loadStudents();
    await this.loadClasses();
  },
  methods: {
    async loadStudents() {
      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
          console.error("No authentication token found");
          this.$router.push("/login");
          return;
        }

        const response = await axios.get("/api/students", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        this.students = response.data;
      } catch (error) {
        console.error("Error loading students:", error);
        if (error.response && error.response.status === 401) {
          console.error("Authentication failed, redirecting to login");
          this.$router.push("/login");
        }
        this.$vuetify.theme.themes.light.error = "Failed to load students";
      } finally {
        this.loading = false;
      }
    },

    async loadClasses() {
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get("/api/students/classes", {
          headers: headers,
        });
        this.classesList = response.data;
      } catch (error) {
        console.error("Error loading classes:", error);
        // Set empty array as fallback
        this.classesList = [];
      }
    },

    async searchStudents() {
      if (!this.searchQuery.trim()) {
        await this.loadStudents();
        return;
      }

      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `/api/students/search?query=${this.searchQuery}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        this.students = response.data;
      } catch (error) {
        console.error("Error searching students:", error);
      } finally {
        this.loading = false;
      }
    },

    filterStudents() {
      // Filtering is handled by computed property
    },

    viewStudent(student) {
      if (!student) {
        console.error("No student provided for viewing");
        return;
      }
      this.selectedStudent = student;
      this.studentDialog = true;
    },

    editStudent(student) {
      // Check authentication status
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        console.error("No user token found, redirecting to login");
        this.$router.push("/login");
        return;
      }

      // Ensure student object exists and has required properties
      if (!student) {
        console.error("No student provided for editing");
        return;
      }

      // Format dates for the date picker (YYYY-MM-DD format)
      const formattedStudent = { ...student };

      // Format date_of_birth for date picker
      formattedStudent.date_of_birth = this.formatDateForPicker(
        formattedStudent.date_of_birth
      );

      // Format admission_date for date picker
      formattedStudent.admission_date = this.formatDateForPicker(
        formattedStudent.admission_date
      );

      // Initialize transport_required based on transport_fee
      formattedStudent.transport_required = formattedStudent.transport_fee > 0;

      // Open edit dialog instead of navigating
      this.selectedStudent = formattedStudent;
      this.editDialog = true;
    },

    async saveStudentEdit() {
      if (!this.selectedStudent) {
        console.error("No student selected for editing");
        return;
      }

      this.editLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
          throw new Error("No authentication token found");
        }

        // Format dates properly for MySQL
        const studentData = { ...this.selectedStudent };

        // Format date_of_birth to YYYY-MM-DD format
        if (studentData.date_of_birth) {
          const date = new Date(studentData.date_of_birth);
          studentData.date_of_birth = date.toISOString().split("T")[0];
        }

        // Format admission_date to YYYY-MM-DD format
        if (studentData.admission_date) {
          const date = new Date(studentData.admission_date);
          studentData.admission_date = date.toISOString().split("T")[0];
        }

        // Handle transport fee based on checkbox
        if (!studentData.transport_required) {
          studentData.transport_fee = 0;
        }

        const response = await axios.put(
          `/api/students/${this.selectedStudent.id}`,
          studentData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (response.status === 200) {
          // Update the student in the local array
          const index = this.students.findIndex(
            (s) => s.id === this.selectedStudent.id
          );
          if (index !== -1) {
            this.students[index] = { ...this.selectedStudent };
          }

          this.editDialog = false;
          this.selectedStudent = null;
          this.$toast.success("Student updated successfully!");
        }
      } catch (error) {
        console.error("Error updating student:", error);
        this.$toast.error("Error updating student. Please try again.");
      } finally {
        this.editLoading = false;
      }
    },

    deleteStudent(student) {
      this.studentToDelete = student;
      this.deleteDialog = true;
    },

    async confirmDelete() {
      this.deleteLoading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};
        await axios.delete(`/api/students/${this.studentToDelete.id}`, {
          headers: headers,
        });

        this.students = this.students.filter(
          (s) => s.id !== this.studentToDelete.id
        );
        this.deleteDialog = false;
        this.studentToDelete = null;
      } catch (error) {
        console.error("Error deleting student:", error);
        this.$vuetify.theme.themes.light.error = "Failed to delete student";
      } finally {
        this.deleteLoading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
        return "";
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    },

    formatDateForPicker(dateString) {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split("T")[0];
        }
        return "";
      } catch (error) {
        console.error("Error formatting date for picker:", error);
        return "";
      }
    },

    getStudentAvatar(student) {
      // Handle null/undefined student
      if (!student) {
        return "https://ui-avatars.com/api/?name=Unknown&background=1976d2&color=fff&size=200";
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

    handleImageError() {
      console.error("Image failed to load");
    },

    handleImageLoad() {
      console.log("Image loaded successfully");
    },

    // Select All functionality
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedStudents = [...this.filteredStudents];
      } else {
        this.selectedStudents = [];
      }
    },

    async exportSelectedStudents() {
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
          `selected_students_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${this.selectedStudents.length} students successfully!`
        );
      } catch (error) {
        console.error("Error exporting selected students:", error);
        this.$toast.error("An error occurred while exporting students");
      }
    },

    async promoteSelectedStudents() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to promote");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Promote Students",
        subtitle: "Move students to the next class level",
        message: `Are you sure you want to promote ${this.selectedStudents.length} students?`,
        confirmText: "Promote",
        cancelText: "Cancel",
        confirmIcon: "mdi-arrow-up",
        type: "warning",
        warning: "This will move selected students to the next class level",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkPromote(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkPromote() {
      this.bulkConfirmDialog.loading = true;

      try {
        this.$toast.info(
          `Promote functionality for ${this.selectedStudents.length} students - To be implemented`
        );
        // TODO: Implement bulk promotion logic
      } catch (error) {
        console.error("Error in bulk promote:", error);
        this.$toast.error("An error occurred during bulk promotion");
      } finally {
        this.bulkConfirmDialog.loading = false;
        this.closeBulkConfirmDialog();
      }
    },

    async markSelectedStudentsLeft() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to mark as left");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Mark Students as Left",
        subtitle: "Change student status to left",
        message: `Are you sure you want to mark ${this.selectedStudents.length} students as left?`,
        confirmText: "Mark as Left",
        cancelText: "Cancel",
        confirmIcon: "mdi-logout",
        type: "warning",
        warning: "This will change the status of selected students to 'Left'",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkMarkLeft(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkMarkLeft() {
      this.bulkConfirmDialog.loading = true;

      try {
        this.$toast.info(
          `Mark left functionality for ${this.selectedStudents.length} students - To be implemented`
        );
        // TODO: Implement bulk mark as left logic
      } catch (error) {
        console.error("Error in bulk mark as left:", error);
        this.$toast.error("An error occurred during bulk mark as left");
      } finally {
        this.bulkConfirmDialog.loading = false;
        this.closeBulkConfirmDialog();
      }
    },

    closeBulkConfirmDialog() {
      this.bulkConfirmDialog.show = false;
    },

    async exportAllStudents() {
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
          `all_students_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${this.filteredStudents.length} students successfully!`
        );
      } catch (error) {
        console.error("Error exporting all students:", error);
        this.$toast.error("An error occurred while exporting students");
      }
    },

    generateCSVContent(students, selectedFields = null) {
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
      const headers = ["ID"]; // Always include ID
      const fieldKeys = ["id"];

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
        const row = fieldKeys.map((key) => {
          let value = student[key] || "";
          if (key === "id") {
            return value;
          }
          return `"${value}"`;
        });
        csvRows.push(row.join(","));
      });

      return csvRows.join("\n");
    },

    async performBulkExport() {
      if (this.selectedExportFields.length === 0) {
        this.$toast.error("Please select fields to export");
        return;
      }

      this.exporting = true;

      try {
        const csvContent = this.generateCSVContent(
          this.selectedStudents,
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
          `selected_students_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${this.selectedStudents.length} students with ${this.selectedExportFields.length} fields successfully!`
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

    async deleteSelectedStudents() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to delete");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Delete Students",
        subtitle: "Permanently remove student records",
        message: `Are you sure you want to permanently delete ${this.selectedStudents.length} students?`,
        confirmText: "DELETE PERMANENTLY",
        cancelText: "Cancel",
        confirmIcon: "mdi-delete",
        type: "error",
        warning:
          "This action cannot be undone! All selected student records will be permanently deleted.",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkDelete(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkDelete() {
      this.bulkConfirmDialog.loading = true;

      try {
        let successCount = 0;
        let errorCount = 0;

        for (const student of this.selectedStudents) {
          try {
            const response = await this.$axios.delete(
              `/api/students/${student.id}`
            );
            if (response.status === 200) {
              successCount++;
            } else {
              errorCount++;
            }
          } catch (error) {
            console.error(`Error deleting student ${student.id}:`, error);
            errorCount++;
          }
        }

        // Remove deleted students from the list
        this.students = this.students.filter(
          (student) =>
            !this.selectedStudents.some(
              (selected) => selected.id === student.id
            )
        );

        // Clear selection
        this.selectedStudents = [];

        if (successCount > 0) {
          this.$toast.success(`Successfully deleted ${successCount} students!`);
        }
        if (errorCount > 0) {
          this.$toast.error(`Failed to delete ${errorCount} students`);
        }

        this.closeBulkConfirmDialog();
      } catch (error) {
        console.error("Error in bulk delete:", error);
        this.$toast.error("An error occurred during bulk deletion");
      } finally {
        this.bulkConfirmDialog.loading = false;
      }
    },

    async generateBulkFeeSlips() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to generate fee slips");
        return;
      }

      this.generatingFeeSlips = true;
      try {
        // Generate fee slips for each selected student
        const promises = this.selectedStudents.map(async (student) => {
          try {
            const authData = getAuthData();
            const headers =
              authData && authData.token
                ? { Authorization: `Bearer ${authData.token}` }
                : {};
            const response = await axios.post(
              "/api/fee-slips/generate",
              {
                student_id: student.id,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
              },
              {
                headers: headers,
              }
            );
            return {
              success: true,
              student: student.name,
              exists: response.data.exists || false,
            };
          } catch (error) {
            return {
              success: false,
              student: student.name,
              error:
                error.response?.data?.error ||
                error.message ||
                "Failed to generate fee slip",
            };
          }
        });

        const results = await Promise.all(promises);
        const successful = results.filter((r) => r.success);
        const failed = results.filter((r) => !r.success);
        const existing = successful.filter((r) => r.exists);
        const newlyGenerated = successful.filter((r) => !r.exists);

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

        // Clear selection after generation
        this.selectedStudents = [];
        this.selectAll = false;
      } catch (error) {
        console.error("Error generating bulk fee slips:", error);
        this.$toast.error("Failed to generate fee slips");
      } finally {
        this.generatingFeeSlips = false;
      }
    },

    async printSelectedStudents() {
      if (this.selectedStudents.length === 0) {
        this.$toast.error("Please select students to print");
        return;
      }

      // Initialize selected fields with all fields selected by default
      this.selectedFields = this.availableFields.map((field) => field.value);
      this.showPrintDialog = true;
    },

    async performBulkPrint() {
      if (this.selectedFields.length === 0) {
        this.$toast.error("Please select at least one field to print");
        return;
      }

      this.printing = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Prepare data for printing
        const printData = {
          studentIds: this.selectedStudents.map((student) => student.id),
          selectedFields: this.selectedFields,
        };

        console.log("Printing data:", printData);

        // Call the custom print API
        const response = await axios.post(
          "/api/admission-slips/custom-print",
          printData,
          {
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );

        // Create blob URL for the PDF
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);

        // Open PDF in a new window for printing
        const printWindow = window.open(url, "_blank", "width=800,height=600");

        if (printWindow) {
          // Wait for the PDF to load, then trigger print dialog
          printWindow.onload = () => {
            printWindow.print();
          };

          // Fallback: if onload doesn't work, try printing after a short delay
          setTimeout(() => {
            if (printWindow && !printWindow.closed) {
              printWindow.print();
            }
          }, 2000);

          // Clean up the blob URL after a delay
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 10000);

          this.$toast.success("Print dialog opened successfully");
        } else {
          // If popup is blocked, fall back to download
          const link = document.createElement("a");
          link.href = url;
          link.download = `student_records_${
            new Date().toISOString().split("T")[0]
          }.pdf`;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 100);

          this.$toast.info(
            "Popup blocked. Student records downloaded instead."
          );
        }

        this.showPrintDialog = false;
      } catch (error) {
        console.error("Error printing student records:", error);
        this.$toast.error(`Failed to print student records: ${error.message}`);
      } finally {
        this.printing = false;
      }
    },

    generatePrintContent(students) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Student Information Report</title>
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
              border: 1px solid #ddd;
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
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="school-name">The Educator School</div>
            <div class="report-title">Student Information Report</div>
            <div class="report-info">
              Generated on: ${currentDate} at ${currentTime} | 
              Total Students: ${students.length}
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>ID</th>
                <th>Name</th>
                <th>Admission Number</th>
                <th>Father's Name</th>
                <th>CNIC</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Date of Birth</th>
                <th>Admission Date</th>
                <th>Monthly Fee</th>
              </tr>
            </thead>
            <tbody>
              ${students
                .map(
                  (student) => `
                <tr>
                  <td>
                    <img src="${this.getStudentAvatar(student)}" 
                         alt="Student Photo" 
                         class="student-photo"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlNWU3ZWYiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOWNhM2FmIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4KPC9zdmc+'">
                  </td>
                  <td>${student.id}</td>
                  <td>${student.name}</td>
                  <td>${student.admission_number}</td>
                  <td>${student.father_name}</td>
                  <td>${student.cnic}</td>
                  <td>${student.phone}</td>
                  <td>${student.gender}</td>
                  <td>${student.class_name || student.class}</td>
                  <td>${student.date_of_birth}</td>
                  <td>${student.admission_date}</td>
                  <td>Rs${student.monthly_fee}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="footer">
            <p>This report was generated by The Educator School Management System</p>
            <p>Page 1 of 1</p>
          </div>
        </body>
        </html>
      `;
    },
  },
};
</script>

<style scoped>
/* Modern Students Page Design */

/* Page Layout */
.modern-students-page {
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

/* Content Container */
.content-container {
  background: #f8f9fa;
  padding: 40px 0;
}

/* Statistics Cards - Enterprise Level Design */
.stats-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInUp 0.3s ease-out;
}

.enterprise-stat-card {
  background: linear-gradient(
    145deg,
    #ffffff 0%,
    #f8f9fa 50%,
    #ffffff 100%
  ) !important;
  border: 2px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
  transition: all 0.15s ease-out !important;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 220px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  animation: bounceIn 0.3s ease-out;
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
    rgba(102, 126, 234, 0.02) 0%,
    rgba(118, 75, 162, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.enterprise-stat-card:hover {
  transform: translateY(-8px) scale(1.02) !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95) !important;
  border-color: rgba(255, 255, 255, 0.95) !important;
}

.enterprise-stat-card:focus {
  outline: none !important;
  border-width: 4px !important;
  box-shadow: 0 0 0 4px rgba(33, 33, 33, 0.2), 0 12px 40px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-4px) !important;
}

.enterprise-stat-card:focus::before {
  opacity: 1;
}

.enterprise-stat-card:hover::before {
  opacity: 1;
}

/* Color-specific borders and focus effects for each card */
.enterprise-stat-card:nth-child(1) {
  border-color: rgba(33, 33, 33, 0.4) !important;
}

.enterprise-stat-card:nth-child(1):hover {
  border-color: rgba(33, 33, 33, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2) !important;
}

.enterprise-stat-card:nth-child(1):focus {
  border-color: rgba(33, 33, 33, 0.8) !important;
  box-shadow: 0 0 0 4px rgba(33, 33, 33, 0.3), 0 12px 40px rgba(0, 0, 0, 0.3) !important;
}

.enterprise-stat-card:nth-child(2) {
  border-color: rgba(33, 33, 33, 0.4) !important;
}

.enterprise-stat-card:nth-child(2):hover {
  border-color: rgba(33, 33, 33, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2) !important;
}

.enterprise-stat-card:nth-child(2):focus {
  border-color: rgba(33, 33, 33, 0.8) !important;
  box-shadow: 0 0 0 4px rgba(33, 33, 33, 0.3), 0 12px 40px rgba(0, 0, 0, 0.3) !important;
}

.enterprise-stat-card:nth-child(3) {
  border-color: rgba(33, 33, 33, 0.4) !important;
}

.enterprise-stat-card:nth-child(3):hover {
  border-color: rgba(33, 33, 33, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2) !important;
}

.enterprise-stat-card:nth-child(3):focus {
  border-color: rgba(33, 33, 33, 0.8) !important;
  box-shadow: 0 0 0 4px rgba(33, 33, 33, 0.3), 0 12px 40px rgba(0, 0, 0, 0.3) !important;
}

.enterprise-stat-card:nth-child(4) {
  border-color: rgba(33, 33, 33, 0.4) !important;
}

.enterprise-stat-card:nth-child(4):hover {
  border-color: rgba(33, 33, 33, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2) !important;
}

.enterprise-stat-card:nth-child(4):focus {
  border-color: rgba(33, 33, 33, 0.8) !important;
  box-shadow: 0 0 0 4px rgba(33, 33, 33, 0.3), 0 12px 40px rgba(0, 0, 0, 0.3) !important;
}

.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 24px 16px 24px;
  position: relative;
  z-index: 2;
}

.stat-card__icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

.enterprise-stat-card:hover .stat-card__icon-wrapper {
  transform: scale(1.15) rotate(8deg);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
}

.stat-card__content {
  padding: 0 24px 24px 24px;
  position: relative;
  z-index: 2;
}

.stat-card__main-value {
  margin-bottom: 20px;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 12px;
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

.enterprise-stat-card:hover .stat-number {
  transform: scale(1.05);
}

.stat-label {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 16px;
}

.stat-card__details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

/* Responsive adjustments for enterprise stat cards */
@media (max-width: 960px) {
  .stat-card__header {
    padding: 20px 20px 12px 20px;
  }

  .stat-card__icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-card__content {
    padding: 0 20px 20px 20px;
  }
}

@media (max-width: 600px) {
  .stat-card__header {
    padding: 16px 16px 8px 16px;
  }

  .stat-card__icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .stat-number {
    font-size: 1.75rem;
  }

  .stat-card__content {
    padding: 0 16px 16px 16px;
  }

  .stat-card__details {
    gap: 8px;
  }
}

/* Search and Table Cards */
.search-card,
.table-card {
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

.directory-section-with-border {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.8) !important;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.directory-section-with-border:hover {
  border-color: rgba(0, 0, 0, 0.95) !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
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

/* Action Icons */
.action-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.action-icon:hover {
  transform: scale(1.1) !important;
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

/* Dialog Cards */
.dialog-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2) !important;
}

.close-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.1) !important;
}

/* Info Cards */
.info-card {
  background: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  min-width: 120px;
}

.info-value {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
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

  .stat-card__icon {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .info-label {
    min-width: auto;
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

/* Print Dialog Styles */
.print-dialog-card {
  border-radius: 16px !important;
  overflow: hidden;
  animation: zoomIn 0.3s ease-out;
}

.print-dialog-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.print-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  z-index: -1;
}

.close-btn {
  transition: all 0.3s ease;
  border-radius: 50%;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.1);
}

.action-btn {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.v-alert {
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.v-alert ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.v-alert li {
  margin-bottom: 4px;
  color: #424242;
}

/* Modern Checkbox */
.modern-checkbox {
  font-family: "Inter", sans-serif !important;
}

.modern-checkbox :deep(.v-selection-control) {
  background: #f8f9fa !important;
  border-radius: 8px !important;
  padding: 8px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.modern-checkbox :deep(.v-selection-control:hover) {
  background: #ffffff !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15) !important;
}

.modern-checkbox :deep(.v-label) {
  color: #6c757d !important;
  font-weight: 500 !important;
}

.modern-checkbox :deep(.v-icon) {
  color: #667eea !important;
}
</style>
