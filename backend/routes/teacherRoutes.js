const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  searchTeachers,
} = require("../controllers/teacherController");

// Apply middleware to all routes
router.use(verifyToken);

// Get all teachers
router.get("/", getAllTeachers);

// Search teachers
router.get("/search", searchTeachers);

// Get teacher by ID
router.get("/:id", getTeacherById);

// Add new teacher
router.post("/", addTeacher);

// Update teacher
router.put("/:id", updateTeacher);

// Delete teacher
router.delete("/:id", deleteTeacher);

module.exports = router; 