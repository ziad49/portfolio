process.env.ADMIN_TOKEN = "ZIAD_ADMIN_TOKEN";

const request = require("supertest");
const fs = require("fs");
const path = require("path");
const { app, DATA_FILE } = require("../app");

const ADMIN_HEADER = { "x-admin-token": "ZIAD_ADMIN_TOKEN" };

beforeEach(() => {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, "[]", "utf-8");
});

test("GET /api/messages -> 401 sans token", async () => {
  const res = await request(app).get("/api/messages");
  expect(res.statusCode).toBe(401);
});

test("GET /api/messages -> 200 avec token et retourne les messages", async () => {
  // créer un message via l’API contact
  await request(app).post("/api/contact").send({
    name: "Ziad",
    email: "ziad@gmail.com",
    message: "Bonjour",
  });

  const res = await request(app).get("/api/messages").set(ADMIN_HEADER);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
  expect(res.body[0].read).toBe(false);
});

test("PATCH /api/messages/:id -> marque comme lu", async () => {
  const create = await request(app).post("/api/contact").send({
    name: "Ziad",
    email: "ziad@gmail.com",
    message: "Bonjour",
  });

  // récupérer l’id via lecture fichier (simple)
  const saved = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const id = saved[0].id;

  const res = await request(app)
    .patch(`/api/messages/${id}`)
    .set(ADMIN_HEADER)
    .send({ read: true });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);

  const after = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  expect(after[0].read).toBe(true);
});

test("DELETE /api/messages/:id -> supprime", async () => {
  await request(app).post("/api/contact").send({
    name: "Ziad",
    email: "ziad@gmail.com",
    message: "Bonjour",
  });

  const saved = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const id = saved[0].id;

  const res = await request(app)
    .delete(`/api/messages/${id}`)
    .set(ADMIN_HEADER);

  expect(res.statusCode).toBe(200);

  const after = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  expect(after.length).toBe(0);
});
