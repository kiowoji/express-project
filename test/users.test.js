const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { usersDocs } = require("../mocks/usersDocs");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Users API Tests", () => {
  beforeEach(() => {
    usersDocs.length = 8;
  });

  it("should get a list of users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(8);
        done();
      });
  });

  it("should add a new user", (done) => {
    chai
      .request(app)
      .post("/users")
      .send({
        firstName: "New",
        lastName: "User",
        email: "new@example.com",
        password: "password123",
        age: 25,
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          country: "USA",
        },
        createdAt: "2023-01-01T12:00:00.000Z",
        tags: ["Test"],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .equal("User added successfully");
        expect(res.body).to.have.property("user");
        done();
      });
  });

  it("should get a user by email", (done) => {
    const userEmail = "johndoe@example.com";

    chai
      .request(app)
      .get(`/users/${userEmail}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("email").equal(userEmail);
        done();
      });
  });

  it("should update user data", (done) => {
    const userEmail = "johndoe@example.com";

    chai
      .request(app)
      .put(`/users/${userEmail}`)
      .send({
        firstName: "UpdatedName",
        lastName: "Doe",
        email: "upd@example.com",
        password: "password123",
        age: 30,
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          country: "USA",
        },
        createdAt: "2023-01-01T12:00:00.000Z",
        tags: ["Test"],
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("message")
          .equal("User updated successfully");
        expect(res.body).to.have.property("user");
        expect(res.body.user)
          .to.have.property("firstName")
          .equal("UpdatedName");
        expect(res.body.user).to.have.property("age").equal(30);
        done();
      });
  });

  it("should delete a user", (done) => {
    const userEmail = "bobwilliams@example.com";

    chai
      .request(app)
      .delete(`/users/${userEmail}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("message")
          .equal("User deleted successfully");
        expect(res.body).to.have.property("usersDocs");
        done();
      });
  });

  after(() => {
    usersDocs.length = 8;
  });
});
