import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { nextTick } from "vue";

test("Startdata, lagring och återställning", async (t) => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  try {
    const store = await server.ssrLoadModule("/src/services/storage.ts");
    await t.test("alla åtta kategorier innehåller tio dejter", () => {
      assert.equal(store.activities.value.length, 80);
      const counts = store.activities.value.reduce((result, a) => {
        (result[a.category] ??= []).push(a);
        return result;
      }, {});
      assert.equal(Object.keys(counts).length, 8);
      assert.ok(Object.values(counts).every((v) => v.length === 10));
      assert.equal(store.excursions.value.length, 70);
    });
    await t.test("befintliga data och tomma listor skrivs inte över", () => {
      values.set("tj-dejter:ideas", "[]");
      assert.deepEqual(
        store.load("ideas", [{ id: "seed", title: "Seed" }]),
        [],
      );
      const saved = [
        { ...store.activities.value[0], favorite: true, done: true },
      ];
      values.set("tj-dejter:activities", JSON.stringify(saved));
      assert.equal(store.load("activities", [])[0].favorite, true);
      assert.equal(store.load("activities", [])[0].done, true);
    });
    await t.test("favoriter och status sparas automatiskt", async () => {
      store.activities.value[0].favorite = true;
      store.excursions.value[0].status = "gjort";
      await nextTick();
      assert.equal(
        JSON.parse(values.get("tj-dejter:activities"))[0].favorite,
        true,
      );
      assert.equal(
        JSON.parse(values.get("tj-dejter:excursions"))[0].status,
        "gjort",
      );
    });
    await t.test("skadad data bevaras och blockeras från överskrivning", () => {
      values.set("tj-dejter:ideas", "{trasigt");
      assert.deepEqual(store.load("ideas", []), []);
      store.save("ideas", []);
      assert.equal(values.get("tj-dejter:ideas"), "{trasigt");
      assert.ok(store.storageError.value);
      assert.equal(
        store.validCollection("excursions", [
          { id: "1", title: "Saknar kategori" },
        ]),
        false,
      );
    });
    await t.test("felaktig import lämnar samlingen orörd", async () => {
      const count = store.activities.value.length;
      await assert.rejects(
        store.importData({ text: async () => '{"version":1,"activities":[]}' }),
      );
      assert.equal(store.activities.value.length, count);
    });
    await t.test("en giltig säkerhetskopia återställer data", async () => {
      const data = {
        version: 1,
        activities: store.activities.value,
        ideas: [],
        excursions: store.excursions.value,
      };
      await store.importData({ text: async () => JSON.stringify(data) });
      await nextTick();
      assert.equal(values.get("tj-dejter:ideas"), "[]");
      assert.equal(store.storageError.value, "");
    });
  } finally {
    await server.close();
    delete globalThis.localStorage;
  }
});
