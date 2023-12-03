const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { studentsStats } = require("../mocks/studentsStats");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Students API Tests", () => {
  beforeEach(() => {
    studentsStats.length = 8;
  });

  it("should get a list of students", (done) => {
    chai
      .request(app)
      .get("/students")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(8);
        done();
      });
  });

  it("should get a student by name", (done) => {
    const studentName = "Aimee Zank";

    chai
      .request(app)
      .get(`/students/${studentName}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("name").equal(studentName);
        done();
      });
  });

  it("should get a student with the worst homework grade", (done) => {
    chai
      .request(app)
      .get("/students/worst-homework")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .equal("Student with the worst homework score");
        expect(res.body).to.have.property("student");
        expect(res.body.student).to.have.property("name");
        expect(res.body).to.have.property("worstHomeworkScore");
        done();
      });
  });

  after(() => {
    studentsStats.length = 8;
  });
});
