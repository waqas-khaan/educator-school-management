<template>
  <div class="modern-fees-page">
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
                  Fee Management
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Comprehensive fee collection, tracking, and management system
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-cash-multiple</v-icon>
                  ₨{{ totalCollected.toLocaleString() }} Total Collected
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
                <div
                  class="enterprise-section-header mb-6 text-center kpi-section-with-border"
                >
                  <div class="d-flex align-center justify-center">
                    <v-avatar size="80" class="mr-6 kpi-header-avatar">
                      <v-icon size="36" color="white"
                        >mdi-chart-line-variant</v-icon
                      >
                    </v-avatar>
                    <div>
                      <h2 class="text-h3 font-weight-bold primary--text mb-1">
                        Financial Overview
                      </h2>
                      <p class="text-h6 text-medium-emphasis mb-0">
                        Real-time fee collection and pending amounts
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                >
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container green">
                      <v-icon size="32" color="white">mdi-cash-check</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ totalCollected.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">TOTAL COLLECTED</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">This Month</span>
                      <span class="sub-value"
                        >₨{{ thisMonthCollection.toLocaleString() }}</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                >
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container red">
                      <v-icon size="32" color="white">mdi-clock-alert</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ totalPending.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">PENDING FEES</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Requires Attention</span>
                      <span class="sub-value"
                        >{{ pendingFees.length }} Students</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                >
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container purple">
                      <v-icon size="32" color="white"
                        >mdi-calendar-month</v-icon
                      >
                    </div>
                    <div class="stat-card__number">
                      ₨{{ thisMonthCollection.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">THIS MONTH</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Collections</span>
                      <span class="sub-value"
                        >{{
                          fees.filter(
                            (f) => f.month === new Date().getMonth() + 1
                          ).length
                        }}
                        Payments</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="enterprise-stat-card stat-card-with-border"
                  elevation="0"
                >
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container blue">
                      <v-icon size="32" color="white">mdi-account-group</v-icon>
                    </div>
                    <div class="stat-card__number">
                      {{ totalStudents }}
                    </div>
                    <div class="stat-card__label">TOTAL STUDENTS</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Enrolled</span>
                      <span class="sub-value"
                        >{{ students.length }} Active</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Enhanced Fee Submission Section -->
            <v-row class="mb-8">
              <v-col cols="12">
                <v-card class="enhanced-fee-submission-card" elevation="0">
                  <!-- Header with Gradient Background -->
                  <v-card-title class="enhanced-submission-header pa-8">
                    <div class="d-flex align-center">
                      <v-avatar size="56" class="mr-4 header-avatar">
                        <v-icon size="32" color="white">mdi-cash-plus</v-icon>
                      </v-avatar>
                      <div>
                        <h2 class="text-h4 font-weight-bold text-white mb-1">
                          Fee Submission
                        </h2>
                        <p class="text-subtitle-1 text-white-70 mb-0">
                          Complete fee collection and management
                        </p>
                      </div>
                    </div>
                    <v-chip
                      color="white"
                      text-color="primary"
                      large
                      class="status-chip"
                    >
                      <v-icon left>mdi-clock-outline</v-icon>
                      {{ new Date().toLocaleDateString() }}
                    </v-chip>
                  </v-card-title>

                  <!-- Enhanced Form Content -->
                  <v-card-text class="enhanced-submission-content pa-8">
                    <v-form
                      ref="feeSubmissionForm"
                      v-model="feeSubmissionValid"
                    >
                      <!-- Student and Month Selection Row -->
                      <v-row class="mb-6">
                        <v-col cols="12" md="6">
                          <v-card class="selection-card" elevation="0" outlined>
                            <v-card-text class="pa-4">
                              <div class="d-flex align-center mb-3">
                                <v-icon color="primary" class="mr-2"
                                  >mdi-account-school</v-icon
                                >
                                <span class="text-subtitle-1 font-weight-bold"
                                  >Student Information</span
                                >
                              </div>

                              <!-- Enhanced Search Section -->
                              <div class="mb-4">
                                <v-text-field
                                  v-model="studentSearchQuery"
                                  label="Search by Student Name, Phone Number, Admission Number, CNIC, or Class"
                                  outlined
                                  @input="searchStudent"
                                  @focus="onSearchFocus"
                                  @blur="onSearchBlur"
                                  @click:clear="clearStudentSearch"
                                  class="enhanced-form-field"
                                  prepend-inner-icon="mdi-magnify"
                                  placeholder="Type to search for student or class..."
                                  clearable
                                  persistent-hint
                                  hint="Search by any student identifier or class name"
                                  :loading="studentSearchLoading"
                                ></v-text-field>

                                <!-- Search Results Dropdown -->
                                <v-card
                                  v-if="
                                    studentSearchResults.length > 0 &&
                                    studentSearchQuery &&
                                    !selectedStudentInfo
                                  "
                                  class="search-results-dropdown mt-2"
                                  elevation="4"
                                  max-height="200"
                                  style="overflow-y: auto"
                                >
                                  <v-list dense>
                                    <v-list-item
                                      v-for="student in studentSearchResults"
                                      :key="student.id"
                                      @click="selectStudentFromSearch(student)"
                                      class="search-result-item"
                                    >
                                      <v-list-item-avatar
                                        size="32"
                                        class="mr-3"
                                      >
                                        <v-img
                                          v-if="
                                            student && student.profile_image
                                          "
                                          :src="`http://localhost:8081/uploads/profile-images/${student.profile_image}`"
                                          alt="Student Photo"
                                        ></v-img>
                                        <v-img
                                          v-else
                                          :src="
                                            getStudentAvatar(
                                              student ? student.name : ''
                                            )
                                          "
                                          alt="Student Avatar"
                                        ></v-img>
                                      </v-list-item-avatar>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="font-weight-bold"
                                        >
                                          {{
                                            student
                                              ? student.name || "N/A"
                                              : "N/A"
                                          }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                          {{
                                            student
                                              ? student.admission_number ||
                                                "N/A"
                                              : "N/A"
                                          }}
                                          •
                                          <span
                                            class="font-weight-medium text-primary"
                                            >{{
                                              student
                                                ? student.class_name || "N/A"
                                                : "N/A"
                                            }}</span
                                          >
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle
                                          class="text-caption"
                                        >
                                          {{
                                            student
                                              ? student.phone || "N/A"
                                              : "N/A"
                                          }}
                                          •
                                          {{
                                            student
                                              ? student.cnic || "N/A"
                                              : "N/A"
                                          }}
                                        </v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-card>
                              </div>

                              <div class="d-flex align-center">
                                <v-text-field
                                  v-model="feeSubmission.admission_number"
                                  label="Enter Admission Number"
                                  :rules="[rules.required]"
                                  outlined
                                  required
                                  @input="findStudentByAdmissionNumber"
                                  class="enhanced-form-field flex-grow-1 mr-2"
                                  prepend-inner-icon="mdi-account"
                                  placeholder="Type student admission number"
                                ></v-text-field>
                                <v-btn
                                  color="primary"
                                  icon
                                  @click="openManualBarcodeInput"
                                  class="scanner-btn mr-2"
                                  title="Scan Fee Slip Barcode (Manual Input)"
                                >
                                  <v-icon>mdi-qrcode-scan</v-icon>
                                </v-btn>
                                <v-btn
                                  color="secondary"
                                  icon
                                  @click="openBarcodeScanner"
                                  class="scanner-btn"
                                  title="Scan Barcode with Camera"
                                >
                                  <v-icon>mdi-camera</v-icon>
                                </v-btn>
                              </div>

                              <!-- Display selected student info -->
                              <div
                                v-if="selectedStudentInfo"
                                class="mt-3 pa-3"
                                style="background: #f5f5f5; border-radius: 8px"
                              >
                                <!-- Comprehensive Arrears Information -->
                                <div
                                  v-if="
                                    studentArrearsInfo &&
                                    (studentArrearsInfo.has_arrears ||
                                      studentArrearsInfo.has_fine ||
                                      studentArrearsInfo.is_overdue)
                                  "
                                  class="mb-3 pa-3"
                                  style="
                                    background: #fff3cd;
                                    border: 1px solid #ffeaa7;
                                    border-radius: 6px;
                                  "
                                >
                                  <div class="d-flex align-center mb-2">
                                    <v-icon color="warning" class="mr-2"
                                      >mdi-clock-alert</v-icon
                                    >
                                    <div class="font-weight-bold text-warning">
                                      Outstanding Amounts
                                    </div>
                                  </div>

                                  <!-- Arrears Details -->
                                  <div
                                    v-if="
                                      studentArrearsInfo.current_arrears > 0
                                    "
                                    class="mb-2"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="text-caption">Arrears:</span>
                                      <span
                                        class="font-weight-bold text-warning"
                                        >₨{{
                                          studentArrearsInfo.current_arrears
                                        }}</span
                                      >
                                    </div>
                                  </div>

                                  <!-- Fine Details -->
                                  <div
                                    v-if="studentArrearsInfo.current_fine > 0"
                                    class="mb-2"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="text-caption">Fine:</span>
                                      <span class="font-weight-bold text-error"
                                        >₨{{
                                          studentArrearsInfo.current_fine
                                        }}</span
                                      >
                                    </div>
                                  </div>

                                  <!-- Total Due -->
                                  <div class="mb-2">
                                    <div class="d-flex justify-space-between">
                                      <span
                                        class="text-subtitle-2 font-weight-bold"
                                        >Total Due:</span
                                      >
                                      <span
                                        class="text-subtitle-2 font-weight-bold text-error"
                                        >₨{{
                                          studentArrearsInfo.total_due
                                        }}</span
                                      >
                                    </div>
                                  </div>

                                  <!-- Payment Progress -->
                                  <div
                                    class="mt-3 pa-2"
                                    style="
                                      background: #f8f9fa;
                                      border-radius: 4px;
                                    "
                                  >
                                    <div class="text-caption text-grey mb-1">
                                      Payment Progress
                                    </div>
                                    <div class="d-flex align-center">
                                      <v-progress-linear
                                        :value="
                                          studentArrearsInfo.payment_progress
                                            .percentage
                                        "
                                        color="primary"
                                        height="8"
                                        class="mr-2"
                                      ></v-progress-linear>
                                      <span class="text-caption">
                                        {{
                                          studentArrearsInfo.payment_progress
                                            .made
                                        }}/{{
                                          studentArrearsInfo.payment_progress
                                            .expected
                                        }}
                                        ({{
                                          studentArrearsInfo.payment_progress
                                            .percentage
                                        }}%)
                                      </span>
                                    </div>
                                  </div>

                                  <!-- Last Payment Info -->
                                  <div
                                    v-if="studentArrearsInfo.last_payment_date"
                                    class="mt-2"
                                  >
                                    <div class="text-caption text-grey">
                                      Last Payment:
                                      {{
                                        new Date(
                                          studentArrearsInfo.last_payment_date
                                        ).toLocaleDateString()
                                      }}
                                    </div>
                                  </div>
                                </div>

                                <!-- Simple Arrears Alert (fallback) -->
                                <div
                                  v-else-if="remainingArrears > 0"
                                  class="mb-3 pa-3"
                                  style="
                                    background: #fff3cd;
                                    border: 1px solid #ffeaa7;
                                    border-radius: 6px;
                                  "
                                >
                                  <div class="d-flex align-center">
                                    <v-icon color="warning" class="mr-2"
                                      >mdi-clock-alert</v-icon
                                    >
                                    <div>
                                      <div
                                        class="font-weight-bold text-warning"
                                      >
                                        Outstanding Arrears: ₨{{
                                          remainingArrears
                                        }}
                                      </div>
                                      <div class="text-caption text-grey">
                                        Previous unpaid amount from previous
                                        months
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex align-center">
                                  <v-avatar size="32" class="mr-3">
                                    <v-img
                                      v-if="
                                        selectedStudentInfo &&
                                        selectedStudentInfo.photo
                                      "
                                      :src="`http://localhost:8081/uploads/profile-images/${selectedStudentInfo.photo}`"
                                      alt="Student Photo"
                                    ></v-img>
                                    <v-img
                                      v-else
                                      :src="
                                        getStudentAvatar(
                                          selectedStudentInfo
                                            ? selectedStudentInfo.name
                                            : ''
                                        )
                                      "
                                      alt="Student Avatar"
                                    ></v-img>
                                  </v-avatar>
                                  <div class="flex-grow-1">
                                    <div class="font-weight-bold">
                                      {{
                                        selectedStudentInfo
                                          ? selectedStudentInfo.name
                                          : "No Student Selected"
                                      }}
                                    </div>
                                    <div class="text-caption text-grey">
                                      Class:
                                      {{
                                        selectedStudentInfo
                                          ? selectedStudentInfo.class_name ||
                                            "N/A"
                                          : "N/A"
                                      }}
                                    </div>
                                  </div>
                                  <!-- Payment Status Indicator -->
                                  <v-chip
                                    v-if="
                                      selectedStudentInfo && studentArrearsInfo
                                    "
                                    :color="
                                      studentArrearsInfo.is_overdue
                                        ? 'error'
                                        : 'success'
                                    "
                                    text-color="white"
                                    small
                                    class="ml-2"
                                  >
                                    <v-icon left size="16">
                                      {{
                                        studentArrearsInfo.is_overdue
                                          ? "mdi-clock-alert"
                                          : "mdi-check-circle"
                                      }}
                                    </v-icon>
                                    {{
                                      studentArrearsInfo.is_overdue
                                        ? "Outstanding"
                                        : "No Dues"
                                    }}
                                  </v-chip>
                                </div>
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-card class="selection-card" elevation="0" outlined>
                            <v-card-text class="pa-4">
                              <div class="d-flex align-center mb-3">
                                <v-icon color="primary" class="mr-2"
                                  >mdi-calendar-month</v-icon
                                >
                                <span class="text-subtitle-1 font-weight-bold"
                                  >Fee Period</span
                                >
                              </div>
                              <v-select
                                v-model="feeSubmission.month"
                                :items="monthOptions"
                                label="Fee Month"
                                :rules="[rules.required]"
                                outlined
                                required
                                @change="calculateTotalFee"
                                class="enhanced-form-field"
                                prepend-inner-icon="mdi-calendar"
                              ></v-select>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <!-- Fee Components Row -->
                      <v-row class="mb-6">
                        <v-col cols="12">
                          <v-card
                            class="fee-components-card"
                            elevation="0"
                            outlined
                          >
                            <v-card-title class="pa-4 pb-2">
                              <div
                                class="d-flex align-center justify-space-between w-100"
                              >
                                <div class="d-flex align-center">
                                  <v-icon color="primary" class="mr-2"
                                    >mdi-cash-multiple</v-icon
                                  >
                                  <span class="text-h6 font-weight-bold"
                                    >Fee Components</span
                                  >
                                </div>
                              </div>
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-row>
                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees
                                              .admission_fee
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="
                                            getAdmissionFeeRemaining() <= 0
                                          "
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getAdmissionFeeIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getAdmissionFeeIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Admission Fee
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getAdmissionFeeStatus()"
                                          :color="getAdmissionFeeStatusColor()"
                                          size="small"
                                        >
                                          {{ getAdmissionFeeStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="
                                          feeSubmission.admission_fee
                                        "
                                        label="Amount"
                                        type="number"
                                        :rules="[rules.optionalPositive]"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getAdmissionFeeHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees
                                            .admission_fee
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees
                                              .monthly_fee
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="
                                            getMonthlyFeeRemaining() <= 0
                                          "
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getMonthlyFeeIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getMonthlyFeeIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Monthly Fee
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getMonthlyFeeStatus()"
                                          :color="getMonthlyFeeStatusColor()"
                                          size="small"
                                        >
                                          {{ getMonthlyFeeStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="
                                          feeSubmission.monthly_fee
                                        "
                                        label="Amount"
                                        type="number"
                                        :rules="[rules.optionalPositive]"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getMonthlyFeeHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees
                                            .monthly_fee
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees.fine
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="getFineRemaining() <= 0"
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getFineIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getFineIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Fine
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getFineStatus()"
                                          :color="getFineStatusColor()"
                                          size="small"
                                        >
                                          {{ getFineStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="feeSubmission.fine"
                                        label="Amount"
                                        type="number"
                                        :rules="[rules.optionalPositive]"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getFineHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees.fine
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees
                                              .transport_fee
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="
                                            getTransportFeeRemaining() <= 0
                                          "
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getTransportFeeIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getTransportFeeIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Transport Fee
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getTransportFeeStatus()"
                                          :color="getTransportFeeStatusColor()"
                                          size="small"
                                        >
                                          {{ getTransportFeeStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="
                                          feeSubmission.transport_fee
                                        "
                                        label="Amount"
                                        type="number"
                                        :rules="[rules.optionalPositive]"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getTransportFeeHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees
                                            .transport_fee
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees
                                              .annual_fee
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="
                                            getAnnualFeeRemaining() <= 0
                                          "
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getAnnualFeeIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getAnnualFeeIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Annual Fee
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getAnnualFeeStatus()"
                                          :color="getAnnualFeeStatusColor()"
                                          size="small"
                                        >
                                          {{ getAnnualFeeStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="
                                          feeSubmission.annual_fee
                                        "
                                        label="Amount"
                                        type="number"
                                        :rules="[rules.optionalPositive]"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getAnnualFeeHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees
                                            .annual_fee
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-card
                                    class="fee-component-card"
                                    elevation="1"
                                    outlined
                                  >
                                    <v-card-text class="pa-3">
                                      <div class="d-flex align-center mb-2">
                                        <v-checkbox
                                          v-model="
                                            feeSubmission.selected_fees.arrears
                                          "
                                          color="primary"
                                          hide-details
                                          class="mr-2"
                                          :disabled="getArrearsRemaining() <= 0"
                                        ></v-checkbox>
                                        <v-icon
                                          :color="getArrearsIconColor()"
                                          class="mr-2"
                                        >
                                          {{ getArrearsIcon() }}
                                        </v-icon>
                                        <span
                                          class="text-subtitle-2 font-weight-bold"
                                        >
                                          Arrears
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-chip
                                          v-if="getArrearsStatus()"
                                          :color="getArrearsStatusColor()"
                                          size="small"
                                        >
                                          {{ getArrearsStatus() }}
                                        </v-chip>
                                      </div>
                                      <v-text-field
                                        v-model.number="feeSubmission.arrears"
                                        label="Amount"
                                        type="number"
                                        outlined
                                        dense
                                        prefix="₨"
                                        class="enhanced-form-field"
                                        placeholder="0"
                                        :hint="getArrearsHint()"
                                        persistent-hint
                                        @input="calculateTotalFee"
                                        :disabled="
                                          !feeSubmission.selected_fees.arrears
                                        "
                                      ></v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <!-- Fee Summary Row -->
                      <v-row class="mb-6">
                        <v-col cols="12">
                          <v-card
                            class="fee-summary-card"
                            elevation="0"
                            outlined
                          >
                            <v-card-title class="pa-4 pb-2">
                              <div
                                class="d-flex align-center justify-space-between w-100"
                              >
                                <div class="d-flex align-center">
                                  <v-icon color="info" class="mr-2"
                                    >mdi-calculator</v-icon
                                  >
                                  <span class="text-h6 font-weight-bold"
                                    >Fee Summary</span
                                  >
                                </div>
                                <div class="d-flex align-center ml-8">
                                  <v-chip
                                    color="primary"
                                    size="small"
                                    class="mr-2"
                                  >
                                    {{ selectedFeesCount }} Selected
                                  </v-chip>
                                  <v-chip color="success" size="small">
                                    ₨{{ totalSelectedAmount }}
                                  </v-chip>
                                </div>
                              </div>
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-row>
                                <v-col cols="12" md="3">
                                  <v-card
                                    class="summary-item"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-text class="text-center pa-3">
                                      <div class="text-h6 text-primary">
                                        ₨{{ totalFee }}
                                      </div>
                                      <div class="text-caption">
                                        Total Fee Due
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                  <v-card
                                    class="summary-item"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-text class="text-center pa-3">
                                      <div class="text-h6 text-success">
                                        ₨{{ feeSubmission.amount_paid || 0 }}
                                      </div>
                                      <div class="text-caption">
                                        Amount Paid
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                  <v-card
                                    class="summary-item"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-text class="text-center pa-3">
                                      <div
                                        class="text-h6"
                                        :class="
                                          remainingBalance > 0
                                            ? 'text-error'
                                            : 'text-success'
                                        "
                                      >
                                        ₨{{ remainingBalance }}
                                      </div>
                                      <div class="text-caption">
                                        Remaining Balance
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                  <v-card
                                    class="summary-item"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-text class="text-center pa-3">
                                      <div
                                        class="text-h6"
                                        :class="
                                          newArrears > 0
                                            ? 'text-error'
                                            : 'text-success'
                                        "
                                      >
                                        ₨{{ newArrears }}
                                      </div>
                                      <div class="text-caption">
                                        New Arrears
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <!-- Payment Amount Row -->
                      <v-row class="mb-6">
                        <v-col cols="12" md="6">
                          <v-card
                            class="payment-amount-card"
                            elevation="0"
                            outlined
                          >
                            <v-card-title class="pa-4 pb-2">
                              <v-icon color="success" class="mr-2"
                                >mdi-cash-check</v-icon
                              >
                              <span class="text-h6 font-weight-bold"
                                >Payment Amount</span
                              >
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-text-field
                                v-model.number="feeSubmission.amount_paid"
                                label="Amount Paid"
                                type="number"
                                :rules="[rules.required, rules.positive]"
                                outlined
                                required
                                prefix="₨"
                                @input="calculateRemainingBalance"
                                class="enhanced-form-field"
                                prepend-inner-icon="mdi-cash"
                                color="success"
                                large
                              ></v-text-field>
                            </v-card-text>
                          </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-card
                            class="payment-details-card"
                            elevation="0"
                            outlined
                          >
                            <v-card-title class="pa-4 pb-2">
                              <v-icon color="info" class="mr-2"
                                >mdi-credit-card</v-icon
                              >
                              <span class="text-h6 font-weight-bold"
                                >Payment Details</span
                              >
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-row>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    v-model="feeSubmission.payment_method"
                                    :items="paymentMethods"
                                    label="Payment Method"
                                    :rules="[rules.required]"
                                    outlined
                                    required
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-credit-card"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-menu
                                    ref="paymentDateMenu"
                                    v-model="paymentDateMenu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="feeSubmission.payment_date"
                                        label="Payment Date"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[rules.required]"
                                        outlined
                                        required
                                        class="enhanced-form-field"
                                        prepend-inner-icon="mdi-calendar"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="feeSubmission.payment_date"
                                      @input="paymentDateMenu = false"
                                      :max="today"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <!-- Enhanced Total Fee Display -->
                      <v-row class="mb-6">
                        <v-col cols="12">
                          <v-card
                            class="enhanced-total-fee-card"
                            elevation="0"
                            outlined
                          >
                            <v-card-title class="pa-6 pb-4">
                              <v-icon color="primary" class="mr-3"
                                >mdi-calculator</v-icon
                              >
                              <span class="text-h5 font-weight-bold"
                                >Fee Summary</span
                              >
                            </v-card-title>
                            <v-card-text class="pa-6 pt-0">
                              <v-row>
                                <v-col cols="12" lg="6">
                                  <v-card
                                    class="breakdown-card"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-title class="pa-4 pb-2">
                                      <v-icon color="info" class="mr-2"
                                        >mdi-format-list-bulleted</v-icon
                                      >
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                        >Fee Breakdown</span
                                      >
                                    </v-card-title>
                                    <v-card-text class="pa-4 pt-0">
                                      <div class="enhanced-fee-breakdown">
                                        <div class="enhanced-fee-item">
                                          <div class="fee-item-left">
                                            <v-icon
                                              color="primary"
                                              size="20"
                                              class="mr-2"
                                              >mdi-calendar-month</v-icon
                                            >
                                            <span class="fee-label"
                                              >Monthly Fee</span
                                            >
                                          </div>
                                          <span class="fee-value"
                                            >₨{{
                                              feeSubmission.monthly_fee || 0
                                            }}</span
                                          >
                                        </div>
                                        <div
                                          class="enhanced-fee-item"
                                          v-if="remainingArrears > 0"
                                        >
                                          <div class="fee-item-left">
                                            <v-icon
                                              color="warning"
                                              size="20"
                                              class="mr-2"
                                              >mdi-clock-alert</v-icon
                                            >
                                            <span class="fee-label"
                                              >Arrears</span
                                            >
                                          </div>
                                          <span class="fee-value"
                                            >₨{{ remainingArrears }}</span
                                          >
                                        </div>
                                        <div
                                          class="enhanced-fee-item"
                                          v-if="feeSubmission.fine > 0"
                                        >
                                          <div class="fee-item-left">
                                            <v-icon
                                              color="error"
                                              size="20"
                                              class="mr-2"
                                              >mdi-alert-circle</v-icon
                                            >
                                            <span class="fee-label">Fine</span>
                                          </div>
                                          <span class="fee-value"
                                            >₨{{
                                              feeSubmission.fine || 0
                                            }}</span
                                          >
                                        </div>
                                        <div
                                          class="enhanced-fee-item"
                                          v-if="feeSubmission.annual_fee > 0"
                                        >
                                          <div class="fee-item-left">
                                            <v-icon
                                              color="success"
                                              size="20"
                                              class="mr-2"
                                              >mdi-calendar-year</v-icon
                                            >
                                            <span class="fee-label"
                                              >Annual Fee</span
                                            >
                                          </div>
                                          <span class="fee-value"
                                            >₨{{
                                              feeSubmission.annual_fee
                                            }}</span
                                          >
                                        </div>
                                        <v-divider class="my-3"></v-divider>
                                        <div
                                          class="enhanced-fee-item total-item"
                                        >
                                          <div class="fee-item-left">
                                            <v-icon
                                              color="primary"
                                              size="24"
                                              class="mr-2"
                                              >mdi-calculator</v-icon
                                            >
                                            <span class="fee-label total-label"
                                              >Total Fee</span
                                            >
                                          </div>
                                          <span class="fee-value total-value"
                                            >₨{{ totalFee }}</span
                                          >
                                        </div>
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="12" lg="6">
                                  <v-card
                                    class="summary-card"
                                    elevation="0"
                                    outlined
                                  >
                                    <v-card-title class="pa-4 pb-2">
                                      <v-icon color="success" class="mr-2"
                                        >mdi-cash-check</v-icon
                                      >
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                        >Payment Summary</span
                                      >
                                    </v-card-title>
                                    <v-card-text class="pa-4 pt-0">
                                      <div class="enhanced-payment-summary">
                                        <!-- Arrears Warning -->
                                        <div
                                          v-if="remainingArrears > 0"
                                          class="enhanced-summary-item mb-3 pa-3"
                                          style="
                                            background: #fff3cd;
                                            border: 1px solid #ffeaa7;
                                            border-radius: 6px;
                                          "
                                        >
                                          <div class="summary-item-left">
                                            <v-icon
                                              color="warning"
                                              size="20"
                                              class="mr-2"
                                              >mdi-clock-alert</v-icon
                                            >
                                            <span
                                              class="summary-label font-weight-bold text-warning"
                                              >Outstanding Arrears</span
                                            >
                                          </div>
                                          <span
                                            class="summary-value text-warning font-weight-bold"
                                            >₨{{ remainingArrears }}</span
                                          >
                                        </div>
                                        <div class="enhanced-summary-item">
                                          <div class="summary-item-left">
                                            <v-icon
                                              color="success"
                                              size="20"
                                              class="mr-2"
                                              >mdi-cash</v-icon
                                            >
                                            <span class="summary-label"
                                              >Amount Paid</span
                                            >
                                          </div>
                                          <span class="summary-value"
                                            >₨{{
                                              feeSubmission.amount_paid || 0
                                            }}</span
                                          >
                                        </div>
                                        <div class="enhanced-summary-item">
                                          <div class="summary-item-left">
                                            <v-icon
                                              :color="
                                                remainingBalance < 0
                                                  ? 'error'
                                                  : 'success'
                                              "
                                              size="20"
                                              class="mr-2"
                                            >
                                              {{
                                                remainingBalance < 0
                                                  ? "mdi-alert-circle"
                                                  : "mdi-check-circle"
                                              }}
                                            </v-icon>
                                            <span class="summary-label"
                                              >Remaining Balance</span
                                            >
                                          </div>
                                          <span
                                            class="summary-value"
                                            :class="
                                              remainingBalance < 0
                                                ? 'text-error'
                                                : 'text-success'
                                            "
                                          >
                                            ₨{{ remainingBalance }}
                                          </span>
                                        </div>
                                        <div
                                          class="enhanced-summary-item"
                                          v-if="remainingBalance > 0"
                                        >
                                          <div class="summary-item-left">
                                            <v-icon
                                              color="error"
                                              size="20"
                                              class="mr-2"
                                              >mdi-clock-alert</v-icon
                                            >
                                            <span class="summary-label"
                                              >New Arrears</span
                                            >
                                          </div>
                                          <span class="summary-value text-error"
                                            >₨{{ remainingBalance }}</span
                                          >
                                        </div>
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <!-- Remarks Section -->
                      <v-row>
                        <v-col cols="12">
                          <v-card class="remarks-card" elevation="0" outlined>
                            <v-card-title class="pa-4 pb-2">
                              <v-icon color="info" class="mr-2"
                                >mdi-note-text</v-icon
                              >
                              <span class="text-h6 font-weight-bold"
                                >Additional Notes</span
                              >
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-textarea
                                v-model="feeSubmission.remarks"
                                label="Remarks (Optional)"
                                outlined
                                rows="3"
                                class="enhanced-form-field"
                                prepend-inner-icon="mdi-note"
                                color="info"
                              ></v-textarea>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>

                  <!-- Enhanced Action Buttons -->
                  <v-card-actions class="enhanced-submission-actions pa-8">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="grey"
                      outlined
                      large
                      @click="resetFeeSubmission"
                      class="enhanced-reset-btn mr-4"
                    >
                      <v-icon left>mdi-refresh</v-icon>
                      Reset Form
                    </v-btn>
                    <v-btn
                      color="primary"
                      large
                      @click="submitFeeSubmission"
                      :loading="feeSubmissionLoading"
                      :disabled="!feeSubmissionValid"
                      class="enhanced-submit-btn"
                    >
                      <v-icon left>mdi-cash-check</v-icon>
                      Submit Fee Payment
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <!-- Fee Collection Button Section -->
            <v-row class="mb-6">
              <v-col cols="12" class="text-center">
                <v-btn
                  color="primary"
                  size="x-large"
                  elevation="8"
                  @click="openFeeCollectionDialog"
                >
                  <v-icon left size="28">mdi-cash-plus</v-icon>
                  Collect New Fee
                </v-btn>
              </v-col>
            </v-row>

            <!-- Search and Filters Section -->
            <div class="search-filters-section mb-6">
              <v-card class="search-card" elevation="0">
                <v-card-text class="pa-6">
                  <v-row align="center">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="searchQuery"
                        label="Search by Student Name, Phone Number, Admission Number, CNIC, or Class..."
                        prepend-inner-icon="mdi-magnify"
                        outlined
                        clearable
                        @input="stableSearch"
                        @keyup.enter="performSearch"
                        @click:clear="clearMainSearch"
                        class="search-field"
                        persistent-hint
                        hint="Search across all fee records"
                        placeholder="Type to search fees..."
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-select
                        v-model="selectedMonth"
                        :items="monthOptions"
                        label="Filter by Month"
                        outlined
                        clearable
                        @change="filterFees"
                        class="filter-field"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-select
                        v-model="selectedYear"
                        :items="yearOptions"
                        label="Filter by Year"
                        outlined
                        clearable
                        @change="filterFees"
                        class="filter-field"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>

            <!-- Tabs Section -->
            <div class="tabs-section">
              <v-card class="tabs-card" elevation="0">
                <v-tabs
                  v-model="activeTab"
                  background-color="transparent"
                  color="primary"
                  grow
                  class="modern-tabs"
                >
                  <v-tab class="tab-item">
                    <v-icon left>mdi-format-list-bulleted</v-icon>
                    All Fees
                  </v-tab>
                  <v-tab class="tab-item">
                    <v-icon left>mdi-clock-alert</v-icon>
                    Pending Fees
                  </v-tab>
                  <v-tab class="tab-item">
                    <v-icon left>mdi-history</v-icon>
                    Fee History
                  </v-tab>
                </v-tabs>

                <v-divider></v-divider>

                <v-tabs-items v-model="activeTab" class="tabs-content">
                  <!-- All Fees Tab -->
                  <v-tab-item>
                    <div class="tab-content pa-6">
                      <!-- Bulk Actions -->
                      <div class="bulk-actions-container mb-4">
                        <div class="d-flex justify-space-between align-center">
                          <div class="bulk-actions-left">
                            <v-btn
                              color="primary"
                              size="small"
                              class="mr-3 action-button"
                              :disabled="selectedFees.length === 0"
                              @click="exportSelectedFees"
                              prepend-icon="mdi-download"
                              elevation="2"
                              rounded
                            >
                              <span class="font-weight-bold"
                                >EXPORT SELECTED</span
                              >
                            </v-btn>
                            <v-btn
                              color="success"
                              size="small"
                              class="mr-3 action-button"
                              @click="exportAllFees"
                              prepend-icon="mdi-download-multiple"
                              elevation="2"
                              rounded
                            >
                              <span class="font-weight-bold">EXPORT ALL</span>
                            </v-btn>
                          </div>
                          <div class="bulk-actions-center">
                            <div class="selection-info">
                              <v-chip
                                color="info"
                                size="small"
                                class="selection-chip"
                              >
                                <v-icon left size="16"
                                  >mdi-checkbox-multiple-marked</v-icon
                                >
                                {{ selectedFees.length }} of
                                {{ filteredFees.length }} selected
                              </v-chip>
                            </div>
                          </div>
                          <div class="bulk-actions-right">
                            <v-btn
                              color="secondary"
                              size="small"
                              class="mr-3 action-button"
                              @click="selectAllFeesTable"
                              prepend-icon="mdi-checkbox-multiple-marked"
                              elevation="2"
                              rounded
                            >
                              <span class="font-weight-bold">
                                {{
                                  selectedFees.length === filteredFees.length
                                    ? "DESELECT ALL"
                                    : "SELECT ALL"
                                }}
                              </span>
                            </v-btn>
                            <v-btn
                              v-if="selectedFees.length > 0"
                              color="grey"
                              size="small"
                              class="mr-3 action-button"
                              @click="clearSelection"
                              prepend-icon="mdi-checkbox-blank-outline"
                              elevation="2"
                              rounded
                            >
                              <span class="font-weight-bold">CLEAR</span>
                            </v-btn>
                            <v-btn
                              color="error"
                              size="small"
                              class="action-button"
                              :disabled="selectedFees.length === 0"
                              @click="deleteSelectedFees"
                              prepend-icon="mdi-delete"
                              elevation="2"
                              rounded
                            >
                              <span class="font-weight-bold"
                                >DELETE SELECTED</span
                              >
                            </v-btn>
                          </div>
                        </div>
                      </div>

                      <v-data-table
                        :headers="feeHeaders"
                        :items="filteredFees"
                        :loading="loading"
                        sort-by="payment_date"
                        sort-desc
                        class="modern-data-table"
                        :items-per-page="10"
                        :items-per-page-options="[5, 10, 25, 50]"
                        v-model="selectedFees"
                        show-select
                        item-key="id"
                        :single-select="false"
                      >
                        <template v-slot:item.student_name="{ item }">
                          <div class="student-info">
                            <v-avatar size="40" class="mr-3">
                              <v-img
                                :src="
                                  getStudentAvatar(
                                    item ? item.student_name : ''
                                  )
                                "
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item ? item.student_name || "N/A" : "N/A" }}
                              </div>
                              <div class="student-details">
                                {{
                                  item ? item.admission_number || "N/A" : "N/A"
                                }}
                              </div>
                            </div>
                          </div>
                        </template>

                        <template v-slot:item.amount="{ item }">
                          <span class="amount-text"
                            >₨{{ item.amount.toLocaleString() }}</span
                          >
                        </template>

                        <template v-slot:item.payment_date="{ item }">
                          <span class="date-text">{{
                            formatDate(item.payment_date)
                          }}</span>
                        </template>

                        <template v-slot:item.payment_method="{ item }">
                          <v-chip
                            :color="getPaymentMethodColor(item.payment_method)"
                            text-color="white"
                            small
                            class="payment-method-chip"
                          >
                            {{ item.payment_method }}
                          </v-chip>
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <div class="action-buttons">
                            <v-btn
                              icon
                              small
                              color="primary"
                              @click="viewFeeDetails(item)"
                              class="action-btn"
                            >
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>

                            <v-btn
                              icon
                              small
                              color="warning"
                              @click="editFee(item)"
                              class="action-btn"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              icon
                              small
                              color="error"
                              @click="deleteFee(item)"
                              class="action-btn"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </template>
                      </v-data-table>
                    </div>
                  </v-tab-item>

                  <!-- Pending Fees Tab -->
                  <v-tab-item>
                    <div class="tab-content pa-6">
                      <v-data-table
                        :headers="pendingHeaders"
                        :items="pendingFees"
                        :loading="loading"
                        sort-by="arrears_amount"
                        sort-desc
                        class="modern-data-table"
                        :items-per-page="10"
                        :items-per-page-options="[5, 10, 25, 50]"
                      >
                        <template v-slot:item.student_name="{ item }">
                          <div class="student-info">
                            <v-avatar size="40" class="mr-3">
                              <v-img
                                :src="
                                  getStudentAvatar(
                                    item ? item.student_name : ''
                                  )
                                "
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item ? item.student_name || "N/A" : "N/A" }}
                              </div>
                              <div class="student-details">
                                {{ item ? item.class_name || "N/A" : "N/A" }}
                              </div>
                            </div>
                          </div>
                        </template>

                        <template v-slot:item.monthly_fee="{ item }">
                          <span class="amount-text"
                            >₨{{ item.monthly_fee.toLocaleString() }}</span
                          >
                        </template>

                        <template v-slot:item.arrears_amount="{ item }">
                          <span class="arrears-text"
                            >₨{{ item.arrears_amount.toLocaleString() }}</span
                          >
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <v-btn
                            color="primary"
                            small
                            @click="collectPendingFee(item)"
                            class="collect-btn"
                          >
                            <v-icon left>mdi-cash</v-icon>
                            Collect
                          </v-btn>
                        </template>
                      </v-data-table>
                    </div>
                  </v-tab-item>

                  <!-- Fee History Tab -->
                  <v-tab-item>
                    <div class="tab-content pa-6">
                      <v-data-table
                        :headers="historyHeaders"
                        :items="feeHistory"
                        :loading="loading"
                        sort-by="payment_date"
                        sort-desc
                        class="modern-data-table"
                        :items-per-page="10"
                        :items-per-page-options="[5, 10, 25, 50]"
                      >
                        <template v-slot:item.student_name="{ item }">
                          <div class="student-info">
                            <v-avatar size="40" class="mr-3">
                              <v-img
                                :src="
                                  getStudentAvatar(
                                    item ? item.student_name : ''
                                  )
                                "
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item ? item.student_name || "N/A" : "N/A" }}
                              </div>
                              <div class="student-details">
                                {{
                                  item ? item.admission_number || "N/A" : "N/A"
                                }}
                              </div>
                            </div>
                          </div>
                        </template>

                        <template v-slot:item.amount="{ item }">
                          <span class="amount-text"
                            >₨{{ item.amount.toLocaleString() }}</span
                          >
                        </template>

                        <template v-slot:item.payment_date="{ item }">
                          <span class="date-text">{{
                            formatDate(item.payment_date)
                          }}</span>
                        </template>
                      </v-data-table>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Enhanced Fee Collection Dialog -->
    <v-dialog v-model="showFeeDialog" max-width="700" persistent>
      <v-card class="fee-dialog-card" elevation="24">
        <v-card-title class="dialog-header">
          <div class="dialog-title">
            <v-icon size="32" class="mr-3">mdi-cash-plus</v-icon>
            <span>Collect Fee</span>
          </div>
          <v-btn icon @click="showFeeDialog = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="dialog-content pa-6">
          <v-form ref="feeForm" v-model="feeFormValid">
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="feeForm.student_id"
                  :items="students"
                  item-text="name"
                  item-value="id"
                  label="Select Student"
                  :rules="[rules.required]"
                  outlined
                  required
                  @change="onStudentChangeDialog"
                  class="form-field"
                >
                  <template v-slot:selection="{ item }">
                    <div class="d-flex align-center" v-if="item">
                      <v-avatar size="24" class="mr-2">
                        <v-img
                          :src="getStudentAvatar(item ? item.name : '')"
                        ></v-img>
                      </v-avatar>
                      <span>{{
                        item ? `${item.name} - ${item.admission_number}` : "N/A"
                      }}</span>
                    </div>
                  </template>
                  <template v-slot:item="{ item }">
                    <div class="d-flex align-center">
                      <v-avatar size="32" class="mr-3">
                        <v-img
                          :src="getStudentAvatar(item ? item.name : '')"
                        ></v-img>
                      </v-avatar>
                      <div>
                        <div class="font-weight-bold">
                          {{ item ? item.name : "N/A" }}
                        </div>
                        <div class="text-caption text-grey">
                          {{
                            item
                              ? `${item.admission_number} - Class: ${
                                  item.class_name || "N/A"
                                }`
                              : "N/A"
                          }}
                        </div>
                      </div>
                    </div>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="feeForm.fee_type"
                  :items="feeTypes"
                  label="Fee Type"
                  :rules="[rules.required]"
                  outlined
                  required
                  class="form-field"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="feeForm.amount"
                  label="Amount (PKR)"
                  type="number"
                  :rules="[rules.required, rules.positive]"
                  outlined
                  required
                  prefix="₨"
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-menu
                  ref="paymentDateMenu"
                  v-model="paymentDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="feeForm.payment_date"
                      label="Payment Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                      outlined
                      required
                      class="form-field"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="feeForm.payment_date"
                    @input="paymentDateMenu = false"
                    :max="today"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="feeForm.payment_method"
                  :items="paymentMethods"
                  label="Payment Method"
                  :rules="[rules.required]"
                  outlined
                  required
                  class="form-field"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="feeForm.month"
                  label="Month"
                  type="number"
                  min="1"
                  max="12"
                  :rules="[rules.required, rules.month]"
                  outlined
                  required
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="feeForm.year"
                  label="Year"
                  type="number"
                  min="2020"
                  max="2030"
                  :rules="[rules.required, rules.year]"
                  outlined
                  required
                  class="form-field"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="feeForm.remarks"
                  label="Remarks (Optional)"
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
            @click="showFeeDialog = false"
            class="cancel-btn"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="submitFee"
            :loading="feeLoading"
            :disabled="!feeFormValid"
            class="save-btn"
          >
            <v-icon left>mdi-content-save</v-icon>
            Save Fee
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Beautiful Success Dialog -->
    <v-dialog v-model="successDialog" max-width="540" persistent>
      <v-card class="beautiful-success-dialog" elevation="0" rounded="xl">
        <!-- Success Header -->
        <div class="success-dialog-header">
          <div class="success-header-content">
            <div class="success-icon-wrapper">
              <v-icon size="40" color="white">mdi-check-circle</v-icon>
            </div>
            <div class="success-header-text">
              <h2 class="success-dialog-title">Success!</h2>
              <p class="success-dialog-subtitle">Fee collection completed</p>
            </div>
          </div>
        </div>

        <!-- Success Content -->
        <v-card-text class="success-dialog-content">
          <div class="success-content-wrapper">
            <!-- Main Success Message -->
            <div class="success-main-message">
              <div class="success-message-icon">
                <v-icon size="32" color="success">mdi-check-circle</v-icon>
              </div>
              <div class="success-message-content">
                <p class="success-message-text">
                  Fee has been collected successfully!
                </p>
              </div>
            </div>

            <!-- Success Details -->
            <div class="success-details-box">
              <div class="details-icon">
                <v-icon size="24" color="success">mdi-database-check</v-icon>
              </div>
              <div class="details-content">
                <p class="details-text">
                  The payment has been recorded and the student's account has
                  been updated.
                </p>
              </div>
            </div>

            <!-- Success Indicators -->
            <div class="success-indicators">
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-check</v-icon>
                </div>
                <span class="success-item-text">Payment recorded</span>
              </div>
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-account-check</v-icon>
                </div>
                <span class="success-item-text">Account updated</span>
              </div>
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-receipt</v-icon>
                </div>
                <span class="success-item-text">Receipt generated</span>
              </div>
            </div>
          </div>
        </v-card-text>

        <!-- Success Action Button -->
        <v-card-actions class="success-dialog-actions">
          <div class="success-button-container">
            <v-btn
              color="success"
              variant="elevated"
              @click="successDialog = false"
              class="success-ok-btn"
              size="large"
            >
              <v-icon left>mdi-check</v-icon>
              OK
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Barcode Input Dialog -->
    <v-dialog v-model="showManualBarcodeInput" max-width="500" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left>mdi-qrcode-scan</v-icon>
          Scan Fee Slip Barcode
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center">
            <p class="mb-4">
              Enter the barcode manually to automatically fill the form
            </p>
            <v-text-field
              v-model="manualBarcodeValue"
              label="Enter Barcode"
              outlined
              dense
              placeholder="e.g., FS0083820577243"
              @keyup.enter="processManualBarcode"
              autofocus
              class="mb-4"
            ></v-text-field>
            <div class="text-caption text-medium-emphasis mb-4">
              <v-icon left x-small>mdi-information</v-icon>
              Supported formats: FS (Fee Slip) or ST (Student) barcodes
            </div>
            <div
              class="text-caption text-medium-emphasis mb-4 pa-3"
              style="background: #f5f5f5; border-radius: 4px"
            >
              <div class="font-weight-bold mb-1">Example Barcodes:</div>
              <div class="text-caption">• Fee Slip: FS0083820577243</div>
              <div class="text-caption">• Student: ST0008ADM123456789012</div>
              <div class="text-caption">• Portable scanner compatible</div>
            </div>
            <div class="mt-4">
              <v-btn
                color="secondary"
                @click="closeManualBarcodeInput"
                class="mr-2"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click="processManualBarcode"
                :loading="processingManualBarcode"
                :disabled="!manualBarcodeValue.trim()"
              >
                <v-icon left>mdi-check</v-icon>
                Process Barcode
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Receipt Dialog -->
    <v-dialog v-model="showReceipt" max-width="900" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left>mdi-receipt</v-icon>
          Fee Payment Receipt
        </v-card-title>
        <v-card-text class="pa-0" style="font-family: 'Times New Roman', serif">
          <div
            v-if="receiptData"
            class="receipt-container"
            style="
              max-width: 148mm;
              margin: 0 auto;
              background: white;
              border: 2px solid black;
              max-height: 200mm;
              display: flex;
              flex-direction: column;
              font-size: 10px;
              overflow: hidden;
            "
          >
            <!-- Header Section -->
            <div
              class="receipt-header"
              style="
                text-align: center;
                padding: 6px;
                border-bottom: 2px solid black;
              "
            >
              <div style="font-size: 9px; margin-bottom: 4px">
                {{ formatDate(receiptData.generated_at, "DD/MM/YYYY, HH:mm") }}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Fee Receipt
              </div>

              <h1
                style="
                  font-size: 16px;
                  font-weight: bold;
                  margin: 3px 0;
                  letter-spacing: 1px;
                "
              >
                THE EDUCATORS
              </h1>
              <div style="font-size: 9px; margin: 1px 0">
                Kohat Road Peshawar
              </div>

              <h2
                style="
                  font-size: 12px;
                  font-weight: bold;
                  margin: 4px 0;
                  letter-spacing: 1px;
                "
              >
                FEE RECEIPT
              </h2>

              <div style="font-size: 10px">
                <strong>Receipt No: {{ receiptData.receipt_number }}</strong>
              </div>
              <div style="font-size: 10px; margin-top: 2px">
                Date:
                {{
                  formatDate(
                    receiptData.generated_at,
                    "MMMM DD, YYYY [at] HH:mm A"
                  )
                }}
              </div>
            </div>

            <!-- Student Information Section -->
            <div
              class="student-info"
              style="padding: 6px; border-bottom: 1px solid black"
            >
              <h3
                style="
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 4px;
                  text-decoration: underline;
                "
              >
                STUDENT INFORMATION
              </h3>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                "
              >
                <div style="flex: 1">
                  <strong>Student Name:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.student_info.name }}
                </div>
                <div style="flex: 1; text-align: right">
                  <strong>Admission No:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.student_info.admission_number }}
                </div>
              </div>

              <div style="display: flex; justify-content: space-between">
                <div style="flex: 1">
                  <strong>Father's Name:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.student_info.father_name }}
                </div>
                <div style="flex: 1; text-align: right">
                  <strong>Class:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.student_info.class_name }}
                </div>
              </div>
            </div>

            <!-- Payment Details Section -->
            <div
              class="payment-details"
              style="padding: 6px; border-bottom: 1px solid black"
            >
              <h3
                style="
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 4px;
                  text-decoration: underline;
                "
              >
                PAYMENT DETAILS
              </h3>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                "
              >
                <div style="flex: 1">
                  <strong>Payment Date:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{
                    formatDate(
                      receiptData.payment_details.payment_date,
                      "MMMM DD, YYYY [at] HH:mm A"
                    )
                  }}
                </div>
                <div style="flex: 1; text-align: right">
                  <strong>Payment Method:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.payment_details.payment_method }}
                </div>
              </div>

              <div style="display: flex; justify-content: space-between">
                <div style="flex: 1">
                  <strong>Amount Paid:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style="color: green; font-weight: bold"
                    >Rs{{ receiptData.payment_details.amount_paid }}.00</span
                  >
                </div>
                <div style="flex: 1; text-align: right">
                  <strong>Fee Type:</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ receiptData.payment_details.fee_type }}
                </div>
              </div>
            </div>

            <!-- Fee Breakdown Table -->
            <div class="fee-breakdown" style="padding: 6px; flex: 1">
              <h3
                style="
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 4px;
                  text-decoration: underline;
                "
              >
                FEE BREAKDOWN
              </h3>

              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 6px;
                  font-size: 9px;
                "
              >
                <thead>
                  <tr style="border-bottom: 2px solid black">
                    <th
                      style="text-align: left; padding: 3px; font-weight: bold"
                    >
                      Fee Type
                    </th>
                    <th
                      style="
                        text-align: center;
                        padding: 3px;
                        font-weight: bold;
                      "
                    >
                      Expected Amount
                    </th>
                    <th
                      style="
                        text-align: center;
                        padding: 3px;
                        font-weight: bold;
                      "
                    >
                      Paid Amount
                    </th>
                    <th
                      style="
                        text-align: center;
                        padding: 3px;
                        font-weight: bold;
                      "
                    >
                      Remaining Amount
                    </th>
                    <th
                      style="
                        text-align: center;
                        padding: 3px;
                        font-weight: bold;
                      "
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-if="receiptData.fee_breakdown.admission_fee.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 2px">Admission Fee</td>
                    <td style="text-align: center; padding: 2px">
                      Rs{{ receiptData.fee_breakdown.admission_fee.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 2px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.admission_fee.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 2px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.admission_fee.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 2px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.admission_fee.status }}
                    </td>
                  </tr>
                  <tr
                    v-if="receiptData.fee_breakdown.monthly_fee.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 8px">Monthly Fee</td>
                    <td style="text-align: center; padding: 8px">
                      Rs{{ receiptData.fee_breakdown.monthly_fee.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.monthly_fee.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.monthly_fee.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.monthly_fee.status }}
                    </td>
                  </tr>
                  <tr
                    v-if="receiptData.fee_breakdown.transport_fee.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 8px">Transport Fee</td>
                    <td style="text-align: center; padding: 8px">
                      Rs{{ receiptData.fee_breakdown.transport_fee.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.transport_fee.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.transport_fee.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.transport_fee.status }}
                    </td>
                  </tr>
                  <tr
                    v-if="receiptData.fee_breakdown.arrears.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 8px">Arrears</td>
                    <td style="text-align: center; padding: 8px">
                      Rs{{ receiptData.fee_breakdown.arrears.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.arrears.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.arrears.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.arrears.status }}
                    </td>
                  </tr>
                  <tr
                    v-if="receiptData.fee_breakdown.fine.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 8px">Fine</td>
                    <td style="text-align: center; padding: 8px">
                      Rs{{ receiptData.fee_breakdown.fine.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.fine.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.fine.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.fine.status }}
                    </td>
                  </tr>
                  <tr
                    v-if="receiptData.fee_breakdown.annual_fee.expected > 0"
                    style="border-bottom: 1px solid #ccc"
                  >
                    <td style="padding: 8px">Annual Fee</td>
                    <td style="text-align: center; padding: 8px">
                      Rs{{ receiptData.fee_breakdown.annual_fee.expected }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: green;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.annual_fee.paid }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        color: orange;
                        font-weight: bold;
                      "
                    >
                      Rs{{ receiptData.fee_breakdown.annual_fee.remaining }}
                    </td>
                    <td
                      style="
                        text-align: center;
                        padding: 8px;
                        font-weight: bold;
                      "
                    >
                      {{ receiptData.fee_breakdown.annual_fee.status }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Summary Boxes -->
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-top: 6px;
                "
              >
                <div
                  style="
                    border: 2px solid black;
                    padding: 4px;
                    text-align: center;
                    flex: 1;
                    margin-right: 10px;
                  "
                >
                  <div style="font-weight: bold; margin-bottom: 10px">
                    TOTAL EXPECTED
                  </div>
                  <div style="font-size: 11px; font-weight: bold">
                    Rs{{ receiptData.summary.total_expected }}
                  </div>
                </div>
                <div
                  style="
                    border: 2px solid black;
                    padding: 4px;
                    text-align: center;
                    flex: 1;
                    margin: 0 5px;
                  "
                >
                  <div
                    style="font-weight: bold; margin-bottom: 10px; color: green"
                  >
                    TOTAL PAID
                  </div>
                  <div style="font-size: 24px; font-weight: bold; color: green">
                    Rs{{ receiptData.summary.total_paid }}
                  </div>
                </div>
                <div
                  style="
                    border: 2px solid black;
                    padding: 4px;
                    text-align: center;
                    flex: 1;
                    margin-left: 10px;
                  "
                >
                  <div
                    style="font-weight: bold; margin-bottom: 6px; color: orange"
                  >
                    TOTAL REMAINING
                  </div>
                  <div
                    style="font-size: 24px; font-weight: bold; color: orange"
                  >
                    Rs{{ receiptData.summary.total_remaining }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Status -->
            <div
              style="
                text-align: center;
                padding: 20px;
                border-top: 2px solid black;
                border-bottom: 2px solid black;
                background: #f5f5f5;
              "
            >
              <div
                style="
                  font-size: 18px;
                  font-weight: bold;
                  padding: 10px;
                  border: 2px solid black;
                  display: inline-block;
                  background: white;
                "
              >
                {{
                  receiptData.summary.payment_status === "PAID"
                    ? "FULLY PAID"
                    : receiptData.summary.payment_status
                }}
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 8px 6px; text-align: center">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 12px;
                "
              >
                <div style="text-align: center; flex: 1">
                  <div
                    style="
                      border-bottom: 1px solid black;
                      width: 100px;
                      margin: 0 auto;
                      margin-bottom: 4px;
                    "
                  ></div>
                  <div><strong>Student/Parent Signature</strong></div>
                </div>
                <div style="text-align: center; flex: 1">
                  <div
                    style="
                      border-bottom: 1px solid black;
                      width: 100px;
                      margin: 0 auto;
                      margin-bottom: 4px;
                    "
                  ></div>
                  <div><strong>Authorized Signature</strong></div>
                </div>
              </div>

              <div style="border-top: 1px solid black; padding-top: 20px">
                <div style="font-size: 12px; margin-bottom: 5px">
                  This is a computer generated receipt. No signature required.
                </div>
                <div style="font-size: 12px; font-weight: bold">
                  Thank you for your payment!
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center pa-4">
          <v-btn color="secondary" class="mr-3" @click="closeReceipt">
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
          <v-btn color="primary" @click="printReceipt">
            <v-icon left>mdi-printer</v-icon>
            Print Receipt
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Payment Status -->
    <div class="payment-status text-center mt-6">
      <!-- Payment status content removed -->
    </div>

    <!-- Barcode Scanner Dialog -->
    <v-dialog v-model="showBarcodeScanner" max-width="600" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left>mdi-qrcode-scan</v-icon>
          Barcode Scanner
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center">
            <div class="scanner-container mb-4">
              <div
                ref="videoElement"
                class="scanner-video"
                style="
                  width: 100%;
                  max-width: 400px;
                  height: 300px;
                  border-radius: 8px;
                  background: #f5f5f5;
                "
              ></div>
            </div>

            <div class="scanner-overlay" v-if="scanningBarcode">
              <div class="scanning-indicator">
                <v-icon size="24" color="white" class="scanning-icon"
                  >mdi-qrcode-scan</v-icon
                >
                <span class="scanning-text">Scanning...</span>
              </div>
            </div>

            <div class="scanner-controls mt-4">
              <v-btn
                color="secondary"
                @click="closeBarcodeScanner"
                class="mr-2"
              >
                <v-icon left>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click="toggleCamera"
                :loading="cameraLoading"
                class="mr-2"
              >
                <v-icon left>mdi-camera-switch</v-icon>
                Switch Camera
              </v-btn>
              <v-btn color="warning" @click="testBarcodeDetection" class="mr-2">
                <v-icon left>mdi-test-tube</v-icon>
                Test Scan
              </v-btn>
              <v-btn color="info" @click="debugScanner" class="mr-2">
                <v-icon left>mdi-bug</v-icon>
                Debug
              </v-btn>
              <v-btn color="success" @click="manualBarcodeInput" class="mr-2">
                <v-icon left>mdi-keyboard</v-icon>
                Manual Input
              </v-btn>
            </div>

            <div class="scanner-info mt-4">
              <div class="text-caption text-medium-emphasis">
                <v-icon left x-small>mdi-information</v-icon>
                Point camera at barcode to scan automatically
              </div>
              <div class="text-caption text-medium-emphasis mt-2">
                Supported formats: FS (Fee Slip) barcodes
              </div>
              <div class="text-caption text-medium-emphasis mt-2">
                <v-icon left x-small>mdi-help-circle</v-icon>
                Try the "Test Scan" button to verify the scanner works
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Perfectly Aligned Delete Dialog -->
    <v-dialog v-model="bulkConfirmDialog.show" max-width="540" persistent>
      <v-card class="perfect-delete-dialog" elevation="0" rounded="xl">
        <!-- Centered Gradient Header -->
        <div class="dialog-header">
          <div class="header-content">
            <div class="header-icon-wrapper">
              <v-icon size="36" color="white">mdi-delete-alert</v-icon>
            </div>
            <div class="header-text">
              <h2 class="dialog-title">{{ bulkConfirmDialog.title }}</h2>
              <p class="dialog-subtitle">Permanently remove fee records</p>
            </div>
          </div>
        </div>

        <!-- Perfectly Aligned Content -->
        <v-card-text class="dialog-content">
          <div class="content-wrapper">
            <!-- Centered Main Message -->
            <div class="main-message">
              <div class="message-icon-container">
                <v-icon size="28" color="error">mdi-help-circle</v-icon>
              </div>
              <div class="message-content">
                <p class="message-text">{{ bulkConfirmDialog.message }}</p>
              </div>
            </div>

            <!-- Perfectly Aligned Warning Box -->
            <div v-if="bulkConfirmDialog.warning" class="perfect-warning-box">
              <div class="warning-icon-container">
                <v-icon size="28" color="warning">mdi-alert-circle</v-icon>
              </div>
              <div class="warning-content">
                <h4 class="warning-title">Warning</h4>
                <p class="warning-text">{{ bulkConfirmDialog.warning }}</p>
              </div>
            </div>

            <!-- Perfectly Aligned Impact Grid -->
            <div class="impact-grid">
              <div class="impact-item">
                <div class="impact-icon">
                  <v-icon size="20" color="error">mdi-delete-forever</v-icon>
                </div>
                <span class="impact-text">Permanent deletion</span>
              </div>
              <div class="impact-item">
                <div class="impact-icon">
                  <v-icon size="20" color="error">mdi-undo-variant</v-icon>
                </div>
                <span class="impact-text">Cannot be undone</span>
              </div>
              <div class="impact-item">
                <div class="impact-icon">
                  <v-icon size="20" color="error">mdi-database-remove</v-icon>
                </div>
                <span class="impact-text">Data will be lost</span>
              </div>
            </div>
          </div>
        </v-card-text>

        <!-- Perfectly Aligned Action Buttons -->
        <v-card-actions class="dialog-actions">
          <div class="button-container">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="bulkConfirmDialog.onCancel"
              class="cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              {{ bulkConfirmDialog.cancelText }}
            </v-btn>
            <v-btn
              color="error"
              variant="elevated"
              @click="bulkConfirmDialog.onConfirm"
              :loading="bulkConfirmDialog.loading"
              class="confirm-btn"
              size="large"
            >
              <v-icon left>mdi-delete</v-icon>
              {{ bulkConfirmDialog.confirmText }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";
import BeaconhouseLogo from "@/assets/beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com_-1-300x290.png";
import EducatorsLogo from "@/assets/the-educators-seeklogo.png";

export default {
  name: "FeeManagement",
  data() {
    return {
      loading: false,
      feeLoading: false,
      feeSubmissionLoading: false,
      showFeeDialog: false,
      successDialog: false,
      paymentDateMenu: false,
      activeTab: 0,
      searchQuery: "",
      selectedMonth: null,
      selectedYear: null,
      fees: [],
      students: [],
      pendingFees: [],
      feeHistory: [],
      feeFormValid: false,
      feeSubmissionValid: false,
      selectedStudentInfo: null,
      remainingArrears: 0, // Store remaining arrears amount
      studentArrearsInfo: null, // Store comprehensive arrears information
      studentFeeBreakdown: null, // Store detailed fee breakdown
      paymentSummary: null, // Store payment summary
      feeForm: {
        student_id: null,
        fee_type: "Monthly Fee",
        amount: "",
        payment_date: "",
        payment_method: "Cash",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
      },
      feeSubmission: {
        student_id: null,
        admission_fee: 0,
        monthly_fee: 0,
        transport_fee: 0,
        arrears: 0,
        fine: 0,
        annual_fee: 0,
        amount_paid: 0,
        payment_date: new Date().toISOString().substr(0, 10),
        payment_method: "Cash",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
        selected_fees: {
          admission_fee: false,
          monthly_fee: false,
          transport_fee: false,
          arrears: false,
          fine: false,
          annual_fee: false,
        },
      },
      feeTypes: [
        "Monthly Fee",
        "Admission Fee",
        "Exam Fee",
        "Annual Fund",
        "Other",
      ],
      paymentMethods: ["Cash", "Bank Transfer", "Cheque", "Online"],
      monthOptions: [
        { text: "January", value: 1 },
        { text: "February", value: 2 },
        { text: "March", value: 3 },
        { text: "April", value: 4 },
        { text: "May", value: 5 },
        { text: "June", value: 6 },
        { text: "July", value: 7 },
        { text: "August", value: 8 },
        { text: "September", value: 9 },
        { text: "October", value: 10 },
        { text: "November", value: 11 },
        { text: "December", value: 12 },
      ],
      yearOptions: [2020, 2021, 2022, 2023, 2024, 2025],
      rules: {
        required: (v) => !!v || "This field is required",
        positive: (v) => v > 0 || "Amount must be positive",
        optionalPositive: (v) =>
          !v || v >= 0 || "Amount must be zero or positive",
        month: (v) => (v >= 1 && v <= 12) || "Month must be between 1-12",
        year: (v) =>
          (v >= 2020 && v <= 2030) || "Year must be between 2020-2030",
      },
      feeHeaders: [
        { text: "Student", value: "student_name", sortable: false },
        { text: "Fee Type", value: "fee_type" },
        { text: "Amount", value: "amount", align: "right" },
        { text: "Payment Date", value: "payment_date" },
        { text: "Payment Method", value: "payment_method", width: "120px" },
        { text: "Month/Year", value: "month_year" },
        { text: "Actions", value: "actions", sortable: false, width: "120px" },
      ],
      pendingHeaders: [
        { text: "Student", value: "student_name", sortable: false },
        { text: "Class", value: "class_name" },
        { text: "Monthly Fee", value: "monthly_fee", align: "right" },
        { text: "Arrears", value: "arrears_amount", align: "right" },
        { text: "Last Payment", value: "last_payment" },
        { text: "Actions", value: "actions", sortable: false, width: "100px" },
      ],
      historyHeaders: [
        { text: "Student", value: "student_name", sortable: false },
        { text: "Fee Type", value: "fee_type" },
        { text: "Amount", value: "amount", align: "right" },
        { text: "Payment Date", value: "payment_date" },
        { text: "Payment Method", value: "payment_method" },
        { text: "Month/Year", value: "month_year" },
      ],
      searchTimeout: null,
      searchTimeoutDialog: null,
      selectedFees: [],
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
      // Barcode input properties
      showManualBarcodeInput: false,
      manualBarcodeValue: "",
      processingManualBarcode: false,
      // Barcode scanner properties
      showBarcodeScanner: false,
      scanningBarcode: false,
      cameraLoading: false,
      stream: null,
      barcodeDetectionInterval: null,
      showReceipt: false,
      receiptData: null,

      // Enhanced search properties
      studentSearchQuery: "",
      studentSearchResults: [],
      studentSearchTimeout: null,
      studentSearchLoading: false,
    };
  },
  computed: {
    filteredFees() {
      let filtered = this.fees;

      if (this.selectedMonth) {
        filtered = filtered.filter((fee) => fee.month === this.selectedMonth);
      }

      if (this.selectedYear) {
        filtered = filtered.filter((fee) => fee.year === this.selectedYear);
      }

      return filtered;
    },
    totalCollected() {
      return this.fees.reduce((sum, fee) => sum + Number(fee.amount), 0);
    },
    totalPending() {
      const total = this.pendingFees.reduce((sum, fee) => {
        const pendingAmount = Number(fee.arrears_amount) || 0;
        console.log(
          `🔍 Fee pending amount for ${fee.student_name}:`,
          pendingAmount
        );
        return sum + pendingAmount;
      }, 0);
      console.log("📊 Total pending fees calculated:", total);
      return total;
    },
    thisMonthCollection() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      return this.fees
        .filter((fee) => fee.month === currentMonth && fee.year === currentYear)
        .reduce((sum, fee) => sum + Number(fee.amount), 0);
    },
    totalStudents() {
      return this.students.length;
    },
    totalFee() {
      // Only count fees that are selected AND have amounts greater than 0
      const admissionFee =
        this.feeSubmission.selected_fees.admission_fee &&
        this.feeSubmission.admission_fee > 0
          ? parseFloat(this.feeSubmission.admission_fee) || 0
          : 0;
      const monthlyFee =
        this.feeSubmission.selected_fees.monthly_fee &&
        this.feeSubmission.monthly_fee > 0
          ? parseFloat(this.feeSubmission.monthly_fee) || 0
          : 0;
      const transportFee =
        this.feeSubmission.selected_fees.transport_fee &&
        this.feeSubmission.transport_fee > 0
          ? parseFloat(this.feeSubmission.transport_fee) || 0
          : 0;
      const arrears =
        this.feeSubmission.selected_fees.arrears &&
        this.feeSubmission.arrears > 0
          ? parseFloat(this.feeSubmission.arrears) || 0
          : 0;
      const fine =
        this.feeSubmission.selected_fees.fine && this.feeSubmission.fine > 0
          ? parseFloat(this.feeSubmission.fine) || 0
          : 0;
      const annualFee =
        this.feeSubmission.selected_fees.annual_fee &&
        this.feeSubmission.annual_fee > 0
          ? parseFloat(this.feeSubmission.annual_fee) || 0
          : 0;

      const total =
        admissionFee + monthlyFee + transportFee + arrears + fine + annualFee;

      console.log("🔍 Total fee calculation:", {
        admissionFee: {
          selected: this.feeSubmission.selected_fees.admission_fee,
          amount: this.feeSubmission.admission_fee,
          calculated: admissionFee,
        },
        monthlyFee: {
          selected: this.feeSubmission.selected_fees.monthly_fee,
          amount: this.feeSubmission.monthly_fee,
          calculated: monthlyFee,
        },
        transportFee: {
          selected: this.feeSubmission.selected_fees.transport_fee,
          amount: this.feeSubmission.transport_fee,
          calculated: transportFee,
        },
        arrears: {
          selected: this.feeSubmission.selected_fees.arrears,
          amount: this.feeSubmission.arrears,
          calculated: arrears,
        },
        fine: {
          selected: this.feeSubmission.selected_fees.fine,
          amount: this.feeSubmission.fine,
          calculated: fine,
        },
        annualFee: {
          selected: this.feeSubmission.selected_fees.annual_fee,
          amount: this.feeSubmission.annual_fee,
          calculated: annualFee,
        },
        total,
      });

      return total;
    },
    remainingBalance() {
      const totalFee = this.totalFee;
      const amountPaid = parseFloat(this.feeSubmission.amount_paid) || 0;
      return totalFee - amountPaid;
    },
    newArrears() {
      const remainingBalance = this.remainingBalance;
      return remainingBalance > 0 ? remainingBalance : 0;
    },
    today() {
      return new Date().toISOString().substr(0, 10);
    },
    selectedFeesCount() {
      // Only count fees that are selected AND have amounts greater than 0
      let count = 0;
      if (
        this.feeSubmission.selected_fees.admission_fee &&
        this.feeSubmission.admission_fee > 0
      )
        count++;
      if (
        this.feeSubmission.selected_fees.monthly_fee &&
        this.feeSubmission.monthly_fee > 0
      )
        count++;
      if (
        this.feeSubmission.selected_fees.transport_fee &&
        this.feeSubmission.transport_fee > 0
      )
        count++;
      if (
        this.feeSubmission.selected_fees.arrears &&
        this.feeSubmission.arrears > 0
      )
        count++;
      if (this.feeSubmission.selected_fees.fine && this.feeSubmission.fine > 0)
        count++;
      if (
        this.feeSubmission.selected_fees.annual_fee &&
        this.feeSubmission.annual_fee > 0
      )
        count++;

      console.log("🔍 Selected fees count:", count);
      return count;
    },
    totalSelectedAmount() {
      // Only count fees that are selected AND have amounts greater than 0
      const admissionFee =
        this.feeSubmission.selected_fees.admission_fee &&
        this.feeSubmission.admission_fee > 0
          ? parseFloat(this.feeSubmission.admission_fee) || 0
          : 0;
      const monthlyFee =
        this.feeSubmission.selected_fees.monthly_fee &&
        this.feeSubmission.monthly_fee > 0
          ? parseFloat(this.feeSubmission.monthly_fee) || 0
          : 0;
      const transportFee =
        this.feeSubmission.selected_fees.transport_fee &&
        this.feeSubmission.transport_fee > 0
          ? parseFloat(this.feeSubmission.transport_fee) || 0
          : 0;
      const arrears =
        this.feeSubmission.selected_fees.arrears &&
        this.feeSubmission.arrears > 0
          ? parseFloat(this.feeSubmission.arrears) || 0
          : 0;
      const fine =
        this.feeSubmission.selected_fees.fine && this.feeSubmission.fine > 0
          ? parseFloat(this.feeSubmission.fine) || 0
          : 0;
      const annualFee =
        this.feeSubmission.selected_fees.annual_fee &&
        this.feeSubmission.annual_fee > 0
          ? parseFloat(this.feeSubmission.annual_fee) || 0
          : 0;

      return (
        admissionFee + monthlyFee + transportFee + arrears + fine + annualFee
      );
    },
  },
  watch: {
    // Watch for changes in fee components and automatically update calculations
    "feeSubmission.admission_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.monthly_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.transport_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.arrears"() {
      this.calculateTotalFee();
    },
    "feeSubmission.fine"() {
      this.calculateTotalFee();
    },
    "feeSubmission.annual_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.amount_paid"() {
      this.calculateRemainingBalance();
    },
    // Watch for changes in fee selections
    "feeSubmission.selected_fees.admission_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.selected_fees.monthly_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.selected_fees.transport_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.selected_fees.arrears"() {
      this.calculateTotalFee();
    },
    "feeSubmission.selected_fees.fine"() {
      this.calculateTotalFee();
    },
    "feeSubmission.selected_fees.annual_fee"() {
      this.calculateTotalFee();
    },
  },
  async mounted() {
    await this.loadFees();
    await this.loadStudents();
    await this.loadPendingFees();
    await this.loadFeeHistory();
    this.feeForm.payment_date = this.today;

    // Add click outside listener to close search results
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeDestroy() {
    // Remove click outside listener
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    async loadFees() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};
        const response = await axios.get("/api/fees", {
          headers: headers,
        });
        this.fees = response.data;
      } catch (error) {
        console.error("Error loading fees:", error);
      } finally {
        this.loading = false;
      }
    },

    async loadStudents() {
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
      }
    },

    async loadPendingFees() {
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get("/api/fees/pending", {
          headers: headers,
        });
        this.pendingFees = response.data;
        console.log("📊 Pending fees data received:", this.pendingFees);
      } catch (error) {
        console.error("Error loading pending fees:", error);
      }
    },

    async loadFeeHistory() {
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get("/api/fees/history", {
          headers: headers,
        });
        this.feeHistory = response.data;
      } catch (error) {
        console.error("Error loading fee history:", error);
      }
    },

    stableSearch() {
      // Store the current search query
      const currentQuery = this.searchQuery;
      console.log("🔍 Search triggered with query:", currentQuery);

      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set a new timeout to debounce the search
      this.searchTimeout = setTimeout(() => {
        // Only search if there's actually a query
        if (!currentQuery || currentQuery.trim() === "") {
          console.log("🔍 Empty query, loading all fees");
          this.loadFees();
          return;
        }

        console.log("🔍 Performing search with query:", currentQuery);
        // Perform search with the stored query
        this.performSearchWithQuery(currentQuery);
      }, 500); // Wait 500ms after user stops typing
    },

    performSearch() {
      // Immediate search on Enter key
      const currentQuery = this.searchQuery;
      if (currentQuery && currentQuery.trim() !== "") {
        console.log("🔍 Performing immediate search with query:", currentQuery);
        this.performSearchWithQuery(currentQuery);
      }
    },

    async performSearchWithQuery(query) {
      this.loading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        const response = await axios.get(
          `/api/fees/search?query=${encodeURIComponent(query)}`,
          {
            headers: headers,
          }
        );
        this.fees = response.data;
      } catch (error) {
        console.error("Error searching fees:", error);
      } finally {
        this.loading = false;
      }
    },

    filterFees() {
      // Filtering is handled by computed property
    },

    getPaymentMethodColor(method) {
      const colors = {
        Cash: "green",
        "Bank Transfer": "blue",
        Cheque: "orange",
        Online: "purple",
      };
      return colors[method] || "grey";
    },

    viewFeeDetails(fee) {
      // Implement fee details view
      console.log("View fee details:", fee);
    },

    onStudentChange() {
      // This method is no longer needed since we're using admission number input
      // The logic is now handled in findStudentByAdmissionNumber
    },

    onStudentChangeDialog(selectedStudentId) {
      if (selectedStudentId) {
        const selectedStudent = this.students.find(
          (s) => s.id === selectedStudentId
        );
        if (selectedStudent) {
          this.feeForm.student_id = selectedStudent.id;
          // Set default amount from student's monthly fee
          this.feeForm.amount = Number(selectedStudent.monthly_fee) || 0;
        }
      } else {
        this.feeForm.student_id = null;
        this.feeForm.amount = 0;
      }
    },

    async findStudentByAdmissionNumber() {
      // Clear previous timeout
      if (this.searchTimeoutDialog) {
        clearTimeout(this.searchTimeoutDialog);
      }

      // Set a new timeout to debounce the search
      this.searchTimeoutDialog = setTimeout(async () => {
        if (
          !this.feeSubmission.admission_number ||
          this.feeSubmission.admission_number.length < 3
        ) {
          this.feeSubmission.student_id = null;
          this.selectedStudentInfo = null;
          this.resetFeeSubmission();
          return;
        }

        try {
          const authData = getAuthData();
          const headers =
            authData && authData.token
              ? { Authorization: `Bearer ${authData.token}` }
              : {};
          const response = await axios.get(
            `/api/students/admission/${this.feeSubmission.admission_number}`,
            {
              headers: headers,
            }
          );

          if (response.data) {
            const student = response.data;
            if (!student || !student.id) {
              console.error("Invalid student data received:", student);
              this.feeSubmission.student_id = null;
              this.selectedStudentInfo = null;
              this.resetFeeSubmission();
              return;
            }

            console.log("🔍 Student data received:", student);
            console.log(
              "🔍 Admission fee amount:",
              student.admission_fee_amount
            );
            console.log("🔍 Is admission paid:", student.is_admission_paid);

            this.feeSubmission.student_id = student.id;
            this.selectedStudentInfo = student;

            // Load detailed fee breakdown for this student
            try {
              await this.loadStudentFeeBreakdown(student.id);
            } catch (error) {
              console.error("Error loading student fee breakdown:", error);
            }

            this.calculateTotalFee();
          } else {
            this.feeSubmission.student_id = null;
            this.selectedStudentInfo = null;
            this.resetFeeSubmission();
          }
        } catch (error) {
          console.error("Error finding student:", error);
          this.feeSubmission.student_id = null;
          this.selectedStudentInfo = null;
          this.resetFeeSubmission();
        }
      }, 500); // Wait 500ms after user stops typing
    },

    async findStudentByAdmissionNumberDialog() {
      // Clear previous timeout
      if (this.searchTimeoutDialog) {
        clearTimeout(this.searchTimeoutDialog);
      }

      // Set a new timeout to debounce the search
      this.searchTimeoutDialog = setTimeout(async () => {
        if (
          !this.feeForm.admission_number ||
          this.feeForm.admission_number.length < 3
        ) {
          this.feeForm.student_id = null;
          return;
        }

        try {
          const authData = getAuthData();
          const headers =
            authData && authData.token
              ? { Authorization: `Bearer ${authData.token}` }
              : {};
          const response = await axios.get(
            `/api/students/admission/${this.feeForm.admission_number}`,
            {
              headers: headers,
            }
          );

          if (response.data) {
            this.feeForm.student_id = response.data.id;
          } else {
            this.feeForm.student_id = null;
          }
        } catch (error) {
          console.error("Error finding student:", error);
          this.feeForm.student_id = null;
        }
      }, 500); // Wait 500ms after user stops typing
    },

    // Fee Submission Methods
    calculateTotalFee() {
      // This will trigger the computed property totalFee
      this.$forceUpdate();
    },

    calculateRemainingBalance() {
      // This will trigger the computed property remainingBalance
      this.$forceUpdate();
    },

    // Helper methods for fee component hints
    getAdmissionFeeHint() {
      if (!this.studentFeeBreakdown) return "One-time payment at admission";
      const fee = this.studentFeeBreakdown.admission_fee;
      if (fee.is_paid) return "✅ Admission fee paid";
      if (fee.remaining > 0)
        return `Remaining: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "One-time payment at admission";
    },

    // Helper method to show if fee will be submitted
    getFeeSubmissionStatus(feeType) {
      const isSelected = this.feeSubmission.selected_fees[feeType];
      const amount = this.feeSubmission[feeType];
      const willBeSubmitted = isSelected && amount > 0;

      if (willBeSubmitted) {
        return "✅ Will be submitted";
      } else if (isSelected && amount === 0) {
        return "⚠️ Selected but amount is 0";
      } else if (!isSelected && amount > 0) {
        return "❌ Not selected (will not be submitted)";
      } else {
        return "Not selected";
      }
    },

    getMonthlyFeeHint() {
      if (!this.studentFeeBreakdown) return "";
      const fee = this.studentFeeBreakdown.monthly_fee;
      if (fee.is_paid) return "✅ Monthly fee paid";
      if (fee.remaining > 0)
        return `Remaining: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "";
    },

    getTransportFeeHint() {
      if (!this.studentFeeBreakdown) return "Transportation service fee";
      const fee = this.studentFeeBreakdown.transport_fee;
      if (fee.is_paid) return "✅ Transport fee paid";
      if (fee.remaining > 0)
        return `⏳ Pending: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "Transportation service fee";
    },

    getFineHint() {
      if (!this.studentFeeBreakdown) return "";
      const fee = this.studentFeeBreakdown.fine;
      if (fee.is_paid) return "✅ Fine paid";
      if (fee.remaining > 0)
        return `Remaining: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "";
    },

    getAnnualFeeHint() {
      if (!this.studentFeeBreakdown) return "";
      const fee = this.studentFeeBreakdown.annual_fee;
      if (fee.is_paid) return "✅ Annual fee paid";
      if (fee.remaining > 0)
        return `Remaining: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "";
    },

    getArrearsHint() {
      if (!this.studentFeeBreakdown) {
        return this.feeSubmission.arrears > 0
          ? "Previous unpaid amount from earlier months"
          : "No outstanding arrears";
      }
      const fee = this.studentFeeBreakdown.arrears;
      if (fee.is_paid) return "✅ Arrears paid";
      if (fee.remaining > 0)
        return `Remaining: ₨${fee.remaining} (Expected: ₨${fee.expected})`;
      return "No outstanding arrears";
    },

    // Helper methods for fee component icons and status
    getAdmissionFeeIcon() {
      if (!this.studentFeeBreakdown) return "mdi-school";
      const fee = this.studentFeeBreakdown.admission_fee;
      return fee.is_paid ? "mdi-check-circle" : "mdi-school";
    },

    getAdmissionFeeIconColor() {
      if (!this.studentFeeBreakdown) return "info";
      const fee = this.studentFeeBreakdown.admission_fee;
      return fee.is_paid ? "success" : "info";
    },

    getAdmissionFeeStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.admission_fee;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      return null;
    },

    getAdmissionFeeStatusColor() {
      if (!this.studentFeeBreakdown) return "primary";
      const fee = this.studentFeeBreakdown.admission_fee;
      return fee.is_paid ? "success" : "warning";
    },

    // Monthly Fee helpers
    getMonthlyFeeIcon() {
      if (!this.studentFeeBreakdown) return "mdi-calendar-month";
      const fee = this.studentFeeBreakdown.monthly_fee;
      return fee.is_paid ? "mdi-check-circle" : "mdi-calendar-month";
    },

    getMonthlyFeeIconColor() {
      if (!this.studentFeeBreakdown) return "primary";
      const fee = this.studentFeeBreakdown.monthly_fee;
      return fee.is_paid ? "success" : "primary";
    },

    getMonthlyFeeStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.monthly_fee;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      return null;
    },

    getMonthlyFeeStatusColor() {
      if (!this.studentFeeBreakdown) return "primary";
      const fee = this.studentFeeBreakdown.monthly_fee;
      return fee.is_paid ? "success" : "warning";
    },

    // Transport Fee helpers
    getTransportFeeIcon() {
      if (!this.studentFeeBreakdown) return "mdi-bus";
      const fee = this.studentFeeBreakdown.transport_fee;
      return fee.is_paid ? "mdi-check-circle" : "mdi-bus";
    },

    getTransportFeeIconColor() {
      if (!this.studentFeeBreakdown) return "orange";
      const fee = this.studentFeeBreakdown.transport_fee;
      return fee.is_paid ? "success" : "orange";
    },

    getTransportFeeStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.transport_fee;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      if (fee.expected > 0) return "PENDING";
      return null;
    },

    getTransportFeeStatusColor() {
      if (!this.studentFeeBreakdown) return "orange";
      const fee = this.studentFeeBreakdown.transport_fee;
      return fee.is_paid ? "success" : "warning";
    },

    // Fine helpers
    getFineIcon() {
      if (!this.studentFeeBreakdown) return "mdi-alert-circle";
      const fee = this.studentFeeBreakdown.fine;
      return fee.is_paid ? "mdi-check-circle" : "mdi-alert-circle";
    },

    getFineIconColor() {
      if (!this.studentFeeBreakdown) return "error";
      const fee = this.studentFeeBreakdown.fine;
      return fee.is_paid ? "success" : "error";
    },

    getFineStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.fine;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      return null;
    },

    getFineStatusColor() {
      if (!this.studentFeeBreakdown) return "error";
      const fee = this.studentFeeBreakdown.fine;
      return fee.is_paid ? "success" : "warning";
    },

    // Annual Fee helpers
    getAnnualFeeIcon() {
      if (!this.studentFeeBreakdown) return "mdi-calendar-year";
      const fee = this.studentFeeBreakdown.annual_fee;
      return fee.is_paid ? "mdi-check-circle" : "mdi-calendar-year";
    },

    getAnnualFeeIconColor() {
      if (!this.studentFeeBreakdown) return "success";
      const fee = this.studentFeeBreakdown.annual_fee;
      return fee.is_paid ? "success" : "success";
    },

    getAnnualFeeStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.annual_fee;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      return null;
    },

    getAnnualFeeStatusColor() {
      if (!this.studentFeeBreakdown) return "success";
      const fee = this.studentFeeBreakdown.annual_fee;
      return fee.is_paid ? "success" : "warning";
    },

    // Arrears helpers
    getArrearsIcon() {
      if (!this.studentFeeBreakdown) return "mdi-clock-alert";
      const fee = this.studentFeeBreakdown.arrears;
      return fee.is_paid ? "mdi-check-circle" : "mdi-clock-alert";
    },

    getArrearsIconColor() {
      if (!this.studentFeeBreakdown) return "warning";
      const fee = this.studentFeeBreakdown.arrears;
      return fee.is_paid ? "success" : "warning";
    },

    getArrearsStatus() {
      if (!this.studentFeeBreakdown) return null;
      const fee = this.studentFeeBreakdown.arrears;
      if (fee.is_paid) return "PAID";
      if (fee.remaining > 0) return "PENDING";
      return null;
    },

    getArrearsStatusColor() {
      if (!this.studentFeeBreakdown) return "warning";
      const fee = this.studentFeeBreakdown.arrears;
      return fee.is_paid ? "success" : "warning";
    },

    // Helper methods for getting remaining amounts
    getAdmissionFeeRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.admission_fee.remaining;
    },

    getMonthlyFeeRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.monthly_fee.remaining;
    },

    getTransportFeeRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.transport_fee.remaining;
    },

    getFineRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.fine.remaining;
    },

    getAnnualFeeRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.annual_fee.remaining;
    },

    getArrearsRemaining() {
      if (!this.studentFeeBreakdown) return 0;
      return this.studentFeeBreakdown.arrears.remaining;
    },

    // Auto-check checkboxes for zero values - but allow manual override
    autoCheckZeroValueFees() {
      // Only auto-check if user hasn't manually set them
      // This allows users to manually control which fees to submit

      // Check admission fee - suggest selection if it has a value greater than 0
      if (this.feeSubmission.admission_fee > 0) {
        console.log(
          "🔍 Suggesting admission fee checkbox for amount:",
          this.feeSubmission.admission_fee
        );
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.admission_fee === 0 &&
        this.getAdmissionFeeRemaining() === 0
      ) {
        // Only auto-check zero values to avoid confusion
        this.feeSubmission.selected_fees.admission_fee = true;
      }

      // Check monthly fee - suggest selection if it has a value greater than 0
      if (this.feeSubmission.monthly_fee > 0) {
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.monthly_fee === 0 &&
        this.getMonthlyFeeRemaining() === 0
      ) {
        this.feeSubmission.selected_fees.monthly_fee = true;
      }

      // Check transport fee - suggest selection if it has a value greater than 0
      if (this.feeSubmission.transport_fee > 0) {
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.transport_fee === 0 &&
        this.getTransportFeeRemaining() === 0
      ) {
        this.feeSubmission.selected_fees.transport_fee = true;
      } else if (this.getTransportFeeRemaining() > 0) {
        // Suggest selection for remaining transport fees
        // Don't force selection - let user decide
      }

      // Check arrears - suggest selection if it has a value greater than 0
      if (this.feeSubmission.arrears > 0) {
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.arrears === 0 &&
        this.getArrearsRemaining() === 0
      ) {
        this.feeSubmission.selected_fees.arrears = true;
      }

      // Check fine - suggest selection if it has a value greater than 0
      if (this.feeSubmission.fine > 0) {
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.fine === 0 &&
        this.getFineRemaining() === 0
      ) {
        this.feeSubmission.selected_fees.fine = true;
      }

      // Check annual fee - suggest selection if it has a value greater than 0
      if (this.feeSubmission.annual_fee > 0) {
        // Don't force selection - let user decide
      } else if (
        this.feeSubmission.annual_fee === 0 &&
        this.getAnnualFeeRemaining() === 0
      ) {
        this.feeSubmission.selected_fees.annual_fee = true;
      }
    },

    // Load fee breakdown by student ID (for manual search)
    async loadStudentFeeBreakdown(studentId) {
      if (!studentId) {
        console.error("Invalid student ID passed to loadStudentFeeBreakdown");
        this.studentFeeBreakdown = null;
        return;
      }

      try {
        console.log("🔍 Loading fee breakdown for student ID:", studentId);

        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Get the latest fee slip for this student
        const slipResponse = await axios.get(
          `/api/fee-slips/student/${studentId}`,
          {
            headers: headers,
          }
        );

        if (!slipResponse.data || slipResponse.data.length === 0) {
          console.log("No fee slips found for student:", studentId);
          this.studentFeeBreakdown = null;
          return;
        }

        // Get the latest fee slip
        const latestSlip = slipResponse.data[0];
        if (!latestSlip || !latestSlip.slip_id) {
          console.error("Invalid slip data:", latestSlip);
          this.studentFeeBreakdown = null;
          return;
        }

        // Use the fee breakdown API with the slip ID
        const response = await axios.get(
          `/api/fee-slips/fee-breakdown/${latestSlip.slip_id}`,
          {
            headers: headers,
          }
        );

        if (!response.data) {
          console.error("No fee breakdown data received");
          this.studentFeeBreakdown = null;
          return;
        }

        console.log("🔍 Fee Breakdown Response:", response.data);

        const { student_info, fee_breakdown, payment_summary } = response.data;

        if (!student_info || !fee_breakdown || !payment_summary) {
          console.error(
            "Invalid or incomplete fee breakdown data:",
            response.data
          );
          this.studentFeeBreakdown = null;
          this.paymentSummary = null;
          return;
        }

        // Store fee breakdown for display
        this.studentFeeBreakdown = fee_breakdown;
        this.paymentSummary = payment_summary;

        console.log(
          "🔍 Updated studentFeeBreakdown:",
          this.studentFeeBreakdown
        );
        console.log("🔍 Updated paymentSummary:", this.paymentSummary);

        // Reset all fee components to blank first
        this.feeSubmission.admission_fee = 0;
        this.feeSubmission.monthly_fee = 0;
        this.feeSubmission.transport_fee = 0;
        this.feeSubmission.fine = 0;
        this.feeSubmission.annual_fee = 0;
        this.feeSubmission.arrears = 0;
        this.feeSubmission.amount_paid = 0;

        // Reset selected fees based on remaining amounts
        this.feeSubmission.selected_fees.admission_fee = false;
        this.feeSubmission.selected_fees.monthly_fee = false;
        this.feeSubmission.selected_fees.transport_fee = false;
        this.feeSubmission.selected_fees.arrears = false;
        this.feeSubmission.selected_fees.fine = false;
        this.feeSubmission.selected_fees.annual_fee = false;

        // Set fee components based on detailed breakdown
        if (payment_summary.is_fully_paid) {
          // Student has no dues - all fields remain blank
          console.log("🔍 Student has no dues - all fields blank");
          this.$toast.success(
            "Student has no dues! All fee components are blank for admin input."
          );
        } else {
          // Student has outstanding amounts - populate fields with remaining amounts
          console.log("🔍 Student has outstanding amounts:", payment_summary);

          // Set remaining amounts for each fee type
          this.feeSubmission.admission_fee =
            fee_breakdown.admission_fee.remaining;
          this.feeSubmission.monthly_fee = fee_breakdown.monthly_fee.remaining;
          this.feeSubmission.transport_fee =
            fee_breakdown.transport_fee.remaining;
          this.feeSubmission.arrears = fee_breakdown.arrears.remaining;
          this.feeSubmission.fine = fee_breakdown.fine.remaining;
          this.feeSubmission.annual_fee = fee_breakdown.annual_fee.remaining;

          // Log the updated amounts for debugging
          console.log("🔍 Updated fee amounts:", {
            admission_fee: this.feeSubmission.admission_fee,
            monthly_fee: this.feeSubmission.monthly_fee,
            transport_fee: this.feeSubmission.transport_fee,
            arrears: this.feeSubmission.arrears,
            fine: this.feeSubmission.fine,
            annual_fee: this.feeSubmission.annual_fee,
          });

          // Auto-check checkboxes for zero values
          this.autoCheckZeroValueFees();

          // Show comprehensive payment status message
          let statusMessage = `Payment Status:\n`;
          statusMessage += `• Total Expected: ₨${payment_summary.total_expected}\n`;
          statusMessage += `• Total Paid: ₨${payment_summary.total_paid}\n`;
          statusMessage += `• Total Remaining: ₨${payment_summary.total_remaining}\n`;
          statusMessage += `• Status: ${
            payment_summary.is_fully_paid ? "No Dues" : "Outstanding Amounts"
          }`;

          if (payment_summary.is_past_due_date) {
            statusMessage += `\n• ⚠️ Past Due Date`;
          }

          this.$toast.info(statusMessage, {
            timeout: 8000,
            closeOnClick: true,
          });
        }

        // Update the form to reflect current values
        this.calculateTotalFee();
        this.calculateRemainingBalance();

        // Force template update to reflect new fee breakdown
        this.$nextTick(() => {
          this.$forceUpdate();
        });

        console.log("✅ Fee breakdown loaded successfully for student search");
      } catch (error) {
        console.error("❌ Error loading fee breakdown for student:", error);
        console.error(
          "❌ Error details:",
          error.response?.data || error.message
        );
        this.studentFeeBreakdown = null;
        this.paymentSummary = null;
        this.feeSubmission.admission_fee = 0;
        this.feeSubmission.monthly_fee = 0;
        this.feeSubmission.transport_fee = 0;
        this.feeSubmission.arrears = 0;
        this.feeSubmission.fine = 0;
        this.feeSubmission.annual_fee = 0;
        this.feeSubmission.amount_paid = 0;
        this.feeSubmission.selected_fees.admission_fee = false;
        this.feeSubmission.selected_fees.monthly_fee = false;
        this.feeSubmission.selected_fees.transport_fee = false;
        this.feeSubmission.selected_fees.arrears = false;
        this.feeSubmission.selected_fees.fine = false;
        this.feeSubmission.selected_fees.annual_fee = false;
        this.$toast.error("Error loading fee breakdown. Please try again.", {
          timeout: 5000,
          closeOnClick: true,
        });
        return;
      }
    },

    resetFeeSubmission() {
      this.feeSubmission = {
        student_id: null,
        admission_number: "",
        admission_fee: 0,
        monthly_fee: 0,
        transport_fee: 0,
        arrears: 0,
        fine: 0,
        annual_fee: 0,
        amount_paid: 0,
        payment_date: new Date().toISOString().substr(0, 10),
        payment_method: "Cash",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
        selected_fees: {
          admission_fee: false,
          monthly_fee: false,
          transport_fee: false,
          arrears: false,
          fine: false,
          annual_fee: false,
        },
      };
      this.selectedStudentInfo = null;
      this.studentSearchQuery = "";
      this.studentSearchResults = [];
      this.studentFeeBreakdown = null;
      this.paymentSummary = null;
      if (this.$refs.feeSubmissionForm) {
        this.$refs.feeSubmissionForm.resetValidation();
      }
    },

    // Manual barcode input methods
    openManualBarcodeInput() {
      console.log("🔍 Opening manual barcode input...");
      this.showManualBarcodeInput = true;
      this.manualBarcodeValue = "";
      this.processingManualBarcode = false;
    },

    closeManualBarcodeInput() {
      this.showManualBarcodeInput = false;
      this.manualBarcodeValue = "";
      this.processingManualBarcode = false;
    },

    async processManualBarcode() {
      if (!this.manualBarcodeValue.trim()) {
        this.$toast.error("Please enter a barcode");
        return;
      }

      this.processingManualBarcode = true;
      try {
        console.log("🔍 Processing manual barcode:", this.manualBarcodeValue);

        // Clean the barcode
        const cleanBarcode = this.manualBarcodeValue.trim();

        // Show the entered barcode to the user
        this.$toast.info(`Processing barcode: ${cleanBarcode}`);

        // Try to fetch fee slip data
        await this.loadFeeSlipData(cleanBarcode);

        // Close the dialog
        this.closeManualBarcodeInput();

        console.log("✅ Manual barcode processing completed successfully");
      } catch (error) {
        console.error("❌ Error processing manual barcode:", error);
        this.$toast.error(
          `Barcode "${this.manualBarcodeValue}" not found. Please check the barcode and try again.`
        );
      } finally {
        this.processingManualBarcode = false;
      }
    },

    async processScannedBarcode(barcode) {
      try {
        this.scanningBarcode = false;
        this.closeBarcodeScanner();

        console.log("🔍 Processing barcode:", barcode);

        // Validate barcode format
        if (!barcode || barcode.trim() === "") {
          this.$toast.error("Invalid barcode detected. Please try again.");
          return;
        }

        // Clean the barcode (remove any extra characters)
        const cleanBarcode = barcode.trim();
        console.log("🧹 Cleaned barcode:", cleanBarcode);

        // Show the scanned barcode to the user for debugging
        console.log("📱 Scanned barcode:", cleanBarcode);
        this.$toast.info(`Scanned barcode: ${cleanBarcode}`);

        // Try to fetch fee slip data first
        await this.loadFeeSlipData(cleanBarcode);

        console.log("✅ Barcode processing completed successfully");
      } catch (error) {
        console.error("❌ Error processing barcode:", error);
        this.$toast.error(
          `Barcode "${barcode}" not found in database. Please check the barcode or try manual input.`
        );

        // Show available barcodes for testing
        console.log("📋 Available barcodes for testing:");
        console.log("- FS0083820577243 (Fakhr e Alam)");
        console.log("- FS0084820577273 (Bilal Khan)");
        console.log("- FS0085820577719 (Muhammad Ahmad)");
        console.log("- FS0086533677385 (Abbas)");
        console.log("- FS0082820576620 (Muhammad Waqas)");
      }
    },

    async loadFeeSlipData(barcode) {
      try {
        console.log("🔍 Loading detailed fee breakdown for barcode:", barcode);

        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Use the new detailed fee breakdown API
        const response = await axios.get(
          `/api/fee-slips/fee-breakdown/${barcode}`,
          {
            headers: headers,
          }
        );

        console.log("🔍 Detailed Fee Breakdown Response:", response.data);

        const { student_info, fee_breakdown, payment_summary } = response.data;

        if (!student_info) {
          throw new Error("Student information not found");
        }

        // Update form with student data
        this.feeSubmission.student_id = student_info.id;
        this.feeSubmission.admission_number = student_info.admission_number;

        // Set student info for display
        this.selectedStudentInfo = {
          id: student_info.id,
          name: student_info.name,
          admission_number: student_info.admission_number,
          class_name: student_info.class_name,
          father_name: student_info.father_name,
          photo: student_info.photo || null,
        };

        // Store fee breakdown for display
        this.studentFeeBreakdown = fee_breakdown;
        this.paymentSummary = payment_summary;

        // Reset all fee components to blank first
        this.feeSubmission.admission_fee = 0;
        this.feeSubmission.monthly_fee = 0;
        this.feeSubmission.transport_fee = 0;
        this.feeSubmission.fine = 0;
        this.feeSubmission.annual_fee = 0;
        this.feeSubmission.arrears = 0;
        this.feeSubmission.amount_paid = 0;

        // Set fee components based on detailed breakdown
        if (payment_summary.is_fully_paid) {
          // Student has no dues - all fields remain blank
          console.log("🔍 Student has no dues - all fields blank");
          this.$toast.success(
            "Student has no dues! All fee components are blank for admin input."
          );
        } else {
          // Student has outstanding amounts - populate fields with remaining amounts
          console.log("🔍 Student has outstanding amounts:", payment_summary);

          // Set remaining amounts for each fee type
          this.feeSubmission.admission_fee =
            fee_breakdown.admission_fee.remaining;
          this.feeSubmission.monthly_fee = fee_breakdown.monthly_fee.remaining;
          this.feeSubmission.transport_fee =
            fee_breakdown.transport_fee.remaining;
          this.feeSubmission.arrears = fee_breakdown.arrears.remaining;
          this.feeSubmission.fine = fee_breakdown.fine.remaining;
          this.feeSubmission.annual_fee = fee_breakdown.annual_fee.remaining;

          // Auto-check checkboxes for zero values
          this.autoCheckZeroValueFees();

          // Show comprehensive payment status message
          let statusMessage = `Payment Status:\n`;
          statusMessage += `• Total Expected: ₨${payment_summary.total_expected}\n`;
          statusMessage += `• Total Paid: ₨${payment_summary.total_paid}\n`;
          statusMessage += `• Total Remaining: ₨${payment_summary.total_remaining}\n`;
          statusMessage += `• Status: ${
            payment_summary.is_fully_paid ? "No Dues" : "Outstanding Amounts"
          }`;

          if (payment_summary.is_past_due_date) {
            statusMessage += `\n• ⚠️ Past Due Date`;
          }

          this.$toast.info(statusMessage, {
            timeout: 8000,
            closeOnClick: true,
          });
        }

        // Update the form to reflect current values
        this.calculateTotalFee();
        this.calculateRemainingBalance();

        // Force template update to reflect new fee breakdown
        this.$nextTick(() => {
          this.$forceUpdate();
        });

        console.log("✅ Detailed fee breakdown loaded successfully");
      } catch (error) {
        console.error("❌ Error loading detailed fee breakdown:", error);
        console.error(
          "❌ Error details:",
          error.response?.data || error.message
        );
        this.$toast.error("Fee slip not found. Please check the barcode.");
      }
    },

    manualBarcodeInput() {
      const barcode = prompt(
        "Enter the student barcode to scan:\n\n" +
          "Available barcodes:\n" +
          "- FS0083820577243 (Fakhr e Alam)\n" +
          "- FS0084820577273 (Bilal Khan)\n" +
          "- FS0085820577719 (Muhammad Ahmad)\n" +
          "- FS0086533677385 (Abbas)\n" +
          "- FS0082820576620 (Muhammad Waqas)\n\n" +
          "Enter barcode:"
      );
      if (barcode) {
        this.processScannedBarcode(barcode);
      }
    },

    openBarcodeScanner() {
      this.showBarcodeScanner = true;
      this.scanningBarcode = true;

      // Add a small delay to ensure the dialog is rendered
      this.$nextTick(() => {
        try {
          // Start barcode detection
          this.startBarcodeDetection();
        } catch (error) {
          console.error("Error starting barcode scanner:", error);
          this.$toast.error(
            "Error starting barcode scanner. Please try manual input."
          );
          this.scanningBarcode = false;
        }
      });
    },

    // Fallback method if Quagga fails
    fallbackBarcodeInput() {
      this.$toast.info("Camera scanner not available. Using manual input.");
      this.manualBarcodeInput();
    },

    // Removed old printReceipt method - replaced with new implementation

    oldGenerateReceiptHTML() {
      if (!this.receiptData) return "";

      const copies = ["PARENT COPY", "SCHOOL COPY"];
      const data = {
        student_name: this.receiptData.student_name,
        admission_number: this.receiptData.admission_number,
        father_name: this.receiptData.father_name,
        month: this.receiptData.month,
        due_date: this.receiptData.due_date,
        total_amount: this.receiptData.total_amount,
        fees: [
          {
            description: "Admission Fee",
            amount: this.receiptData.admission_fee || 0,
            total_amount: this.receiptData.total_admission_fee || 0,
            status: this.getFeeStatus(
              this.receiptData.admission_fee || 0,
              this.receiptData.total_admission_fee || 0
            ),
          },
          {
            description: "Monthly Fee",
            amount: this.receiptData.monthly_fee || 0,
            total_amount: this.receiptData.total_monthly_fee || 0,
            status: this.getFeeStatus(
              this.receiptData.monthly_fee || 0,
              this.receiptData.total_monthly_fee || 0
            ),
          },
          {
            description: "Transport Fee",
            amount: this.receiptData.transport_fee || 0,
            total_amount: this.receiptData.total_transport_fee || 0,
            status: this.getFeeStatus(
              this.receiptData.transport_fee || 0,
              this.receiptData.total_transport_fee || 0
            ),
          },
          {
            description: "Annual Fund",
            amount: this.receiptData.annual_fee || 0,
            total_amount: this.receiptData.total_annual_fee || 0,
            status: this.getFeeStatus(
              this.receiptData.annual_fee || 0,
              this.receiptData.total_annual_fee || 0
            ),
          },
          {
            description: "Arrears",
            amount: this.receiptData.arrears || 0,
            total_amount: this.receiptData.arrears || 0,
            status: this.receiptData.arrears > 0 ? "Pending" : "Paid",
          },
        ],
      };

      return `
        <div style="display: flex; justify-content: space-between; width: 100%; font-family: Arial, sans-serif;">
          ${copies
            .map(
              (copyType) => `
                              <div style="width: 48%; border: 1px solid #000; padding: 15px; margin: 5px;">
                    <!-- Header -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                      <img src="/src/assets/the-educators-seeklogo.png" alt="Left Logo" style="height: 60px;">
                      <div style="text-align: center; flex-grow: 1;">
                        <h2 style="margin: 0; font-size: 16px;">THE EDUCATORS</h2>
                        <p style="margin: 5px 0; font-size: 12px;">A project of Beaconhouse School System</p>
                        <p style="margin: 5px 0; font-size: 12px;">Kohat Road Campus</p>
                        <p style="margin: 5px 0; font-size: 12px;">Session 2025-2026</p>
                        <h3 style="margin: 10px 0; font-size: 14px;">MONTHLY FEE SLIP</h3>
                      </div>
                      <img src="/src/assets/the-educators-seeklogo.png" alt="Right Logo" style="height: 60px;">
                    </div>

                    <!-- Student Details -->
                    <div style="margin-bottom: 15px; font-size: 12px;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 3px 0;"><strong>Student ID:</strong></td>
                          <td>${data.admission_number}</td>
                          <td><strong>Due Date:</strong></td>
                          <td>${data.due_date}</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px 0;"><strong>Name:</strong></td>
                          <td>${data.student_name}</td>
                          <td><strong>Fee Month:</strong></td>
                          <td>${data.month}</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px 0;"><strong>Father's Name:</strong></td>
                          <td colspan="3">${data.father_name}</td>
                        </tr>
                      </table>
                    </div>

              <!-- Fee Details -->
              <div style="margin-bottom: 15px;">
                <h4 style="margin: 10px 0; font-size: 14px; font-weight: bold;">PARTICULARS & AMOUNT</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  ${data.fees
                    .map(
                      (fee) => `
                    <tr>
                      <td style="padding: 5px 0; font-size: 14px;">${fee.description}:</td>
                      <td style="text-align: right; padding: 5px 0; font-size: 14px;">Rs${fee.amount}</td>
                    </tr>
                  `
                    )
                    .join("")}
                  <tr>
                    <td style="padding: 8px 0 0; font-weight: bold; font-size: 16px;">Grand Total:</td>
                    <td style="text-align: right; padding: 8px 0 0; font-weight: bold; font-size: 16px;">Rs${
                      data.total_amount
                    }</td>
                  </tr>
                </table>
              </div>

                                  <!-- Barcode Section -->
                    <div style="text-align: center; margin: 15px 0;">
                      <svg class="barcode" id="barcode-${copyType
                        .split(" ")[0]
                        .toLowerCase()}"
                           jsbarcode-value="${data.admission_number}"
                           jsbarcode-format="code128"
                           jsbarcode-width="2"
                           jsbarcode-height="50"
                           jsbarcode-fontSize="12">
                      </svg>
                      <p style="font-size: 10px; margin: 5px 0;">Scan this barcode for fee collection</p>
                    </div>

                    <!-- Footer -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px;">
                      <div>
                        <p style="margin: 0;">All dues must be paid on or before the due date.</p>
                        <p style="margin: 5px 0;"><strong>${copyType}</strong></p>
                      </div>
                      <div style="text-align: center;">
                        <div style="border: 1px solid #000; width: 150px; height: 60px; margin-left: auto;">
                          <p style="margin: 45px 0 0 0; font-size: 10px; text-align: center;">Signature & Stamp</p>
                        </div>
                      </div>
                    </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
      if (!this.receiptData) return "";

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Fee Receipt</title>
          <style>
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }

            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 20px;
              background: #fff;
              color: #000;
            }

            .receipt-container {
              max-width: 800px;
              margin: 0 auto;
              border: 2px solid #000;
              padding: 30px;
              background: #fff;
            }

            .school-header {
              text-align: center;
              border-bottom: 3px solid #000;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }

            .school-name {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
              text-transform: uppercase;
            }

            .school-address {
              font-size: 14px;
              margin-bottom: 10px;
            }

            .receipt-title {
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 10px;
            }

            .receipt-number {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .receipt-date {
              font-size: 14px;
              margin-bottom: 20px;
            }

            .info-section {
              margin-bottom: 25px;
            }

            .section-title {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 1px solid #000;
              padding-bottom: 5px;
              margin-bottom: 15px;
              text-transform: uppercase;
            }

            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }

            .info-item {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px dotted #ccc;
            }

            .label {
              font-weight: bold;
              min-width: 120px;
            }

            .value {
              text-align: right;
            }

            .fee-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              border: 1px solid #000;
            }

            .fee-table th {
              background-color: #f0f0f0;
              border: 1px solid #000;
              padding: 12px 8px;
              text-align: center;
              font-weight: bold;
              font-size: 14px;
            }

            .fee-table td {
              border: 1px solid #000;
              padding: 10px 8px;
              text-align: center;
              font-size: 14px;
            }

            .fee-table th:first-child,
            .fee-table td:first-child {
              text-align: left;
            }

            .summary-section {
              margin-top: 30px;
              border-top: 2px solid #000;
              padding-top: 20px;
            }

            .summary-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 20px;
              margin: 20px 0;
            }

            .summary-card {
              border: 2px solid #000;
              padding: 15px;
              text-align: center;
              background: #f9f9f9;
            }

            .summary-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 10px;
              text-transform: uppercase;
            }

            .summary-amount {
              font-size: 20px;
              font-weight: bold;
            }

            .status-section {
              text-align: center;
              margin-top: 30px;
              padding: 20px;
              border: 2px solid #000;
              background: #f0f0f0;
            }

            .status-text {
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
            }

            .paid { color: #008000; }
            .pending { color: #ff6600; }
            .partial { color: #ff6600; }

            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              border-top: 1px solid #000;
              padding-top: 20px;
            }

            .signature-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 50px;
              margin-top: 40px;
            }

            .signature-box {
              text-align: center;
              border-top: 1px solid #000;
              padding-top: 10px;
              margin-top: 50px;
            }

            .signature-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 40px;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="school-header">
              <div class="school-name">SCHOOL NAME</div>
              <div class="school-address">Kohat Road Peshawar</div>
              
              <div class="receipt-title">FEE RECEIPT</div>
              <div class="receipt-number">Receipt No: ${
                this.receiptData.receipt_number
              }</div>
              <div class="receipt-date">Date: ${this.formatDate(
                this.receiptData.generated_at
              )}</div>
            </div>

            <div class="info-section">
              <div class="section-title">Student Information</div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Student Name:</span>
                  <span class="value">${
                    this.receiptData.student_info.name
                  }</span>
                </div>
                <div class="info-item">
                  <span class="label">Admission No:</span>
                  <span class="value">${
                    this.receiptData.student_info.admission_number
                  }</span>
                </div>
                <div class="info-item">
                  <span class="label">Father's Name:</span>
                  <span class="value">${
                    this.receiptData.student_info.father_name
                  }</span>
                </div>
                <div class="info-item">
                  <span class="label">Class:</span>
                  <span class="value">${
                    this.receiptData.student_info.class_name
                  }</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <div class="section-title">Payment Details</div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Payment Date:</span>
                  <span class="value">${this.formatDate(
                    this.receiptData.payment_details.payment_date
                  )}</span>
                </div>
                <div class="info-item">
                  <span class="label">Payment Method:</span>
                  <span class="value">${
                    this.receiptData.payment_details.payment_method
                  }</span>
                </div>
                <div class="info-item">
                  <span class="label">Amount Paid:</span>
                  <span class="value paid">₨${
                    this.receiptData.payment_details.amount_paid
                  }</span>
                </div>
                <div class="info-item">
                  <span class="label">Fee Type:</span>
                  <span class="value">${
                    this.receiptData.payment_details.fee_type
                  }</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <div class="section-title">Fee Breakdown</div>
              <table class="fee-table">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Expected Amount</th>
                    <th>Paid Amount</th>
                    <th>Remaining Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generateReceiptTableRows()}
                </tbody>
              </table>
            </div>

            <div class="summary-section">
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="summary-title">Total Expected</div>
                  <div class="summary-amount">₨${
                    this.receiptData.summary.total_expected
                  }</div>
                </div>
                <div class="summary-card">
                  <div class="summary-title paid">Total Paid</div>
                  <div class="summary-amount paid">₨${
                    this.receiptData.summary.total_paid
                  }</div>
                </div>
                <div class="summary-card">
                  <div class="summary-title pending">Total Remaining</div>
                  <div class="summary-amount pending">₨${
                    this.receiptData.summary.total_remaining
                  }</div>
                </div>
              </div>
            </div>

            <div class="status-section">
              <div class="status-text ${this.getPaymentStatusColor(
                this.receiptData.summary.payment_status
              )}">
                ${this.getPaymentStatusText(
                  this.receiptData.summary.payment_status
                )}
              </div>
            </div>

            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-title">Student/Parent Signature</div>
              </div>
              <div class="signature-box">
                <div class="signature-title">Authorized Signature</div>
              </div>
            </div>

            <div class="footer">
              <p>This is a computer generated receipt. No signature required.</p>
              <p>Thank you for your payment!</p>
            </div>
          </div>
        </body>
        </html>
      `;
    },

    generateReceiptTableRows() {
      const rows = [];
      const breakdown = this.receiptData.fee_breakdown;

      if (breakdown.admission_fee.expected > 0) {
        rows.push(`
          <tr>
            <td>Admission Fee</td>
            <td>₨${breakdown.admission_fee.expected}</td>
            <td class="paid">₨${breakdown.admission_fee.paid}</td>
            <td class="pending">₨${breakdown.admission_fee.remaining}</td>
            <td><strong>${breakdown.admission_fee.status}</strong></td>
          </tr>
        `);
      }

      if (breakdown.monthly_fee.expected > 0) {
        rows.push(`
          <tr>
            <td>Monthly Fee</td>
            <td>₨${breakdown.monthly_fee.expected}</td>
            <td class="paid">₨${breakdown.monthly_fee.paid}</td>
            <td class="pending">₨${breakdown.monthly_fee.remaining}</td>
            <td><strong>${breakdown.monthly_fee.status}</strong></td>
          </tr>
        `);
      }

      if (breakdown.transport_fee.expected > 0) {
        rows.push(`
          <tr>
            <td>Transport Fee</td>
            <td>₨${breakdown.transport_fee.expected}</td>
            <td class="paid">₨${breakdown.transport_fee.paid}</td>
            <td class="pending">₨${breakdown.transport_fee.remaining}</td>
            <td><strong>${breakdown.transport_fee.status}</strong></td>
          </tr>
        `);
      }

      if (breakdown.arrears.expected > 0) {
        rows.push(`
          <tr>
            <td>Arrears</td>
            <td>₨${breakdown.arrears.expected}</td>
            <td class="paid">₨${breakdown.arrears.paid}</td>
            <td class="pending">₨${breakdown.arrears.remaining}</td>
            <td><strong>${breakdown.arrears.status}</strong></td>
          </tr>
        `);
      }

      if (breakdown.fine.expected > 0) {
        rows.push(`
          <tr>
            <td>Fine</td>
            <td>₨${breakdown.fine.expected}</td>
            <td class="paid">₨${breakdown.fine.paid}</td>
            <td class="pending">₨${breakdown.fine.remaining}</td>
            <td><strong>${breakdown.fine.status}</strong></td>
          </tr>
        `);
      }

      if (breakdown.annual_fee.expected > 0) {
        rows.push(`
          <tr>
            <td>Annual Fee</td>
            <td>₨${breakdown.annual_fee.expected}</td>
            <td class="paid">₨${breakdown.annual_fee.paid}</td>
            <td class="pending">₨${breakdown.annual_fee.remaining}</td>
            <td><strong>${breakdown.annual_fee.status}</strong></td>
          </tr>
        `);
      }

      return rows.join("");
    },

    getStatusColor(status) {
      switch (status) {
        case "PAID":
          return "success";
        case "PARTIAL":
          return "warning";
        case "PENDING":
          return "error";
        default:
          return "grey";
      }
    },

    getPaymentStatusColor(status) {
      switch (status) {
        case "FULLY_PAID":
          return "success";
        case "PARTIALLY_PAID":
          return "warning";
        case "UNPAID":
          return "error";
        default:
          return "grey";
      }
    },

    getPaymentStatusIcon(status) {
      switch (status) {
        case "FULLY_PAID":
          return "mdi-check-circle";
        case "PARTIALLY_PAID":
          return "mdi-clock";
        case "UNPAID":
          return "mdi-alert-circle";
        default:
          return "mdi-help-circle";
      }
    },

    getPaymentStatusText(status) {
      switch (status) {
        case "FULLY_PAID":
          return "FULLY PAID";
        case "PARTIALLY_PAID":
          return "PARTIALLY PAID";
        case "UNPAID":
          return "UNPAID";
        default:
          return "UNKNOWN";
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    async startBarcodeDetection() {
      try {
        this.cameraLoading = true;

        // Start barcode detection with Quagga
        this.startBarcodeScanning();
      } catch (error) {
        console.error("Error starting barcode scanner:", error);
        this.$toast.error(
          "Unable to start barcode scanner. Please check permissions."
        );
        this.closeBarcodeScanner();
      } finally {
        this.cameraLoading = false;
      }
    },

    startBarcodeScanning() {
      const video = this.$refs.videoElement;

      if (!video) return;

      // Import Quagga dynamically
      import("quagga")
        .then((Quagga) => {
          Quagga.init(
            {
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video,
                constraints: {
                  width: { min: 640 },
                  height: { min: 480 },
                  facingMode: "environment",
                },
              },
              decoder: {
                readers: [
                  "code_128_reader",
                  "ean_reader",
                  "ean_8_reader",
                  "code_39_reader",
                  "code_39_vin_reader",
                  "codabar_reader",
                  "upc_reader",
                  "upc_e_reader",
                  "i2of5_reader",
                ],
                debug: {
                  showCanvas: true,
                  showPatches: true,
                  showFoundPatches: true,
                  showSkeleton: true,
                  showLabels: true,
                  showPatchLabels: true,
                  showRemainingPatchLabels: true,
                  boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true,
                  },
                },
              },
              locate: true,
              frequency: 10,
            },
            (err) => {
              if (err) {
                console.error("Quagga initialization failed:", err);
                this.$toast.error("Failed to initialize barcode scanner");
                this.closeBarcodeScanner();
                return;
              }

              console.log("Quagga initialized successfully");
              Quagga.start();

              // Listen for barcode detection
              Quagga.onDetected((result) => {
                try {
                  const barcode = result.codeResult.code;
                  console.log("🎯 Barcode detected:", barcode);
                  console.log("📊 Barcode result:", result);

                  // Validate barcode format (should start with FS)
                  if (barcode && barcode.startsWith("FS")) {
                    console.log("✅ Valid FS barcode detected");
                    // Process the detected barcode
                    this.processScannedBarcode(barcode);
                    // Stop scanning after successful detection
                    this.closeBarcodeScanner();
                  } else {
                    console.log("⚠️ Invalid barcode format:", barcode);
                    this.$toast.warning(
                      "Invalid barcode format. Please scan a valid fee slip barcode."
                    );
                  }
                } catch (error) {
                  console.error("Error processing detected barcode:", error);
                  this.$toast.error(
                    "Error processing barcode. Please try again."
                  );
                }
              });

              // Listen for processing
              Quagga.onProcessed((result) => {
                if (result && result.codeResult) {
                  console.log("🔄 Processing barcode:", result.codeResult.code);
                }
              });
            }
          );
        })
        .catch((error) => {
          console.error("Failed to load Quagga:", error);
          this.$toast.error(
            "Barcode scanner library not available. Try manual input."
          );
          this.closeBarcodeScanner();
          // Fallback to manual input
          this.fallbackBarcodeInput();
        });
    },

    closeBarcodeScanner() {
      this.showBarcodeScanner = false;
      this.scanningBarcode = false;
      this.cameraLoading = false;

      // Stop Quagga if it's running
      import("quagga")
        .then((Quagga) => {
          try {
            Quagga.stop();
          } catch (error) {
            console.log("Quagga was not running");
          }
        })
        .catch(() => {
          console.log("Quagga not available");
        });

      // Stop video stream
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }

      // Clear detection interval
      if (this.barcodeDetectionInterval) {
        clearInterval(this.barcodeDetectionInterval);
        this.barcodeDetectionInterval = null;
      }
    },

    toggleCamera() {
      this.cameraLoading = true;

      // Stop current stream
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }

      // Restart with different camera
      this.startBarcodeDetection();
    },

    // Test method to simulate barcode detection
    testBarcodeDetection() {
      const testBarcode = "FS0423EDU20250103"; // Example barcode
      console.log("Testing barcode detection with:", testBarcode);
      this.processScannedBarcode(testBarcode);
      this.closeBarcodeScanner();
    },

    // Debug method to check scanner status
    debugScanner() {
      console.log("🔍 Scanner Debug Info:");
      console.log("- showBarcodeScanner:", this.showBarcodeScanner);
      console.log("- scanningBarcode:", this.scanningBarcode);
      console.log("- cameraLoading:", this.cameraLoading);
      console.log("- stream:", this.stream);
      console.log("- videoElement:", this.$refs.videoElement);

      // Test if Quagga is available
      import("quagga")
        .then((Quagga) => {
          console.log("✅ Quagga is available");
          console.log("Quagga version:", Quagga.version);
        })
        .catch((error) => {
          console.error("❌ Quagga not available:", error);
        });
    },

    async submitFeeSubmission() {
      if (!this.$refs.feeSubmissionForm.validate()) {
        return;
      }

      // Check if any fees are selected AND have amounts greater than 0
      const selectedFeesWithAmount =
        (this.feeSubmission.selected_fees.admission_fee &&
          this.feeSubmission.admission_fee > 0) ||
        (this.feeSubmission.selected_fees.monthly_fee &&
          this.feeSubmission.monthly_fee > 0) ||
        (this.feeSubmission.selected_fees.transport_fee &&
          this.feeSubmission.transport_fee > 0) ||
        (this.feeSubmission.selected_fees.arrears &&
          this.feeSubmission.arrears > 0) ||
        (this.feeSubmission.selected_fees.fine &&
          this.feeSubmission.fine > 0) ||
        (this.feeSubmission.selected_fees.annual_fee &&
          this.feeSubmission.annual_fee > 0);

      if (!selectedFeesWithAmount) {
        this.$toast.warning(
          "Please select at least one fee component with an amount greater than 0 to submit. You can manually control which fees to submit by checking/unchecking the boxes."
        );
        return;
      }

      // Log which fees will be submitted
      console.log("🔍 Fees that will be submitted:", {
        admission_fee:
          this.feeSubmission.selected_fees.admission_fee &&
          this.feeSubmission.admission_fee > 0
            ? this.feeSubmission.admission_fee
            : "Not submitted",
        monthly_fee:
          this.feeSubmission.selected_fees.monthly_fee &&
          this.feeSubmission.monthly_fee > 0
            ? this.feeSubmission.monthly_fee
            : "Not submitted",
        transport_fee:
          this.feeSubmission.selected_fees.transport_fee &&
          this.feeSubmission.transport_fee > 0
            ? this.feeSubmission.transport_fee
            : "Not submitted",
        arrears:
          this.feeSubmission.selected_fees.arrears &&
          this.feeSubmission.arrears > 0
            ? this.feeSubmission.arrears
            : "Not submitted",
        fine:
          this.feeSubmission.selected_fees.fine && this.feeSubmission.fine > 0
            ? this.feeSubmission.fine
            : "Not submitted",
        annual_fee:
          this.feeSubmission.selected_fees.annual_fee &&
          this.feeSubmission.annual_fee > 0
            ? this.feeSubmission.annual_fee
            : "Not submitted",
      });

      this.feeSubmissionLoading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        // Submit each selected fee type separately
        const submittedFees = [];
        let totalSubmitted = 0;

        // Submit Admission Fee
        if (
          this.feeSubmission.selected_fees.admission_fee &&
          this.feeSubmission.admission_fee > 0
        ) {
          const admissionFeeData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Admission Fee",
            amount: this.feeSubmission.admission_fee,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const admissionResponse = await axios.post(
            "/api/fees",
            admissionFeeData,
            { headers }
          );
          if (admissionResponse.status === 201) {
            submittedFees.push("Admission Fee");
            totalSubmitted += this.feeSubmission.admission_fee;
          }
        }

        // Submit Monthly Fee
        if (
          this.feeSubmission.selected_fees.monthly_fee &&
          this.feeSubmission.monthly_fee > 0
        ) {
          const monthlyFeeData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Monthly Fee",
            amount: this.feeSubmission.monthly_fee,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const monthlyResponse = await axios.post(
            "/api/fees",
            monthlyFeeData,
            { headers }
          );
          if (monthlyResponse.status === 201) {
            submittedFees.push("Monthly Fee");
            totalSubmitted += this.feeSubmission.monthly_fee;
          }
        }

        // Submit Transport Fee
        if (
          this.feeSubmission.selected_fees.transport_fee &&
          this.feeSubmission.transport_fee > 0
        ) {
          const transportFeeData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Transport Fee",
            amount: this.feeSubmission.transport_fee,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const transportResponse = await axios.post(
            "/api/fees",
            transportFeeData,
            { headers }
          );
          if (transportResponse.status === 201) {
            submittedFees.push("Transport Fee");
            totalSubmitted += this.feeSubmission.transport_fee;
          }
        }

        // Submit Arrears
        if (
          this.feeSubmission.selected_fees.arrears &&
          this.feeSubmission.arrears > 0
        ) {
          const arrearsData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Arrears",
            amount: this.feeSubmission.arrears,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const arrearsResponse = await axios.post("/api/fees", arrearsData, {
            headers,
          });
          if (arrearsResponse.status === 201) {
            submittedFees.push("Arrears");
            totalSubmitted += this.feeSubmission.arrears;
          }
        }

        // Submit Fine
        if (
          this.feeSubmission.selected_fees.fine &&
          this.feeSubmission.fine > 0
        ) {
          const fineData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Fine",
            amount: this.feeSubmission.fine,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const fineResponse = await axios.post("/api/fees", fineData, {
            headers,
          });
          if (fineResponse.status === 201) {
            submittedFees.push("Fine");
            totalSubmitted += this.feeSubmission.fine;
          }
        }

        // Submit Annual Fee
        if (
          this.feeSubmission.selected_fees.annual_fee &&
          this.feeSubmission.annual_fee > 0
        ) {
          const annualFeeData = {
            student_id: this.feeSubmission.student_id,
            fee_type: "Annual Fee",
            amount: this.feeSubmission.annual_fee,
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            month: this.feeSubmission.month,
            year: this.feeSubmission.year,
            remarks: this.feeSubmission.remarks,
          };

          const annualResponse = await axios.post("/api/fees", annualFeeData, {
            headers,
          });
          if (annualResponse.status === 201) {
            submittedFees.push("Annual Fee");
            totalSubmitted += this.feeSubmission.annual_fee;
          }
        }

        // Show success message
        if (submittedFees.length > 0) {
          const successMessage = `Fee submitted successfully!\nSubmitted: ${submittedFees.join(
            ", "
          )}\nTotal Amount: ₨${totalSubmitted}`;
          this.$toast.success(successMessage, { timeout: 5000 });

          // Generate receipt for the submitted payment
          console.log("🔍 About to generate receipt with:", {
            totalSubmitted,
            submittedFees,
          });
          await this.generateReceiptAfterPayment(totalSubmitted, submittedFees);

          // Reset form
          this.resetFeeSubmission();

          // Reload fees
          await this.loadFees();
          await this.loadPendingFees();
        } else {
          this.$toast.error(
            "No fees were submitted. Please check your selections."
          );
        }
      } catch (error) {
        console.error("Error submitting fee:", error);
        this.$toast.error("Error submitting fee. Please try again.");
      } finally {
        this.feeSubmissionLoading = false;
      }
    },

    async generateReceiptAfterPayment(totalSubmitted, submittedFees) {
      try {
        console.log("🔍 Generating receipt after payment:", {
          totalSubmitted,
          submittedFees,
          studentId: this.feeSubmission.student_id,
        });

        // Get current student information
        const authData = getAuthData();
        const headers = authData?.token
          ? { Authorization: `Bearer ${authData.token}` }
          : {};

        console.log(
          "🔍 Step 1: Getting student info for ID:",
          this.feeSubmission.student_id
        );
        // Fetch current student details
        const studentResponse = await axios.get(
          `/api/students/${this.feeSubmission.student_id}`,
          { headers }
        );
        const student = studentResponse.data;
        console.log("🔍 Step 1 ✅: Student data received:", student);

        if (!student) {
          throw new Error("Student information not found");
        }

        // Get current fee breakdown for the student using the existing fee slip endpoint
        console.log("🔍 Step 2: Getting fee slips for student");
        // First get the student's fee slips to find the latest one
        const slipResponse = await axios.get(
          `/api/fee-slips/student/${this.feeSubmission.student_id}`,
          { headers }
        );
        console.log("🔍 Step 2: Fee slips response:", slipResponse.data);

        if (!slipResponse.data || slipResponse.data.length === 0) {
          throw new Error("No fee slips found for student");
        }

        const latestSlip = slipResponse.data[0];
        console.log("🔍 Step 2: Latest slip:", latestSlip);
        if (!latestSlip || !latestSlip.slip_id) {
          throw new Error("Invalid slip data");
        }

        console.log(
          "🔍 Step 3: Getting fee breakdown for slip_id:",
          latestSlip.slip_id
        );
        // Get the fee breakdown using the existing endpoint
        const feeBreakdownResponse = await axios.get(
          `/api/fee-slips/fee-breakdown/${latestSlip.slip_id}`,
          { headers }
        );
        console.log(
          "🔍 Step 3: Fee breakdown response:",
          feeBreakdownResponse.data
        );

        const { fee_breakdown: currentFeeBreakdown } =
          feeBreakdownResponse.data;
        console.log("🔍 Step 3: Extracted fee breakdown:", currentFeeBreakdown);

        // Create receipt data with payment information
        this.receiptData = {
          receipt_number: `${student.admission_number}_${Date.now()}`,
          generated_at: new Date().toISOString(),
          student_info: {
            name: student.name,
            admission_number: student.admission_number,
            father_name: student.father_name,
            class_name: student.class_name,
          },
          payment_details: {
            payment_date: this.feeSubmission.payment_date,
            payment_method: this.feeSubmission.payment_method,
            amount_paid: totalSubmitted,
            fee_type: submittedFees.join(", "),
          },
          fee_breakdown: {
            admission_fee: {
              expected: currentFeeBreakdown?.admission_fee?.expected || 0,
              paid: currentFeeBreakdown?.admission_fee?.paid || 0,
              remaining: currentFeeBreakdown?.admission_fee?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.admission_fee?.paid || 0,
                currentFeeBreakdown?.admission_fee?.expected || 0
              ),
            },
            monthly_fee: {
              expected: currentFeeBreakdown?.monthly_fee?.expected || 0,
              paid: currentFeeBreakdown?.monthly_fee?.paid || 0,
              remaining: currentFeeBreakdown?.monthly_fee?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.monthly_fee?.paid || 0,
                currentFeeBreakdown?.monthly_fee?.expected || 0
              ),
            },
            transport_fee: {
              expected: currentFeeBreakdown?.transport_fee?.expected || 0,
              paid: currentFeeBreakdown?.transport_fee?.paid || 0,
              remaining: currentFeeBreakdown?.transport_fee?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.transport_fee?.paid || 0,
                currentFeeBreakdown?.transport_fee?.expected || 0
              ),
            },
            arrears: {
              expected: currentFeeBreakdown?.arrears?.expected || 0,
              paid: currentFeeBreakdown?.arrears?.paid || 0,
              remaining: currentFeeBreakdown?.arrears?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.arrears?.paid || 0,
                currentFeeBreakdown?.arrears?.expected || 0
              ),
            },
            fine: {
              expected: currentFeeBreakdown?.fine?.expected || 0,
              paid: currentFeeBreakdown?.fine?.paid || 0,
              remaining: currentFeeBreakdown?.fine?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.fine?.paid || 0,
                currentFeeBreakdown?.fine?.expected || 0
              ),
            },
            annual_fee: {
              expected: currentFeeBreakdown?.annual_fee?.expected || 0,
              paid: currentFeeBreakdown?.annual_fee?.paid || 0,
              remaining: currentFeeBreakdown?.annual_fee?.remaining || 0,
              status: this.calculateFeeStatus(
                currentFeeBreakdown?.annual_fee?.paid || 0,
                currentFeeBreakdown?.annual_fee?.expected || 0
              ),
            },
          },
          summary: {
            total_expected:
              (currentFeeBreakdown?.admission_fee?.expected || 0) +
              (currentFeeBreakdown?.monthly_fee?.expected || 0) +
              (currentFeeBreakdown?.transport_fee?.expected || 0) +
              (currentFeeBreakdown?.arrears?.expected || 0) +
              (currentFeeBreakdown?.fine?.expected || 0) +
              (currentFeeBreakdown?.annual_fee?.expected || 0),
            total_paid:
              (currentFeeBreakdown?.admission_fee?.paid || 0) +
              (currentFeeBreakdown?.monthly_fee?.paid || 0) +
              (currentFeeBreakdown?.transport_fee?.paid || 0) +
              (currentFeeBreakdown?.arrears?.paid || 0) +
              (currentFeeBreakdown?.fine?.paid || 0) +
              (currentFeeBreakdown?.annual_fee?.paid || 0),
            total_remaining: 0,
            payment_status: "PARTIAL",
          },
        };

        // Calculate total remaining
        this.receiptData.summary.total_remaining =
          this.receiptData.summary.total_expected -
          this.receiptData.summary.total_paid;

        // Determine overall payment status
        if (this.receiptData.summary.total_remaining <= 0) {
          this.receiptData.summary.payment_status = "PAID";
        } else if (this.receiptData.summary.total_paid > 0) {
          this.receiptData.summary.payment_status = "PARTIAL";
        } else {
          this.receiptData.summary.payment_status = "PENDING";
        }

        console.log("✅ Receipt data generated:", this.receiptData);

        // Show the receipt
        console.log("🔍 Step 4: Setting showReceipt to true");
        this.showReceipt = true;
        console.log("🔍 Step 4: showReceipt is now:", this.showReceipt);
      } catch (error) {
        console.error("❌ Error generating receipt:", error);
        this.$toast.error(
          "Could not generate receipt, but payment was successful"
        );
      }
    },

    calculateFeeStatus(paid, total) {
      if (total <= 0) return "N/A";
      if (paid >= total) return "PAID";
      if (paid > 0) return "PARTIAL";
      return "PENDING";
    },

    generateFeeBreakdownTableRows() {
      if (!this.receiptData || !this.receiptData.fee_breakdown) return "";

      let rows = "";
      const feeTypes = [
        { key: "admission_fee", name: "Admission Fee" },
        { key: "monthly_fee", name: "Monthly Fee" },
        { key: "transport_fee", name: "Transport Fee" },
        { key: "arrears", name: "Arrears" },
        { key: "fine", name: "Fine" },
        { key: "annual_fee", name: "Annual Fee" },
      ];

      feeTypes.forEach((feeType) => {
        const fee = this.receiptData.fee_breakdown[feeType.key];
        if (!fee) return;

        // Always show Arrears row, even if 0; others only if expected > 0
        const shouldShow =
          feeType.key === "arrears"
            ? true
            : (parseFloat(fee.expected) || 0) > 0;

        if (shouldShow) {
          rows += `
            <tr style="border-bottom: 1px solid #ccc;">
              <td style="padding: 2px; font-size: 9px;">${feeType.name}</td>
              <td style="text-align: center; padding: 2px; font-size: 9px;">Rs${fee.expected}</td>
              <td style="text-align: center; padding: 2px; color: green; font-weight: bold; font-size: 9px;">Rs${fee.paid}</td>
              <td style="text-align: center; padding: 2px; color: orange; font-weight: bold; font-size: 9px;">Rs${fee.remaining}</td>
              <td style="text-align: center; padding: 2px; font-weight: bold; font-size: 9px;">${fee.status}</td>
            </tr>
          `;
        }
      });

      return rows;
    },

    // Test method to manually show receipt
    testShowReceipt() {
      console.log("🔍 Testing receipt display manually");
      this.receiptData = {
        receipt_number: "TEST_123",
        generated_at: new Date().toISOString(),
        student_info: {
          name: "Test Student",
          admission_number: "12345",
          father_name: "Test Father",
          class_name: "Test Class",
        },
        payment_details: {
          payment_date: new Date().toISOString(),
          payment_method: "Cash",
          amount_paid: 1000,
          fee_type: "Test Fee",
        },
        fee_breakdown: {
          admission_fee: {
            expected: 5000,
            paid: 1000,
            remaining: 4000,
            status: "PARTIAL",
          },
          monthly_fee: {
            expected: 2000,
            paid: 0,
            remaining: 2000,
            status: "PENDING",
          },
          transport_fee: { expected: 0, paid: 0, remaining: 0, status: "N/A" },
          arrears: { expected: 0, paid: 0, remaining: 0, status: "N/A" },
          fine: { expected: 0, paid: 0, remaining: 0, status: "N/A" },
          annual_fee: { expected: 0, paid: 0, remaining: 0, status: "N/A" },
        },
        summary: {
          total_expected: 7000,
          total_paid: 1000,
          total_remaining: 6000,
          payment_status: "PARTIAL",
        },
      };
      this.showReceipt = true;
      console.log("🔍 Test receipt set, showReceipt:", this.showReceipt);
    },

    closeReceipt() {
      this.showReceipt = false;
      this.receiptData = null;
    },

    printReceipt() {
      if (!this.receiptData) {
        this.$toast.error("No receipt data available to print");
        return;
      }

      try {
        // Create professional receipt print format matching the uploaded design
        const printContent = `
          <div style="font-family: 'Times New Roman', serif; width: 132mm; max-width: 132mm; margin: 0 auto; background: #fff; max-height: 194mm; font-size: 10px; overflow: hidden;">
            <!-- Header with logos and school info -->
            <div style="padding: 12px 16px 8px 16px; border-bottom: 2px solid #000;">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <img src="${EducatorsLogo}" alt="The Educators" style="height: 22mm; width: 28mm; object-fit: contain;"/>
                <div style="text-align:center; flex:1; margin: 0 8px;">
                  <div style="font-size: 26px; font-weight: 800; letter-spacing: 1px;">THE EDUCATORS</div>
                  <div style="font-size: 11px; margin-top: 2px;">A Project of Beaconhouse School System</div>
                  <div style="font-size: 11px; margin-top: 2px;">Kohat Road Peshawar</div>
                  
                </div>
                <img src="${BeaconhouseLogo}" alt="Beaconhouse" style="height: 22mm; width: 28mm; object-fit: contain;"/>
              </div>
              <div style="text-align:center; margin-top: 6px;">
                <div style="font-size: 16px; font-weight: 700; letter-spacing: 1px;">FEE RECEIPT</div>
                <div style="display:flex; justify-content:space-between; font-size: 11px; margin-top: 6px;">
                  <span><strong>Receipt No:</strong> ${
                    this.receiptData.receipt_number
                  }</span>
                  <span><strong>Date:</strong> ${this.formatDate(
                    this.receiptData.generated_at,
                    "MMMM DD, YYYY [at] HH:mm A"
                  )}</span>
                </div>
              </div>
            </div>

            <!-- Student Information -->
            <div style="padding: 12px 16px; border-bottom: 1px solid #000;">
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Student Information</div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <div style="flex:1; padding-right:8px;"><strong>Student Name:</strong> ${
                  this.receiptData.student_info.name
                }</div>
                <div style="flex:1; text-align:right;"><strong>Admission No:</strong> ${
                  this.receiptData.student_info.admission_number
                }</div>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <div style="flex:1; padding-right:8px;"><strong>Father's Name:</strong> ${
                  this.receiptData.student_info.father_name
                }</div>
                <div style="flex:1; text-align:right;"><strong>Class:</strong> ${
                  this.receiptData.student_info.class_name
                }</div>
              </div>
            </div>

            <!-- Payment Details -->
            <div style="padding: 12px 16px; border-bottom: 1px solid #000;">
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Payment Details</div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <div style="flex:1; padding-right:8px;"><strong>Payment Date:</strong> ${this.formatDate(
                  this.receiptData.payment_details.payment_date,
                  "MMMM DD, YYYY [at] HH:mm A"
                )}</div>
                <div style="flex:1; text-align:right;"><strong>Payment Method:</strong> ${
                  this.receiptData.payment_details.payment_method
                }</div>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <div style="flex:1; padding-right:8px;"><strong>Amount Paid:</strong> <span style="color:#0a7d27; font-weight:700;">Rs${
                  this.receiptData.payment_details.amount_paid
                }.00</span></div>
                <div style="flex:1; text-align:right;"><strong>Fee Type:</strong> ${
                  this.receiptData.payment_details.fee_type
                }</div>
              </div>
            </div>

            <!-- Fee Breakdown -->
            <div style="padding: 12px 16px;">
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Fee Breakdown</div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                <thead>
                  <tr>
                    <th style="text-align:left; border-bottom: 1px solid #000; padding: 8px 6px;">Fee Type</th>
                    <th style="text-align:center; border-bottom: 1px solid #000; padding: 8px 6px;">Expected</th>
                    <th style="text-align:center; border-bottom: 1px solid #000; padding: 8px 6px;">Paid</th>
                    <th style="text-align:center; border-bottom: 1px solid #000; padding: 8px 6px;">Remaining</th>
                    <th style="text-align:center; border-bottom: 1px solid #000; padding: 8px 6px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generateFeeBreakdownTableRows()}
                </tbody>
              </table>

              <div style="display:flex; gap:8px;">
                <div style="flex:1; border: 1px solid #000; padding: 10px; text-align:center;">
                  <div style="font-weight:700; margin-bottom:6px;">TOTAL EXPECTED</div>
                  <div style="font-size:18px; font-weight:800;">Rs${
                    this.receiptData.summary.total_expected
                  }</div>
                </div>
                <div style="flex:1; border: 1px solid #000; padding: 10px; text-align:center;">
                  <div style="font-weight:700; margin-bottom:6px; color:#0a7d27;">TOTAL PAID</div>
                  <div style="font-size:18px; font-weight:800; color:#0a7d27;">Rs${
                    this.receiptData.summary.total_paid
                  }</div>
                </div>
                <div style="flex:1; border: 1px solid #000; padding: 10px; text-align:center;">
                  <div style="font-weight:700; margin-bottom:6px; color:#c26c00;">TOTAL REMAINING</div>
                  <div style="font-size:18px; font-weight:800; color:#c26c00;">Rs${
                    this.receiptData.summary.total_remaining
                  }</div>
                </div>
              </div>
            </div>

            <!-- Payment Status & Footer -->
            <div style="text-align:center; padding: 12px 16px; border-top: 1px solid #000; background:#f6f6f6;">
              <div style="display:inline-block; border: 1px solid #000; padding: 6px 12px; font-weight:700; background:#fff;">
                ${
                  this.receiptData.summary.payment_status === "PAID"
                    ? "FULLY PAID"
                    : this.receiptData.summary.payment_status
                }
              </div>
              <div style="display:flex; justify-content:space-between; margin-top: 16px;">
                <div style="text-align:center; flex:1; padding: 0 8px;">
                  <div style="border-bottom: 1px solid #000; height: 0; margin: 0 20px 8px 20px;"></div>
                  <div><strong>Student/Parent Signature</strong></div>
                </div>
                <div style="text-align:center; flex:1; padding: 0 8px;">
                  <div style="border-bottom: 1px solid #000; height: 0; margin: 0 20px 8px 20px;"></div>
                  <div><strong>Authorized Signature</strong></div>
                </div>
              </div>
              <div style="margin-top: 10px; font-size: 11px;">This is a computer generated receipt. No signature required.</div>
            </div>
          </div>
        `;

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Fee Receipt - ${this.receiptData.student_info.name}</title>
              <style>
                @page {
                  size: A5;
                  margin: 8mm;
                }
                body { 
                  margin: 0; 
                  font-size: 10px; 
                  font-family: 'Times New Roman', serif; 
                  overflow: hidden;
                }
                img { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                @media print {
                  body { margin: 0; overflow: hidden; }
                  .receipt-container {
                    page-break-inside: avoid;
                    max-height: 194mm;
                    overflow: hidden;
                  }
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();

        const triggerPrint = () => {
          try {
            printWindow.focus();
            printWindow.print();
          } finally {
            printWindow.close();
          }
        };

        const waitForImagesAndPrint = () => {
          const images = Array.from(printWindow.document.images || []);
          if (images.length === 0) {
            triggerPrint();
            return;
          }
          let loadedCount = 0;
          const done = () => {
            loadedCount += 1;
            if (loadedCount >= images.length) {
              triggerPrint();
            }
          };
          images.forEach((img) => {
            if (img.complete) {
              // Give the browser one tick to decode
              setTimeout(done, 0);
            } else {
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }
          });
        };

        if (printWindow.document.readyState === "complete") {
          waitForImagesAndPrint();
        } else {
          printWindow.addEventListener("load", waitForImagesAndPrint, {
            once: true,
          });
        }
      } catch (error) {
        console.error("Error printing receipt:", error);
        this.$toast.error("Error printing receipt");
      }
    },

    editFee(fee) {
      // Implement fee editing
      console.log("Edit fee:", fee);
    },

    // Selection Methods for Fee Management Table
    selectAllFeesTable() {
      if (this.selectedFees.length === this.filteredFees.length) {
        // If all are selected, deselect all
        this.selectedFees = [];
        this.$toast.info("Deselected all fees");
      } else {
        // Select all
        this.selectedFees = [...this.filteredFees];
        this.$toast.success(`Selected all ${this.filteredFees.length} fees`);
      }
    },

    clearSelection() {
      this.selectedFees = [];
      this.$toast.info("Selection cleared");
    },

    // Export and Delete Methods
    exportSelectedFees() {
      if (this.selectedFees.length === 0) {
        this.$toast.error("Please select fees to export");
        return;
      }
      this.exportFeesToCSV(this.selectedFees, "selected_fees");
    },

    exportAllFees() {
      this.exportFeesToCSV(this.fees, "all_fees");
    },

    exportFeesToCSV(fees, filename) {
      try {
        // Create CSV content
        const headers = [
          "Student Name",
          "Fee Type",
          "Amount",
          "Payment Date",
          "Payment Method",
          "Month/Year",
          "Remarks",
        ];

        const csvContent = [
          headers.join(","),
          ...fees.map((fee) =>
            [
              `"${fee.student_name || "N/A"}"`,
              `"${fee.fee_type || "N/A"}"`,
              `"${fee.amount || 0}"`,
              `"${this.formatDate(fee.payment_date) || "N/A"}"`,
              `"${fee.payment_method || "N/A"}"`,
              `"${fee.month || "N/A"}/${fee.year || "N/A"}"`,
              `"${fee.remarks || "N/A"}"`,
            ].join(",")
          ),
        ].join("\n");

        // Create and download file
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `${filename}_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$toast.success(
          `Exported ${fees.length} fee records successfully!`
        );
      } catch (error) {
        console.error("Error exporting fees:", error);
        this.$toast.error("Error exporting fees. Please try again.");
      }
    },

    deleteSelectedFees() {
      if (this.selectedFees.length === 0) {
        this.$toast.error("Please select fees to delete");
        return;
      }

      // Show confirmation dialog
      this.bulkConfirmDialog = {
        show: true,
        title: "Delete Fees",
        subtitle: "Permanently remove fee records from the system",
        message: `Are you sure you want to permanently delete ${this.selectedFees.length} fee records?`,
        confirmText: "Delete Permanently",
        cancelText: "Cancel",
        confirmIcon: "mdi-delete",
        type: "error",
        warning:
          "This action cannot be undone! All selected fee records will be permanently deleted.",
        warningTitle: "Warning",
        loading: false,
        onConfirm: () => this.performBulkDelete(),
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    async performBulkDelete() {
      this.bulkConfirmDialog.loading = true;
      let successCount = 0;
      let errorCount = 0;

      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};

        for (const fee of this.selectedFees) {
          try {
            await axios.delete(`/api/fees/${fee.id}`, {
              headers: headers,
            });
            successCount++;
          } catch (error) {
            console.error(`Error deleting fee ${fee.id}:`, error);
            errorCount++;
          }
        }

        // Close dialog and show results
        this.closeBulkConfirmDialog();

        if (successCount > 0) {
          this.$toast.success(
            `Successfully deleted ${successCount} fee records!`
          );
          if (errorCount > 0) {
            this.$toast.warning(`${errorCount} records could not be deleted.`);
          }
        } else {
          this.$toast.error("No fee records were deleted. Please try again.");
        }

        // Reload data
        await this.loadFees();
        this.selectedFees = [];
      } catch (error) {
        console.error("Error in bulk delete:", error);
        this.$toast.error("Error performing bulk delete. Please try again.");
      } finally {
        this.bulkConfirmDialog.loading = false;
      }
    },

    closeBulkConfirmDialog() {
      this.bulkConfirmDialog.show = false;
      this.bulkConfirmDialog.loading = false;
    },

    deleteFee(fee) {
      // Show confirmation dialog for single fee deletion
      this.bulkConfirmDialog = {
        show: true,
        title: "Delete Fee Record",
        subtitle: "Permanently remove this fee record from the system",
        message: `Are you sure you want to delete the fee record for ${fee.student_name}?`,
        confirmText: "Delete Permanently",
        cancelText: "Cancel",
        confirmIcon: "mdi-delete",
        type: "error",
        warning:
          "This action cannot be undone! The fee record will be permanently deleted.",
        warningTitle: "Warning",
        loading: false,
        onConfirm: async () => {
          try {
            const authData = getAuthData();
            const headers =
              authData && authData.token
                ? { Authorization: `Bearer ${authData.token}` }
                : {};
            await axios.delete(`/api/fees/${fee.id}`, {
              headers: headers,
            });

            this.$toast.success("Fee record deleted successfully!");
            this.closeBulkConfirmDialog();
            await this.loadFees();
          } catch (error) {
            console.error("Error deleting fee:", error);
            this.$toast.error("Error deleting fee record. Please try again.");
          }
        },
        onCancel: () => this.closeBulkConfirmDialog(),
      };
    },

    collectPendingFee(student) {
      this.feeForm.student_id = student;
      this.feeForm.amount = Number(student.monthly_fee) || 0;
      this.showFeeDialog = true;
    },

    openFeeCollectionDialog() {
      console.log("Button clicked - openFeeCollectionDialog called");
      this.resetFeeForm();
      this.showFeeDialog = true;
      console.log("Fee collection dialog opened");
    },

    async submitFee() {
      if (!this.$refs.feeForm || !this.$refs.feeForm.validate()) return;

      this.feeLoading = true;
      try {
        const authData = getAuthData();
        const headers =
          authData && authData.token
            ? { Authorization: `Bearer ${authData.token}` }
            : {};
        await axios.post("/api/fees", this.feeForm, {
          headers: headers,
        });

        this.successDialog = true;
        this.showFeeDialog = false;
        this.resetFeeForm();
        await this.loadFees();
        await this.loadPendingFees();
      } catch (error) {
        console.error("Error submitting fee:", error);
      } finally {
        this.feeLoading = false;
      }
    },

    resetFeeForm() {
      // Only reset the form if it exists
      if (this.$refs.feeForm) {
        this.$refs.feeForm.reset();
      }
      this.feeForm.student_id = null;
      this.feeForm.amount = "";
      this.feeForm.payment_date = this.today;
      this.feeForm.month = new Date().getMonth() + 1;
      this.feeForm.year = new Date().getFullYear();
    },

    getStudentAvatar(studentName = "") {
      // Return a default avatar when no student is selected or name is undefined
      if (!studentName) {
        return "https://ui-avatars.com/api/?name=Student&background=1976d2&color=fff&size=50";
      }

      // Generate avatar based on student name
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        studentName
      )}&background=1976d2&color=fff&size=50`;
    },

    searchStudent() {
      // Clear previous timeout
      if (this.studentSearchTimeout) {
        clearTimeout(this.studentSearchTimeout);
      }

      // Set a new timeout to debounce the search
      this.studentSearchTimeout = setTimeout(async () => {
        if (
          !this.studentSearchQuery ||
          this.studentSearchQuery.trim().length < 2
        ) {
          this.studentSearchResults = [];
          this.studentSearchLoading = false;
          return;
        }

        this.studentSearchLoading = true;

        try {
          const authData = getAuthData();
          const headers =
            authData && authData.token
              ? { Authorization: `Bearer ${authData.token}` }
              : {};

          const response = await axios.get(
            `/api/students/search?query=${encodeURIComponent(
              this.studentSearchQuery.trim()
            )}`,
            {
              headers: headers,
            }
          );

          this.studentSearchResults = response.data.slice(0, 10); // Limit to 10 results
        } catch (error) {
          console.error("Error searching students:", error);
          this.studentSearchResults = [];
        } finally {
          this.studentSearchLoading = false;
        }
      }, 300); // Wait 300ms after user stops typing
    },

    async selectStudentFromSearch(student) {
      if (!student) {
        console.error("Invalid student data passed to selectStudentFromSearch");
        return;
      }

      // Set the student info
      this.selectedStudentInfo = student;
      this.feeSubmission.student_id = student.id;
      this.feeSubmission.admission_number = student.admission_number;

      // Load detailed fee breakdown for this student
      if (student.id) {
        await this.loadStudentFeeBreakdown(student.id);
      } else {
        console.error("Invalid student ID in selectStudentFromSearch");
      }

      // Clear search results and query
      this.studentSearchResults = [];
      this.studentSearchQuery = student.name || ""; // Keep the selected student name with fallback

      this.calculateTotalFee();
    },

    handleClickOutside(event) {
      // Close search results when clicking outside
      const searchContainer = event.target.closest(".search-results-dropdown");
      const searchInput = event.target.closest("input");

      if (!searchContainer && !searchInput) {
        this.studentSearchResults = [];
      }
    },

    onSearchFocus() {
      // Show search results if there's a query
      if (
        this.studentSearchQuery &&
        this.studentSearchQuery.trim().length >= 2
      ) {
        this.searchStudent();
      }
    },

    onSearchBlur() {
      // Keep search results visible for a short time to allow clicking
      setTimeout(() => {
        this.studentSearchResults = [];
      }, 200);
    },

    clearStudentSearch() {
      this.studentSearchQuery = "";
      this.studentSearchResults = [];
      this.selectedStudentInfo = null;
      this.feeSubmission.student_id = null;
      this.feeSubmission.admission_number = "";
    },

    clearMainSearch() {
      this.searchQuery = "";
      this.loadFees(); // Reload all fees when search is cleared
    },
  },
};
</script>

<style scoped>
/* Modern Fees Page Styling - Matching Students Page */
.modern-fees-page {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  min-height: 100vh;
  padding: 0;
}

/* Header Section */
.page-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
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
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="education" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23education)"/></svg>');
  opacity: 0.3;
}

