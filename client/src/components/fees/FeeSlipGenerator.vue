<template>
  <div class="fee-slip-generator">
    <!-- Header -->
    <v-card class="mb-6" elevation="2">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>
          <h2 class="text-h4 font-weight-bold primary--text mb-2">
            Fee Slip Generator
          </h2>
          <p class="text-subtitle-1 text-medium-emphasis">
            Generate and manage monthly fee slips for students
          </p>
        </div>
        <v-chip color="success" size="large" prepend-icon="mdi-receipt">
          {{ currentMonth }} {{ currentYear }}
        </v-chip>
      </v-card-title>
    </v-card>

    <!-- Generation Options -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="generation-card" elevation="2">
          <v-card-title class="text-h6 font-weight-bold">
            <v-icon left color="primary">mdi-account-multiple</v-icon>
            Bulk Generation
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-4">
              Generate fee slips for all active students for the current month.
            </p>
            <v-btn
              color="primary"
              size="large"
              block
              :loading="bulkGenerating"
              @click="generateAllFeeSlips"
              prepend-icon="mdi-receipt-multiple"
            >
              Generate All Fee Slips
            </v-btn>
            <div v-if="bulkResult" class="mt-4">
              <v-alert
                :type="bulkResult.errors.length > 0 ? 'warning' : 'success'"
                border="left"
                colored-border
              >
                <div class="text-body-2">
                  <strong>Generation Complete:</strong><br />
                  ✅ Generated: {{ bulkResult.generated }}<br />
                  ⏭️ Skipped: {{ bulkResult.skipped }}<br />
                  <span v-if="bulkResult.errors.length > 0">
                    ❌ Errors: {{ bulkResult.errors.length }}
                  </span>
                </div>
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="generation-card" elevation="2">
          <v-card-title class="text-h6 font-weight-bold">
            <v-icon left color="primary">mdi-account</v-icon>
            Individual Generation
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-4">
              Generate fee slip for a specific student.
            </p>
            <v-select
              v-model="selectedStudent"
              :items="students"
              item-title="name"
              item-value="id"
              label="Select Student"
              outlined
              prepend-icon="mdi-account-search"
              class="mb-4"
            >
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-avatar size="32">
                      <v-img
                        :src="getStudentAvatar(item.raw)"
                        :alt="item.raw.name"
                      ></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.raw.class_name }} - ID: {{ item.raw.id }}
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>
            <v-btn
              color="success"
              size="large"
              block
              :disabled="!selectedStudent"
              :loading="individualGenerating"
              @click="generateIndividualFeeSlip"
              prepend-icon="mdi-receipt"
            >
              Generate Fee Slip
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Fee Slips List -->
    <v-card class="mt-6" elevation="2">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>
          <h3 class="text-h5 font-weight-bold">Generated Fee Slips</h3>
          <p class="text-subtitle-2 text-medium-emphasis">
            View and manage all generated fee slips
          </p>
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-refresh"
          @click="loadFeeSlips"
          :loading="loading"
        >
          Refresh
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Filters -->
        <v-row class="mb-4">
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.month"
              :items="monthOptions"
              label="Month"
              outlined
              dense
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.year"
              :items="yearOptions"
              label="Year"
              outlined
              dense
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.status"
              :items="statusOptions"
              label="Status"
              outlined
              dense
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="filters.search"
              label="Search"
              outlined
              dense
              prepend-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Fee Slips Table -->
        <v-data-table
          :headers="headers"
          :items="feeSlips"
          :loading="loading"
          :search="filters.search"
          sort-by="generated_at"
          sort-desc
          class="fee-slips-table"
          :items-per-page="10"
          :items-per-page-options="[10, 25, 50]"
          loading-text="Loading fee slips..."
          no-data-text="No fee slips found"
          no-results-text="No fee slips match your search"
        >
          <template v-slot:item.student_name="{ item }">
            <div class="d-flex align-center">
              <v-avatar size="32" class="mr-3">
                <v-img
                  :src="getStudentAvatar(item)"
                  alt="Student Avatar"
                ></v-img>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ item.student_name }}</div>
                <div class="text-caption text-medium-emphasis">
                  ID: {{ item.student_id }}
                </div>
              </div>
            </div>
          </template>

          <template v-slot:item.slip_id="{ item }">
            <v-chip color="primary" outlined small>
              <v-icon left x-small>mdi-receipt</v-icon>
              {{ item.slip_id }}
            </v-chip>
          </template>

          <template v-slot:item.month="{ item }">
            <span class="text-body-2"
              >{{ getMonthName(item.month) }} {{ item.year }}</span
            >
          </template>

          <template v-slot:item.total_amount="{ item }">
            <div class="text-right">
              <span class="font-weight-bold primary--text">
                ₨{{ parseFloat(item.total_amount).toLocaleString() }}
              </span>
            </div>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              text-color="white"
              small
              class="font-weight-medium"
            >
              <v-icon left x-small>{{ getStatusIcon(item.status) }}</v-icon>
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.due_date="{ item }">
            <span class="text-body-2">{{ formatDate(item.due_date) }}</span>
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
                    @click="downloadPDF(item.id)"
                    :loading="downloadingPDF === item.id"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </template>
                <span>Download PDF</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-small
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    @click="printFeeSlip(item.id)"
                    :loading="printingPDF === item.id"
                  >
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                </template>
                <span>Print Fee Slip</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-small
                    color="warning"
                    v-bind="attrs"
                    v-on="on"
                    @click="editStatus(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Status</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-small
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteFeeSlip(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete Fee Slip</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Status Edit Dialog -->
    <v-dialog v-model="showStatusDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          Update Fee Slip Status
        </v-card-title>
        <v-card-text>
          <v-form ref="statusForm" v-model="statusFormValid">
            <v-select
              v-model="editingStatus.status"
              :items="statusOptions"
              label="Status"
              outlined
              required
              :rules="[(v) => !!v || 'Status is required']"
            ></v-select>
            <v-text-field
              v-model="editingStatus.payment_date"
              label="Payment Date"
              type="date"
              outlined
              v-if="editingStatus.status === 'Paid'"
            ></v-text-field>
            <v-select
              v-model="editingStatus.payment_method"
              :items="paymentMethods"
              label="Payment Method"
              outlined
              v-if="editingStatus.status === 'Paid'"
            ></v-select>
            <v-textarea
              v-model="editingStatus.remarks"
              label="Remarks"
              outlined
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showStatusDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="updateStatus"
            :loading="updatingStatus"
            :disabled="!statusFormValid"
          >
            Update Status
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :show="showConfirmDialog"
      @update:show="showConfirmDialog = $event"
      :title="confirmDialog.title"
      :subtitle="confirmDialog.subtitle"
      :message="confirmDialog.message"
      :confirm-text="confirmDialog.confirmText"
      :cancel-text="confirmDialog.cancelText"
      :type="confirmDialog.type"
      :loading="confirmDialog.loading"
      @confirm="confirmDialog.onConfirm"
      @cancel="confirmDialog.onCancel"
    />
  </div>
</template>

<script>
import axios from "axios";
import ConfirmationDialog from "../ConfirmationDialog.vue";

export default {
  name: "FeeSlipGenerator",
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      loading: false,
      bulkGenerating: false,
      individualGenerating: false,
      downloadingPDF: null,
      printingPDF: null,
      updatingStatus: false,
      students: [],
      selectedStudent: null,
      feeSlips: [],
      bulkResult: null,
      showStatusDialog: false,
      showConfirmDialog: false,
      statusFormValid: false,
      editingStatus: {
        id: null,
        status: "",
        payment_date: "",
        payment_method: "",
        remarks: "",
      },
      filters: {
        month: null,
        year: null,
        status: null,
        search: "",
      },
      confirmDialog: {
        title: "",
        subtitle: "",
        message: "",
        confirmText: "",
        cancelText: "",
        type: "info",
        loading: false,
        onConfirm: () => {},
        onCancel: () => {},
      },
      headers: [
        {
          text: "Student",
          value: "student_name",
          sortable: false,
          width: "200px",
        },
        { text: "Slip Number", value: "slip_id", width: "150px" },
        { text: "Month/Year", value: "month", width: "120px" },
        {
          text: "Total Amount",
          value: "total_amount",
          align: "right",
          width: "150px",
        },
        { text: "Status", value: "status", width: "120px" },
        { text: "Due Date", value: "due_date", width: "120px" },
        { text: "Generated", value: "generated_at", width: "120px" },
        { text: "Actions", value: "actions", sortable: false, width: "120px" },
      ],
      monthOptions: [
        { title: "January", value: 1 },
        { title: "February", value: 2 },
        { title: "March", value: 3 },
        { title: "April", value: 4 },
        { title: "May", value: 5 },
        { title: "June", value: 6 },
        { title: "July", value: 7 },
        { title: "August", value: 8 },
        { title: "September", value: 9 },
        { title: "October", value: 10 },
        { title: "November", value: 11 },
        { title: "December", value: 12 },
      ],
      yearOptions: [2024, 2025, 2026, 2027, 2028],
      statusOptions: ["Pending", "Paid", "Overdue", "Cancelled"],
      paymentMethods: ["Cash", "Bank Transfer", "Cheque", "Online"],
    };
  },
  computed: {
    currentMonth() {
      return (
        this.monthOptions.find((m) => m.value === new Date().getMonth() + 1)
          ?.title || ""
      );
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
  mounted() {
    this.loadStudents();
    this.loadFeeSlips();
  },
  methods: {
    async loadStudents() {
      try {
        const response = await axios.get("/api/students");
        this.students = response.data.filter(
          (student) => student.status === "Active"
        );
      } catch (error) {
        console.error("Error loading students:", error);
        this.$toast.error("Failed to load students");
      }
    },

    async loadFeeSlips() {
      this.loading = true;
      try {
        const params = {};
        if (this.filters.month) params.month = this.filters.month;
        if (this.filters.year) params.year = this.filters.year;
        if (this.filters.status) params.status = this.filters.status;

        const response = await axios.get("/api/fee-slips", { params });
        this.feeSlips = response.data;
      } catch (error) {
        console.error("Error loading fee slips:", error);
        this.$toast.error("Failed to load fee slips");
      } finally {
        this.loading = false;
      }
    },

    async generateAllFeeSlips() {
      this.bulkGenerating = true;
      try {
        const response = await axios.post("/api/fee-slips/generate-all", {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        });
        this.bulkResult = response.data;
        this.$toast.success(`Generated ${response.data.generated} fee slips`);
        this.loadFeeSlips();
      } catch (error) {
        console.error("Error generating fee slips:", error);
        this.$toast.error(
          error.response?.data?.error || "Failed to generate fee slips"
        );
      } finally {
        this.bulkGenerating = false;
      }
    },

    async generateIndividualFeeSlip() {
      if (!this.selectedStudent) return;

      console.log(
        "🔧 Generating individual fee slip for student ID:",
        this.selectedStudent
      );

      this.individualGenerating = true;
      try {
        await axios.post("/api/fee-slips/generate", {
          student_id: this.selectedStudent,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        });
        this.$toast.success("Fee slip generated successfully");
        this.loadFeeSlips();
        this.selectedStudent = null;
      } catch (error) {
        console.error("Error generating fee slip:", error);
        this.$toast.error(
          error.response?.data?.error || "Failed to generate fee slip"
        );
      } finally {
        this.individualGenerating = false;
      }
    },

    async downloadPDF(id) {
      this.downloadingPDF = id;
      try {
        const response = await axios.get(`/api/fee-slips/${id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `fee_slip_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        this.$toast.success("PDF downloaded successfully");
      } catch (error) {
        console.error("Error downloading PDF:", error);
        this.$toast.error("Failed to download PDF");
      } finally {
        this.downloadingPDF = null;
      }
    },

    async printFeeSlip(id) {
      this.printingPDF = id;
      try {
        const response = await axios.get(`/api/fee-slips/${id}/pdf`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const printWindow = window.open(url);
        printWindow.onload = () => {
          printWindow.print();
        };

        this.$toast.success("Print window opened");
      } catch (error) {
        console.error("Error printing fee slip:", error);
        this.$toast.error("Failed to print fee slip");
      } finally {
        this.printingPDF = null;
      }
    },

    editStatus(item) {
      this.editingStatus = {
        id: item.id,
        status: item.status,
        payment_date: item.payment_date || "",
        payment_method: item.payment_method || "",
        remarks: item.remarks || "",
      };
      this.showStatusDialog = true;
    },

    async updateStatus() {
      if (!this.$refs.statusForm.validate()) return;

      this.updatingStatus = true;
      try {
        await axios.put(`/api/fee-slips/${this.editingStatus.id}/status`, {
          status: this.editingStatus.status,
          payment_date: this.editingStatus.payment_date,
          payment_method: this.editingStatus.payment_method,
          remarks: this.editingStatus.remarks,
        });

        this.$toast.success("Status updated successfully");
        this.showStatusDialog = false;
        this.loadFeeSlips();
      } catch (error) {
        console.error("Error updating status:", error);
        this.$toast.error("Failed to update status");
      } finally {
        this.updatingStatus = false;
      }
    },

    deleteFeeSlip(id) {
      this.confirmDialog = {
        title: "Delete Fee Slip",
        subtitle: "Are you sure you want to delete this fee slip?",
        message:
          "This action cannot be undone. The fee slip will be permanently removed from the system.",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "error",
        loading: false,
        onConfirm: async () => {
          this.confirmDialog.loading = true;
          try {
            await axios.delete(`/api/fee-slips/${id}`);
            this.$toast.success("Fee slip deleted successfully");
            this.loadFeeSlips();
            this.showConfirmDialog = false;
          } catch (error) {
            console.error("Error deleting fee slip:", error);
            this.$toast.error("Failed to delete fee slip");
          } finally {
            this.confirmDialog.loading = false;
          }
        },
        onCancel: () => {
          this.showConfirmDialog = false;
        },
      };
      this.showConfirmDialog = true;
    },

    getStudentAvatar(student) {
      if (student.profile_image) {
        return `${process.env.VUE_APP_API_URL}/uploads/profile-images/${student.profile_image}`;
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.name || "Unknown"
      )}&background=1976d2&color=fff&size=200`;
    },

    getMonthName(month) {
      return this.monthOptions.find((m) => m.value === month)?.title || month;
    },

    getStatusColor(status) {
      const colors = {
        Pending: "warning",
        Paid: "success",
        Overdue: "error",
        Cancelled: "grey",
      };
      return colors[status] || "primary";
    },

    getStatusIcon(status) {
      const icons = {
        Pending: "mdi-clock",
        Paid: "mdi-check-circle",
        Overdue: "mdi-alert-circle",
        Cancelled: "mdi-close-circle",
      };
      return icons[status] || "mdi-help-circle";
    },

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.fee-slip-generator {
  padding: 24px;
}

.generation-card {
  height: 100%;
}

.fee-slips-table {
  border-radius: 8px;
  overflow: hidden;
}

.action-button-container {
  gap: 8px;
}

.action-button {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-card {
  border: 1px solid #e0e0e0;
}

.student-details-dialog {
  border-radius: 12px;
}
</style>
