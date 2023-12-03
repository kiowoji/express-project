const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students.controller");

const { studentExists } = studentsController.middleware;

router.get("/worst-homework", studentsController.getWorstScore);
router.get("/", studentsController.getStudentsStats);
router.get("/:name", studentExists, studentsController.getStudentByName);

module.exports = router;
