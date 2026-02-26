const request = require("supertest");
const fs = require("fs");
const path = require("path");
const { app, DATA_FILE, readMessages, saveMessages } = require("../app");

const ADMIN_HEADER = { "x-admin-token": "ZIAD_ADMIN_TOKEN" };

beforeEach(() => {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, "[]", "utf-8");
});

test("GET /api/admin/stats -> 401 sans token", async () => {
  const res = await request(app).get("/api/admin/stats");
  expect(res.statusCode).toBe(401);
  expect(res.body.error).toBeTruthy();
});

test("GET /api/admin/stats -> 200 avec token + stats cohérentes", async () => {
  // Créer 3 messages via l’API contact
  await request(app).post("/api/contact").send({
    name: "Ziad",
    email: "ziad@gmail.com",
    message: "Bonjour",
  });

  await request(app).post("/api/contact").send({
    name: "Test",
    email: "toto@outlook.com",
    message: "Hello",
  });

  await request(app).post("/api/contact").send({
    name: "Ali",
    email: "ali@gmail.com",
    message: "Salam",
  });

  // Marquer 1 message comme lu + forcer une date ancienne pour tester byMonth / lastMessageAt
  const all = readMessages();
  all[1].read = true;

  // message[2] = il y a 40 jours (mois précédent potentiellement)
  const dOld = new Date();
  dOld.setDate(dOld.getDate() - 40);
  all[2].createdAt = dOld.toISOString();

  saveMessages(all);

  // Appel stats
  const res = await request(app).get("/api/admin/stats").set(ADMIN_HEADER);

  expect(res.statusCode).toBe(200);

  // Vérifs de base
  expect(res.body.total).toBe(3);
  expect(res.body.readCount).toBe(1);
  expect(res.body.unread).toBe(2);

  // lastMessageAt doit exister (et être une string ISO ou null)
  expect(res.body.lastMessageAt).toBeTruthy();

  // On vérifie juste que c'est bien un tableau non vide et que la somme = total
  expect(Array.isArray(res.body.byMonth)).toBe(true);
  expect(res.body.byMonth.length).toBeGreaterThan(0);

  const sum = res.body.byMonth.reduce((acc, x) => acc + (x.count || 0), 0);
  expect(sum).toBe(3);
});