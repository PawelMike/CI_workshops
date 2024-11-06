import { expect } from "chai"
import pkg from "pactum";
const {spec } = pkg;

describe("API tests", () => {
    it("get request", async () => {
        const response = await spec()
        .get("https://demoqa.com/BookStore/v1/Books")
        .inspect()
        expect(response.statusCode).to.eql(200)
    })
})