const request = require("supertest");
const app = require("../app");

describe("GET /air-pollution", () => {
  it("deve retornar erro se nenhuma cidade for passada", async () => {
    const res = await request(app).get("/air-pollution");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("O nome da cidade é obrigatório");
  });
});
