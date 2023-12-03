const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { articlesDocs } = require("../mocks/articlesDocs");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Articles API Tests", () => {
  beforeEach(() => {
    articlesDocs.length = 8;
  });

  it("should get a list of articles", (done) => {
    chai
      .request(app)
      .get("/articles")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(8);
        done();
      });
  });

  it("should add a new article", (done) => {
    chai
      .request(app)
      .post("/articles")
      .send({
        name: "New Article - introduction",
        description: "New - text",
        type: "a",
        tags: [],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .equal("Article added successfully");
        expect(res.body).to.have.property("article");
        done();
      });
  });

  it("should update article tags", (done) => {
    const articleName = "Express - introduction";
    const updatedTags = ["Updated", "Tags"];
    chai
      .request(app)
      .put(`/articles/${articleName}`)
      .send(updatedTags)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .equal("Article updated successfully");
        expect(res.body).to.have.property("article");
        expect(res.body.article).to.have.property("name").equal(articleName);
        expect(res.body.article.tags).to.deep.equal(updatedTags);
        done();
      });
  });

  after(() => {
    articlesDocs.length = 8;
  });
});
