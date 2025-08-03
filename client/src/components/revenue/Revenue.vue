<template>
  <div class="modern-revenue-page">
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
                  Revenue Management
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Monitor income, expenses, and financial reports
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-chart-line</v-icon>
                  Financial Overview
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
                      <v-icon size="36" color="white"
                        >mdi-chart-line-variant</v-icon
                      >
                    </v-avatar>
                    <div>
                      <h2 class="text-h3 font-weight-bold primary--text mb-1">
                        Key Performance Indicators
                      </h2>
                      <p class="text-h6 text-medium-emphasis mb-0">
                        Real-time insights into revenue, expenses, and financial
                        metrics
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container green">
                      <v-icon size="32" color="white">mdi-trending-up</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ financialStats.totalInflow.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">TOTAL INFLOW</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Revenue</span>
                      <span class="sub-value">{{
                        financialStats.totalInflow.toLocaleString()
                      }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container red">
                      <v-icon size="32" color="white">mdi-trending-down</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ financialStats.totalExpenses.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">TOTAL EXPENSES</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Outflow</span>
                      <span class="sub-value">{{
                        financialStats.totalExpenses.toLocaleString()
                      }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container blue">
                      <v-icon size="32" color="white">mdi-cash</v-icon>
                    </div>
                    <div class="stat-card__number">
                      ₨{{ financialStats.cashInHand.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">CASH IN HAND</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Available</span>
                      <span class="sub-value">{{
                        financialStats.cashInHand.toLocaleString()
                      }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container orange">
                      <v-icon size="32" color="white"
                        >mdi-calendar-month</v-icon
                      >
                    </div>
                    <div class="stat-card__number">
                      ₨{{ financialStats.thisMonth.toLocaleString() }}
                    </div>
                    <div class="stat-card__label">THIS MONTH</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Revenue</span>
                      <span class="sub-value">{{
                        financialStats.thisMonth.toLocaleString()
                      }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Quick Action Buttons -->
            <v-row class="mb-8" v-if="userRole === 'admin'">
              <v-col cols="12" sm="6" md="6" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="openRevenueDialog"
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
                      Add Revenue
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Record new income and revenue sources
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="6" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="openExpenseDialog"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="primary">mdi-minus</v-icon>
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      Add Expense
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Record new expenses and costs
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Tabs for Revenue and Expenses -->
            <v-row>
              <v-col cols="12">
                <v-card class="modern-tabs-card" elevation="0" rounded="xl">
                  <v-tabs v-model="activeTab" class="modern-tabs">
                    <v-tab class="modern-tab">Revenue</v-tab>
                    <v-tab class="modern-tab">Expenses</v-tab>
                    <v-tab class="modern-tab">Financial Summary</v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="activeTab">
                    <!-- Revenue Tab -->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <!-- Selection Summary -->
                          <div
                            v-if="selectedRevenueItems.length > 0"
                            class="mb-4"
                          >
                            <v-alert
                              type="info"
                              variant="tonal"
                              class="selection-alert"
                            >
                              <div
                                class="d-flex align-center justify-space-between"
                              >
                                <div>
                                  <strong>{{
                                    selectedRevenueItems.length
                                  }}</strong>
                                  item(s) selected
                                  <span class="ml-2">
                                    (Total: ₨{{
                                      selectedRevenueItems
                                        .reduce(
                                          (sum, item) =>
                                            sum + Number(item.amount),
                                          0
                                        )
                                        .toLocaleString()
                                    }})
                                  </span>
                                </div>
                                <div>
                                  <v-btn
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    @click="exportSelectedRevenue"
                                    class="mr-2"
                                  >
                                    <v-icon left>mdi-download</v-icon>
                                    Export Selected
                                  </v-btn>
                                  <v-btn
                                    v-if="userRole === 'admin'"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    @click="deleteSelectedRevenue"
                                    class="mr-2"
                                  >
                                    <v-icon left>mdi-delete</v-icon>
                                    Delete Selected
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    @click="clearSelection"
                                  >
                                    <v-icon left>mdi-close</v-icon>
                                    Clear Selection
                                  </v-btn>
                                </div>
                              </div>
                            </v-alert>
                          </div>

                          <!-- Export All Button -->
                          <div class="mb-4 d-flex justify-end">
                            <v-btn
                              color="success"
                              variant="outlined"
                              size="small"
                              @click="exportAllRevenue"
                              :disabled="revenueData.length === 0"
                            >
                              <v-icon left>mdi-download</v-icon>
                              Export All Revenue
                            </v-btn>
                          </div>

                          <v-data-table
                            :headers="revenueHeaders"
                            :items="revenueData"
                            :loading="loading"
                            sort-by="date"
                            sort-desc
                            class="modern-data-table"
                            v-model="selectedRevenueItems"
                            show-select
                            :single-select="false"
                            @update:options="handleRevenueTableUpdate"
                          >
                            <template v-slot:item.amount="{ item }">
                              <span class="font-weight-bold success--text">
                                ₨{{ item.amount.toLocaleString() }}
                              </span>
                            </template>

                            <template v-slot:item.date="{ item }">
                              {{ formatDate(item.date) }}
                            </template>

                            <template v-slot:item.category="{ item }">
                              <v-chip
                                :color="getCategoryColor(item.category)"
                                text-color="white"
                                small
                              >
                                {{ item.category }}
                              </v-chip>
                            </template>

                            <template v-slot:item.actions="{ item }">
                              <v-btn
                                v-if="userRole === 'admin'"
                                icon
                                small
                                color="primary"
                                @click="editRevenue(item)"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                v-if="userRole === 'admin'"
                                icon
                                small
                                color="error"
                                @click="deleteRevenue(item)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Expenses Tab -->
                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-data-table
                            :headers="expenseHeaders"
                            :items="expenseData"
                            :loading="loading"
                            sort-by="date"
                            sort-desc
                            class="modern-data-table"
                          >
                            <template v-slot:item.amount="{ item }">
                              <span class="font-weight-bold error--text">
                                ₨{{ item.amount.toLocaleString() }}
                              </span>
                            </template>

                            <template v-slot:item.date="{ item }">
                              {{ formatDate(item.date) }}
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
                                v-if="userRole === 'admin'"
                                icon
                                small
                                color="primary"
                                @click="editExpense(item)"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                v-if="userRole === 'admin'"
                                icon
                                small
                                color="error"
                                @click="deleteExpense(item)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <!-- Financial Summary Tab -->
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
                                  >Monthly Revenue</v-card-title
                                >
                                <v-card-text>
                                  <div
                                    v-for="(month, index) in monthlyRevenue"
                                    :key="index"
                                    class="summary-item"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="summary-label">{{
                                        month.month
                                      }}</span>
                                      <span
                                        class="font-weight-bold success--text summary-value"
                                      >
                                        ₨{{ month.amount.toLocaleString() }}
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
                                  >Monthly Expenses</v-card-title
                                >
                                <v-card-text>
                                  <div
                                    v-for="(month, index) in monthlyExpenses"
                                    :key="index"
                                    class="summary-item"
                                  >
                                    <div class="d-flex justify-space-between">
                                      <span class="summary-label">{{
                                        month.month
                                      }}</span>
                                      <span
                                        class="font-weight-bold error--text summary-value"
                                      >
                                        ₨{{ month.amount.toLocaleString() }}
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

    <!-- Add Revenue Dialog -->
    <v-dialog v-model="showRevenueDialog" max-width="700" persistent>
      <v-card class="revenue-dialog-card" elevation="24" rounded="xl">
        <!-- Header with gradient background -->
        <div class="dialog-header">
          <v-card-title class="dialog-title">
            <v-avatar size="48" class="mr-4 header-avatar">
              <v-icon size="24" color="white">mdi-cash-plus</v-icon>
            </v-avatar>
            <div>
              <h2 class="text-h5 font-weight-bold text-white mb-1">
                {{ isEditing ? "Edit Revenue Entry" : "Add New Revenue" }}
              </h2>
              <p class="text-subtitle-2 text-white-70 mb-0">
                {{
                  isEditing
                    ? "Update revenue information"
                    : "Record new revenue source"
                }}
              </p>
            </div>
          </v-card-title>
          <v-btn
            icon
            color="white"
            variant="text"
            @click="showRevenueDialog = false"
            class="close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Form Content -->
        <v-card-text class="dialog-content">
          <div class="form-header mb-6">
            <v-divider class="mb-4"></v-divider>
            <h3 class="text-h6 font-weight-bold text-grey-darken-2 mb-2">
              Revenue Details
            </h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">
              Fill in the details below to
              {{ isEditing ? "update" : "add" }} revenue information
            </p>
          </div>

          <v-form ref="revenueForm" v-model="revenueFormValid">
            <v-row>
              <!-- Revenue Source -->
              <v-col cols="12" md="6">
                <div class="field-container">
                  <v-text-field
                    v-model="revenueForm.source"
                    label="Revenue Source"
                    :rules="[rules.required]"
                    variant="outlined"
                    required
                    prepend-inner-icon="mdi-account-cash"
                    class="modern-form-field"
                    color="success"
                    placeholder="Enter revenue source"
                  ></v-text-field>
                  <div class="field-hint">
                    The source or origin of the revenue
                  </div>
                </div>
              </v-col>

              <!-- Amount -->
              <v-col cols="12" md="6">
                <div class="field-container">
                  <v-text-field
                    v-model.number="revenueForm.amount"
                    label="Amount (PKR)"
                    type="number"
                    :rules="[rules.required, rules.positive]"
                    variant="outlined"
                    required
                    prefix="₨"
                    prepend-inner-icon="mdi-currency-pkr"
                    class="modern-form-field"
                    color="success"
                    placeholder="0.00"
                  ></v-text-field>
                  <div class="field-hint">Total amount in Pakistani Rupees</div>
                </div>
              </v-col>

              <!-- Date -->
              <v-col cols="12" md="6">
                <div class="field-container">
                  <v-menu
                    v-model="revenueDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="revenueForm.date"
                        label="Date"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[rules.required]"
                        variant="outlined"
                        required
                        class="modern-form-field"
                        color="success"
                        placeholder="Select date"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="revenueForm.date"
                      @input="revenueDateMenu = false"
                      color="success"
                    ></v-date-picker>
                  </v-menu>
                  <div class="field-hint">Date when revenue was received</div>
                </div>
              </v-col>

              <!-- Category -->
              <v-col cols="12" md="6">
                <div class="field-container">
                  <v-text-field
                    v-model="revenueForm.category"
                    label="Category"
                    :rules="[rules.required]"
                    variant="outlined"
                    required
                    prepend-inner-icon="mdi-tag"
                    class="modern-form-field"
                    color="success"
                    placeholder="Enter category"
                  ></v-text-field>
                  <div class="field-hint">Revenue classification category</div>
                </div>
              </v-col>

              <!-- Description -->
              <v-col cols="12">
                <div class="field-container">
                  <v-textarea
                    v-model="revenueForm.description"
                    label="Description"
                    variant="outlined"
                    rows="4"
                    prepend-inner-icon="mdi-text"
                    class="modern-form-field"
                    color="success"
                    auto-grow
                    placeholder="Provide additional details about this revenue"
                  ></v-textarea>
                  <div class="field-hint">
                    Optional detailed description of the revenue
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <!-- Action Buttons -->
        <v-card-actions class="dialog-actions">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            @click="showRevenueDialog = false"
            class="action-btn"
            size="large"
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="submitRevenue"
            :loading="revenueLoading"
            :disabled="!revenueFormValid"
            class="action-btn"
            size="large"
            elevation="4"
          >
            <v-icon left>mdi-content-save</v-icon>
            {{ isEditing ? "Update Revenue" : "Save Revenue" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Beautiful Add Expense Dialog -->
    <v-dialog v-model="showExpenseDialog" max-width="640" persistent>
      <v-card class="beautiful-expense-dialog" elevation="0" rounded="xl">
        <!-- Expense Header -->
        <div class="expense-dialog-header">
          <div class="expense-header-content">
            <div class="expense-icon-wrapper">
              <v-icon size="40" color="white">mdi-minus-circle</v-icon>
            </div>
            <div class="expense-header-text">
              <h2 class="expense-dialog-title">
                {{ isEditing ? "Edit Expense" : "Add Expense" }}
              </h2>
              <p class="expense-dialog-subtitle">Record new expense details</p>
            </div>
          </div>
        </div>

        <!-- Expense Content -->
        <v-card-text class="expense-dialog-content">
          <v-form ref="expenseForm" v-model="expenseFormValid">
            <div class="expense-form-wrapper">
              <!-- Form Fields -->
              <div class="form-row">
                <div class="form-field-group">
                  <label class="field-label">Expense Category</label>
                  <v-text-field
                    v-model="expenseForm.category"
                    placeholder="Enter expense category"
                    :rules="[rules.required]"
                    outlined
                    required
                    class="beautiful-form-field"
                    prepend-inner-icon="mdi-tag"
                  ></v-text-field>
                </div>

                <div class="form-field-group">
                  <label class="field-label">Amount (PKR)</label>
                  <v-text-field
                    v-model.number="expenseForm.amount"
                    placeholder="Enter amount"
                    type="number"
                    :rules="[rules.required, rules.positive]"
                    outlined
                    required
                    prefix="₨"
                    class="beautiful-form-field"
                    prepend-inner-icon="mdi-currency-pkr"
                  ></v-text-field>
                </div>
              </div>

              <div class="form-row">
                <div class="form-field-group">
                  <label class="field-label">Date</label>
                  <v-menu
                    v-model="expenseDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="expenseForm.date"
                        placeholder="Select date"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[rules.required]"
                        outlined
                        required
                        class="beautiful-form-field"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="expenseForm.date"
                      @input="expenseDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>

                <div class="form-field-group">
                  <label class="field-label">Payment Method</label>
                  <v-select
                    v-model="expenseForm.payment_method"
                    :items="paymentMethods"
                    placeholder="Select payment method"
                    :rules="[rules.required]"
                    outlined
                    required
                    class="beautiful-form-field"
                    prepend-inner-icon="mdi-credit-card"
                  ></v-select>
                </div>
              </div>

              <div class="form-field-group full-width">
                <label class="field-label">Description</label>
                <v-textarea
                  v-model="expenseForm.description"
                  placeholder="Enter expense description"
                  outlined
                  rows="4"
                  class="beautiful-form-field"
                  prepend-inner-icon="mdi-text"
                ></v-textarea>
              </div>
            </div>
          </v-form>
        </v-card-text>

        <!-- Expense Action Buttons -->
        <v-card-actions class="expense-dialog-actions">
          <div class="expense-button-container">
            <v-btn
              variant="outlined"
              color="grey-darken-2"
              @click="showExpenseDialog = false"
              class="expense-cancel-btn"
              size="large"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              color="error"
              variant="elevated"
              @click="submitExpense"
              :loading="expenseLoading"
              :disabled="!expenseFormValid"
              class="expense-save-btn"
              size="large"
            >
              <v-icon left>mdi-content-save</v-icon>
              {{ isEditing ? "Update Expense" : "Save Expense" }}
            </v-btn>
          </div>
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
              <p class="success-dialog-subtitle">
                Operation completed successfully
              </p>
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
                <p class="success-message-text">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Success Details -->
            <div class="success-details-box">
              <div class="details-icon">
                <v-icon size="24" color="success">mdi-database-check</v-icon>
              </div>
              <div class="details-content">
                <p class="details-text">
                  The operation has been completed and your data has been
                  updated successfully.
                </p>
              </div>
            </div>

            <!-- Success Indicators -->
            <div class="success-indicators">
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-check</v-icon>
                </div>
                <span class="success-item-text">Data saved</span>
              </div>
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-database-check</v-icon>
                </div>
                <span class="success-item-text">Database updated</span>
              </div>
              <div class="success-item">
                <div class="success-item-icon">
                  <v-icon size="20" color="success">mdi-refresh</v-icon>
                </div>
                <span class="success-item-text">System refreshed</span>
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
              Continue
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Message Dialog -->
    <v-dialog v-model="messageDialog" max-width="500" persistent>
      <v-card class="message-dialog-card" elevation="0" rounded="xl">
        <!-- Message Header -->
        <div class="message-header" :class="`message-header-${messageType}`">
          <div
            class="message-icon-container"
            :class="`message-icon-${messageType}`"
          >
            <v-icon class="message-icon">
              {{
                messageType === "success"
                  ? "mdi-check-circle"
                  : messageType === "error"
                  ? "mdi-alert-circle"
                  : messageType === "warning"
                  ? "mdi-alert"
                  : "mdi-information"
              }}
            </v-icon>
          </div>
          <div class="message-title">
            <h2>{{ messageTitle }}</h2>
            <p>
              {{
                messageType === "success"
                  ? "Operation completed successfully"
                  : messageType === "error"
                  ? "An error occurred"
                  : messageType === "warning"
                  ? "Please review the information"
                  : "Information"
              }}
            </p>
          </div>
        </div>

        <!-- Message Content -->
        <v-card-text class="message-content">
          <div class="message-text" :class="`message-text-${messageType}`">
            <v-icon class="text-icon" :class="`text-icon-${messageType}`">
              {{
                messageType === "success"
                  ? "mdi-check"
                  : messageType === "error"
                  ? "mdi-close"
                  : messageType === "warning"
                  ? "mdi-alert"
                  : "mdi-information"
              }}
            </v-icon>
            <span>{{ messageText }}</span>
          </div>
        </v-card-text>

        <!-- Message Actions -->
        <v-card-actions class="message-actions">
          <v-spacer></v-spacer>
          <v-btn
            :color="
              messageType === 'success'
                ? 'success'
                : messageType === 'error'
                ? 'error'
                : messageType === 'warning'
                ? 'warning'
                : 'info'
            "
            variant="elevated"
            @click="messageDialog = false"
            class="message-btn"
            size="large"
            elevation="4"
          >
            <v-icon left>mdi-check</v-icon>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="500" persistent>
      <v-card class="confirm-dialog-card" elevation="0" rounded="xl">
        <!-- Confirmation Header -->
        <div class="confirm-header">
          <div class="confirm-icon-container">
            <v-icon class="confirm-icon">mdi-alert-circle</v-icon>
          </div>
          <div class="confirm-title">
            <h2>{{ confirmTitle }}</h2>
            <p>Please confirm your action</p>
          </div>
        </div>

        <!-- Confirmation Content -->
        <v-card-text class="confirm-content">
          <div class="confirm-message">
            <v-icon class="confirm-text-icon">mdi-help-circle</v-icon>
            <span>{{ confirmMessage }}</span>
          </div>
        </v-card-text>

        <!-- Confirmation Actions -->
        <v-card-actions class="confirm-actions">
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            @click="confirmDialog = false"
            class="cancel-btn"
            size="large"
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="elevated"
            @click="executeConfirmAction"
            class="confirm-btn"
            size="large"
            elevation="4"
          >
            <v-icon left>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";

export default {
  name: "RevenueManagement",
  data() {
    return {
      loading: false,
      revenueLoading: false,
      expenseLoading: false,
      showRevenueDialog: false,
      showExpenseDialog: false,
      successDialog: false,
      messageDialog: false,
      confirmDialog: false,
      revenueDateMenu: false,
      expenseDateMenu: false,
      activeTab: 0,
      successMessage: "",
      messageTitle: "",
      messageText: "",
      messageType: "success", // success, error, warning, info
      confirmTitle: "",
      confirmMessage: "",
      confirmAction: null,
      isEditing: false,
      editingRevenue: null,
      editingExpense: null,
      revenueData: [],
      expenseData: [],
      selectedRevenueItems: [],
      selectAllRevenue: false,
      revenueFormValid: false,
      expenseFormValid: false,
      revenueForm: {
        source: "",
        amount: "",
        date: "",
        category: "Fees",
        description: "",
      },
      expenseForm: {
        category: "",
        amount: "",
        date: "",
        payment_method: "Cash",
        description: "",
      },
      revenueHeaders: [
        {
          text: "",
          value: "data-table-select",
          sortable: false,
          width: "50px",
        },
        { text: "Source", value: "source", sortable: true },
        { text: "Amount", value: "amount", sortable: true },
        { text: "Date", value: "date", sortable: true },
        { text: "Category", value: "category", sortable: true },
        { text: "Description", value: "description", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      expenseHeaders: [
        { text: "Category", value: "category", sortable: true },
        { text: "Amount", value: "amount", sortable: true },
        { text: "Date", value: "date", sortable: true },
        { text: "Payment Method", value: "payment_method", sortable: true },
        { text: "Description", value: "description", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      revenueCategories: ["Fees", "Other Income", "Donations", "Grants"],
      paymentMethods: ["Cash", "Bank Transfer", "Cheque"],
      financialStats: {
        totalInflow: 0,
        totalExpenses: 0,
        cashInHand: 0,
        thisMonth: 0,
      },
      monthlyRevenue: [],
      monthlyExpenses: [],
      rules: {
        required: (v) => !!v || "This field is required",
        positive: (v) => v > 0 || "Amount must be positive",
      },
    };
  },
  computed: {
    user() {
      const authData = getAuthData();
      return authData ? authData.user : {};
    },
    userRole() {
      return this.user.role || "";
    },
  },
  mounted() {
    this.loadRevenueData();
    this.loadExpenseData();
  },
  methods: {
    async loadRevenueData() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const response = await axios.get("http://localhost:8081/api/revenue", {
          headers: { Authorization: authData?.token },
        });
        this.revenueData = response.data;
        this.calculateFinancialStats();
      } catch (error) {
        console.error("Error loading revenue:", error);
      } finally {
        this.loading = false;
      }
    },

    handleRevenueTableUpdate(options) {
      // Handle select all functionality
      if (options.itemsPerPage === -1) {
        // Select all items
        this.selectedRevenueItems = [...this.revenueData];
        this.selectAllRevenue = true;
      } else {
        // Update select all state based on current selection
        this.selectAllRevenue =
          this.selectedRevenueItems.length === this.revenueData.length;
      }
    },

    toggleSelectAllRevenue() {
      if (this.selectAllRevenue) {
        this.selectedRevenueItems = [];
        this.selectAllRevenue = false;
      } else {
        this.selectedRevenueItems = [...this.revenueData];
        this.selectAllRevenue = true;
      }
    },

    clearSelection() {
      this.selectedRevenueItems = [];
      this.selectAllRevenue = false;
    },

    async deleteSelectedRevenue() {
      if (this.selectedRevenueItems.length === 0) {
        this.$toast.error("No items selected");
        return;
      }

      this.confirmTitle = "Delete Selected Revenue";
      this.confirmMessage = `Are you sure you want to delete ${this.selectedRevenueItems.length} selected revenue item(s)? This action cannot be undone.`;
      this.confirmAction = () => this.performDeleteSelectedRevenue();
      this.confirmDialog = true;
    },

    async performDeleteSelectedRevenue() {
      try {
        const authData = getAuthData();
        const deletePromises = this.selectedRevenueItems.map((item) =>
          axios.delete(`http://localhost:8081/api/revenue/${item.id}`, {
            headers: { Authorization: authData?.token },
          })
        );

        await Promise.all(deletePromises);

        this.$toast.success(
          `Successfully deleted ${this.selectedRevenueItems.length} revenue item(s)`
        );
        this.selectedRevenueItems = [];
        this.selectAllRevenue = false;
        this.loadRevenueData();
      } catch (error) {
        console.error("Error deleting selected revenue:", error);
        this.$toast.error("Failed to delete selected revenue items");
      }
    },

    exportSelectedRevenue() {
      if (this.selectedRevenueItems.length === 0) {
        this.$toast.error("No items selected for export");
        return;
      }

      // Prepare data for export
      const exportData = this.selectedRevenueItems.map((item) => ({
        Source: item.source,
        Amount: `₨${Number(item.amount).toLocaleString()}`,
        Date: this.formatDate(item.date),
        Category: item.category,
        Description: item.description || "",
      }));

      // Create CSV content
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(","),
        ...exportData.map((row) =>
          headers
            .map((header) => {
              const value = row[header];
              // Escape commas and quotes in CSV
              return `"${String(value).replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `revenue_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.$toast.success(
        `Successfully exported ${this.selectedRevenueItems.length} revenue item(s)`
      );
    },

    exportAllRevenue() {
      if (this.revenueData.length === 0) {
        this.$toast.error("No revenue data to export");
        return;
      }

      // Prepare data for export
      const exportData = this.revenueData.map((item) => ({
        Source: item.source,
        Amount: `₨${Number(item.amount).toLocaleString()}`,
        Date: this.formatDate(item.date),
        Category: item.category,
        Description: item.description || "",
      }));

      // Create CSV content
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(","),
        ...exportData.map((row) =>
          headers
            .map((header) => {
              const value = row[header];
              // Escape commas and quotes in CSV
              return `"${String(value).replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `all_revenue_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.$toast.success(
        `Successfully exported all ${this.revenueData.length} revenue item(s)`
      );
    },

    async loadExpenseData() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const response = await axios.get("http://localhost:8081/api/expenses", {
          headers: { Authorization: authData?.token },
        });
        this.expenseData = response.data;
        this.calculateFinancialStats();
      } catch (error) {
        console.error("Error loading expenses:", error);
      } finally {
        this.loading = false;
      }
    },

    calculateFinancialStats() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      this.financialStats = {
        totalInflow: this.revenueData.reduce(
          (sum, r) => sum + Number(r.amount),
          0
        ),
        totalExpenses: this.expenseData.reduce(
          (sum, e) => sum + Number(e.amount),
          0
        ),
        cashInHand:
          this.revenueData.reduce((sum, r) => sum + Number(r.amount), 0) -
          this.expenseData.reduce((sum, e) => sum + Number(e.amount), 0),
        thisMonth: this.revenueData
          .filter((r) => {
            const date = new Date(r.date);
            return (
              date.getMonth() + 1 === currentMonth &&
              date.getFullYear() === currentYear
            );
          })
          .reduce((sum, r) => sum + Number(r.amount), 0),
      };

      this.calculateMonthlyData();
    },

    calculateMonthlyData() {
      // Calculate monthly revenue
      const revenueByMonth = {};
      this.revenueData.forEach((revenue) => {
        const date = new Date(revenue.date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        if (!revenueByMonth[monthKey]) {
          revenueByMonth[monthKey] = 0;
        }
        revenueByMonth[monthKey] += Number(revenue.amount);
      });

      this.monthlyRevenue = Object.entries(revenueByMonth)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => b.month.localeCompare(a.month));

      // Calculate monthly expenses
      const expenseByMonth = {};
      this.expenseData.forEach((expense) => {
        const date = new Date(expense.date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        if (!expenseByMonth[monthKey]) {
          expenseByMonth[monthKey] = 0;
        }
        expenseByMonth[monthKey] += Number(expense.amount);
      });

      this.monthlyExpenses = Object.entries(expenseByMonth)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => b.month.localeCompare(a.month));
    },

    getCategoryColor(category) {
      const colors = {
        Fees: "success",
        "Other Income": "info",
        Donations: "warning",
        Grants: "purple",
      };
      return colors[category] || "grey";
    },

    getPaymentMethodColor(method) {
      const colors = {
        Cash: "green",
        "Bank Transfer": "blue",
        Cheque: "orange",
      };
      return colors[method] || "grey";
    },

    editRevenue(revenue) {
      console.log("Editing revenue:", revenue);
      this.editingRevenue = { ...revenue };

      // Format date for the date picker (YYYY-MM-DD)
      const formattedDate = new Date(revenue.date).toISOString().split("T")[0];

      this.revenueForm = {
        source: revenue.source,
        amount: revenue.amount,
        date: formattedDate,
        category: revenue.category,
        description: revenue.description,
      };

      console.log("Form data:", this.revenueForm);
      this.showRevenueDialog = true;
      this.isEditing = true;
    },

    async deleteRevenue(revenue) {
      this.showConfirm(
        "Delete Revenue",
        `Are you sure you want to delete "${revenue.source}"?`,
        async () => {
          try {
            const authData = getAuthData();
            await axios.delete(
              `http://localhost:8081/api/revenue/${revenue.id}`,
              {
                headers: { Authorization: authData?.token },
              }
            );

            this.successMessage = "Revenue deleted successfully!";
            this.successDialog = true;
            await this.loadRevenueData();
          } catch (error) {
            console.error("Error deleting revenue:", error);
            this.showMessage(
              "Error",
              "Error deleting revenue. Please try again.",
              "error"
            );
          }
        }
      );
    },

    editExpense(expense) {
      console.log("Editing expense:", expense);
      this.editingExpense = { ...expense };

      // Format date for the date picker (YYYY-MM-DD)
      const formattedDate = new Date(expense.date).toISOString().split("T")[0];

      this.expenseForm = {
        category: expense.category,
        amount: expense.amount,
        date: formattedDate,
        payment_method: expense.payment_method,
        description: expense.description,
      };

      console.log("Expense form data:", this.expenseForm);
      this.showExpenseDialog = true;
      this.isEditing = true;
    },

    async deleteExpense(expense) {
      this.showConfirm(
        "Delete Expense",
        `Are you sure you want to delete "${expense.category}"?`,
        async () => {
          try {
            const authData = getAuthData();
            await axios.delete(
              `http://localhost:8081/api/expenses/${expense.id}`,
              {
                headers: { Authorization: authData?.token },
              }
            );

            this.successMessage = "Expense deleted successfully!";
            this.successDialog = true;
            await this.loadExpenseData();
          } catch (error) {
            console.error("Error deleting expense:", error);
            this.showMessage(
              "Error",
              "Error deleting expense. Please try again.",
              "error"
            );
          }
        }
      );
    },

    async submitRevenue() {
      if (!this.$refs.revenueForm.validate()) return;

      this.revenueLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (this.isEditing && this.editingRevenue) {
          // Update existing revenue
          console.log("Updating revenue with data:", this.revenueForm);
          console.log("Revenue ID:", this.editingRevenue.id);

          await axios.put(
            `http://localhost:8081/api/revenue/${this.editingRevenue.id}`,
            this.revenueForm,
            {
              headers: { Authorization: user.token },
            }
          );
          this.successMessage = "Revenue updated successfully!";
        } else {
          // Create new revenue
          await axios.post(
            "http://localhost:8081/api/revenue",
            this.revenueForm,
            {
              headers: { Authorization: user.token },
            }
          );
          this.successMessage = "Revenue added successfully!";
        }

        this.successDialog = true;
        this.showRevenueDialog = false;
        this.resetRevenueForm();
        this.isEditing = false;
        this.editingRevenue = null;
        await this.loadRevenueData();
      } catch (error) {
        console.error("Error submitting revenue:", error);
        this.showMessage(
          "Error",
          "Error saving revenue. Please try again.",
          "error"
        );
      } finally {
        this.revenueLoading = false;
      }
    },

    async submitExpense() {
      if (!this.$refs.expenseForm.validate()) return;

      this.expenseLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (this.isEditing && this.editingExpense) {
          // Update existing expense
          console.log("Updating expense with data:", this.expenseForm);
          console.log("Expense ID:", this.editingExpense.id);

          await axios.put(
            `http://localhost:8081/api/expenses/${this.editingExpense.id}`,
            this.expenseForm,
            {
              headers: { Authorization: user.token },
            }
          );
          this.successMessage = "Expense updated successfully!";
        } else {
          // Create new expense
          await axios.post(
            "http://localhost:8081/api/expenses",
            this.expenseForm,
            {
              headers: { Authorization: user.token },
            }
          );
          this.successMessage = "Expense added successfully!";
        }

        this.successDialog = true;
        this.showExpenseDialog = false;
        this.resetExpenseForm();
        this.isEditing = false;
        this.editingExpense = null;
        await this.loadExpenseData();
      } catch (error) {
        console.error("Error submitting expense:", error);
        this.showMessage(
          "Error",
          "Error saving expense. Please try again.",
          "error"
        );
      } finally {
        this.expenseLoading = false;
      }
    },

    resetRevenueForm() {
      this.revenueForm = {
        source: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Fees",
        description: "",
      };
      this.isEditing = false;
      this.editingRevenue = null;
    },

    resetExpenseForm() {
      this.expenseForm = {
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        payment_method: "Cash",
        description: "",
      };
      this.isEditing = false;
      this.editingExpense = null;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    openRevenueDialog() {
      this.resetRevenueForm();
      // Set default date to today
      this.revenueForm.date = new Date().toISOString().split("T")[0];
      this.showRevenueDialog = true;
    },

    openExpenseDialog() {
      this.resetExpenseForm();
      // Set default date to today
      this.expenseForm.date = new Date().toISOString().split("T")[0];
      this.showExpenseDialog = true;
    },

    showMessage(title, text, type = "success") {
      this.messageTitle = title;
      this.messageText = text;
      this.messageType = type;
      this.messageDialog = true;
    },

    showConfirm(title, message, action) {
      this.confirmTitle = title;
      this.confirmMessage = message;
      this.confirmAction = action;
      this.confirmDialog = true;
    },

    async executeConfirmAction() {
      if (this.confirmAction) {
        await this.confirmAction();
      }
      this.confirmDialog = false;
    },
  },
};
</script>

<style scoped>
/* Modern Revenue Page Styles */
.modern-revenue-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Professional Revenue Dialog Styles */
.revenue-dialog-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafbfc 50%, #ffffff 100%);
  border: 3px solid rgba(76, 175, 80, 0.15);
  backdrop-filter: blur(25px);
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  animation: dialogSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dialog-header {
  background: linear-gradient(
    135deg,
    #2e7d32 0%,
    #4caf50 25%,
    #66bb6a 50%,
    #81c784 75%,
    #a5d6a7 100%
  );
  color: white;
  padding: 32px 40px 28px 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
}

.dialog-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="finance" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.08)"/><circle cx="5" cy="5" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="25" cy="25" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23finance)"/></svg>');
  opacity: 0.4;
  animation: patternFloat 20s ease-in-out infinite;
}

@keyframes patternFloat {
  0%,
  100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-5px) translateY(-3px);
  }
  50% {
    transform: translateX(3px) translateY(-5px);
  }
  75% {
    transform: translateX(-3px) translateY(3px);
  }
}

.dialog-title {
  position: relative;
  z-index: 2;
  padding: 0;
  margin: 0;
}

.dialog-title h2 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 8px;
}

.dialog-title p {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.01em;
  line-height: 1.4;
  opacity: 0.9;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.header-avatar {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: avatarPulse 3s ease-in-out infinite;
}

@keyframes avatarPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.close-btn {
  position: relative;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  transform: scale(1.15) rotate(90deg);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.dialog-content {
  padding: 40px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(248, 249, 250, 0.95) 100%
  );
  position: relative;
}

.dialog-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(76, 175, 80, 0.2) 50%,
    transparent 100%
  );
}

.modern-form-field {
  margin-bottom: 20px;
  position: relative;
}

.modern-form-field .v-field {
  border-radius: 20px;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(248, 249, 250, 0.8) 100%
  );
  backdrop-filter: blur(15px);
  border: 2px solid rgba(76, 175, 80, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.modern-form-field .v-field::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.02) 0%,
    transparent 50%,
    rgba(76, 175, 80, 0.01) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.modern-form-field .v-field:hover {
  box-shadow: 0 12px 32px rgba(76, 175, 80, 0.15),
    0 6px 16px rgba(76, 175, 80, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transform: translateY(-2px) scale(1.01);
  border-color: rgba(76, 175, 80, 0.25);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 249, 250, 0.9) 100%
  );
}

.modern-form-field .v-field:hover::before {
  opacity: 1;
}

.modern-form-field .v-field--focused {
  box-shadow: 0 16px 40px rgba(76, 175, 80, 0.25),
    0 8px 20px rgba(76, 175, 80, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  transform: translateY(-3px) scale(1.02);
  border-color: rgba(76, 175, 80, 0.6);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(248, 249, 250, 0.95) 100%
  );
  border-width: 3px;
}

.modern-form-field .v-field--focused::before {
  opacity: 1;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05) 0%,
    transparent 50%,
    rgba(76, 175, 80, 0.03) 100%
  );
}

.dialog-actions {
  padding: 32px 40px 40px 40px;
  background: linear-gradient(
    145deg,
    rgba(248, 249, 250, 0.9) 0%,
    rgba(240, 242, 245, 0.8) 100%
  );
  border-top: 2px solid rgba(76, 175, 80, 0.1);
  position: relative;
}

.dialog-actions::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(76, 175, 80, 0.3) 50%,
    transparent 100%
  );
}

.action-btn {
  border-radius: 16px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-width: 160px;
  height: 48px;
  font-size: 0.875rem;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
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
  transition: left 0.6s;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Enhanced form field focus effects */
.v-text-field--outlined .v-field--focused .v-field__outline {
  color: #2e7d32 !important;
  border-width: 3px !important;
}

.v-select--outlined .v-field--focused .v-field__outline {
  color: #2e7d32 !important;
  border-width: 3px !important;
}

.v-textarea--outlined .v-field--focused .v-field__outline {
  color: #2e7d32 !important;
  border-width: 3px !important;
}

/* Select dropdown enhancements */
.v-select .v-field__append-inner {
  transition: all 0.3s ease;
}

.modern-form-field .v-field:hover .v-field__append-inner {
  transform: scale(1.1);
}

.modern-form-field .v-field--focused .v-field__append-inner {
  transform: scale(1.2);
  color: #2e7d32 !important;
}

/* Textarea specific enhancements */
.modern-form-field .v-textarea .v-field {
  min-height: 120px;
}

.modern-form-field .v-textarea .v-field__input {
  padding-top: 16px;
  padding-bottom: 16px;
}

/* Field container animations */
.field-container {
  animation: fieldSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.field-container:nth-child(1) {
  animation-delay: 0.1s;
}
.field-container:nth-child(2) {
  animation-delay: 0.2s;
}
.field-container:nth-child(3) {
  animation-delay: 0.3s;
}
.field-container:nth-child(4) {
  animation-delay: 0.4s;
}
.field-container:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes fieldSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Enhanced field hints */
.field-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 6px;
  margin-left: 6px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  line-height: 1.4;
  transition: all 0.4s ease;
  opacity: 0.8;
  position: relative;
  padding-left: 8px;
}

.field-hint::before {
  content: "💡";
  position: absolute;
  left: -4px;
  top: 0;
  font-size: 0.7rem;
  opacity: 0.6;
}

.field-container:hover .field-hint {
  color: #6b7280;
  opacity: 1;
  transform: translateX(2px);
}

.field-container:hover .field-hint::before {
  opacity: 1;
  transform: scale(1.1);
}

/* Professional date picker styling */
.v-date-picker {
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(76, 175, 80, 0.1);
  backdrop-filter: blur(20px);
}

/* Enhanced input field icons styling */
.v-field__prepend-inner {
  color: #4caf50 !important;
  opacity: 0.7;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.modern-form-field .v-field:hover .v-field__prepend-inner {
  color: #2e7d32 !important;
  opacity: 0.9;
  transform: scale(1.05);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

.modern-form-field .v-field--focused .v-field__prepend-inner {
  color: #2e7d32 !important;
  opacity: 1;
  transform: scale(1.15);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2));
}

/* Enhanced field labels */
.v-field__label {
  font-weight: 600 !important;
  color: #374151 !important;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.modern-form-field .v-field:hover .v-field__label {
  color: #1f2937 !important;
  transform: translateY(-1px);
}

.modern-form-field .v-field--focused .v-field__label {
  color: #2e7d32 !important;
  font-weight: 700 !important;
  transform: translateY(-2px);
  text-shadow: 0 2px 4px rgba(46, 125, 50, 0.1);
}

/* Input text styling */
.v-field input,
.v-field textarea {
  font-weight: 500 !important;
  color: #1f2937 !important;
  transition: all 0.3s ease;
}

.modern-form-field .v-field--focused input,
.modern-form-field .v-field--focused textarea {
  font-weight: 600 !important;
  color: #111827 !important;
}

/* Field outline enhancements */
.v-field__outline {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.modern-form-field .v-field:hover .v-field__outline {
  border-width: 2px !important;
}

/* Special styling for number input */
.modern-form-field input[type="number"] {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
}

/* Currency prefix styling */
.v-field__prefix {
  font-weight: 600 !important;
  color: #4caf50 !important;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.modern-form-field .v-field:hover .v-field__prefix {
  color: #2e7d32 !important;
  opacity: 1;
  transform: scale(1.05);
}

.modern-form-field .v-field--focused .v-field__prefix {
  color: #2e7d32 !important;
  opacity: 1;
  transform: scale(1.1);
}

/* Responsive design with enhanced mobile experience */
@media (max-width: 768px) {
  .dialog-header {
    padding: 24px 28px 20px 28px;
  }

  .dialog-content {
    padding: 28px;
  }

  .dialog-actions {
    padding: 24px 28px 28px 28px;
  }

  .dialog-title h2 {
    font-size: 1.5rem !important;
  }

  .dialog-title p {
    font-size: 0.9rem !important;
  }

  .action-btn {
    min-width: 140px;
    height: 44px;
    font-size: 0.8rem;
  }
}

/* Loading state animations */
.action-btn:disabled {
  opacity: 0.7;
  transform: none;
}

.action-btn .v-icon {
  transition: transform 0.3s ease;
}

.action-btn:hover .v-icon {
  transform: scale(1.1);
}

/* Success state animations */
.action-btn--success {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%) !important;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3) !important;
}

.action-btn--success:hover {
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%) !important;
  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4) !important;
}

