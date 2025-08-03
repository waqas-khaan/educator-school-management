<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 primary--text">
        <v-icon left color="primary">mdi-file-document-box-multiple</v-icon>
        All Admission Records
      </v-card-title>
      <v-card-subtitle class="text-body-2 text-medium-emphasis">
        Showing admission details including the class at the time of admission
      </v-card-subtitle>
      <v-card-text>
        <!-- Search and Export Bar -->
        <v-row class="mb-4" align="center">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              label="Search students..."
              clearable
              outlined
              dense
              hide-details
              @input="filterAdmissions"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8" class="text-right">
            <v-btn
              v-if="selected.length > 0"
              color="warning"
              prepend-icon="mdi-close"
              @click="clearSelection"
              class="mr-2"
            >
              Clear Selection ({{ selected.length }})
            </v-btn>
            <v-btn
              color="success"
              prepend-icon="mdi-download"
              @click="exportToCSV"
              :loading="exporting"
              :disabled="selected.length === 0"
            >
              Export Selected ({{ selected.length }})
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="filteredAdmissions"
          :loading="loading"
          class="elevation-1"
          item-key="id"
          dense
          show-select
          :single-select="false"
        >
          <template v-slot:item.admission_date="{ item }">
            {{ new Date(item.admission_date).toLocaleDateString() }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";

export default {
  name: "AdmissionRecords",
  data() {
    return {
      admissions: [],
      filteredAdmissions: [],
      searchQuery: "",
      loading: false,
      exporting: false,
      selected: [],
      headers: [
        { text: "ID", value: "id", width: 60 },
        { text: "Name", value: "name" },
        { text: "Father's Name", value: "father_name" },
        { text: "Admission Number", value: "admission_number" },
        { text: "Admission Class", value: "class_name" },
        { text: "Admission Date", value: "admission_date" },
        { text: "CNIC", value: "cnic" },
        { text: "Phone", value: "phone" },
        { text: "Gender", value: "gender" },
        { text: "Address", value: "address" },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const authData = getAuthData();
      const response = await axios.get("http://localhost:8081/api/students", {
        headers: { Authorization: authData?.token },
      });
      this.admissions = response.data;
      this.filteredAdmissions = [...this.admissions];
    } catch (error) {
      console.error("Error loading admission records:", error);
      this.$toast?.error("Failed to load admission records");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    filterAdmissions() {
      if (!this.searchQuery.trim()) {
        this.filteredAdmissions = [...this.admissions];
        return;
      }

      const query = this.searchQuery.toLowerCase().trim();
      this.filteredAdmissions = this.admissions.filter((student) => {
        return (
          student.name?.toLowerCase().includes(query) ||
          student.father_name?.toLowerCase().includes(query) ||
          student.admission_number?.toLowerCase().includes(query) ||
          student.class_name?.toLowerCase().includes(query) ||
          student.cnic?.toLowerCase().includes(query) ||
          student.phone?.toLowerCase().includes(query) ||
          student.gender?.toLowerCase().includes(query) ||
          student.address?.toLowerCase().includes(query)
        );
      });
    },
    clearSelection() {
      this.selected = [];
    },
    exportToCSV() {
      this.exporting = true;

      try {
        // Use selected items if any are selected, otherwise use all filtered items
        const dataToExport =
          this.selected.length > 0 ? this.selected : this.filteredAdmissions;

        // Define CSV headers
        const csvHeaders = [
          "ID",
          "Name",
          "Father's Name",
          "Admission Number",
          "Admission Class",
          "Admission Date",
          "CNIC",
          "Phone",
          "Gender",
          "Address",
        ];

        // Convert data to CSV format
        const csvData = dataToExport.map((student) => [
          student.id,
          student.name || "",
          student.father_name || "",
          student.admission_number || "",
          student.class_name || "",
          new Date(student.admission_date).toLocaleDateString(),
          student.cnic || "",
          student.phone || "",
          student.gender || "",
          student.address || "",
        ]);

        // Combine headers and data
        const csvContent = [
          csvHeaders.join(","),
          ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
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
          `admission_records_${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const exportCount =
          this.selected.length > 0
            ? this.selected.length
            : this.filteredAdmissions.length;
        const exportType = this.selected.length > 0 ? "selected" : "filtered";
        this.$toast?.success(
          `Exported ${exportCount} ${exportType} records to CSV`
        );
      } catch (error) {
        this.$toast?.error("Failed to export CSV");
        console.error("Export error:", error);
      } finally {
        this.exporting = false;
      }
    },
  },
};
</script>
