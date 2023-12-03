const { studentsStats } = require("../mocks/studentsStats");
const studentsMiddleware = require("../middlewares/students.mdware");
const { studentExists } = studentsMiddleware;

exports.getStudentsStats = (req, res) => {
  res.json(studentsStats);
};

exports.getStudentByName = (req, res) => {
  const student = req.student;
  res.json(student);
};

exports.getWorstScore = (req, res) => {
  let worstHomeworkScore = Infinity;
  let studentWithWorstHomework = null;

  studentsStats.forEach((student) => {
    const homeworkScore = student.scores.find(
      (score) => score.type === "homework"
    ).score;

    if (homeworkScore < worstHomeworkScore) {
      worstHomeworkScore = homeworkScore;
      studentWithWorstHomework = student;
    }
  });

  if (!studentWithWorstHomework) {
    return res
      .status(404)
      .json({ error: "No student found with homework scores" });
  }

  res.json({
    message: "Student with the worst homework score",
    student: studentWithWorstHomework,
    worstHomeworkScore: worstHomeworkScore,
  });
};

exports.middleware = {
  studentExists,
};