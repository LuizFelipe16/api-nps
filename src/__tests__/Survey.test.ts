import request from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../core/app';
import createConnection from '../database';

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Regional Mobility Agent",
      description: "Departament assistence is good?"
    });

    expect(response.status).toBe(201);
    expect(response.body.survey).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Forward Web Liaison",
      description: "Forward Web is good?"
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});