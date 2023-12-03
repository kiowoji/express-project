const { studentsStats } = require("../mocks/studentsStats");
const createError = require("http-errors");

const studentExists = (req, res, next) => {
  const studentName = req.params.name;
  const student = studentsStats.find((student) => student.name === studentName);

  if (!student) {
    return next(createError(404, "Student not found"));
  }

  req.student = student;
  next();
};

module.exports = {
  studentExists,
};