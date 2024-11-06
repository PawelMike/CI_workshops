import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import "dotenv/config";
import { baseURL, userID } from "../helpers/data.js"

describe("API tests", () => {
  it("get request", async () => {
    const response = await spec().get(`${baseURL}/BookStore/v1/Books1`)
    const responseB = JSON.stringify(response.body);
    expect(response.statusCode).to.eql(200);
    // expect(responseB).to.include("Git Pocket Guide");
  });

  it("Crate a user", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/User`)
      .withBody({
        userName: "test_warez_pmqa",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });
});