/* Form header styling */
.form-header {
  text-align: center;
  padding: 0 0 16px 0;
}

.form-header h3 {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-header p {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 400;
  color: #6b7280;
  line-height: 1.5;
}

/* Field container styling */
.field-container {
  position: relative;
  margin-bottom: 8px;
}

.field-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
  margin-left: 4px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  font-weight: 400;
  line-height: 1.3;
  transition: all 0.3s ease;
}

.field-container:hover .field-hint {
  color: #6b7280;
}

/* Enhanced divider styling */
.v-divider {
  border-color: rgba(76, 175, 80, 0.2) !important;
  border-width: 1px !important;
}

/* Placeholder styling */
.v-field input::placeholder,
.v-field textarea::placeholder {
  color: #9ca3af !important;
  font-style: italic;
}

/* Focus state for placeholders */
.v-field--focused input::placeholder,
.v-field--focused textarea::placeholder {
  color: #6b7280 !important;
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

.stat-card__icon-container.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-card__icon-container.red {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.stat-card__icon-container.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.stat-card__icon-container.orange {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
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

/* Beautiful Expense Dialog */
.beautiful-expense-dialog {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.expense-dialog-header {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  padding: 32px 36px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.expense-dialog-header::before {
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

.expense-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.expense-icon-wrapper {
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
}

.expense-icon-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.expense-header-text {
  color: white;
  text-align: center;
}

.expense-dialog-title {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.75px;
  line-height: 1.2;
}

.expense-dialog-subtitle {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.4;
}

.expense-dialog-content {
  padding: 36px;
  background: white;
}

.expense-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field-group.full-width {
  grid-column: 1 / -1;
}

.field-label {
  font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #37474f;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.beautiful-form-field {
  margin-bottom: 0;
}

.beautiful-form-field >>> .v-input__slot {
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.beautiful-form-field >>> .v-input__slot:hover {
  border-color: #f44336;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.1);
  transform: translateY(-1px);
}

.beautiful-form-field >>> .v-input__slot:focus-within {
  border-color: #f44336;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
  transform: translateY(-2px);
}

.beautiful-form-field >>> .v-input__prepend-inner {
  margin-right: 12px;
}

.beautiful-form-field >>> .v-input__prepend-inner .v-icon {
  color: #f44336;
  font-size: 20px;
}

.expense-dialog-actions {
  padding: 28px 36px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-top: 1px solid rgba(244, 67, 54, 0.1);
  display: flex;
  justify-content: center;
}

.expense-button-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.expense-cancel-btn {
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

.expense-cancel-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: #9ca3af;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expense-save-btn {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  min-width: 160px;
  height: 48px;
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.35);
  transition: all 0.3s ease;
  border-radius: 12px;
  font-size: 1rem;
}

.expense-save-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(244, 67, 54, 0.45);
}

.expense-save-btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e;
  box-shadow: none;
  transform: none;
}

.expense-save-btn:disabled:hover {
  transform: none;
  box-shadow: none;
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

/* Success Dialog Styles */
.success-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  box-shadow: 0 20px 40px rgba(76, 175, 80, 0.15);
  backdrop-filter: blur(10px);
  animation: slideInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.success-header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%);
  padding: 32px 24px 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.success-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}

.success-icon-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.success-icon {
  font-size: 32px !important;
  color: white !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.success-title {
  flex: 1;
  color: white;
}

.success-title h2 {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}

.success-title p {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.success-content {
  padding: 32px 24px !important;
  background: white;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.message-icon {
  color: #4caf50 !important;
  font-size: 24px !important;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
}

.success-message span {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #2e7d32;
  line-height: 1.5;
}

.success-actions {
  padding: 24px !important;
  background: #fafafa;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid rgba(76, 175, 80, 0.1);
}

.success-btn {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%) !important;
  color: white !important;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 12px 32px !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3) !important;
  border: none !important;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}

.success-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.success-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 24px rgba(76, 175, 80, 0.4) !important;
  background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%) !important;
}

.success-btn:hover::before {
  left: 100%;
}

.success-btn:active {
  transform: translateY(0) !important;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3) !important;
}

/* Message Dialog Styles */
.message-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: slideInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.message-header {
  padding: 32px 24px 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.message-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}

.message-header-success {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%);
}

