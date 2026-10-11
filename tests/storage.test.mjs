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
    await t.test("alla åtta kategorier innehåller fyrtio unika dejter", () => {
      assert.equal(store.activities.value.length, 320);
      const counts = store.activities.value.reduce((result, a) => {
        (result[a.category] ??= []).push(a);
        return result;
      }, {});
      assert.equal(Object.keys(counts).length, 8);
      assert.ok(Object.values(counts).every((v) => v.length === 40));
      assert.equal(store.excursions.value.length, 70);
      assert.equal(new Set(store.activities.value.map((a) => a.id)).size, 320);
      assert.equal(
        new Set(store.activities.value.map((a) => a.title)).size,
        320,
      );
      assert.ok(store.validCollection("activities", store.activities.value));
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
    await t.test(
      "uppgradering lägger till nya kort och bevarar gamla markeringar",
      () => {
        const oldPizza = {
          ...store.activities.value.find((a) => a.id === "activity-72"),
          title: "Bästa pizzan-test",
          description: "Testa olika pizzerior över tid och sätt betyg.",
          favorite: true,
          done: true,
        };
        const importedCard = {
          ...oldPizza,
          id: "custom-imported-card",
          title: "Vårt eget kort",
        };
        values.set(
          "tj-dejter:activities",
          JSON.stringify([oldPizza, importedCard]),
        );
        const upgraded = store.load("activities", store.activities.value);
        assert.equal(upgraded.length, 321);
        const pizza = upgraded.find((a) => a.id === oldPizza.id);
        assert.equal(pizza.title, "Hemmapizza med LCHF-botten");
        assert.equal(pizza.favorite, true);
        assert.equal(pizza.done, true);
        assert.equal(
          upgraded.find((a) => a.id === importedCard.id).title,
          importedCard.title,
        );
        values.set("tj-dejter:activities", JSON.stringify(upgraded));
        assert.deepEqual(
          store.load("activities", store.activities.value),
          upgraded,
        );
      },
    );
    await t.test(
      "matkategorin är kostanpassad och intressena finns representerade",
      () => {
        const food = store.activities.value.filter(
          (a) => a.category === "Mat, fika och dryck",
        );
        assert.equal(food.length, 40);
        assert.ok(food.every((a) => a.tags?.includes("LCHF/LCHP")));
        for (const outdated of [
          "Glasspaus",
          "Bästa pizzan-test",
          "Efterrättsdejt",
        ]) {
          assert.ok(!store.activities.value.some((a) => a.title === outdated));
        }
        assert.ok(
          store.activities.value
            .find((a) => a.id === "activity-75")
            .description.includes("både Tobias och Jenny"),
        );
        for (const tag of [
          "Natur",
          "Friluftsliv",
          "Vandring",
          "Fjäll",
          "Träning",
          "Gym",
          "Löpning",
          "AI & tech",
          "Musik",
          "Dans",
          "Mode",
          "Inredning",
          "Djupa samtal",
          "Personlig utveckling",
          "Närhet",
          "Prova nytt",
          "Resor",
          "Bio & kultur",
          "Mat & dryck",
        ]) {
          assert.ok(
            store.activities.value.some((a) => a.tags?.includes(tag)),
            tag,
          );
        }
      },
    );
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
    await t.test(
      "äldre säkerhetskopior får hela katalogen utan att förlora favoritstatus",
      async () => {
        const oldActivity = {
          ...store.activities.value[0],
          favorite: true,
          done: true,
        };
        const data = {
          version: 1,
          activities: [oldActivity],
          ideas: [],
          excursions: store.excursions.value,
        };
        await store.importData({ text: async () => JSON.stringify(data) });
        await nextTick();
        assert.equal(store.activities.value.length, 320);
        assert.equal(store.activities.value[0].favorite, true);
        assert.equal(store.activities.value[0].done, true);
        assert.equal(
          JSON.parse(values.get("tj-dejter:activities")).length,
          320,
        );
      },
    );
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
