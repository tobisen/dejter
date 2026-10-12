import { dateCategories, type DateActivity } from "../types/index";
/** Empty or absent seasons mean suitable all year. Keep weather-dependent suggestions explicit. */
export function withSeasons(activity: DateActivity): DateActivity {
  if (activity.season?.length) return activity;
  const title = activity.title.toLocaleLowerCase("sv");
  let season: DateActivity["season"];
  if (/vinter|snö|skidor|skridsko/.test(title)) season = ["vinter"];
  else if (/höst/.test(title)) season = ["höst"];
  else if (/vårtecken|vårblom/.test(title)) season = ["vår"];
  else if (/sommar|badplats|utomhusbad|paddl|kanot|kajak/.test(title))
    season = ["sommar"];
  else if (
    /trädgård|botaniska|cykel|cykla|picknick|tält|utomhusbio/.test(title)
  )
    season = ["vår", "sommar", "höst"];
  else if (
    activity.tags?.some((tag) =>
      ["Vandring", "Löpning", "Friluftsliv"].includes(tag),
    ) &&
    [2, 3, 4].includes(dateCategories.indexOf(activity.category))
  )
    season = ["vår", "sommar", "höst"];
  return { ...activity, season };
}