.back-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-avatar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
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
}

.header-chip {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.header-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1) !important;
}

/* Content Container */
.content-container {
  background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  min-height: calc(100vh - 300px);
  padding: 3rem 0;
  position: relative;
}

.content-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="rgba(0,0,0,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.5;
}

/* Statistics Dashboard */
.stats-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border-radius: 20px;
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

/* Enterprise Stat Cards - Matching Students Page Design */
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 220px;
  cursor: pointer;
  backdrop-filter: blur(10px);
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

/* Gradient Classes */
.green-gradient {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
}

.red-gradient {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
}

.purple-gradient {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
}

.teal-gradient {
  background: linear-gradient(135deg, #009688 0%, #00796b 100%);
}

/* Search and Filters Section */
.search-filters-section {
  margin-bottom: 2rem;
}

.search-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.search-field,
.filter-field {
  transition: all 0.3s ease;
}

.search-field:hover,
.filter-field:hover {
  transform: translateY(-1px);
}

/* Tabs Section */
.tabs-section {
  margin-bottom: 2rem;
}

.tabs-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tabs-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.modern-tabs {
  padding: 0 1rem;
}

.tab-item {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tabs-content {
  background: transparent;
}

.tab-content {
  min-height: 400px;
}

/* Data Table Styling */
.modern-data-table {
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
}

.student-info {
  display: flex;
  align-items: center;
}

.student-name {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 2px;
}

.student-details {
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.6);
}

.amount-text {
  font-weight: 700;
  color: #4caf50;
  font-size: 1.1rem;
}

.arrears-text {
  font-weight: 700;
  color: #f44336;
  font-size: 1.1rem;
}

.date-text {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
}

.payment-method-chip {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: scale(1.1);
}

.collect-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.collect-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

/* Dialog Styling */
.fee-dialog-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
}

