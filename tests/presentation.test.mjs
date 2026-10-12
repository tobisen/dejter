import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createServer } from "vite";

test("Utforska dejter, bildval och detaljinformation", async (t) => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  try {
    const { initialActivities } = await server.ssrLoadModule(
      "/src/data/activities.ts",
    );
    const { initialExcursions } = await server.ssrLoadModule(
      "/src/data/excursions.ts",
    );
    const presentation = await server.ssrLoadModule(
      "/src/services/presentation.ts",
    );
    const filters = {
      category: "",
      interest: "",
      query: "",
      collection: "all",
      lowEnergy: false,
    };
    await t.test(
      "upptäcktsordningen är komplett och blandar intressen utan dubletter",
      () => {
        const ordered = presentation.discoveryOrder(initialActivities);
        assert.equal(ordered.length, 320);
        assert.equal(new Set(ordered.map((a) => a.id)).size, 320);
        assert.equal(ordered[0].id, "activity-171");
        assert.ok(
          new Set(ordered.slice(0, 12).map((a) => a.category)).size >= 7,
        );
      },
    );
    await t.test(
      "sökning fungerar med svenska tecken, blanksteg och olika skiftläge",
      () => {
        const result = presentation.filterActivities(initialActivities, {
          ...filters,
          query: "  FJÄLL  ",
        });
        assert.ok(result.length > 10);
        assert.ok(
          result.every((a) =>
            [a.title, a.description, ...(a.tags ?? [])]
              .join(" ")
              .toLowerCase()
              .includes("fjäll"),
          ),
        );
      },
    );
    await t.test(
      "kategori, intresse, energi och favoritfilter kombineras",
      () => {
        const saved = initialActivities.map((a) => ({
          ...a,
          favorite: a.id === "activity-84",
        }));
        const activity = saved.find((a) => a.id === "activity-84");
        const result = presentation.filterActivities(saved, {
          ...filters,
          category: activity.category,
          interest: "AI & tech",
          collection: "favorites",
        });
        assert.deepEqual(
          result.map((a) => a.id),
          ["activity-84"],
        );
        assert.deepEqual(
          presentation.filterActivities(saved, {
            ...filters,
            interest: "Gym",
            collection: "favorites",
          }),
          [],
        );
        const low = presentation.filterActivities(initialActivities, {
          ...filters,
          lowEnergy: true,
        });
        assert.ok(low.length > 0 && low.every((a) => a.energy === "låg"));
      },
    );
    await t.test("historiken innehåller bara gjorda aktiviteter", () => {
      const saved = initialActivities.map((a, index) => ({
        ...a,
        done: index === 2,
      }));
      assert.deepEqual(
        presentation
          .filterActivities(saved, { ...filters, collection: "done" })
          .map((a) => a.id),
        ["activity-3"],
      );
    });
    await t.test(
      "slumpningen upprepar inte föregående kort om det finns andra",
      () => {
        const pool = initialActivities.slice(0, 2);
        for (let i = 0; i < 20; i++)
          assert.equal(
            presentation.randomActivity(pool, pool[0].id).id,
            pool[1].id,
          );
        assert.equal(
          presentation.randomActivity([pool[0]], pool[0].id).id,
          pool[0].id,
        );
        assert.equal(presentation.randomActivity([]), undefined);
      },
    );
    await t.test("alla kort har lokala bilder och tre kom-igång-steg", () => {
      for (const activity of initialActivities) {
        const file = presentation.activityImage(activity).split("/").at(-1);
        assert.ok(
          existsSync(new URL(`../public/images/${file}`, import.meta.url)),
          file,
        );
        assert.equal(presentation.activityPlan(activity).length, 3);
        assert.ok(presentation.categoryLabel(activity));
      }
      for (const excursion of initialExcursions) {
        const file = presentation.excursionImage(excursion).split("/").at(-1);
        assert.ok(
          existsSync(new URL(`../public/images/${file}`, import.meta.url)),
          file,
        );
      }
    });
    await t.test("kost- och distanskort får relevanta förberedelser", () => {
      const food = initialActivities.find((a) => a.id === "activity-291");
      assert.match(presentation.activityPlan(food)[0], /LCHF\/LCHP/);
      const remote = initialActivities.find((a) => a.id === "activity-111");
      assert.match(presentation.activityPlan(remote)[0], /video, telefon/);
    });
  } finally {
    await server.close();
  }
});
