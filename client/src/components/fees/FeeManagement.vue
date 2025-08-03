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
                                  @click="openBarcodeScanner"
                                  :loading="scanningBarcode"
                                  class="scanner-btn"
                                  title="Scan Fee Slip Barcode"
                                >
                                  <v-icon>mdi-qrcode-scan</v-icon>
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
                                      v-if="selectedStudentInfo?.photo"
                                      :src="`http://localhost:8081/uploads/profile-images/${selectedStudentInfo.photo}`"
                                      alt="Student Photo"
                                    ></v-img>
                                    <v-img
                                      v-else
                                      :src="
                                        getStudentAvatar(
                                          selectedStudentInfo?.name
                                        )
                                      "
                                      alt="Student Avatar"
                                    ></v-img>
                                  </v-avatar>
                                  <div class="flex-grow-1">
                                    <div class="font-weight-bold">
                                      {{ selectedStudentInfo.name }}
                                    </div>
                                    <div class="text-caption text-grey">
                                      Class:
                                      {{
                                        selectedStudentInfo.class_name || "N/A"
                                      }}
                                    </div>
                                  </div>
                                  <!-- Payment Status Indicator -->
                                  <v-chip
                                    v-if="studentArrearsInfo"
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
                              <v-icon color="primary" class="mr-2"
                                >mdi-cash-multiple</v-icon
                              >
                              <span class="text-h6 font-weight-bold"
                                >Fee Components</span
                              >
                            </v-card-title>
                            <v-card-text class="pa-4 pt-0">
                              <v-row>
                                <v-col cols="12" sm="6" md="3">
                                  <v-text-field
                                    v-model.number="feeSubmission.admission_fee"
                                    label="Admission Fee (One-time)"
                                    type="number"
                                    :rules="[rules.optionalPositive]"
                                    outlined
                                    prefix="₨"
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-school"
                                    color="info"
                                    placeholder="0"
                                    :hint="'One-time payment at admission'"
                                    persistent-hint
                                    @input="calculateTotalFee"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-text-field
                                    v-model.number="feeSubmission.monthly_fee"
                                    label="Monthly Fee (Optional)"
                                    type="number"
                                    :rules="[rules.optionalPositive]"
                                    outlined
                                    prefix="₨"
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-calendar-month"
                                    color="primary"
                                    placeholder="0"
                                    :hint="
                                      remainingArrears > 0
                                        ? `Previous arrears: ₨${remainingArrears}`
                                        : ''
                                    "
                                    persistent-hint
                                    @input="calculateTotalFee"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-text-field
                                    v-model.number="feeSubmission.fine"
                                    label="Fine (Optional)"
                                    type="number"
                                    :rules="[rules.optionalPositive]"
                                    outlined
                                    prefix="₨"
                                    @input="calculateTotalFee"
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-alert-circle"
                                    color="error"
                                    placeholder="0"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-text-field
                                    v-model.number="feeSubmission.annual_fee"
                                    label="Annual Fee (Optional)"
                                    type="number"
                                    :rules="[rules.optionalPositive]"
                                    outlined
                                    prefix="₨"
                                    @input="calculateTotalFee"
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-calendar-year"
                                    color="success"
                                    placeholder="0"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                  <v-text-field
                                    v-model="feeSubmission.arrears"
                                    label="Arrears"
                                    outlined
                                    prefix="₨"
                                    class="enhanced-form-field"
                                    prepend-inner-icon="mdi-clock-alert"
                                    color="warning"
                                    type="number"
                                    :hint="
                                      feeSubmission.arrears > 0
                                        ? 'Previous unpaid amount from earlier months'
                                        : 'No outstanding arrears'
                                    "
                                    persistent-hint
                                  ></v-text-field>
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
                              <v-icon color="info" class="mr-2"
                                >mdi-calculator</v-icon
                              >
                              <span class="text-h6 font-weight-bold"
                                >Fee Summary</span
                              >
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
                        label="Search by student name, CNIC, or admission number..."
                        prepend-inner-icon="mdi-magnify"
                        outlined
                        clearable
                        @input="searchFees"
                        class="search-field"
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
                              @click="selectAllFees"
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
                                :src="getStudentAvatar(item.student_name)"
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item.student_name }}
                              </div>
                              <div class="student-details">
                                {{ item.admission_number || "N/A" }}
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
                                :src="getStudentAvatar(item.student_name)"
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item.student_name }}
                              </div>
                              <div class="student-details">
                                {{ item.class_name || "N/A" }}
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
                                :src="getStudentAvatar(item.student_name)"
                              ></v-img>
                            </v-avatar>
                            <div>
                              <div class="student-name">
                                {{ item.student_name }}
                              </div>
                              <div class="student-details">
                                {{ item.admission_number || "N/A" }}
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
                        <v-img :src="getStudentAvatar(item?.name)"></v-img>
                      </v-avatar>
                      <span>{{ item.name }} - {{ item.admission_number }}</span>
                    </div>
                  </template>
                  <template v-slot:item="{ item }">
                    <div class="d-flex align-center">
                      <v-avatar size="32" class="mr-3">
                        <v-img :src="getStudentAvatar(item?.name)"></v-img>
                      </v-avatar>
                      <div>
                        <div class="font-weight-bold">{{ item.name }}</div>
                        <div class="text-caption text-grey">
                          {{ item.admission_number }} - Class:
                          {{ item.class_name || "N/A" }}
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

    <!-- Barcode Scanner Dialog -->
    <v-dialog v-model="showBarcodeScanner" max-width="600" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left>mdi-qrcode-scan</v-icon>
          Scan Fee Slip Barcode
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center">
            <p class="mb-4">
              Point your camera at the fee slip barcode to automatically fill
              the form
            </p>
            <div class="scanner-container">
              <video
                ref="barcodeVideo"
                autoplay
                playsinline
                muted
                class="scanner-video"
                style="
                  width: 100%;
                  max-width: 400px;
                  height: 300px;
                  border: 2px solid #ddd;
                  border-radius: 8px;
                  background: #000;
                "
              ></video>
              <div class="scanner-overlay">
                <div class="scanner-guide"></div>
              </div>
            </div>
            <div class="mt-4">
              <v-btn
                color="secondary"
                @click="closeBarcodeScanner"
                class="mr-2"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click="manualBarcodeInput"
                :loading="scanningBarcode"
              >
                <v-icon left>mdi-keyboard</v-icon>
                Manual Input
              </v-btn>
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
        arrears: 0,
        fine: 0,
        annual_fee: 0,
        amount_paid: 0,
        payment_date: new Date().toISOString().substr(0, 10),
        payment_method: "Cash",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
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
      // Barcode scanner properties
      scanningBarcode: false,
      showBarcodeScanner: false,
      barcodeScannerStream: null,
      barcodeReader: null,
      scannerTimeout: null,
      patternDetectionTimeout: null,
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
      return this.pendingFees.reduce(
        (sum, fee) => sum + Number(fee.arrears_amount),
        0
      );
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
      const admissionFee = parseFloat(this.feeSubmission.admission_fee) || 0;
      const monthlyFee = parseFloat(this.feeSubmission.monthly_fee) || 0;
      const arrears = parseFloat(this.feeSubmission.arrears) || 0;
      const fine = parseFloat(this.feeSubmission.fine) || 0;
      const annualFee = parseFloat(this.feeSubmission.annual_fee) || 0;

      return admissionFee + monthlyFee + arrears + fine + annualFee;
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
  },
  watch: {
    // Watch for changes in fee components and automatically update calculations
    "feeSubmission.admission_fee"() {
      this.calculateTotalFee();
    },
    "feeSubmission.monthly_fee"() {
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
  },
  async mounted() {
    await this.loadFees();
    await this.loadStudents();
    await this.loadPendingFees();
    await this.loadFeeHistory();
    this.feeForm.payment_date = this.today;
  },
  methods: {
    async loadFees() {
      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:8081/api/fees", {
          headers: { Authorization: user.token },
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
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:8081/api/students", {
          headers: { Authorization: user.token },
        });
        this.students = response.data;
        console.log("Students loaded:", this.students.length, this.students);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    },

    async loadPendingFees() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "http://localhost:8081/api/fees/pending",
          {
            headers: { Authorization: user.token },
          }
        );
        this.pendingFees = response.data;
      } catch (error) {
        console.error("Error loading pending fees:", error);
      }
    },

    async loadFeeHistory() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "http://localhost:8081/api/fees/history",
          {
            headers: { Authorization: user.token },
          }
        );
        this.feeHistory = response.data;
      } catch (error) {
        console.error("Error loading fee history:", error);
      }
    },

    async searchFees() {
      if (!this.searchQuery.trim()) {
        await this.loadFees();
        return;
      }

      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:8081/api/fees/search?query=${this.searchQuery}`,
          {
            headers: { Authorization: user.token },
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
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set a new timeout to debounce the search
      this.searchTimeout = setTimeout(async () => {
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
          const user = JSON.parse(localStorage.getItem("user"));
          const response = await axios.get(
            `http://localhost:8081/api/students/admission/${this.feeSubmission.admission_number}`,
            {
              headers: { Authorization: user.token },
            }
          );

          if (response.data) {
            const student = response.data;
            this.feeSubmission.student_id = student.id;
            this.selectedStudentInfo = student;

            // Auto-populate monthly fee
            this.feeSubmission.monthly_fee = Number(student.monthly_fee) || 0;

            // Auto-calculate arrears from student's remaining balance
            this.feeSubmission.arrears = Number(student.arrears_amount) || 0;

            // Reset fine and annual fee
            this.feeSubmission.fine = 0;
            this.feeSubmission.annual_fee = 0;

            // Reset amount paid
            this.feeSubmission.amount_paid = 0;

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
          const user = JSON.parse(localStorage.getItem("user"));
          const response = await axios.get(
            `http://localhost:8081/api/students/admission/${this.feeForm.admission_number}`,
            {
              headers: { Authorization: user.token },
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

    resetFeeSubmission() {
      this.feeSubmission = {
        student_id: null,
        admission_number: "",
        admission_fee: 0,
        monthly_fee: 0,
        arrears: 0,
        fine: 0,
        annual_fee: 0,
        amount_paid: 0,
        payment_date: new Date().toISOString().substr(0, 10),
        payment_method: "Cash",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
      };
      this.selectedStudentInfo = null;
      if (this.$refs.feeSubmissionForm) {
        this.$refs.feeSubmissionForm.resetValidation();
      }
    },

    // Barcode scanner methods
    async startBarcodeScanner() {
      try {
        console.log("🔍 Starting barcode scanner...");
        this.showBarcodeScanner = true;
        this.scanningBarcode = true;

        // Set a timeout to stop scanning after 30 seconds
        this.scannerTimeout = setTimeout(() => {
          if (this.scanningBarcode) {
            console.log("⏰ Scanner timeout reached");
            this.closeBarcodeScanner();
            this.$toast.info(
              "Scanner timeout. Please try again or use manual input."
            );
          }
        }, 30000); // 30 seconds
      } catch (error) {
        console.error("Error accessing camera:", error);
        this.$toast.error("Camera access denied. Please use manual input.");
        this.scanningBarcode = false;
      }
    },

    closeBarcodeScanner() {
      this.showBarcodeScanner = false;
      this.scanningBarcode = false;

      // Clear timeouts
      if (this.scannerTimeout) {
        clearTimeout(this.scannerTimeout);
        this.scannerTimeout = null;
      }

      if (this.patternDetectionTimeout) {
        clearTimeout(this.patternDetectionTimeout);
        this.patternDetectionTimeout = null;
      }

      // Stop ZXing reader if it's running
      if (this.barcodeReader) {
        try {
          this.barcodeReader.reset();
        } catch (error) {
          console.error("Error stopping barcode reader:", error);
        }
        this.barcodeReader = null;
      }

      // Stop camera stream
      if (this.barcodeScannerStream) {
        this.barcodeScannerStream.getTracks().forEach((track) => track.stop());
        this.barcodeScannerStream = null;
      }
    },

    async startBarcodeDetection() {
      try {
        console.log("🔍 Starting barcode detection...");

        // Import ZXing library
        const { BrowserMultiFormatReader } = await import("@zxing/library");

        // First try to get camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        this.barcodeScannerStream = stream;

        // Set up video element
        const video = this.$refs.barcodeVideo;
        video.srcObject = stream;
        video.play();

        // Wait for video to be ready
        await new Promise((resolve) => {
          video.addEventListener("loadedmetadata", resolve, { once: true });
        });

        console.log("✅ Camera access granted, video ready");
        this.$toast.success("Camera ready! Point at barcode to scan.");

        // Initialize ZXing reader
        this.barcodeReader = new BrowserMultiFormatReader();

        // Start continuous scanning
        this.barcodeReader.decodeFromVideoDevice(null, video, (result, err) => {
          if (result) {
            console.log("🔍 Barcode detected:", result.getText());
            this.processScannedBarcode(result.getText());
            this.closeBarcodeScanner();
          }
          if (err && !(err instanceof Error)) {
            // This is expected - no barcode found in frame
            console.log("Scanning...");
          }
        });
      } catch (error) {
        console.error("Error accessing camera:", error);
        this.$toast.error("Camera access denied. Using manual input.");
        this.closeBarcodeScanner();
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
        console.log("🔍 Loading fee slip data for barcode:", barcode);

        const user = JSON.parse(localStorage.getItem("user"));
        console.log("🔍 User token:", user ? "Present" : "Missing");

        const response = await axios.get(
          `http://localhost:8081/api/fee-slips/barcode/${barcode}`,
          {
            headers: { Authorization: user.token },
          }
        );

        console.log("🔍 API Response:", response.data);

        // Handle both old and new response structures
        let feeSlip, paymentStatus, arrearsInfo;

        if (response.data.dynamic_fee_slip) {
          // New dynamic structure
          feeSlip = response.data.dynamic_fee_slip;
          paymentStatus = response.data.payment_status;
          arrearsInfo = response.data.arrears_info || {};
          console.log("🔍 Using dynamic fee slip data");
        } else {
          // Old structure
          feeSlip = response.data.feeSlip;
          paymentStatus = response.data.payment_status;
          arrearsInfo = response.data.arrears_info;
        }

        console.log("🔍 Received fee slip data:", feeSlip);
        console.log("🔍 Received payment status:", paymentStatus);
        console.log("🔍 Received arrears info:", arrearsInfo);

        if (!feeSlip) {
          throw new Error("Fee slip not found");
        }

        // Update form with fee slip data
        this.feeSubmission.student_id = feeSlip.student_id;
        this.feeSubmission.admission_number = feeSlip.admission_number;

        // Set student info for display
        this.selectedStudentInfo = {
          id: feeSlip.student_id,
          name: feeSlip.student_name,
          admission_number: feeSlip.admission_number,
          class_name: feeSlip.class_name,
          father_name: feeSlip.father_name,
          photo: feeSlip.photo || null, // Include student photo if available
        };

        // Store arrears information for display
        this.studentArrearsInfo = arrearsInfo;

        // Reset all fee components to blank first
        this.feeSubmission.admission_fee = 0;
        this.feeSubmission.monthly_fee = 0;
        this.feeSubmission.fine = 0;
        this.feeSubmission.annual_fee = 0;
        this.feeSubmission.arrears = 0;
        this.feeSubmission.amount_paid = 0;

        // Set fee components based on payment status
        if (paymentStatus.is_fully_paid) {
          // Student has no dues - all fields remain blank
          console.log("🔍 Student has no dues - all fields blank");
          this.$toast.success(
            "Student has no dues! All fee components are blank for admin input."
          );
        } else {
          // Student has outstanding amounts - populate fields if data exists

          // Check for unpaid admission fee
          if (feeSlip.admission_fee && feeSlip.admission_fee > 0) {
            this.feeSubmission.admission_fee = feeSlip.admission_fee;
          }

          if (feeSlip.monthly_fee && feeSlip.monthly_fee > 0) {
            this.feeSubmission.monthly_fee = feeSlip.monthly_fee;
          }

          if (feeSlip.fine_amount && feeSlip.fine_amount > 0) {
            this.feeSubmission.fine = feeSlip.fine_amount;
          }

          if (
            paymentStatus.remaining_balance &&
            paymentStatus.remaining_balance > 0
          ) {
            this.feeSubmission.arrears = paymentStatus.remaining_balance;
          }

          console.log("🔍 Student has outstanding amounts:", paymentStatus);

          // Show comprehensive payment status message
          let statusMessage = `Payment Status:\n`;
          statusMessage += `• Total Fee: ₨${paymentStatus.total_fee}\n`;
          statusMessage += `• Amount Paid: ₨${paymentStatus.amount_paid}\n`;
          statusMessage += `• Remaining: ₨${paymentStatus.remaining_balance}\n`;
          statusMessage += `• Status: ${paymentStatus.payment_message}`;

          this.$toast.info(statusMessage, {
            timeout: 8000,
            closeOnClick: true,
          });
        }

        // Update the form to reflect current values
        this.calculateTotalFee();
        this.calculateRemainingBalance();

        console.log("✅ Fee slip data loaded successfully");
      } catch (error) {
        console.error("❌ Error loading fee slip data:", error);
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
    },

    async submitFeeSubmission() {
      if (!this.$refs.feeSubmissionForm.validate()) {
        return;
      }

      this.feeSubmissionLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // Calculate the actual amount to be recorded
        const actualAmount = this.feeSubmission.amount_paid;
        const totalFee = this.totalFee;
        const remainingBalance = this.remainingBalance;

        // Prepare the fee data
        const feeData = {
          student_id: this.feeSubmission.student_id,
          fee_type: "Monthly Fee",
          amount: actualAmount,
          payment_date: this.feeSubmission.payment_date,
          payment_method: this.feeSubmission.payment_method,
          month: this.feeSubmission.month,
          year: this.feeSubmission.year,
          remarks: this.feeSubmission.remarks,
          // Additional fields for detailed tracking
          monthly_fee: this.feeSubmission.monthly_fee,
          fine_paid: this.feeSubmission.fine,
          annual_fee_paid: this.feeSubmission.annual_fee,
          total_fee: totalFee,
          remaining_balance: remainingBalance,
          // If there's remaining balance, it becomes new arrears
          new_arrears: remainingBalance > 0 ? remainingBalance : 0,
        };

        const response = await axios.post(
          "http://localhost:8081/api/fees",
          feeData,
          {
            headers: { Authorization: user.token },
          }
        );

        if (response.status === 201) {
          // Show success message with payment status
          const responseData = response.data;
          let successMessage = "Fee submitted successfully!";

          if (responseData.payment_message) {
            successMessage += `\n${responseData.payment_message}`;
          }

          if (responseData.remaining_balance > 0) {
            this.$toast.warning(successMessage, { timeout: 5000 });
          } else {
            this.$toast.success(successMessage, { timeout: 5000 });
          }

          // Reset form
          this.resetFeeSubmission();

          // Reload fees
          await this.loadFees();
          await this.loadPendingFees();
        }
      } catch (error) {
        console.error("Error submitting fee:", error);
        this.$toast.error("Error submitting fee. Please try again.");
      } finally {
        this.feeSubmissionLoading = false;
      }
    },

    editFee(fee) {
      // Implement fee editing
      console.log("Edit fee:", fee);
    },

    // Selection Methods
    selectAllFees() {
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
        const user = JSON.parse(localStorage.getItem("user"));

        for (const fee of this.selectedFees) {
          try {
            await axios.delete(`http://localhost:8081/api/fees/${fee.id}`, {
              headers: { Authorization: user.token },
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
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete(`http://localhost:8081/api/fees/${fee.id}`, {
              headers: { Authorization: user.token },
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
        const user = JSON.parse(localStorage.getItem("user"));
        await axios.post("http://localhost:8081/api/fees", this.feeForm, {
          headers: { Authorization: user.token },
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

    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString();
    },

    getStudentAvatar(studentName = null) {
      if (!studentName) {
        // Return a default avatar when no student is selected
        return "https://ui-avatars.com/api/?name=Student&background=1976d2&color=fff&size=50";
      }

      // Generate avatar based on student name
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        studentName
      )}&background=1976d2&color=fff&size=50`;
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
</style>