.dialog-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-radius: 12px 12px 0 0;
}

.dialog-title {
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
}

.close-btn {
  color: white;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}

.dialog-content {
  padding: 2rem;
}

.form-field {
  transition: all 0.3s ease;
}

.form-field:hover {
  transform: translateY(-1px);
}

.dialog-actions {
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.cancel-btn {
  border: 2px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.save-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

/* Beautiful Success Dialog */
.beautiful-success-dialog {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.success-dialog-header {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  padding: 32px 36px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.success-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  pointer-events: none;
}

.success-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.success-icon-wrapper {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  animation: successPulse 2s infinite;
}

.success-icon-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

@keyframes successPulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
}

.success-header-text {
  color: white;
  text-align: center;
}

.success-dialog-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.75px;
  line-height: 1.2;
}

.success-dialog-subtitle {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.4;
}

.success-dialog-content {
  padding: 36px;
  background: white;
}

.success-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 100%;
}

.success-main-message {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-radius: 18px;
  border-left: 5px solid #4caf50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  text-align: center;
}

.success-message-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(76, 175, 80, 0.15);
  border-radius: 50%;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.success-message-content {
  flex: 1;
  text-align: center;
}

.success-message-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.3rem;
  color: #2e7d32;
  margin: 0;
  line-height: 1.6;
  font-weight: 600;
}

