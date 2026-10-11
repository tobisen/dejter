import { ref, watch } from "vue";
import { initialActivities } from "../data/activities";
import { initialExcursions } from "../data/excursions";
import {
  dateCategories,
  ideaTypes,
  ideaStatuses,
  excursionCategories,
  excursionStatuses,
  seasons,
  type DateActivity,
  type Idea,
  type Excursion,
} from "../types/index";
const stringArray = (v: unknown) =>
  v === undefined ||
  (Array.isArray(v) && v.every((x) => typeof x === "string"));
const optionalString = (v: unknown) => v === undefined || typeof v === "string";
export function validCollection(key: string, data: unknown): boolean {
  if (!Array.isArray(data)) return false;
  const ids = new Set<string>();
  return data.every((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.id !== "string" ||
      typeof item.title !== "string" ||
      ids.has(item.id)
    )
      return false;
    ids.add(item.id);
    if (key === "activities")
      return (
        dateCategories.includes(item.category) &&
        typeof item.description === "string" &&
        stringArray(item.tags) &&
        optionalString(item.duration) &&
        (item.energy === undefined ||
          ["låg", "mellan", "hög"].includes(item.energy)) &&
        (item.budget === undefined ||
          ["gratis", "billigt", "medel", "dyrt"].includes(item.budget)) &&
        (item.favorite === undefined || typeof item.favorite === "boolean") &&
        (item.done === undefined || typeof item.done === "boolean")
      );
    if (key === "ideas")
      return (
        ideaTypes.includes(item.type) &&
        ideaStatuses.includes(item.status) &&
        ["låg", "mellan", "hög"].includes(item.priority) &&
        typeof item.createdAt === "string" &&
        ["note", "link", "location"].every((k) => optionalString(item[k]))
      );
    if (key === "excursions")
      return (
        Array.isArray(item.categories) &&
        item.categories.length > 0 &&
        item.categories.every((c: (typeof excursionCategories)[number]) =>
          excursionCategories.includes(c),
        ) &&
        (item.status === undefined ||
          excursionStatuses.includes(item.status)) &&
        stringArray(item.tags) &&
        (item.season === undefined ||
          (Array.isArray(item.season) &&
            item.season.every((s: (typeof seasons)[number]) =>
              seasons.includes(s),
            ))) &&
        ["description", "distanceFromUppsala", "duration"].every((k) =>
          optionalString(item[k]),
        ) &&
        ["favorite", "custom"].every(
          (k) => item[k] === undefined || typeof item[k] === "boolean",
        )
      );
    return false;
  });
}
export const storageError = ref("");
const unreadableKeys = new Set<string>();
export function load<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(`tj-dejter:${key}`);
    if (raw === null) return structuredClone(seed);
    const data: unknown = JSON.parse(raw);
    if (!validCollection(key, data)) throw new Error("Ogiltiga data");
    return data as T[];
  } catch {
    unreadableKeys.add(key);
    storageError.value =
      "Sparad data kunde inte läsas. Originalet finns kvar och skrivs inte över. Återställ från en säkerhetskopia för att fortsätta spara.";
    return structuredClone(seed);
  }
}
export function save<T>(key: string, data: T[]) {
  if (unreadableKeys.has(key)) return;
  try {
    localStorage.setItem(`tj-dejter:${key}`, JSON.stringify(data));
  } catch {
    storageError.value =
      "Ändringarna kunde inte sparas på enheten. Exportera en säkerhetskopia och kontrollera lagringsutrymmet.";
  }
}
export const activities = ref<DateActivity[]>(
  load("activities", initialActivities),
);
export const ideas = ref<Idea[]>(load("ideas", []));
export const excursions = ref<Excursion[]>(
  load("excursions", initialExcursions),
);
watch(activities, (value) => save("activities", value), { deep: true });
watch(ideas, (value) => save("ideas", value), { deep: true });
watch(excursions, (value) => save("excursions", value), { deep: true });
export function exportData() {
  const blob = new Blob(
    [
      JSON.stringify(
        {
          version: 1,
          activities: activities.value,
          ideas: ideas.value,
          excursions: excursions.value,
        },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tj-dejter-backup.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function importData(file: File) {
  const data = JSON.parse(await file.text());
  if (
    data.version !== 1 ||
    !["activities", "ideas", "excursions"].every((key) =>
      validCollection(key, data[key]),
    )
  )
    throw new Error("Filen är inte en giltig T & J Dejter-säkerhetskopia.");
  unreadableKeys.clear();
  storageError.value = "";
  activities.value = data.activities;
  ideas.value = data.ideas;
  excursions.value = data.excursions;
}