.message-header-error {
  background: linear-gradient(135deg, #f44336 0%, #ef5350 50%, #e57373 100%);
}

.message-header-warning {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 50%, #ffcc02 100%);
}

.message-header-info {
  background: linear-gradient(135deg, #2196f3 0%, #42a5f5 50%, #64b5f6 100%);
}

.message-icon-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.message-icon {
  font-size: 32px !important;
  color: white !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.message-title {
  flex: 1;
  color: white;
}

.message-title h2 {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}

.message-title p {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.message-content {
  padding: 32px 24px !important;
  background: white;
}

.message-text {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.message-text-success {
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-left-color: #4caf50;
}

.message-text-error {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-left-color: #f44336;
}

.message-text-warning {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-left-color: #ff9800;
}

.message-text-info {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left-color: #2196f3;
}

.text-icon {
  font-size: 24px !important;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-icon-success {
  color: #4caf50 !important;
}

.text-icon-error {
  color: #f44336 !important;
}

.text-icon-warning {
  color: #ff9800 !important;
}

.text-icon-info {
  color: #2196f3 !important;
}

.message-text span {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
}

.message-text-success span {
  color: #2e7d32;
}

.message-text-error span {
  color: #c62828;
}

.message-text-warning span {
  color: #ef6c00;
}

.message-text-info span {
  color: #1565c0;
}

.message-actions {
  padding: 24px !important;
  background: #fafafa;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.message-btn {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 12px 32px !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}

.message-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.message-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important;
}

.message-btn:hover::before {
  left: 100%;
}

.message-btn:active {
  transform: translateY(0) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

/* Confirmation Dialog Styles */
.confirm-dialog-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(244, 67, 54, 0.2);
  box-shadow: 0 20px 40px rgba(244, 67, 54, 0.15);
  backdrop-filter: blur(10px);
  animation: slideInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.confirm-header {
  background: linear-gradient(135deg, #f44336 0%, #ef5350 50%, #e57373 100%);
  padding: 32px 24px 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.confirm-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}

.confirm-icon-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.confirm-icon {
  font-size: 32px !important;
  color: white !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.confirm-title {
  flex: 1;
  color: white;
}

.confirm-title h2 {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}

.confirm-title p {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.confirm-content {
  padding: 32px 24px !important;
  background: white;
}

.confirm-message {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-radius: 12px;
  border-left: 4px solid #f44336;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.confirm-text-icon {
  color: #f44336 !important;
  font-size: 24px !important;
  background: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.2);
}

.confirm-message span {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #c62828;
  line-height: 1.5;
}

.confirm-actions {
  padding: 24px !important;
  background: #fafafa;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid rgba(244, 67, 54, 0.1);
}

.cancel-btn {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 12px 32px !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  border: 2px solid #9e9e9e !important;
  color: #9e9e9e !important;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}

.cancel-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 16px rgba(158, 158, 158, 0.3) !important;
  background: #f5f5f5 !important;
}

.confirm-btn {
  background: linear-gradient(135deg, #f44336 0%, #ef5350 100%) !important;
  color: white !important;
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 12px 32px !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  box-shadow: 0 8px 16px rgba(244, 67, 54, 0.3) !important;
  border: none !important;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
}

.confirm-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.confirm-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 24px rgba(244, 67, 54, 0.4) !important;
  background: linear-gradient(135deg, #ef5350 0%, #e57373 100%) !important;
}

.confirm-btn:hover::before {
  left: 100%;
}

.confirm-btn:active {
  transform: translateY(0) !important;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3) !important;
}

/* Selection Alert Styles */
.selection-alert {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%) !important;
  border: 1px solid rgba(33, 150, 243, 0.2) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1) !important;
}

.selection-alert .v-alert__content {
  padding: 16px 20px !important;
}

.selection-alert .v-btn {
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.selection-alert .v-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");
</style>
