const request = require("supertest");
const nock = require("nock");
const { app } = require("../app");

const ENDPOINT = "/api/github/projects";

describe("GitHub Projects API", () => {
  beforeAll(() => {
    nock.disableNetConnect();
    nock.enableNetConnect(/(127\.0\.0\.1|localhost)/);
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("GET " + ENDPOINT + " -> 200 et renvoie des projets formatés", async () => {
    process.env.GITHUB_USER = "ziad49";

    nock("https://api.github.com")
      .get("/users/ziad49/repos")
      .query(true)
      .reply(200, [
        {
          name: "portfolio",
          description: "mon portfolio",
          language: "JavaScript",
          stargazers_count: 2,
          html_url: "https://github.com/ziad49/portfolio",
          homepage: "https://ziad49.github.io/portfolio",
          updated_at: "2026-02-26T11:34:23Z",
        },
      ]);

    const res = await request(app).get(ENDPOINT);

    expect(res.statusCode).toBe(200);
    expect(res.body.source).toBe("github");
    expect(Array.isArray(res.body.projects)).toBe(true);
    expect(res.body.projects.length).toBe(1);

    const p = res.body.projects[0];
    expect(p.name).toBe("portfolio");
    expect(p.description).toBe("mon portfolio");
    expect(p.language).toBe("JavaScript");
    expect(p.stars).toBe(2);
    expect(p.url).toBe("https://github.com/ziad49/portfolio");
    expect(p.homepage).toBe("https://ziad49.github.io/portfolio");
    expect(p.updatedAt).toBe("2026-02-26T11:34:23Z");
  });

  test("GET " + ENDPOINT + " -> 500 si GitHub est indisponible", async () => {
    process.env.GITHUB_USER = "ziad49";

    nock("https://api.github.com")
      .get("/users/ziad49/repos")
      .query(true)
      .reply(500, { message: "GitHub error" });

    const res = await request(app).get(ENDPOINT);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
  });
});