import assert from "node:assert/strict";
import { getTranslations } from "../config/i18n.js";

const locales = ["en", "FR", "ES", "HU"];

for (const locale of locales) {
  const t = getTranslations(locale);
  const tiers = t?.pricing?.tiers || [];
  const heirloom = tiers.find((tier) => tier.id === "heirloom");

  assert.ok(heirloom, `${locale}: missing heirloom tier`);
  assert.ok(heirloom.hosting, `${locale}: missing heirloom hosting copy`);
  assert.ok(
    !/lifetime|à vie|de por vida|élettartam/i.test(heirloom.hosting),
    `${locale}: heirloom hosting should not use lifetime wording`
  );
  assert.ok(/20/.test(heirloom.hosting), `${locale}: heirloom hosting should mention 20-year term`);
  assert.ok(t?.pricing?.trustNote, `${locale}: missing pricing trust note`);
}

console.log("pricing copy checks passed");
