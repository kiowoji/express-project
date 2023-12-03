const { studentsStats } = require("../mocks/studentsStats");

const studentExists = (req, res, next) => {
  const studentName = req.params.name;
  const student = studentsStats.find((student) => student.name === studentName);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  req.student = student;
  next();
};

module.exports = {
  studentExists,
};