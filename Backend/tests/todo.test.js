const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("Simple API tests", () => {
  
  test("GET /todo should respond with a status code", async () => {
    const res = await request(app).get("/todo");
    expect(res.statusCode).toBeTruthy();
    console.log(res.body)
  });

  test("POST /todo should return 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/todo")
      .send({});
    expect(res.statusCode).toBe(400);
  });

  afterAll(async () => {
    await mongoose.connection.close();  
  });

});
