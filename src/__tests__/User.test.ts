import request from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../core/app';
import createConnection from '../database';

// antes de todo test precisa deletar o database test
// Tudo está me um arquivo porque no windows dá bosta colocar em dois, lembre-se o que aconteceu

describe("User", () => {
  beforeAll(async () => {
    // antes de tudo
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    //É como estivesse fazendo uma falsa requisição
    const response = await request(app).post("/users").send({
      email: "Kyra.Leffler@hotmail.com",
      name: "Ivan Smith Sr."
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "Kyra.Leffler@hotmail.com",
      name: "Levi MacGyver"
    });

    expect(response.status).toBe(400);
  });
});