.success-details-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 1px solid #c8e6c9;
  border-radius: 16px;
  border-left: 5px solid #4caf50;
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.12);
}

.details-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 50%;
  border: 2px solid rgba(76, 175, 80, 0.4);
}

.details-content {
  flex: 1;
}

.details-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #2e7d32;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.success-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-radius: 16px;
  border: 1px solid #c8e6c9;
}

.success-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.success-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.success-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(76, 175, 80, 0.15);
  border-radius: 8px;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.success-item-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #2e7d32;
  font-weight: 600;
  flex: 1;
}

.success-dialog-actions {
  padding: 28px 36px;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-top: 1px solid rgba(76, 175, 80, 0.1);
  display: flex;
  justify-content: center;
}

.success-button-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.success-ok-btn {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  min-width: 140px;
  height: 48px;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.35);
  transition: all 0.3s ease;
  border-radius: 12px;
  font-size: 1rem;
}

.success-ok-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.45);
}

/* Fee Collection Button */
.fee-collection-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: 3px solid rgba(0, 0, 0, 0.6) !important;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3),
    0 6px 20px rgba(0, 0, 0, 0.15) !important;
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
  padding: 16px 32px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(10px) !important;
}

.fee-collection-btn:hover {
  transform: translateY(-4px) scale(1.02) !important;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4),
    0 12px 32px rgba(0, 0, 0, 0.2) !important;
  border-color: rgba(0, 0, 0, 0.8) !important;
  border-width: 4px !important;
}

