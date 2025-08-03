<template>
  <v-dialog v-model="dialogVisible" max-width="500" persistent>
    <v-card class="confirmation-dialog-card" elevation="24">
      <v-card-title class="pa-6 pb-0">
        <div class="d-flex align-center">
          <v-avatar
            size="50"
            :color="
              dialogType === 'error'
                ? 'error'
                : dialogType === 'warning'
                ? 'warning'
                : 'info'
            "
            class="mr-4"
          >
            <v-icon size="24" color="white">
              {{
                dialogType === "error"
                  ? "mdi-delete"
                  : dialogType === "warning"
                  ? "mdi-alert"
                  : "mdi-information"
              }}
            </v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 font-weight-bold" :class="`text-${dialogType}`">
              {{ title }}
            </h3>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <div class="text-center">
          <p class="text-body-1 mb-4">
            {{ message }}
          </p>
          <v-alert
            :type="dialogType"
            class="mt-4"
            border="left"
            colored-border
            v-if="warning"
          >
            <strong>{{ warningTitle }}:</strong> {{ warning }}
          </v-alert>
        </div>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" :disabled="loading" class="mr-3">
          {{ cancelText }}
        </v-btn>
        <v-btn
          :color="
            dialogType === 'error'
              ? 'error'
              : dialogType === 'warning'
              ? 'warning'
              : 'primary'
          "
          @click="confirm"
          :loading="loading"
          rounded
        >
          <v-icon left>{{ confirmIcon }}</v-icon>
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Confirm Action",
    },
    subtitle: {
      type: String,
      default: "Please confirm this action",
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    confirmIcon: {
      type: String,
      default: "mdi-check",
    },
    type: {
      type: String,
      default: "info", // info, warning, error
      validator: (value) => ["info", "warning", "error"].includes(value),
    },
    warning: {
      type: String,
      default: "",
    },
    warningTitle: {
      type: String,
      default: "Warning",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    dialogType() {
      return this.type;
    },
    dialogVisible: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
  },
  methods: {
    confirm() {
      if (typeof this.onConfirm === "function") {
        this.onConfirm();
      }
      this.$emit("confirm");
      this.$emit("update:show", false);
    },
    cancel() {
      if (typeof this.onCancel === "function") {
        this.onCancel();
      }
      this.$emit("cancel");
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.confirmation-dialog-card {
  background: white !important;
  border: 1px solid #e9ecef !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2) !important;
  font-family: "Inter", sans-serif !important;
}

.text-error {
  color: #f44336 !important;
}

.text-warning {
  color: #ff9800 !important;
}

.text-info {
  color: #2196f3 !important;
}
</style>
