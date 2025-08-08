<template>
  <div class="modern-classes-page">
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
                  All Classes
                </h1>
                <p class="text-h6 text-white-70 mb-6 elegant-subtitle">
                  Browse and manage all classes in the school
                </p>
                <v-chip
                  color="white"
                  text-color="primary"
                  large
                  class="header-chip"
                >
                  <v-icon left>mdi-school</v-icon>
                  {{ classesList.length }} Classes Available
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
                        Key Performance Indicators
                      </h2>
                      <p class="text-h6 text-medium-emphasis mb-0">
                        Real-time insights into student enrollment and academic
                        metrics
                      </p>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container purple">
                      <v-icon size="32" color="white">mdi-account-group</v-icon>
                    </div>
                    <div class="stat-card__number">{{ totalStudents }}</div>
                    <div class="stat-card__label">TOTAL STUDENTS</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Active</span>
                      <span class="sub-value">{{ activeStudents }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container blue">
                      <v-icon size="32" color="white">mdi-gender-male</v-icon>
                    </div>
                    <div class="stat-card__number">{{ maleStudents }}</div>
                    <div class="stat-card__label">MALE STUDENTS</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Enrolled</span>
                      <span class="sub-value">{{ maleStudents }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container pink">
                      <v-icon size="32" color="white">mdi-gender-female</v-icon>
                    </div>
                    <div class="stat-card__number">{{ femaleStudents }}</div>
                    <div class="stat-card__label">FEMALE STUDENTS</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Enrolled</span>
                      <span class="sub-value">{{ femaleStudents }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="enterprise-stat-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8 text-center">
                    <div class="stat-card__icon-container orange">
                      <v-icon size="32" color="white">mdi-school</v-icon>
                    </div>
                    <div class="stat-card__number">
                      {{ classesList.length }}
                    </div>
                    <div class="stat-card__label">ACTIVE CLASSES</div>
                    <div class="stat-card__sub-metric">
                      <span class="sub-label">Running</span>
                      <span class="sub-value">{{ classesList.length }}</span>
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
                  @click="$router.push('/admission')"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="primary"
                        >mdi-account-plus</v-icon
                      >
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      New Admission
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Register new students with complete information
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="$router.push('/students')"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="primary"
                        >mdi-account-search</v-icon
                      >
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      Search Students
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      Find and view student information quickly
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="$router.push('/admission-records')"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="primary"
                        >mdi-clipboard-list</v-icon
                      >
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      All Admission Records
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      View all admission form records
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3" class="mb-4">
                <v-card
                  class="glass-action-card"
                  @click="$router.push('/left-students')"
                  hover
                  elevation="0"
                  rounded="xl"
                >
                  <div class="glass-overlay"></div>
                  <v-card-text class="pa-6 text-center position-relative">
                    <v-avatar size="64" class="mb-4 glass-icon-avatar">
                      <v-icon size="32" color="warning"
                        >mdi-account-remove</v-icon
                      >
                    </v-avatar>
                    <h3
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-2 glass-text elegant-card-title"
                      style="font-size: 1.1rem"
                    >
                      Left Students
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1 mb-0 glass-text elegant-card-title"
                    >
                      View and manage students who have left
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Classes List Section -->
            <v-row class="mb-8">
              <v-col cols="12">
                <div class="classes-header mb-6">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <h2 class="text-h4 font-weight-bold primary--text mb-2">
                        School Classes
                      </h2>
                      <p class="text-subtitle-1 text-medium-emphasis">
                        Manage and monitor all classes with student information
                      </p>
                    </div>
                    <div class="classes-stats">
                      <v-chip
                        color="success"
                        variant="tonal"
                        size="large"
                        prepend-icon="mdi-check-circle"
                      >
                        {{ classesList.length }} Classes Available
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12">
                <!-- Search Section -->
                <v-card class="search-card mb-6" elevation="0" rounded="xl">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center">
                      <v-icon size="24" color="primary" class="mr-3"
                        >mdi-magnify</v-icon
                      >
                      <v-text-field
                        v-model="searchQuery"
                        placeholder="Search classes by name, section, or student count..."
                        variant="outlined"
                        density="comfortable"
                        hide-details
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        class="search-input"
                        style="max-width: 400px"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        variant="elevated"
                        size="small"
                        prepend-icon="mdi-refresh"
                        @click="refreshData()"
                        class="refresh-btn mr-4"
                        :loading="loading"
                        :disabled="loading"
                      >
                        Refresh
                      </v-btn>
                      <v-chip color="info" variant="tonal" size="small">
                        {{ filteredClasses.length }} of
                        {{ classesList.length }} classes
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card class="classes-card" elevation="0" rounded="xl">
                  <v-card-text class="pa-8">
                    <div v-if="classesList.length === 0" class="empty-state">
                      <v-icon size="64" color="grey-lighten-1" class="mb-4"
                        >mdi-school-outline</v-icon
                      >
                      <h3 class="text-h5 text-grey-darken-1 mb-2">
                        No Classes Found
                      </h3>
                      <p class="text-body-1 text-grey">
                        No classes have been created yet.
                      </p>
                    </div>

                    <div
                      v-else-if="filteredClasses.length === 0"
                      class="empty-state"
                    >
                      <v-icon size="64" color="grey-lighten-1" class="mb-4"
                        >mdi-magnify-close</v-icon
                      >
                      <h3 class="text-h5 text-grey-darken-1 mb-2">
                        No Classes Found
                      </h3>
                      <p class="text-body-1 text-grey">
                        No classes match your search criteria.
                      </p>
                    </div>

                    <div v-else class="classes-grid">
                      <div
                        v-for="classItem in filteredClasses"
                        :key="classItem.id"
                        class="class-item"
                      >
                        <div class="class-icon">
                          <v-icon size="32" color="white">mdi-school</v-icon>
                        </div>
                        <div class="class-info">
                          <h3 class="class-name">{{ classItem.name }}</h3>
                          <p class="class-details">
                            {{ classItem.studentsCount }} Students •
                            {{ classItem.section }}
                          </p>
                          <div class="class-progress">
                            <v-progress-linear
                              :model-value="
                                (classItem.studentsCount / 100) * 100
                              "
                              color="primary"
                              height="4"
                              rounded
                            ></v-progress-linear>
                            <span class="progress-text"
                              >Capacity: {{ classItem.studentsCount }}/100</span
                            >
                          </div>
                        </div>
                        <div class="class-actions">
                          <v-btn
                            color="primary"
                            variant="elevated"
                            size="small"
                            prepend-icon="mdi-account-group"
                            @click.stop="viewClassStudents(classItem)"
                            class="view-students-btn"
                          >
                            View Students
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthData } from "@/utils/cookies";

export default {
  name: "Classes",
  data() {
    return {
      loading: false,
      classesList: [],
      students: [],
      searchQuery: "",
    };
  },
  computed: {
    totalStudents() {
      return this.students.length;
    },
    activeStudents() {
      return this.students.filter((student) => student.status === "Active")
        .length;
    },
    maleStudents() {
      return this.students.filter(
        (student) => student.gender === "Male" && student.status === "Active"
      ).length;
    },
    femaleStudents() {
      return this.students.filter(
        (student) => student.gender === "Female" && student.status === "Active"
      ).length;
    },
    filteredClasses() {
      if (!this.searchQuery.trim()) {
        return this.classesList;
      }

      const query = this.searchQuery.toLowerCase().trim();
      return this.classesList.filter((classItem) => {
        return (
          classItem.name.toLowerCase().includes(query) ||
          classItem.section.toLowerCase().includes(query) ||
          classItem.studentsCount.toString().includes(query)
        );
      });
    },
  },
  async mounted() {
    await this.loadStudents();
    await this.loadClassesList();
  },
  methods: {
    async loadStudents() {
      this.loading = true;
      try {
        const authData = getAuthData();
        const response = await axios.get("/api/students", {
          headers: { Authorization: authData?.token },
        });
        this.students = response.data;
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        this.loading = false;
      }
    },

    async loadClassesList() {
      try {
        const authData = getAuthData();
        const response = await axios.get("/api/students/classes", {
          headers: { Authorization: authData?.token },
        });

        // Transform the classes data to include student counts
        this.classesList = response.data.map((classItem) => {
          const studentsInClass = this.students.filter(
            (s) => s.class_id === classItem.id && s.status === "Active"
          );

          return {
            id: classItem.id,
            name: classItem.name,
            section: classItem.section || "A",
            studentsCount: studentsInClass.length,
          };
        });
      } catch (error) {
        console.error("Error loading classes list:", error);
      }
    },

    viewClassDetails(classItem) {
      // Navigate to class details page
      this.$router.push(`/classes/${classItem.id}`);
    },

    viewClassStudents(classItem) {
      // Navigate to class students page using class name
      const className = classItem.name.toLowerCase().replace(/\s+/g, "-");
      this.$router.push(`/classes/${className}/students`);
    },

    async refreshData() {
      this.loading = true;
      try {
        // Clear search query
        this.searchQuery = "";

        // Clear existing data first
        this.students = [];
        this.classesList = [];

        // Reload data
        await this.loadStudents();
        await this.loadClassesList();
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        this.loading = false;
      }
    },

    scrollToClasses() {
      // Scroll to the classes list section
      const classesSection = document.querySelector(".classes-header");
      if (classesSection) {
        classesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Modern Classes Page Design */
.modern-classes-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Search Card Styles */
.search-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.search-input {
  font-family: "Inter", sans-serif;
}

.search-input .v-field__input {
  font-size: 1rem;
  font-weight: 500;
}

.search-input .v-field__outline {
  border-color: rgba(0, 0, 0, 0.2) !important;
  border-width: 1px !important;
}

.search-input .v-field--focused .v-field__outline {
  border-color: #3b82f6 !important;
  border-width: 2px !important;
}

/* Refresh Button Styles */
.refresh-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  z-index: 10 !important;
  cursor: pointer !important;
}

.refresh-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
}

.refresh-btn:active {
  transform: translateY(0) !important;
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

/* Enterprise Section Header */
.enterprise-section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
  animation: fadeInUp 0.3s ease-out;
}

.kpi-section-with-border {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 0, 0, 0.6);
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

.enterprise-section-header .v-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

.kpi-header-avatar {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  ) !important;
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4) !important;
  border: 3px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.kpi-header-avatar::before {
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
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.kpi-header-avatar:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 16px 45px rgba(102, 126, 234, 0.5) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.kpi-header-avatar .v-icon {
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.4s ease;
}

.kpi-header-avatar:hover .v-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

/* Enterprise Stat Cards Styling */
.enterprise-stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 3px solid rgba(0, 0, 0, 0.4) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
  position: relative;
  height: 100%;
  min-height: 200px;
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
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 24px !important;
}

.enterprise-stat-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;
  border-color: rgba(0, 0, 0, 0.6) !important;
}

.enterprise-stat-card:hover::before {
  opacity: 1;
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

.stat-card__icon-container.purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
}

.stat-card__icon-container.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.stat-card__icon-container.pink {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
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
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.4s ease;
}

.enterprise-stat-card:hover .stat-card__sub-metric {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(102, 126, 234, 0.2);
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

/* Classes List Styling */
.classes-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(25px);
  border: 3px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.classes-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.18);
  border-color: rgba(0, 0, 0, 0.6);
}

.classes-stats {
  display: flex;
  align-items: center;
}

.classes-stats .v-chip {
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

.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.class-item {
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.class-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.class-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.95);
}

.class-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 18px;
  margin-right: 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.class-item:hover .class-icon {
  transform: scale(1.05);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.class-info {
  flex: 1;
  min-width: 0;
}

.class-name {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: #1e293b;
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.class-details {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 12px 0;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
}

.class-details::before {
  content: "•";
  margin: 0 8px;
  color: #94a3b8;
}

.class-progress {
  margin-top: 12px;
}

.progress-text {
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
  display: block;
}

.class-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
  min-width: 120px;
}

.view-students-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.view-students-btn:hover {
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

/* Responsive Classes Grid */
@media (max-width: 768px) {
  .classes-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .class-item {
    padding: 16px;
  }

  .class-icon {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }

  .class-name {
    font-size: 1.1rem;
  }

  .class-details {
    font-size: 0.85rem;
  }
}

/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");

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
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(236, 72, 153, 0.1) 100%
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
</style>