.fee-collection-btn:focus {
  outline: none !important;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3),
    0 16px 48px rgba(102, 126, 234, 0.4) !important;
  transform: translateY(-2px) !important;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .elegant-title {
    font-size: 2.2rem !important;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 960px) {
  .elegant-title {
    font-size: 2rem !important;
  }

  .elegant-subtitle {
    font-size: 0.85rem !important;
  }

  .stat-number {
    font-size: 2.2rem;
  }

  .stat-card__icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .header-avatar {
    size: 100px !important;
  }
}

@media (max-width: 600px) {
  .elegant-title {
    font-size: 1.8rem !important;
  }

  .elegant-subtitle {
    font-size: 0.8rem !important;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-card__icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .header-avatar {
    size: 80px !important;
  }

  .dialog-header,
  .success-header {
    padding: 1rem 1.5rem;
  }

  .dialog-content,
  .success-content {
    padding: 1.5rem;
  }

  .content-container {
    padding: 2rem 0;
  }
}

/* Enhanced Fee Submission Section Styles */
.enhanced-fee-submission-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border: 3px solid rgba(0, 0, 0, 0.6);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-fee-submission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 120px rgba(0, 0, 0, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25),
    0 6px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.98);
}

.enhanced-submission-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.enhanced-submission-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.header-avatar {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.status-chip {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.enhanced-submission-content {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
}

.fee-component-card {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.fee-component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fee-component-card .v-card-text {
  padding: 12px;
}

.fee-component-card .v-text-field {
  margin-top: 8px;
}

.fee-component-card .v-chip {
  font-size: 0.75rem;
  font-weight: 600;
}

.enhanced-submission-actions {
  background: rgba(248, 249, 250, 0.98);
  backdrop-filter: blur(15px);
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

/* Card Styles */
.selection-card,
.fee-components-card,
.payment-amount-card,
.payment-details-card,
.enhanced-total-fee-card,
.breakdown-card,
.summary-card,
.remarks-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border: 2px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.selection-card:hover,
.fee-components-card:hover,
.payment-amount-card:hover,
.payment-details-card:hover,
.enhanced-total-fee-card:hover,
.breakdown-card:hover,
.summary-card:hover,
.remarks-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.6);
}

/* Enhanced Form Fields */
.enhanced-form-field {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-form-field:hover {
  transform: translateY(-1px);
}

.enhanced-form-field .v-input__slot {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease;
}

.enhanced-form-field:hover .v-input__slot {
  border-color: rgba(102, 126, 234, 0.5) !important;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

/* Enhanced Fee Breakdown */
.enhanced-fee-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.enhanced-fee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.enhanced-fee-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fee-item-left {
  display: flex;
  align-items: center;
}

.fee-label {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.95rem;
}

.fee-value {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.95rem;
}

.total-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
}

.total-item .fee-label,
.total-item .fee-value {
  color: white !important;
}

.total-label {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}

.total-value {
  font-size: 1.2rem !important;
  font-weight: 800 !important;
}

/* Enhanced Payment Summary */
.enhanced-payment-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.enhanced-summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.enhanced-summary-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.summary-item-left {
  display: flex;
  align-items: center;
}

.summary-label {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.95rem;
}

.summary-value {
  font-weight: 700;
  font-size: 0.95rem;
}

.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #f44336 !important;
}

/* Enhanced Buttons */
.enhanced-reset-btn {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important;
  color: white !important;
  border: 3px solid rgba(0, 0, 0, 0.6) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 16px rgba(0, 0, 0, 0.15) !important;
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
  padding: 16px 32px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(10px) !important;
}

.enhanced-reset-btn:hover {
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(0, 0, 0, 0.2) !important;
  border-color: rgba(0, 0, 0, 0.8) !important;
  border-width: 4px !important;
}

.enhanced-submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border: 4px solid rgba(0, 0, 0, 0.6) !important;
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.2) !important;
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
  padding: 20px 40px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(10px) !important;
}

