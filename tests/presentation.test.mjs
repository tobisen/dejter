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
        assert.equal(ordered.length, 400);
        assert.equal(new Set(ordered.map((a) => a.id)).size, 400);
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
    await t.test(
      "säsong kombineras med filtren och slumpning använder hela urvalet",
      () => {
        const old = { ...initialActivities[0], id: "old", season: undefined };
        const allYear = { ...old, id: "all-year", season: [] };
        const winter = { ...old, id: "winter", season: ["vinter"] };
        const summer = { ...old, id: "summer", season: ["sommar"] };
        assert.deepEqual(
          presentation
            .filterActivities([old, allYear, winter, summer], {
              ...filters,
              season: "vinter",
            })
            .map((a) => a.id),
          ["old", "all-year", "winter"],
        );
        const pool = presentation.filterActivities(initialActivities, {
          ...filters,
          season: "vinter",
          interest: "Friluftsliv",
        });
        assert.ok(pool.length > 0);
        assert.ok(
          pool.every(
            (a) =>
              (!a.season?.length || a.season.includes("vinter")) &&
              a.tags.includes("Friluftsliv"),
          ),
        );
        assert.ok(pool.some((a) => a.title.includes("längdskidor")));
        assert.ok(!pool.some((a) => a.title.includes("kanot")));
        const fullPool = presentation.filterActivities(initialActivities, {
          ...filters,
          season: "sommar",
        });
        assert.ok(fullPool.length > 12);
        const original = Math.random;
        try {
          Math.random = () => 0.999999;
          assert.equal(
            presentation.randomActivity(fullPool).id,
            fullPool.at(-1).id,
          );
        } finally {
          Math.random = original;
        }
        for (const season of ["vår", "sommar", "höst", "vinter"]) {
          assert.ok(
            initialActivities.filter((a) => a.season?.includes(season))
              .length >= 10,
            season,
          );
        }
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
    await t.test("bilderna varierar och vinterkort får inte vinbilder", () => {
      const images = new Set(
        initialActivities
          .map(presentation.activityImage)
          .map((url) => url.split("/").at(-1)),
      );
      for (const name of [
        "winter",
        "autumn",
        "dance",
        "creative",
        "foodVeg",
        "games",
      ])
        assert.ok(images.has(`${name}.jpg`), name);
      const winter = initialActivities.find(
        (a) => a.title === "Prova längdskidor tillsammans",
      );
      assert.match(presentation.activityImage(winter), /winter\.jpg$/);
      assert.equal(
        presentation.activityImage(winter),
        presentation.activityImage({ ...winter }),
      );
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
