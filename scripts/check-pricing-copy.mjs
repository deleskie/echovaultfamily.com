import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const checks = [
  {
    path: "config/i18n.js",
    must: ["20-year", "optional renewal"],
    forbid: ["lifetime", "no subscriptions"]
  },
  {
    path: "config/locales/es.js",
    must: ["20 a\u00f1os", "renovaci\u00f3n opcional"],
    forbid: ["por vida"]
  },
  {
    path: "config/locales/hu.js",
    must: ["20 \u00e9ves", "opcion\u00e1lis meg\u00faj\u00edt\u00e1s"],
    forbid: ["\u00e9lettartam", "nincs el\u0151fizet\u00e9s"]
  },
  {
    path: "config/locales/fr.js",
    must: ["20 ans", "renouvellement optionnel"],
    forbid: ["\u00e0 vie"]
  }
];

const failures = [];

checks.forEach((entry) => {
  const fullPath = resolve(process.cwd(), entry.path);
  const content = readFileSync(fullPath, "utf8").toLowerCase();
  entry.must.forEach((needle) => {
    if (!content.includes(String(needle).toLowerCase())) {
      failures.push(`${entry.path}: missing "${needle}"`);
    }
  });
  entry.forbid.forEach((needle) => {
    if (content.includes(String(needle).toLowerCase())) {
      failures.push(`${entry.path}: forbidden "${needle}"`);
    }
  });
});

if (failures.length) {
  console.error("Pricing copy checks failed:");
  failures.forEach((msg) => console.error(`- ${msg}`));
  process.exit(1);
}

console.log("Pricing copy checks passed.");
