const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllStudents,
  getStudentById,
  getStudentByAdmissionNumber,
  addStudent,
  updateStudent,
  deleteStudent,
  getClasses,
  getClassById,
  searchStudents,
  addClass,
  addMultipleClasses,
  promoteStudents,
  markStudentsLeft,
  reactivateStudent,
  upload,
} = require("../controllers/studentController");

// Apply middleware to all routes (temporarily disabled for development)
// router.use(verifyToken);

// Get all students
router.get("/", getAllStudents);

// Get classes for dropdown
router.get("/classes", getClasses);

// Get class by ID
router.get("/classes/:classId", getClassById);

// Add new class
router.post("/classes", addClass);

// Add multiple classes
router.post("/classes/multiple", addMultipleClasses);

// Search students
router.get("/search", searchStudents);

// Promote students to new class
router.put("/promote", promoteStudents);

// Mark students as left
router.put("/mark-left", markStudentsLeft);

// Reactivate student
router.put("/:id/reactivate", reactivateStudent);

// Get student by admission number
router.get("/admission/:admissionNumber", getStudentByAdmissionNumber);



// Get student by ID
router.get("/:id", getStudentById);

// Add new student
router.post(
  "/",
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "admission_form", maxCount: 1 },
  ]),
  addStudent
);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