.enhanced-submit-btn:hover {
  transform: translateY(-5px) scale(1.03) !important;
  box-shadow: 0 24px 64px rgba(102, 126, 234, 0.5),
    0 12px 32px rgba(0, 0, 0, 0.25) !important;
  border-color: rgba(0, 0, 0, 0.8) !important;
  border-width: 5px !important;
}

.enhanced-submit-btn:focus {
  outline: none !important;
  box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.3),
    0 20px 56px rgba(102, 126, 234, 0.5) !important;
  transform: translateY(-3px) !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .enhanced-submission-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .enhanced-fee-item,
  .enhanced-summary-item {
    padding: 6px 8px;
  }

  .fee-label,
  .summary-label {
    font-size: 0.85rem;
  }

  .fee-value,
  .summary-value {
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .enhanced-submission-content {
    padding: 1rem !important;
  }

  .enhanced-submission-actions {
    padding: 1rem !important;
    flex-direction: column;
    gap: 1rem;
  }

  .enhanced-reset-btn,
  .enhanced-submit-btn {
    width: 100%;
    margin: 0 !important;
  }
}

/* Enterprise Section Header Animation */
.enterprise-section-header {
  animation: fadeInUp 0.3s ease-out;
}

.kpi-section-with-border {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 5px solid rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.kpi-section-with-border:hover {
  border-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.kpi-header-avatar {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

/* Enterprise Stat Cards Animation */
.enterprise-stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: bounceIn 0.3s ease-out;
  position: relative;
  overflow: hidden;
}

.enterprise-stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.enterprise-stat-card:nth-child(1) {
  border-color: rgba(0, 0, 0, 0.5) !important;
}

.enterprise-stat-card:nth-child(1):hover {
  border-color: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;
}

.enterprise-stat-card:nth-child(2) {
  border-color: rgba(0, 0, 0, 0.5) !important;
}

.enterprise-stat-card:nth-child(2):hover {
  border-color: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;
}

.enterprise-stat-card:nth-child(3) {
  border-color: rgba(0, 0, 0, 0.5) !important;
}

.enterprise-stat-card:nth-child(3):hover {
  border-color: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;
}

.enterprise-stat-card:nth-child(4) {
  border-color: rgba(0, 0, 0, 0.5) !important;
}

.enterprise-stat-card:nth-child(4):hover {
  border-color: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;
}

/* Stat Card Icon Container */
.stat-card__icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

.stat-card__icon-container.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-card__icon-container.red {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.stat-card__icon-container.purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.stat-card__icon-container.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.enterprise-stat-card:hover .stat-card__icon-container {
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.stat-card__number {
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: 3rem;
  color: #1e293b;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  line-height: 1;
  transition: all 0.4s ease;
}

.enterprise-stat-card:hover .stat-card__number {
  transform: scale(1.05);
  color: #0f172a;
}

/* Barcode Scanner Styles */
.scanner-btn {
  min-width: 48px !important;
  height: 48px !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.scanner-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
}

.scanner-container {
  position: relative;
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.scanner-video {
  display: block;
  background: #f5f5f5;
}

.scanner-container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
  border: 2px solid #00ff00;
  border-radius: 8px;
  pointer-events: none;
  z-index: 10;
  animation: scanner-pulse 2s infinite;
}

@keyframes scanner-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.scanning-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 16px 24px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.scanning-icon {
  margin-bottom: 8px;
  animation: scanning-pulse 1.5s infinite;
}

.scanning-text {
  font-weight: 600;
  font-size: 14px;
}

@keyframes scanning-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.scanner-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.scanner-info {
  text-align: center;
  padding: 16px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.stat-card__label {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 16px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transition: all 0.4s ease;
}

.enterprise-stat-card:hover .stat-card__label {
  color: #475569;
  transform: translateY(-2px);
}

.stat-card__sub-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: #94a3b8;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.4s ease;
}

.enterprise-stat-card:hover .stat-card__sub-metric {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(59, 130, 246, 0.2);
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

.sub-label {
  font-weight: 600;
  color: #64748b;
}

.sub-value {
  font-weight: 700;
  color: #1e293b;
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
}

/* Bulk Actions Styles */
.bulk-actions-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.bulk-actions-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selection-info {
  display: flex;
  align-items: center;
}

.selection-chip {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.action-button {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Perfect Delete Dialog Styles */
.perfect-delete-dialog {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.dialog-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 32px 36px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  pointer-events: none;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.header-icon-wrapper {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.header-icon-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.header-text {
  color: white;
  text-align: center;
}

.dialog-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.75px;
  line-height: 1.2;
}

.dialog-subtitle {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.4;
}

.dialog-content {
  padding: 36px;
  background: white;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 100%;
}

.main-message {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 18px;
  border-left: 5px solid #dc3545;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.message-icon-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 50%;
  border: 2px solid rgba(220, 53, 69, 0.2);
}

.message-content {
  flex: 1;
  text-align: center;
}

.message-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
  line-height: 1.6;
  font-weight: 600;
}

.perfect-warning-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #ffeaa7;
  border-radius: 16px;
  border-left: 5px solid #ffc107;
  box-shadow: 0 6px 16px rgba(255, 193, 7, 0.15);
}

.warning-icon-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 193, 7, 0.15);
  border-radius: 50%;
  border: 2px solid rgba(255, 193, 7, 0.3);
}

.warning-content {
  flex: 1;
}

.warning-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #856404;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.75px;
}

.warning-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #856404;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
}

.impact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.impact-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.impact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(220, 53, 69, 0.12);
  border-radius: 8px;
  border: 2px solid rgba(220, 53, 69, 0.25);
}

.impact-text {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #495057;
  font-weight: 600;
  flex: 1;
}

.dialog-actions {
  padding: 28px 36px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
}

.button-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.cancel-btn {
  font-weight: 600;
  text-transform: none;
  color: #6b7280;
  min-width: 120px;
  height: 48px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: #9ca3af;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.confirm-btn {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  min-width: 160px;
  height: 48px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  box-shadow: 0 6px 16px rgba(220, 53, 69, 0.35);
  transition: all 0.3s ease;
  border-radius: 12px;
  font-size: 1rem;
}

.confirm-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.45);
}

.search-results-dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  width: 100%;
  margin-top: 4px;
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background-color: #f8f9fa;
  transform: translateX(2px);
}

.search-result-item:active {
  background-color: #e3f2fd;
}

/* Enhanced search field styling */
.search-field {
  transition: all 0.3s ease;
}

.search-field:hover {
  transform: translateY(-1px);
}

.search-field:focus-within {
  transform: translateY(-2px);
}

/* Receipt Styles */
.receipt-header {
  border-bottom: 2px solid #1976d2;
  padding-bottom: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item .label {
  font-weight: bold;
  color: #666;
}

.info-item .value {
  color: #333;
}

.fee-breakdown {
  margin: 2rem 0;
}

.receipt-summary {
  margin: 2rem 0;
}

.payment-status {
  margin: 2rem 0;
  text-align: center;
}
</style>
