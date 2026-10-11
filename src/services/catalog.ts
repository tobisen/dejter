import type { DateActivity } from "../types/index";

/** Refresh built-in descriptions and add new cards, keeping each user's marks. */
export function mergeActivityCatalog(
  saved: DateActivity[],
  catalog: DateActivity[],
): DateActivity[] {
  const savedById = new Map(saved.map((activity) => [activity.id, activity]));
  const catalogIds = new Set(catalog.map((activity) => activity.id));
  return [
    ...catalog.map((activity) => {
      const previous = savedById.get(activity.id);
      return {
        ...activity,
        favorite: previous?.favorite ?? activity.favorite,
        done: previous?.done ?? activity.done,
      };
    }),
    // Retain cards from imports that are not part of the built-in catalog.
    ...saved.filter((activity) => !catalogIds.has(activity.id)),
  ];
}
