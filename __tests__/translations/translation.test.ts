import * as fs from "fs";
import * as path from "path";

const enJsonPath = path.join(
  __dirname,
  "../../public/locales/en/translation.json"
);

const thJsonPath = path.join(
  __dirname,
  "../../public/locales/th/translation.json"
);
const enJson = JSON.parse(fs.readFileSync(enJsonPath, "utf8"));

const thJson = JSON.parse(fs.readFileSync(thJsonPath, "utf8"));

describe("en.json", () => {
  test('Check Project Translations"', () => {
    expect(enJson).toHaveProperty("projects", "Projects");
  });
});

describe("th.json", () => {
  test('Check Project Translations"', () => {
    expect(thJson).toHaveProperty("projects", "โครงการ");
  });
});
