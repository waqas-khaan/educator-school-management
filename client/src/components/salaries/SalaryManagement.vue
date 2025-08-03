<template>
  <div class="modern-salary-page">
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
                  Salary Management
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Manage staff salaries and payroll records
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-currency-usd</v-icon>
                  Payroll Overview
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
            <!-- Key Performance Indicators Section -->
            <v-row class="mb-8 statistics-section-with-border">
              <v-col cols="12">
                <div
                  class="enterprise-section-header mb-6 text-center kpi-section-with-border"
                >
                  <div class="d-flex align-center justify-center">
                    <v-avatar size="80" class="mr-6 kpi-header-avatar">
                      <v-icon size="36" color="white">mdi-currency-usd</v-icon>
                    </v-avatar>
                    <div>
                      <h2 class="text-h3 font-weight-bold primary--text mb-1">
                        Key Performance Indicators
                      </h2>
                      <p class="text-h6 text-medium-emphasis mb-0">
                        Real-time insights into salary, payroll, and employee
                        metrics
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container blue">
                      <v-icon size="32" color="white">mdi-account-group</v-icon>
                    </div>
                    <div class="stat-card__number">
                      {{ salaryStats.totalEmployees }}
                    </div>
                    <div class="stat-card__label">TOTAL EMPLOYEES</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Active</span>
                      <span class="sub-value">{{
                        salaryStats.totalEmployees
                      }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container green">
                      <v-icon size="32" color="white"
                        >mdi-calendar-month</v-icon
                      >
                    </div>
                    <div class="stat-card__number">
                      ₨{{ formatCurrency(salaryStats.thisMonth) }}
                    </div>
                    <div class="stat-card__label">THIS MONTH</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Payroll</span>
                      <span class="sub-value"
                        >₨{{ formatCurrency(salaryStats.thisMonth) }}</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container orange">
                      <v-icon size="32" color="white">mdi-cash-multiple</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ formatCurrency(salaryStats.totalPaid) }}
                    </div>
                    <div class="stat-card__label">TOTAL PAID</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">All Time</span>
                      <span class="sub-value"
                        >₨{{ formatCurrency(salaryStats.totalPaid) }}</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container purple">
                      <v-icon size="32" color="white">mdi-chart-line</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ formatCurrency(salaryStats.avgSalary) }}
                    </div>
                    <div class="stat-card__label">AVG SALARY</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Per Employee</span>
                      <span class="sub-value"
                        >₨{{ formatCurrency(salaryStats.avgSalary) }}</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Quick Action Buttons -->
            <v-row class="mb-8">
              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="showSalaryDialog = true"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="primary">mdi-plus</v-icon>
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      Add Salary
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Record new salary and payroll entries
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="showAddTeacherDialog = true"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="success">mdi-account-plus</v-icon>
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      Add Teacher
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Add a new teacher to the system
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="showAllTeachersDialog = true"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="info">mdi-account-group</v-icon>
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      View All Teachers
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      View, manage and export teacher records
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Tabs for Salary Management -->
            <v-row>
              <v-col cols="12">
                <v-card class="modern-tabs-card" elevation="0" rounded="xl">
                  <v-tabs v-model="activeTab" class="modern-tabs">
                    <v-tab class="modern-tab">All Salaries</v-tab>
                    <v-tab class="modern-tab">This Month</v-tab>
                    <v-tab class="modern-tab">Salary Summary</v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="activeTab">
                    <!-- All Salaries Tab -->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <!-- Bulk Actions Toolbar -->
                          <div v-if="selectedSalaries.length > 0" class="mb-4">
                            <v-card class="bulk-actions-card" elevation="2">
                              <v-card-text class="py-2">
                                <div
                                  class="d-flex align-center justify-space-between"
                                >
                                  <div class="d-flex align-center">
                                    <v-icon color="primary" class="mr-2"
                                      >mdi-checkbox-multiple-marked</v-icon
                                    >
                                    <span class="font-weight-medium">
                                      {{ selectedSalaries.length }} item(s)
                                      selected
                                    </span>
                                  </div>
                                  <div class="d-flex">
                                    <v-btn
                                      small
                                      color="warning"
                                      class="mr-2"
                                      @click="bulkEditSalaries"
                                      :disabled="selectedSalaries.length !== 1"
                                    >
                                      <v-icon left small>mdi-pencil</v-icon>
                                      Edit Selected
                                    </v-btn>
                                    <v-btn
                                      small
                                      color="error"
                                      @click="bulkDeleteSalaries"
                                    >
                                      <v-icon left small>mdi-delete</v-icon>
                                      Delete Selected
                                    </v-btn>
                                  </div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </div>

                          <v-data-table
                            v-model="selectedSalaries"
                            :headers="salaryHeaders"
                            :items="filteredSalaries"
                            :loading="loading"
                            sort-by="payment_date"
                            sort-desc
                            class="modern-data-table"
                            no-data-text="No salary records found"
                            no-results-text="No salary records match your search"
                            show-select
                            item-key="id"
                          >
                            <template v-slot:item.employee_name="{ item }">
                              <div class="d-flex align-center">
                                <v-avatar size="32" class="mr-2">
                                  <v-img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                  ></v-img>
                                </v-avatar>
                                <div>
                                  <div class="font-weight-bold">
                                    {{ item.employee_name }}
                                  </div>
                                  <div class="text-caption text-muted">
                                    {{ item.employee_id }}
                                  </div>
                                </div>
                              </div>
                            </template>

                            <template v-slot:item.designation="{ item }">
                              <v-chip
                                :color="getDesignationColor(item.designation)"
                                text-color="white"
                                small
                              >
                                {{ item.designation }}
                              </v-chip>
                            </template>

                            <template v-slot:item.basic_salary="{ item }">
                              <span class="font-weight-bold"
                                >₨{{ item.basic_salary.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.allowances="{ item }">
                              <span class="success--text"
                                >+₨{{ item.allowances.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.deductions="{ item }">
                              <span class="error--text"
                                >-₨{{ item.deductions.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.net_salary="{ item }">
                              <span class="font-weight-bold primary--text"
                                >₨{{ item.net_salary.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.payment_date="{ item }">
                              {{ formatDate(item.payment_date) }}
                            </template>

                            <template v-slot:item.payment_method="{ item }">
                              <v-chip
                                :color="
                                  getPaymentMethodColor(item.payment_method)
                                "
                                text-color="white"
                                small
                              >
                                {{ item.payment_method }}
                              </v-chip>
                            </template>

                            <template v-slot:item.actions="{ item }">
                              <v-btn
                                icon
                                small
                                color="primary"
                                @click="viewSalaryDetails(item)"
                              >
                                <v-icon>mdi-eye</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                small
                                color="warning"
                                @click="editSalary(item)"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                small
                                color="error"
                                @click="deleteSalary(item)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- This Month Tab -->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-data-table
                            :headers="salaryHeaders"
                            :items="thisMonthSalaries"
                            :loading="loading"
                            sort-by="payment_date"
                            sort-desc
                            class="modern-data-table"
                          >
                            <template v-slot:item.employee_name="{ item }">
                              <div class="d-flex align-center">
                                <v-avatar size="32" class="mr-2">
                                  <v-img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                  ></v-img>
                                </v-avatar>
                                <div>
                                  <div class="font-weight-bold">
                                    {{ item.employee_name }}
                                  </div>
                                  <div class="text-caption text-muted">
                                    {{ item.employee_id }}
                                  </div>
                                </div>
                              </div>
                            </template>

                            <template v-slot:item.designation="{ item }">
                              <v-chip
                                :color="getDesignationColor(item.designation)"
                                text-color="white"
                                small
                              >
                                {{ item.designation }}
                              </v-chip>
                            </template>

                            <template v-slot:item.basic_salary="{ item }">
                              <span class="font-weight-bold"
                                >₨{{ item.basic_salary.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.allowances="{ item }">
                              <span class="success--text"
                                >+₨{{ item.allowances.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.deductions="{ item }">
                              <span class="error--text"
                                >-₨{{ item.deductions.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.net_salary="{ item }">
                              <span class="font-weight-bold primary--text"
                                >₨{{ item.net_salary.toLocaleString() }}</span
                              >
                            </template>

                            <template v-slot:item.payment_date="{ item }">
                              {{ formatDate(item.payment_date) }}
                            </template>

                            <template v-slot:item.payment_method="{ item }">
                              <v-chip
                                :color="
                                  getPaymentMethodColor(item.payment_method)
                                "
                                text-color="white"
                                small
                              >
                                {{ item.payment_method }}
                              </v-chip>
                            </template>

                            <template v-slot:item.actions="{ item }">
                              <v-btn
                                icon
                                small
                                color="primary"
                                @click="viewSalaryDetails(item)"
                              >
                                <v-icon>mdi-eye</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                small
                                color="warning"
                                @click="editSalary(item)"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                small
                                color="error"
                                @click="deleteSalary(item)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Salary Summary Tab -->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-card
                                class="summary-card"
                                elevation="0"
                                rounded="xl"
                              >
                                <v-card-title class="summary-card-title"
                                  >Monthly Salaries</v-card-title
                                >
                                <v-card-text>
                                  <div
                                    v-for="(month, index) in monthlySalaries"
                                    :key="index"
                                    class="summary-item"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="summary-label">{{
                                        month.month
                                      }}</span>
                                      <span
                                        class="font-weight-bold primary--text summary-value"
                                      >
                                        ₨{{ formatCurrency(month.amount) }}
                                      </span>
                                    </div>
                                  </div>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-card
                                class="summary-card"
                                elevation="0"
                                rounded="xl"
                              >
                                <v-card-title class="summary-card-title"
                                  >Designation Breakdown</v-card-title
                                >
                                <v-card-text>
                                  <div
                                    v-for="(
                                      designation, index
                                    ) in designationBreakdown"
                                    :key="index"
                                    class="summary-item"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="summary-label">{{
                                        designation.designation
                                      }}</span>
                                      <span
                                        class="font-weight-bold info--text summary-value"
                                      >
                                        ₨{{
                                          formatCurrency(designation.amount)
                                        }}
                                      </span>
                                    </div>
                                  </div>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Add/Edit Salary Dialog -->
    <v-dialog v-model="showSalaryDialog" max-width="900" persistent>
      <v-card class="salary-dialog-card" elevation="0" rounded="xl">
        <div class="salary-dialog-container">
          <!-- Header Section -->
          <div class="salary-dialog-header">
            <!-- Close Button -->
            <v-btn
              icon
              variant="text"
              color="white"
              size="large"
              class="close-dialog-btn"
              @click="showSalaryDialog = false"
            >
              <v-icon size="28">mdi-close</v-icon>
            </v-btn>

            <div class="salary-dialog-icon-container">
              <v-icon size="36" color="white">mdi-currency-usd</v-icon>
            </div>
            <h2 class="salary-dialog-title">
              {{ editingSalary ? "Edit Salary Record" : "Add New Salary" }}
            </h2>
            <p class="salary-dialog-subtitle">
              {{
                editingSalary
                  ? "Update employee salary information"
                  : "Enter employee salary details"
              }}
            </p>
          </div>

          <!-- Content Section -->
          <v-card-text class="salary-dialog-content">
            <v-form ref="salaryForm" v-model="salaryFormValid">
              <!-- Employee Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                  <h3 class="section-title">Employee Information</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="salaryForm.employee_name"
                      label="Employee Name"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-account"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="salaryForm.employee_id"
                      label="Employee ID"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-identifier"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="salaryForm.phone_number"
                      label="Phone Number"
                      :rules="[rules.required, rules.phone]"
                      outlined
                      required
                      prepend-inner-icon="mdi-phone"
                      placeholder="+92 300 1234567"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="salaryForm.designation"
                      :items="designationOptions"
                      label="Designation"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-badge-account"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>

              <!-- Salary Details Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="success" class="mr-2">mdi-cash</v-icon>
                  <h3 class="section-title">Salary Details</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model.number="salaryForm.basic_salary"
                      label="Basic Salary"
                      type="number"
                      :rules="[rules.required, rules.salary]"
                      outlined
                      required
                      prefix="₨"
                      prepend-inner-icon="mdi-currency-usd"
                      class="salary-form-field salary-amount-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model.number="salaryForm.allowances"
                      label="Allowances"
                      type="number"
                      :rules="[rules.nonNegative, rules.salary]"
                      outlined
                      prefix="₨"
                      prepend-inner-icon="mdi-plus-circle"
                      class="salary-form-field salary-amount-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model.number="salaryForm.deductions"
                      label="Deductions"
                      type="number"
                      :rules="[rules.nonNegative, rules.salary]"
                      outlined
                      prefix="₨"
                      prepend-inner-icon="mdi-minus-circle"
                      class="salary-form-field salary-amount-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card class="net-salary-card" elevation="0" rounded="lg">
                      <v-card-text class="net-salary-content">
                        <div class="net-salary-label">
                          <v-icon color="primary" class="mr-2"
                            >mdi-calculator</v-icon
                          >
                          <span>Net Salary</span>
                        </div>
                        <div class="net-salary-amount">
                          ₨{{ formatCurrency(salaryForm.net_salary || 0) }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>

              <!-- Payment Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="info" class="mr-2">mdi-calendar-clock</v-icon>
                  <h3 class="section-title">Payment Information</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="paymentDateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="salaryForm.payment_date"
                          label="Payment Date"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="[rules.required]"
                          outlined
                          required
                          class="salary-form-field"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="salaryForm.payment_date"
                        @input="paymentDateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="salaryForm.payment_method"
                      :items="paymentMethods"
                      label="Payment Method"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-bank"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="salaryForm.month"
                      :items="monthOptions"
                      label="Month"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-calendar-month"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="salaryForm.year"
                      label="Year"
                      type="number"
                      min="2020"
                      max="2030"
                      :rules="[rules.required, rules.year]"
                      outlined
                      required
                      prepend-inner-icon="mdi-calendar"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <!-- Remarks Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="warning" class="mr-2">mdi-note-text</v-icon>
                  <h3 class="section-title">Additional Notes</h3>
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="salaryForm.remarks"
                      label="Remarks (Optional)"
                      outlined
                      rows="2"
                      prepend-inner-icon="mdi-note-text"
                      placeholder="Enter any additional notes or remarks about this salary payment..."
                      class="salary-form-field compact"
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-card-text>

          <!-- Actions Section -->
          <v-card-actions class="salary-dialog-actions">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="showSalaryDialog = false"
              class="cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              @click="submitSalary"
              :loading="salaryLoading"
              :disabled="!salaryFormValid"
              class="save-btn"
              size="large"
            >
              <v-icon left>mdi-content-save</v-icon>
              {{ editingSalary ? "Update Salary" : "Save Salary" }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- Add Teacher Dialog -->
    <v-dialog v-model="showAddTeacherDialog" max-width="800" persistent>
      <v-card class="salary-dialog-card" elevation="0" rounded="xl">
        <div class="salary-dialog-container">
          <!-- Header Section -->
          <div class="salary-dialog-header">
            <!-- Close Button -->
            <v-btn
              icon
              variant="text"
              color="white"
              size="large"
              class="close-dialog-btn"
              @click="showAddTeacherDialog = false"
            >
              <v-icon size="28">mdi-close</v-icon>
            </v-btn>

            <div class="salary-dialog-icon-container">
              <v-icon size="36" color="white">mdi-teach</v-icon>
            </div>
            <h2 class="salary-dialog-title">Add New Teacher</h2>
            <p class="salary-dialog-subtitle">
              Add a new teacher to the school system
            </p>
          </div>

          <!-- Content Section -->
          <v-card-text class="salary-dialog-content">
            <v-form ref="addTeacherForm" v-model="addTeacherFormValid">
              <!-- Personal Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                  <h3 class="section-title">Personal Information</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.name"
                      label="Full Name"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-account"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.cnic"
                      label="CNIC"
                      :rules="[rules.required, rules.cnic]"
                      outlined
                      required
                      prepend-inner-icon="mdi-card-account-details"
                      placeholder="00000-0000000-0"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.phone"
                      label="Phone Number"
                      :rules="[rules.required, rules.phone]"
                      outlined
                      required
                      prepend-inner-icon="mdi-phone"
                      placeholder="+92 300 1234567"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.email"
                      label="Email"
                      :rules="[rules.required, rules.email]"
                      outlined
                      required
                      prepend-inner-icon="mdi-email"
                      type="email"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.address"
                      label="Address"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-map-marker"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.date_of_birth"
                      label="Date of Birth"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      class="salary-form-field"
                      placeholder="Click calendar icon to select date"
                      @click="dateOfBirthMenu = true"
                    >
                      <template v-slot:append>
                        <v-btn
                          icon
                          variant="text"
                          size="small"
                          color="primary"
                          @click="dateOfBirthMenu = true"
                        >
                          <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>

                    <v-dialog v-model="dateOfBirthMenu" max-width="400">
                      <v-card>
                        <v-card-title class="text-h6">
                          Select Date of Birth
                        </v-card-title>
                        <v-card-text>
                          <v-date-picker
                            v-model="addTeacherForm.date_of_birth"
                            @update:model-value="dateOfBirthMenu = false"
                            :max="new Date().toISOString().split('T')[0]"
                            full-width
                          ></v-date-picker>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            @click="dateOfBirthMenu = false"
                          >
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </div>

              <!-- Professional Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="success" class="mr-2">mdi-teach</v-icon>
                  <h3 class="section-title">Professional Information</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="addTeacherForm.subject"
                      :items="teacherSubjectOptions"
                      label="Subject"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-book-open-variant"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="addTeacherForm.grade_level"
                      :items="gradeLevelOptions"
                      label="Grade Level"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-school"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.experience_years"
                      label="Years of Experience"
                      type="number"
                      :rules="[rules.required, rules.nonNegative]"
                      outlined
                      required
                      prepend-inner-icon="mdi-clock-outline"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.qualification"
                      label="Qualification"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-school"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.salary"
                      label="Basic Salary"
                      type="number"
                      :rules="[rules.required, rules.salary]"
                      outlined
                      required
                      prepend-inner-icon="mdi-cash"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="addTeacherForm.status"
                      :items="['Active', 'Inactive']"
                      label="Status"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-account-check"
                      class="salary-form-field"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>

              <!-- Additional Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <v-icon color="info" class="mr-2">mdi-information</v-icon>
                  <h3 class="section-title">Additional Information</h3>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.joining_date"
                      label="Joining Date"
                      :rules="[rules.required]"
                      outlined
                      required
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      class="salary-form-field"
                      placeholder="Click calendar icon to select date"
                      @click="joiningDateMenu = true"
                    >
                      <template v-slot:append>
                        <v-btn
                          icon
                          variant="text"
                          size="small"
                          color="primary"
                          @click="joiningDateMenu = true"
                        >
                          <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>

                    <v-dialog v-model="joiningDateMenu" max-width="400">
                      <v-card>
                        <v-card-title class="text-h6">
                          Select Joining Date
                        </v-card-title>
                        <v-card-text>
                          <v-date-picker
                            v-model="addTeacherForm.joining_date"
                            @update:model-value="joiningDateMenu = false"
                            :max="new Date().toISOString().split('T')[0]"
                            full-width
                          ></v-date-picker>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            @click="joiningDateMenu = false"
                          >
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addTeacherForm.emergency_contact"
                      label="Emergency Contact"
                      :rules="[rules.required, rules.phone]"
                      outlined
                      required
                      prepend-inner-icon="mdi-phone-alert"
                      placeholder="+92 300 1234567"
                      class="salary-form-field"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="addTeacherForm.remarks"
                      label="Remarks"
                      outlined
                      prepend-inner-icon="mdi-note-text"
                      rows="3"
                      class="salary-form-field"
                      placeholder="Any additional notes or comments..."
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-card-text>

          <!-- Actions Section -->
          <v-card-actions class="salary-dialog-actions">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="showAddTeacherDialog = false"
              class="cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              color="success"
              variant="elevated"
              @click="submitAddTeacher"
              :loading="addTeacherLoading"
              :disabled="!addTeacherFormValid"
              class="save-btn"
              size="large"
            >
              <v-icon left>mdi-content-save</v-icon>
              Add Teacher
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- All Teachers Dialog -->
    <v-dialog v-model="showAllTeachersDialog" max-width="1400" persistent>
      <v-card class="salary-dialog-card" elevation="0" rounded="xl">
        <div class="salary-dialog-container">
          <!-- Header Section -->
          <div class="salary-dialog-header">
            <!-- Close Button -->
            <v-btn
              icon
              variant="text"
              color="white"
              size="large"
              class="close-dialog-btn"
              @click="showAllTeachersDialog = false"
            >
              <v-icon size="28">mdi-close</v-icon>
            </v-btn>

            <div class="salary-dialog-icon-container">
              <v-icon size="36" color="white">mdi-account-group</v-icon>
            </div>
            <h2 class="salary-dialog-title">All Teachers</h2>
            <p class="salary-dialog-subtitle">
              View, manage and export teacher records
            </p>
          </div>

          <!-- Content Section -->
          <v-card-text class="salary-dialog-content">
            <!-- Bulk Actions Toolbar -->
            <div v-if="selectedTeachers.length > 0" class="mb-4">
              <v-card class="bulk-actions-card" elevation="2">
                <v-card-text class="py-2">
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="primary" class="mr-2"
                        >mdi-checkbox-multiple-marked</v-icon
                      >
                      <span class="font-weight-medium">
                        {{ selectedTeachers.length }} teacher(s) selected
                      </span>
                    </div>
                    <div class="d-flex">
                      <v-btn
                        small
                        color="success"
                        class="mr-2"
                        @click="exportSelectedTeachers"
                      >
                        <v-icon left small>mdi-download</v-icon>
                        Export Selected
                      </v-btn>
                      <v-btn
                        small
                        color="error"
                        @click="deleteSelectedTeachers"
                      >
                        <v-icon left small>mdi-delete</v-icon>
                        Delete Selected
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>

            <!-- Teachers Data Table -->
            <v-data-table
              v-model="selectedTeachers"
              :headers="teachersHeaders"
              :items="teachers"
              :loading="teachersLoading"
              sort-by="name"
              class="modern-data-table"
              no-data-text="No teachers found"
              no-results-text="No teachers match your search"
              show-select
              item-key="id"
            >
              <template v-slot:item.name="{ item }">
                <div>
                  <div class="font-weight-bold">{{ item.name }}</div>
                  <div class="text-caption text-muted">ID: {{ item.id }}</div>
                </div>
              </template>

              <template v-slot:item.cnic="{ item }">
                <span class="font-weight-medium">{{ item.cnic }}</span>
              </template>

              <template v-slot:item.phone="{ item }">
                <span class="font-weight-medium">{{ item.phone }}</span>
              </template>

              <template v-slot:item.email="{ item }">
                <span class="font-weight-medium">{{ item.email }}</span>
              </template>

              <template v-slot:item.subject="{ item }">
                <v-chip
                  :color="getSubjectColor(item.subject)"
                  text-color="white"
                  small
                >
                  {{ item.subject }}
                </v-chip>
              </template>

              <template v-slot:item.grade_level="{ item }">
                <v-chip
                  :color="getGradeLevelColor(item.grade_level)"
                  text-color="white"
                  small
                >
                  {{ item.grade_level }}
                </v-chip>
              </template>

              <template v-slot:item.experience_years="{ item }">
                <span class="font-weight-bold"
                  >{{ item.experience_years }} years</span
                >
              </template>

              <template v-slot:item.qualification="{ item }">
                <span class="font-weight-medium">{{ item.qualification }}</span>
              </template>

              <template v-slot:item.salary="{ item }">
                <span class="font-weight-bold primary--text">
                  ₨{{ item.salary?.toLocaleString() || "0" }}
                </span>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="item.status === 'Active' ? 'success' : 'error'"
                  text-color="white"
                  small
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.joining_date="{ item }">
                {{ formatDate(item.joining_date) }}
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  small
                  color="primary"
                  @click="viewTeacherDetails(item)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn icon small color="warning" @click="editTeacher(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="error" @click="deleteTeacher(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <!-- Export All Button -->
            <div class="mt-4 text-center">
              <v-btn
                color="success"
                variant="elevated"
                @click="exportAllTeachers"
                :loading="teachersLoading"
                class="mr-2"
              >
                <v-icon left>mdi-download</v-icon>
                Export All Teachers
              </v-btn>
            </div>
          </v-card-text>

          <!-- Actions Section -->
          <v-card-actions class="salary-dialog-actions">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="showAllTeachersDialog = false"
              class="cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- Teacher Details Dialog -->
    <v-dialog v-model="showTeacherDetailsDialog" max-width="600" persistent>
      <v-card class="salary-dialog-card" elevation="0" rounded="xl">
        <div class="salary-dialog-container">
          <!-- Header Section -->
          <div class="salary-dialog-header">
            <!-- Close Button -->
            <v-btn
              icon
              variant="text"
              color="white"
              size="large"
              class="close-dialog-btn"
              @click="showTeacherDetailsDialog = false"
            >
              <v-icon size="28">mdi-close</v-icon>
            </v-btn>

            <div class="salary-dialog-icon-container">
              <v-icon size="36" color="white">mdi-account</v-icon>
            </div>
            <h2 class="salary-dialog-title">Teacher Details</h2>
            <p class="salary-dialog-subtitle">
              Complete information about the teacher
            </p>
          </div>

          <!-- Content Section -->
          <v-card-text
            class="salary-dialog-content"
            v-if="selectedTeacherForDetails"
          >
            <!-- Personal Information Section -->
            <div class="form-section">
              <div class="section-header">
                <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                <h3 class="section-title">Personal Information</h3>
              </div>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Full Name:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.name
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">CNIC:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.cnic
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Phone Number:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.phone
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Email:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.email
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="detail-item">
                    <label class="detail-label">Address:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.address || "Not provided"
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Date of Birth:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.date_of_birth &&
                      selectedTeacherForDetails.date_of_birth !== "Invalid Date"
                        ? formatDate(selectedTeacherForDetails.date_of_birth)
                        : "Not provided"
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Emergency Contact:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.emergency_contact ||
                      "Not provided"
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </div>

            <!-- Professional Information Section -->
            <div class="form-section">
              <div class="section-header">
                <v-icon color="success" class="mr-2">mdi-teach</v-icon>
                <h3 class="section-title">Professional Information</h3>
              </div>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Subject:</label>
                    <v-chip
                      :color="
                        getSubjectColor(selectedTeacherForDetails.subject)
                      "
                      text-color="white"
                      small
                      class="mt-1"
                    >
                      {{ selectedTeacherForDetails.subject }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Grade Level:</label>
                    <v-chip
                      :color="
                        getGradeLevelColor(
                          selectedTeacherForDetails.grade_level
                        )
                      "
                      text-color="white"
                      small
                      class="mt-1"
                    >
                      {{ selectedTeacherForDetails.grade_level }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Years of Experience:</label>
                    <span class="detail-value"
                      >{{
                        selectedTeacherForDetails.experience_years || "0"
                      }}
                      years</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Qualification:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.qualification
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Basic Salary:</label>
                    <span class="detail-value primary--text font-weight-bold">
                      ₨{{
                        selectedTeacherForDetails.salary
                          ? selectedTeacherForDetails.salary.toLocaleString()
                          : "0"
                      }}
                    </span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Status:</label>
                    <v-chip
                      :color="
                        selectedTeacherForDetails.status === 'Active'
                          ? 'success'
                          : 'error'
                      "
                      text-color="white"
                      small
                      class="mt-1"
                    >
                      {{ selectedTeacherForDetails.status }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="detail-item">
                    <label class="detail-label">Joining Date:</label>
                    <span class="detail-value">{{
                      formatDate(selectedTeacherForDetails.joining_date)
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="detail-item">
                    <label class="detail-label">Remarks:</label>
                    <span class="detail-value">{{
                      selectedTeacherForDetails.remarks
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <!-- Actions Section -->
          <v-card-actions class="salary-dialog-actions">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="showTeacherDetailsDialog = false"
              class="cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- Enhanced Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500" persistent>
      <v-card class="success-dialog-card" elevation="0" rounded="xl">
        <!-- Header Section -->
        <div class="success-dialog-header">
          <div class="success-icon-container">
            <v-icon size="32" color="white">mdi-check-circle</v-icon>
          </div>
          <h2 class="success-dialog-title">Success!</h2>
        </div>

        <!-- Content Section -->
        <v-card-text class="success-dialog-content">
          <div class="success-message">
            <p class="success-text">{{ successMessage }}</p>
            <div class="success-icon-large">
              <v-icon size="48" color="success">mdi-check-circle</v-icon>
            </div>
          </div>
        </v-card-text>

        <!-- Actions Section -->
        <v-card-actions class="success-dialog-actions">
          <v-btn
            color="success"
            variant="elevated"
            @click="successDialog = false"
            class="ok-btn"
            size="large"
          >
            <v-icon left>mdi-check</v-icon>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Enhanced Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500" persistent>
      <v-card class="delete-dialog-card" elevation="0" rounded="xl">
        <!-- Header Section -->
        <div class="delete-dialog-header">
          <div class="delete-icon-container">
            <v-icon size="32" color="white">mdi-delete</v-icon>
          </div>
          <h2 class="delete-dialog-title">Confirm Delete</h2>
        </div>

        <!-- Content Section -->
        <v-card-text class="delete-dialog-content">
          <div class="delete-message">
            <p class="delete-text">
              Are you sure you want to delete the salary record for
              <span class="employee-name">{{
                selectedSalary?.employee_name
              }}</span
              >?
            </p>
            <p class="delete-warning">
              This action cannot be undone and will permanently remove the
              salary record from the system.
            </p>
          </div>
        </v-card-text>

        <!-- Actions Section -->
        <v-card-actions class="delete-dialog-actions">
          <v-btn
            variant="outlined"
            color="grey-darken-2"
            @click="deleteDialog = false"
            class="cancel-btn"
            size="large"
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="confirmDelete"
            :loading="deleteLoading"
            class="delete-btn"
            size="large"
          >
            <v-icon left>mdi-delete</v-icon>
            Delete Record
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SalaryManagement",
  data() {
    return {
      loading: false,
      salaryLoading: false,
      addTeacherLoading: false,
      teachersLoading: false,
      deleteLoading: false,
      showSalaryDialog: false,
      showAddTeacherDialog: false,
      showAllTeachersDialog: false,
      showTeacherDetailsDialog: false,
      successDialog: false,
      deleteDialog: false,

      paymentDateMenu: false,
      dateOfBirthMenu: false,
      joiningDateMenu: false,
      searchQuery: "",
      selectedMonth: null,
      selectedYear: null,
      editingSalary: null,
      selectedSalary: null,
      successMessage: "",
      salaries: [],
      salaryFormValid: false,
      addTeacherFormValid: false,
      activeTab: 0,
      showSearchDialog: false,
      teachers: [],
      selectedTeachers: [],
      selectedTeacherForDetails: null,
      thisMonthSalaries: [],
      monthlySalaries: [],
      designationBreakdown: [],
      salaryForm: {
        employee_name: "",
        employee_id: "",
        phone_number: "",
        designation: "",
        basic_salary: "",
        allowances: 0,
        deductions: 0,
        net_salary: "",
        payment_date: "",
        payment_method: "Bank Transfer",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
      },
      addTeacherForm: {
        name: "",
        cnic: "",
        phone: "",
        email: "",
        address: "",
        date_of_birth: "",
        subject: "",
        grade_level: "",
        experience_years: "",
        qualification: "",
        salary: "",
        status: "Active",
        joining_date: "",
        emergency_contact: "",
        remarks: "",
      },
      selectedSalaries: [],
      teachersHeaders: [
        {
          text: "Select",
          value: "data-table-select",
          sortable: false,
          width: "50px",
        },
        { text: "Name", value: "name", sortable: true },
        { text: "CNIC", value: "cnic", sortable: true },
        { text: "Phone", value: "phone", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Subject", value: "subject", sortable: true },
        { text: "Grade Level", value: "grade_level", sortable: true },
        { text: "Experience", value: "experience_years", sortable: true },
        { text: "Qualification", value: "qualification", sortable: true },
        { text: "Salary", value: "salary", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Joining Date", value: "joining_date", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      salaryHeaders: [
        {
          text: "Select",
          value: "data-table-select",
          sortable: false,
          width: "50px",
        },
        { text: "Employee", value: "employee_name", sortable: true },
        { text: "Employee ID", value: "employee_id", sortable: true },
        { text: "Phone", value: "phone_number", sortable: true },
        { text: "Designation", value: "designation", sortable: true },
        { text: "Basic Salary", value: "basic_salary", sortable: true },
        { text: "Allowances", value: "allowances", sortable: true },
        { text: "Deductions", value: "deductions", sortable: true },
        { text: "Net Salary", value: "net_salary", sortable: true },
        { text: "Payment Date", value: "payment_date", sortable: true },
        { text: "Payment Method", value: "payment_method", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      designationOptions: [
        "Teacher",
        "Principal",
        "Vice Principal",
        "Administrator",
        "Accountant",
        "Clerk",
        "Security Guard",
        "Cleaner",
        "Driver",
        "Other",
      ],
      teacherSubjectOptions: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Urdu",
        "Islamiat",
        "Pakistan Studies",
        "Computer Science",
        "Economics",
        "Accounting",
        "Business Studies",
        "Geography",
        "History",
        "Literature",
        "Art",
        "Music",
        "Physical Education",
        "Other",
      ],
      gradeLevelOptions: [
        "Pre-Primary",
        "Primary (1-5)",
        "Middle (6-8)",
        "Secondary (9-10)",
        "Higher Secondary (11-12)",
        "O-Level",
        "A-Level",
        "Other",
      ],
      paymentMethods: ["Cash", "Bank Transfer", "Cheque"],
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
      salaryStats: {
        totalEmployees: 0,
        thisMonth: 0,
        totalPaid: 0,
        avgSalary: 0,
      },
      rules: {
        required: (v) => !!v || "This field is required",
        positive: (v) => v > 0 || "Value must be positive",
        nonNegative: (v) => v >= 0 || "Value must be non-negative",
        salary: (v) => {
          if (!v) return true;
          const amount = parseFloat(v);
          if (isNaN(amount)) return "Please enter a valid number";
          if (amount <= 0) return "Salary must be greater than 0";
          if (amount > 999999999999.99)
            return "Salary cannot exceed 999,999,999,999.99";
          return true;
        },
        year: (v) =>
          (v >= 2020 && v <= 2030) || "Year must be between 2020-2030",
        phone: (v) => {
          if (!v) return true;
          const phoneRegex = /^(\+92|0)?[0-9]{10,11}$/;
          return (
            phoneRegex.test(v.replace(/\s/g, "")) ||
            "Please enter a valid phone number"
          );
        },
        cnic: (v) => {
          if (!v) return true;
          const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
          return (
            cnicRegex.test(v) ||
            "Please enter a valid CNIC (format: 00000-0000000-0)"
          );
        },
        email: (v) => {
          if (!v) return true;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v) || "Please enter a valid email address";
        },
      },
    };
  },
  computed: {
    filteredSalaries() {
      let filtered = this.salaries;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (salary) =>
            salary.employee_name.toLowerCase().includes(query) ||
            salary.employee_id.toLowerCase().includes(query) ||
            (salary.phone_number &&
              salary.phone_number.toLowerCase().includes(query))
        );
      }

      if (this.selectedMonth) {
        filtered = filtered.filter(
          (salary) => salary.month === this.selectedMonth
        );
      }

      if (this.selectedYear) {
        filtered = filtered.filter(
          (salary) => salary.year === this.selectedYear
        );
      }

      return filtered;
    },
  },
  watch: {
    "salaryForm.basic_salary": "calculateNetSalary",
    "salaryForm.allowances": "calculateNetSalary",
    "salaryForm.deductions": "calculateNetSalary",
  },
  mounted() {
    console.log("SalaryManagement component mounted");
    this.initializeData();
  },
  watch: {
    showAllTeachersDialog(newVal) {
      if (newVal) {
        this.loadTeachers();
      }
    },
  },
  methods: {
    async initializeData() {
      console.log("🔧 Initializing data...");
      // Load teachers first, then salaries, then calculate stats
      await this.loadTeachers();
      await this.loadSalaries();

      // Set initial employee count
      this.updateEmployeeCount();
    },

    async loadSalaries() {
      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        const response = await axios.get("http://localhost:8081/api/salaries", {
          headers: headers,
        });

        console.log("Salaries loaded successfully:", response.data);
        this.salaries = response.data;
        console.log("Total salaries loaded:", this.salaries.length);
        console.log("Sample salary data:", this.salaries[0]);
        this.calculateSalaryStats();
      } catch (error) {
        console.error("Error loading salaries:", error);
        // Show user-friendly error message
        this.showErrorMessage("Failed to load salary data. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    calculateSalaryStats() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      // Parse numeric values properly
      const totalPaid = this.salaries.reduce((sum, s) => {
        const netSalary = parseFloat(s.net_salary) || 0;
        return sum + netSalary;
      }, 0);

      const thisMonthTotal = this.salaries
        .filter((s) => s.month === currentMonth && s.year === currentYear)
        .reduce((sum, s) => {
          const netSalary = parseFloat(s.net_salary) || 0;
          return sum + netSalary;
        }, 0);

      const avgSalary =
        this.salaries.length > 0 ? totalPaid / this.salaries.length : 0;

      // Update only salary-related stats, keep existing employee count
      this.salaryStats = {
        ...this.salaryStats, // Keep existing stats
        thisMonth: thisMonthTotal,
        totalPaid: totalPaid,
        avgSalary: avgSalary,
      };

      console.log("Salary Stats Calculated:", {
        totalEmployees: this.salaryStats.totalEmployees,
        thisMonth: this.salaryStats.thisMonth,
        totalPaid: this.salaryStats.totalPaid,
        avgSalary: this.salaryStats.avgSalary,
        teachersCount: this.teachers ? this.teachers.length : 0,
      });

      this.calculateMonthlyData();
      this.calculateThisMonthSalaries();
    },

    updateEmployeeCount() {
      // Update only the employee count based on teachers
      const totalEmployees = this.teachers ? this.teachers.length : 0;

      this.salaryStats = {
        ...this.salaryStats, // Keep existing salary stats
        totalEmployees: totalEmployees,
      };

      console.log("Employee Count Updated:", {
        totalEmployees: this.salaryStats.totalEmployees,
        teachersCount: this.teachers ? this.teachers.length : 0,
      });
    },

    async addSalaryToExpenses(salaryData) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        // Create expense data from salary data
        const expenseData = {
          category: "Salary",
          amount: salaryData.net_salary,
          date: salaryData.payment_date,
          description: `Salary payment for ${salaryData.employee_name} (${salaryData.designation}) - ${salaryData.payment_method}`,
          payment_method: salaryData.payment_method,
        };

        console.log("🔧 Adding salary to expenses:", expenseData);

        const response = await axios.post(
          "http://localhost:8081/api/expenses",
          expenseData,
          {
            headers: headers,
          }
        );

        console.log("✅ Salary added to expenses successfully:", response.data);
      } catch (error) {
        console.error("❌ Error adding salary to expenses:", error);
        // Don't show error to user as salary was already added successfully
        console.error("❌ Expense error details:", error.response?.data);
      }
    },

    calculateMonthlyData() {
      // Calculate monthly salaries
      const salaryByMonth = {};
      this.salaries.forEach((salary) => {
        const date = new Date(salary.payment_date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        if (!salaryByMonth[monthKey]) {
          salaryByMonth[monthKey] = 0;
        }
        const netSalary = parseFloat(salary.net_salary) || 0;
        salaryByMonth[monthKey] += netSalary;
      });

      this.monthlySalaries = Object.entries(salaryByMonth)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => b.month.localeCompare(a.month));

      // Calculate designation breakdown
      const designationByAmount = {};
      this.salaries.forEach((salary) => {
        if (!designationByAmount[salary.designation]) {
          designationByAmount[salary.designation] = 0;
        }
        const netSalary = parseFloat(salary.net_salary) || 0;
        designationByAmount[salary.designation] += netSalary;
      });

      this.designationBreakdown = Object.entries(designationByAmount)
        .map(([designation, amount]) => ({ designation, amount }))
        .sort((a, b) => b.amount - a.amount);
    },

    calculateThisMonthSalaries() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      this.thisMonthSalaries = this.salaries.filter(
        (s) => s.month === currentMonth && s.year === currentYear
      );
    },

    calculateNetSalary() {
      const basic = parseFloat(this.salaryForm.basic_salary) || 0;
      const allowances = parseFloat(this.salaryForm.allowances) || 0;
      const deductions = parseFloat(this.salaryForm.deductions) || 0;

      this.salaryForm.net_salary = (basic + allowances - deductions).toFixed(2);
    },

    calculateNetSalaryValue() {
      const basic = parseFloat(this.salaryForm.basic_salary) || 0;
      const allowances = parseFloat(this.salaryForm.allowances) || 0;
      const deductions = parseFloat(this.salaryForm.deductions) || 0;

      return basic + allowances - deductions;
    },

    showErrorMessage(message) {
      // You can implement a toast notification or alert here
      console.error("Error:", message);
      // For now, we'll use a simple alert, but you can replace this with a proper notification system
      alert(message);
    },

    async searchSalaries() {
      if (!this.searchQuery.trim()) {
        await this.loadSalaries();
        return;
      }

      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        const response = await axios.get(
          `http://localhost:8081/api/salaries/search?query=${this.searchQuery}`,
          {
            headers: headers,
          }
        );
        this.salaries = response.data;
      } catch (error) {
        console.error("Error searching salaries:", error);
      } finally {
        this.loading = false;
      }
    },

    filterSalaries() {
      // Filtering is handled by computed property
    },

    getDesignationColor(designation) {
      const colors = {
        Teacher: "blue",
        Principal: "purple",
        "Vice Principal": "indigo",
        Administrator: "teal",
        Accountant: "green",
        Clerk: "orange",
        "Security Guard": "red",
        Cleaner: "grey",
        Driver: "brown",
        Other: "grey",
      };
      return colors[designation] || "grey";
    },

    getPaymentMethodColor(method) {
      const colors = {
        Cash: "green",
        "Bank Transfer": "blue",
        Cheque: "orange",
      };
      return colors[method] || "grey";
    },

    viewSalaryDetails(salary) {
      // Implement salary details view
      console.log("View salary details:", salary);
    },

    editSalary(salary) {
      this.editingSalary = salary;
      // Format the date properly for the date picker and ensure proper data types
      const formattedSalary = {
        ...salary,
        basic_salary: parseFloat(salary.basic_salary) || 0,
        allowances: parseFloat(salary.allowances) || 0,
        deductions: parseFloat(salary.deductions) || 0,
        net_salary: parseFloat(salary.net_salary) || 0,
        payment_date: salary.payment_date
          ? new Date(salary.payment_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      };
      this.salaryForm = formattedSalary;
      console.log("🔧 Editing salary:", {
        original: salary,
        formatted: formattedSalary,
      });
      this.showSalaryDialog = true;
    },

    deleteSalary(salary) {
      this.selectedSalary = salary;
      this.deleteDialog = true;
    },

    async confirmDelete() {
      this.deleteLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        await axios.delete(
          `http://localhost:8081/api/salaries/${this.selectedSalary.id}`,
          {
            headers: headers,
          }
        );

        this.successMessage = "Salary record deleted successfully!";
        this.successDialog = true;
        this.deleteDialog = false;
        await this.loadSalaries();
      } catch (error) {
        console.error("Error deleting salary:", error);
        this.showErrorMessage(
          "Failed to delete salary record. Please try again."
        );
      } finally {
        this.deleteLoading = false;
      }
    },

    resetSalaryForm() {
      this.salaryForm = {
        employee_name: "",
        employee_id: "",
        phone_number: "",
        designation: "",
        basic_salary: "",
        allowances: 0,
        deductions: 0,
        net_salary: "",
        payment_date: new Date().toISOString().split("T")[0],
        payment_method: "Bank Transfer",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        remarks: "",
      };
      this.editingSalary = null;
    },

    async submitSalary() {
      console.log("🔧 Attempting to submit salary form...");
      console.log(
        "🔧 Form validation result:",
        this.$refs.salaryForm.validate()
      );
      console.log("🔧 Current form data:", this.salaryForm);

      if (!this.$refs.salaryForm.validate()) {
        console.log("❌ Form validation failed");
        return;
      }

      // Additional validation for required fields
      const requiredFields = [
        "employee_name",
        "employee_id",
        "designation",
        "basic_salary",
        "payment_date",
        "payment_method",
        "month",
        "year",
      ];

      const missingFields = requiredFields.filter((field) => {
        const value = this.salaryForm[field];
        return !value || (typeof value === "string" && value.trim() === "");
      });

      if (missingFields.length > 0) {
        console.error("❌ Missing required fields:", missingFields);
        this.showErrorMessage(
          `Missing required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      // Ensure net_salary is calculated
      this.calculateNetSalary();

      this.salaryLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        // Format the date properly for the database and ensure proper data types
        const salaryData = {
          ...this.salaryForm,
          basic_salary: parseFloat(this.salaryForm.basic_salary) || 0,
          allowances: parseFloat(this.salaryForm.allowances) || 0,
          deductions: parseFloat(this.salaryForm.deductions) || 0,
          net_salary:
            parseFloat(this.salaryForm.net_salary) ||
            this.calculateNetSalaryValue(),
          payment_date: this.salaryForm.payment_date
            ? new Date(this.salaryForm.payment_date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          month: parseInt(this.salaryForm.month) || new Date().getMonth() + 1,
          year: parseInt(this.salaryForm.year) || new Date().getFullYear(),
        };

        console.log("🔧 Submitting salary data:", {
          editingSalary: this.editingSalary,
          originalForm: this.salaryForm,
          formattedData: salaryData,
          headers: headers,
        });

        // Log each field individually to debug the 400 error
        console.log("🔧 Field validation:", {
          employee_name: salaryData.employee_name,
          employee_id: salaryData.employee_id,
          phone_number: salaryData.phone_number,
          designation: salaryData.designation,
          basic_salary: salaryData.basic_salary,
          allowances: salaryData.allowances,
          deductions: salaryData.deductions,
          net_salary: salaryData.net_salary,
          payment_date: salaryData.payment_date,
          payment_method: salaryData.payment_method,
          month: salaryData.month,
          year: salaryData.year,
          remarks: salaryData.remarks,
        });

        // Check if net_salary is calculated properly
        console.log("🔧 Net salary calculation check:", {
          basic_salary: this.salaryForm.basic_salary,
          allowances: this.salaryForm.allowances,
          deductions: this.salaryForm.deductions,
          calculated_net: this.salaryForm.net_salary,
          final_net: salaryData.net_salary,
        });

        if (this.editingSalary) {
          // Update existing salary
          console.log("🔧 Updating salary with ID:", this.editingSalary.id);
          const response = await axios.put(
            `http://localhost:8081/api/salaries/${this.editingSalary.id}`,
            salaryData,
            {
              headers: headers,
            }
          );
          console.log("✅ Update response:", response.data);
          this.successMessage = "Salary record updated successfully!";
        } else {
          // Add new salary
          console.log("🔧 Adding new salary");
          const response = await axios.post(
            "http://localhost:8081/api/salaries",
            salaryData,
            {
              headers: headers,
            }
          );
          console.log("✅ Add response:", response.data);
          this.successMessage =
            "Salary record added successfully! Expense record also created.";
        }

        this.successDialog = true;
        this.showSalaryDialog = false;
        this.resetSalaryForm();
        await this.loadSalaries();
        this.calculateSalaryStats();

        // Also add to expenses
        await this.addSalaryToExpenses(salaryData);
      } catch (error) {
        console.error("❌ Error submitting salary:", error);
        console.error("❌ Error details:", error.response?.data);
        this.showErrorMessage(
          "Failed to save salary record. Please try again."
        );
      } finally {
        this.salaryLoading = false;
      }
    },

    async submitAddTeacher() {
      console.log("🔧 Attempting to submit add teacher form...");
      console.log(
        "🔧 Form validation result:",
        this.$refs.addTeacherForm.validate()
      );
      console.log("🔧 Current add teacher form data:", this.addTeacherForm);

      if (!this.$refs.addTeacherForm.validate()) {
        console.log("❌ Add teacher form validation failed");
        return;
      }

      this.addTeacherLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        // Format the date properly for the database
        const teacherData = {
          ...this.addTeacherForm,
          salary: parseFloat(this.addTeacherForm.salary) || 0,
          experience_years:
            parseFloat(this.addTeacherForm.experience_years) || 0,
          date_of_birth: this.addTeacherForm.date_of_birth
            ? new Date(this.addTeacherForm.date_of_birth)
                .toISOString()
                .split("T")[0]
            : new Date().toISOString().split("T")[0],
          joining_date: this.addTeacherForm.joining_date
            ? new Date(this.addTeacherForm.joining_date)
                .toISOString()
                .split("T")[0]
            : new Date().toISOString().split("T")[0],
        };

        console.log("🔧 Submitting teacher data:", {
          addTeacherForm: this.addTeacherForm,
          formattedData: teacherData,
          headers: headers,
        });

        // Add new teacher
        console.log("🔧 Adding new teacher");
        const response = await axios.post(
          "http://localhost:8081/api/teachers",
          teacherData,
          {
            headers: headers,
          }
        );
        console.log("✅ Add teacher response:", response.data);
        this.successMessage = `Teacher ${this.addTeacherForm.name} has been added successfully!`;

        this.successDialog = true;
        this.showAddTeacherDialog = false;
        this.resetAddTeacherForm();

        // Reload teachers and update only employee count
        await this.loadTeachers();
        this.updateEmployeeCount();
      } catch (error) {
        console.error("❌ Error adding teacher:", error);
        console.error("❌ Error details:", error.response?.data);
        this.showErrorMessage("Failed to add teacher. Please try again.");
      } finally {
        this.addTeacherLoading = false;
      }
    },

    resetAddTeacherForm() {
      this.addTeacherForm = {
        name: "",
        cnic: "",
        phone: "",
        email: "",
        address: "",
        date_of_birth: "",
        subject: "",
        grade_level: "",
        experience_years: "",
        qualification: "",
        salary: "",
        status: "Active",
        joining_date: "",
        emergency_contact: "",
        remarks: "",
      };
      this.$refs.addTeacherForm?.resetValidation();
    },

    // Teachers Management Methods
    async loadTeachers() {
      this.teachersLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        const response = await axios.get("http://localhost:8081/api/teachers", {
          headers: headers,
        });

        console.log("Teachers loaded successfully:", response.data);
        console.log("First teacher data:", response.data[0]);
        this.teachers = response.data;
      } catch (error) {
        console.error("Error loading teachers:", error);
        this.showErrorMessage("Failed to load teachers. Please try again.");
      } finally {
        this.teachersLoading = false;
      }
    },

    getSubjectColor(subject) {
      const colors = {
        Mathematics: "blue",
        Physics: "purple",
        Chemistry: "green",
        Biology: "teal",
        English: "orange",
        Urdu: "brown",
        Islamiat: "indigo",
        "Pakistan Studies": "red",
        "Computer Science": "cyan",
        Economics: "pink",
        Accounting: "amber",
        "Business Studies": "lime",
        Geography: "deep-purple",
        History: "deep-orange",
        Literature: "light-blue",
        Art: "light-green",
        Music: "yellow",
        "Physical Education": "grey",
        Other: "blue-grey",
      };
      return colors[subject] || "blue";
    },

    getGradeLevelColor(gradeLevel) {
      const colors = {
        "Pre-Primary": "pink",
        "Primary (1-5)": "light-blue",
        "Middle (6-8)": "green",
        "Secondary (9-10)": "orange",
        "Higher Secondary (11-12)": "purple",
        "O-Level": "teal",
        "A-Level": "indigo",
        Other: "grey",
      };
      return colors[gradeLevel] || "blue";
    },

    exportSelectedTeachers() {
      if (this.selectedTeachers.length === 0) {
        this.showErrorMessage("Please select teachers to export.");
        return;
      }

      const csvContent = this.generateTeachersCSV(this.selectedTeachers);
      this.downloadCSV(
        csvContent,
        `selected_teachers_${new Date().toISOString().split("T")[0]}.csv`
      );
    },

    exportAllTeachers() {
      if (this.teachers.length === 0) {
        this.showErrorMessage("No teachers to export.");
        return;
      }

      const csvContent = this.generateTeachersCSV(this.teachers);
      this.downloadCSV(
        csvContent,
        `all_teachers_${new Date().toISOString().split("T")[0]}.csv`
      );
    },

    generateTeachersCSV(teachers) {
      const headers = [
        "Name",
        "CNIC",
        "Phone",
        "Email",
        "Address",
        "Date of Birth",
        "Subject",
        "Grade Level",
        "Experience Years",
        "Qualification",
        "Salary",
        "Status",
        "Joining Date",
        "Emergency Contact",
        "Remarks",
      ];

      const csvRows = [headers.join(",")];

      teachers.forEach((teacher) => {
        const row = [
          `"${teacher.name || ""}"`,
          `"${teacher.cnic || ""}"`,
          `"${teacher.phone || ""}"`,
          `"${teacher.email || ""}"`,
          `"${teacher.address || ""}"`,
          `"${teacher.date_of_birth || ""}"`,
          `"${teacher.subject || ""}"`,
          `"${teacher.grade_level || ""}"`,
          `"${teacher.experience_years || ""}"`,
          `"${teacher.qualification || ""}"`,
          `"${teacher.salary || ""}"`,
          `"${teacher.status || ""}"`,
          `"${teacher.joining_date || ""}"`,
          `"${teacher.emergency_contact || ""}"`,
          `"${teacher.remarks || ""}"`,
        ];
        csvRows.push(row.join(","));
      });

      return csvRows.join("\n");
    },

    downloadCSV(csvContent, filename) {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async deleteSelectedTeachers() {
      if (this.selectedTeachers.length === 0) {
        this.showErrorMessage("Please select teachers to delete.");
        return;
      }

      const confirmed = confirm(
        `Are you sure you want to delete ${this.selectedTeachers.length} selected teacher(s)?`
      );
      if (!confirmed) return;

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        const deletePromises = this.selectedTeachers.map((teacher) =>
          axios.delete(`http://localhost:8081/api/teachers/${teacher.id}`, {
            headers,
          })
        );

        await Promise.all(deletePromises);

        this.successMessage = `${this.selectedTeachers.length} teacher(s) deleted successfully!`;
        this.successDialog = true;
        this.selectedTeachers = [];
        await this.loadTeachers();
      } catch (error) {
        console.error("Error deleting teachers:", error);
        this.showErrorMessage(
          "Failed to delete selected teachers. Please try again."
        );
      }
    },

    async deleteTeacher(teacher) {
      const confirmed = confirm(
        `Are you sure you want to delete teacher "${teacher.name}"?`
      );
      if (!confirmed) return;

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const headers = user && user.token ? { Authorization: user.token } : {};

        await axios.delete(`http://localhost:8081/api/teachers/${teacher.id}`, {
          headers,
        });

        this.successMessage = `Teacher "${teacher.name}" deleted successfully!`;
        this.successDialog = true;
        await this.loadTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
        this.showErrorMessage("Failed to delete teacher. Please try again.");
      }
    },

    viewTeacherDetails(teacher) {
      console.log("=== TEACHER DATA INSPECTION ===");
      console.log("Full teacher object:", JSON.stringify(teacher, null, 2));
      console.log("Teacher name:", teacher.name);
      console.log("Teacher cnic:", teacher.cnic);
      console.log("Teacher phone:", teacher.phone);
      console.log("Teacher email:", teacher.email);
      console.log("Teacher address:", teacher.address);
      console.log("Teacher date_of_birth:", teacher.date_of_birth);
      console.log("Teacher emergency_contact:", teacher.emergency_contact);
      console.log("Teacher subject:", teacher.subject);
      console.log("Teacher grade_level:", teacher.grade_level);
      console.log("Teacher experience_years:", teacher.experience_years);
      console.log("Teacher qualification:", teacher.qualification);
      console.log("Teacher salary:", teacher.salary);
      console.log("Teacher status:", teacher.status);
      console.log("Teacher joining_date:", teacher.joining_date);
      console.log("=== END INSPECTION ===");

      // Create a normalized teacher object with fallback field names
      const normalizedTeacher = {
        ...teacher,
        address: teacher.address || teacher.teacher_address || "Not provided",
        date_of_birth:
          teacher.date_of_birth ||
          teacher.birth_date ||
          teacher.dob ||
          "Not provided",
        emergency_contact:
          teacher.emergency_contact ||
          teacher.emergency_phone ||
          teacher.emergency ||
          "Not provided",
        experience_years:
          teacher.experience_years ||
          teacher.experience ||
          teacher.years_of_experience ||
          "0",
        grade_level:
          teacher.grade_level ||
          teacher.grade ||
          teacher.class_level ||
          "Not provided",
      };

      this.selectedTeacherForDetails = normalizedTeacher;
      this.showTeacherDetailsDialog = true;
    },

    editTeacher(teacher) {
      // For now, just show a message
      alert(
        `Edit functionality for teacher "${teacher.name}" will be implemented soon.`
      );
    },

    formatDate(date) {
      if (
        !date ||
        date === "Invalid Date" ||
        date === "null" ||
        date === "undefined"
      ) {
        return "Not provided";
      }
      try {
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate === "Invalid Date"
          ? "Not provided"
          : formattedDate;
      } catch (error) {
        return "Not provided";
      }
    },

    formatCurrency(amount) {
      if (isNaN(amount) || amount === null || amount === undefined) {
        return "0";
      }
      return parseFloat(amount).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    // Bulk Actions Methods
    bulkEditSalaries() {
      if (this.selectedSalaries.length === 1) {
        this.editSalary(this.selectedSalaries[0]);
        this.selectedSalaries = [];
      }
    },

    async bulkDeleteSalaries() {
      if (this.selectedSalaries.length === 0) {
        this.showErrorMessage(
          "Please select at least one salary record to delete."
        );
        return;
      }

      const confirmMessage = `Are you sure you want to delete ${this.selectedSalaries.length} salary record(s)? This action cannot be undone.`;

      if (confirm(confirmMessage)) {
        this.loading = true;
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const headers =
            user && user.token ? { Authorization: user.token } : {};

          // Delete each selected salary
          for (const salary of this.selectedSalaries) {
            await axios.delete(
              `http://localhost:8081/api/salaries/${salary.id}`,
              { headers: headers }
            );
          }

          this.successMessage = `Successfully deleted ${this.selectedSalaries.length} salary record(s).`;
          this.successDialog = true;
          this.selectedSalaries = [];
          await this.loadSalaries();
        } catch (error) {
          console.error("Error deleting salaries:", error);
          this.showErrorMessage(
            "Failed to delete selected salary records. Please try again."
          );
        } finally {
          this.loading = false;
        }
      }
    },

    clearSelection() {
      this.selectedSalaries = [];
    },
  },
};
</script>

<style scoped>
/* Modern Salary Page Styles */
.modern-salary-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Header Section */
.page-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  position: relative;
  overflow: hidden;
  padding: 40px 0;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
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
}

.logo-image {
  border-radius: 50%;
}

.header-chip {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Content Container */
.content-container {
  background: #f8fafc;
  min-height: calc(100vh - 300px);
  padding: 40px 0;
}

/* Enterprise Section Header */
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

.statistics-section-with-border {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 5px solid rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.statistics-section-with-border:hover {
  border-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* Bulk Actions Styling */
.bulk-actions-card {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.bulk-actions-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
}

.kpi-header-avatar {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

/* Enterprise Stat Cards */
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

.stat-card__icon-container.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.stat-card__icon-container.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-card__icon-container.orange {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.stat-card__icon-container.purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
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

.sub-label {
  font-weight: 600;
  color: #64748b;
}

.sub-value {
  font-weight: 700;
  color: #1e293b;
}

/* Glass Morphism Quick Actions Section */
.glass-action-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(25px) !important;
  border: 3px solid rgba(0, 0, 0, 0.6) !important;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px;
  height: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.glass-action-card:hover::before {
  opacity: 1;
}

.glass-action-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3),
    0 8px 20px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.8) !important;
  border-width: 4px !important;
  background: rgba(255, 255, 255, 0.35) !important;
}

.glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.1) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    rgba(96, 165, 250, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.glass-action-card:hover .glass-overlay {
  opacity: 1;
}

.glass-icon-avatar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 3px solid rgba(0, 0, 0, 0.6);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 3px 12px rgba(0, 0, 0, 0.2),
    0 1px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-icon-avatar:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.25),
    0 3px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.8) !important;
  border-width: 4px !important;
}

/* Teacher Details Dialog Styles */
.detail-item {
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(248, 250, 252, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.detail-label {
  display: block;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  display: block;
  font-weight: 500;
  color: #1f2937;
  font-size: 1rem;
  line-height: 1.5;
}

.glass-text {
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.elegant-card-title {
  font-family: "Inter", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Modern Tabs */
.modern-tabs-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.modern-tabs {
  background: transparent;
}

.modern-tab {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.9rem;
}

/* Modern Data Table */
.modern-data-table {
  background: transparent;
}

.modern-data-table >>> .v-data-table__wrapper {
  overflow-x: auto;
}

.modern-data-table >>> .v-data-table__mobile-table {
  display: none;
}

/* Summary Cards */
.summary-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.15);
}

.summary-card-title {
  font-weight: 600;
  color: #1e293b;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 12px;
}

.summary-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 500;
  color: #64748b;
}

.summary-value {
  font-weight: 600;
}

/* Modern Dialog Cards */
.modern-dialog-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modern-dialog-title {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 16px;
}

.modern-form-field {
  margin-bottom: 16px;
}

.modern-form-field >>> .v-input__slot {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modern-form-field >>> .v-input__slot:hover {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.modern-form-field >>> .v-input__slot:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modern-dialog-actions {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
}

.modern-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modern-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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

/* Animation Keyframes */
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

/* Responsive Design */
@media (max-width: 768px) {
  .modern-data-table >>> .v-data-table__mobile-table {
    display: block;
  }

  .modern-data-table >>> .v-data-table__wrapper {
    display: none;
  }

  .enterprise-stat-card {
    margin-bottom: 16px;
  }

  .glass-action-card {
    margin-bottom: 16px;
  }
}

/* Enhanced Delete Dialog Styles */
.delete-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  position: relative;
}

.delete-dialog-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #dc3545 0%, #e74c3c 50%, #c0392b 100%);
}

.delete-dialog-header {
  background: linear-gradient(135deg, #dc3545 0%, #e74c3c 50%, #c0392b 100%);
  padding: 24px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.delete-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.delete-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.delete-dialog-title {
  color: white;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-dialog-content {
  padding: 32px;
  background: white;
}

.delete-message {
  text-align: center;
}

.delete-text {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 16px;
  line-height: 1.6;
}

.employee-name {
  font-weight: 600;
  color: #dc3545;
  background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.delete-warning {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin: 0;
  line-height: 1.5;
}

.delete-dialog-actions {
  padding: 24px 32px;
  background: #f8f9fa;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.cancel-btn {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.cancel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
  background: linear-gradient(135deg, #5a6268 0%, #343a40 100%);
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
  border: 1px solid rgba(220, 53, 69, 0.2);
  color: white;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
  background: linear-gradient(135deg, #c82333 0%, #d63384 100%);
}

.delete-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

/* Enhanced Success Dialog Styles */
.success-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  position: relative;
}

.success-dialog-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #28a745 0%, #20c997 50%, #17a2b8 100%);
}

.success-dialog-header {
  background: linear-gradient(135deg, #28a745 0%, #20c997 50%, #17a2b8 100%);
  padding: 24px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.success-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.success-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.success-dialog-title {
  color: white;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.success-dialog-content {
  padding: 32px;
  background: white;
}

.success-message {
  text-align: center;
  position: relative;
}

.success-text {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 24px;
  line-height: 1.6;
  font-weight: 500;
}

.success-icon-large {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  animation: zoomIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.success-dialog-actions {
  padding: 24px 32px;
  background: #f8f9fa;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
}

.ok-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: 1px solid rgba(40, 167, 69, 0.2);
  color: white;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 120px;
}

.ok-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
}

.ok-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

/* Salary Dialog Styles */
.salary-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  position: relative;
}

.salary-dialog-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
}

.salary-dialog-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.close-dialog-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.close-dialog-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.salary-dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.salary-dialog-icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.salary-dialog-title {
  color: white;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.salary-dialog-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9rem;
  margin: 0;
  position: relative;
  z-index: 2;
}

.salary-dialog-container {
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.salary-dialog-content {
  padding: 20px;
  background: white;
  flex: 1;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-title {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.salary-form-field {
  margin-bottom: 4px;
}

.salary-form-field.compact {
  margin-bottom: 2px;
}

.salary-form-field .v-input__control {
  border-radius: 8px;
}

.salary-form-field .v-field {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.salary-form-field .v-field:hover {
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.salary-form-field .v-field--focused {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.salary-amount-field .v-field {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.net-salary-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin-top: 16px;
}

.net-salary-content {
  padding: 16px;
  text-align: center;
}

.net-salary-content.compact {
  padding: 12px;
}

.net-salary-label {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.net-salary-amount {
  color: white;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.salary-dialog-actions {
  padding: 16px 20px;
  background: #f8f9fa;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
}

.cancel-btn {
  background: transparent;
  border: 2px solid #6c757d;
  color: #6c757d;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cancel-btn:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.save-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: white;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
}

.save-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.save-btn:disabled {
  background: #e9ecef;
  color: #6c757d;
  border-color: #dee2e6;
  box-shadow: none;
  transform: none;
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");
</style>
