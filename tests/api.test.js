import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import "dotenv/config";

describe("API tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get("https://demoqa.com/BookStore/v1/Books")
      .inspect();
    const responseB = JSON.stringify(response.body);
    console.log("is dotenv work ?" + " " + process.env.SECRET_PASSWORD);
    expect(response.statusCode).to.eql(200);
    // expect(responseB).to.include("Learning JavaScript Design Paettrns");
  });

  it("Crate a user", async () => {
    const response = await spec()
      .post("https://demoqa.com/Account/v1/User")
      .withBody({
        userName: "test_warez_pmqa",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
    // "userID": "680d40ae-540a-4766-a846-fdd8687fe9e1"
  });
});
