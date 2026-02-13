const request = require("supertest");
const fs = require("fs");
process.env.ADMIN_TOKEN = "ZIAD_ADMIN_TOKEN";
const { app, DATA_FILE } = require("../app");

beforeEach(() => {
  // on remet le fichier à [] avant chaque test
  fs.mkdirSync(require("path").dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, "[]", "utf-8");
});

test("POST /api/contact -> 200 et enregistre un message", async () => {
  const res = await request(app)
    .post("/api/contact")
    .send({ name: "Ziad", email: "ziad@gmail.com", message: "Bonjour" });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.id).toBeTruthy();

  const saved = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  expect(saved.length).toBe(1);
  expect(saved[0].name).toBe("Ziad");
  expect(saved[0].email).toBe("ziad@gmail.com");
  expect(saved[0].message).toBe("Bonjour");
});

test("POST /api/contact -> 400 si champs manquants", async () => {
  const res = await request(app)
    .post("/api/contact")
    .send({ name: "Ziad", email: "ziad@gmail.com" });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test("POST /api/contact -> 400 si email invalide", async () => {
  const res = await request(app)
    .post("/api/contact")
    .send({ name: "Ziad", email: "ziadgmail.com", message: "Hello" });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Email invalide");
});
