import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import "dotenv/config";
import { baseURL, userID, user, password, book_isbn } from "../helpers/data.js";

let token_response;

describe("API test", () => {
  it("get request", async () => {
    const response = await spec()
      .get(`${baseURL}/BookStore/v1/Books`)
      .inspect();
    const responseB = JSON.stringify(response.body);
    expect(response.statusCode).to.eql(200);
    // expect(responseB).to.include("Git Pocket Guide");
  });

  it.skip("Crate a user", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/User`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it("Generate User Token", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    console.log(token_response);
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  it("Check token", async () => {
    console.log("another it block " + token_response);
  });

  it("Authorize user", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/Authorized`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(200);
    //expect(response.body.result).to.eql("User authorized successfully.");
  });

  it("Add book to user acount", async () => {
    const response = await spec()
      .post(`${baseURL}/BookStore/v1/Books`)
      .withBearerToken(token_response)
      .withBody({
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: book_isbn,
          },
        ],
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it("User books", async () => {
    const response = await spec()
      .get(`${baseURL}/Account/v1/User/${userID}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(200);
  });

  it("Delete all books", async () => {
    const response = await spec()
      .delete(`${baseURL}/BookStore/v1/Books/${userID}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(204);
  });

  it("User books", async () => {
    const response = await spec()
      .get(`${baseURL}/Account/v1/User/${userID}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(200);
  });
});
