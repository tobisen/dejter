import {
  dateCategories,
  shortCategories,
  type DateActivity,
  type Excursion,
} from "../types/index";

export function imageUrl(name: string) {
  return `${import.meta.env.BASE_URL}images/${name}.jpg`;
}

export function activityImage(activity: DateActivity): string {
  const tags = activity.tags ?? [];
  const title = activity.title.toLocaleLowerCase("sv");
  const has = (...values: string[]) =>
    values.some((value) => tags.includes(value));
  if (/vin|bubbel|drink|gin /.test(title)) return imageUrl("wine");
  if (/kaffe|teprovning|distansfika|fikabetyg/.test(title))
    return imageUrl("coffee");
  if (/slott|kultur|museum/.test(title)) return imageUrl("heritage");
  if (/bio|film/.test(title)) return imageUrl("cinema");
  if (has("Fjäll")) return imageUrl("mountains");
  if (has("Löpning")) return imageUrl("running");
  if (has("Gym", "Träning")) return imageUrl("fitness");
  if (/vatten|sjö|brygga|kust|solnedgång|fjällnora|älvkarleby/.test(title))
    return imageUrl("lake");
  if (/botaniska|trädgård|park/.test(title)) return imageUrl("garden");
  if (has("Vandring", "Natur", "Friluftsliv")) return imageUrl("forest");
  if (has("AI & tech")) return imageUrl("tech");
  if (has("Dans", "Musik") || /konsert|spellista|musikkväll/.test(title))
    return imageUrl("music");
  if (has("Mode")) return imageUrl("fashion");
  if (
    has("Mat & dryck", "LCHF/LCHP", "Något gott") ||
    /middag|brunch|maträtt|köks|picknick/.test(title)
  )
    return imageUrl("food");
  return imageUrl(
    ["home", "tech", "forest", "forest", "mountains", "coffee", "home", "food"][
      dateCategories.indexOf(activity.category)
    ] ?? "home",
  );
}
export function categoryLabel(activity: DateActivity): string {
  return (
    shortCategories[dateCategories.indexOf(activity.category)] ??
    activity.category
  );
}

export function excursionImage(excursion: Excursion): string {
  if (excursion.categories.includes("Kust och skärgård"))
    return imageUrl("coast");
  if (excursion.categories.includes("Trädgårdar")) return imageUrl("garden");
  if (excursion.categories.includes("Gårdscaféer och lantliv"))
    return imageUrl("coffee");
  if (excursion.categories.includes("Slott, bruk och historia"))
    return imageUrl("heritage");
  if (
    /fjällnora|färne|billudden|stendörr|laxön|älvkarleby/.test(
      excursion.title.toLocaleLowerCase("sv"),
    )
  )
    return imageUrl("lake");
  return imageUrl("forest");
}

const plans: Record<string, string[]> = {
  food: [
    "Välj en proteinkälla och grönsaker som passar er LCHF/LCHP.",
    "Dela på förberedelserna och välj en spellista till stunden.",
    "Sitt ner tillsammans och välj en smak eller idé ni vill prova igen.",
  ],
  training: [
    "Bestäm ett upplägg som passar bådas dagsform och erfarenhet.",
    "Förbered utrustning, vatten och tid för en lugn start.",
    "Avsluta med återhämtning och prata om vad ni vill göra nästa gång.",
  ],
  outdoors: [
    "Välj en tur som passar väder, dagsljus och bådas ork.",
    "Packa vatten, kläder efter väder och egen matsäck om ni ska vara ute länge.",
    "Lämna plats för en paus på vägen. Upplevelsen får styra tempot.",
  ],
  tech: [
    "Välj en liten fråga eller idé som ni båda är nyfikna på.",
    "Testa tillsammans och turas om att styra. Det får vara ofärdigt.",
    "Visa vad ni upptäckt och spara det ni vill fortsätta med.",
  ],
  music: [
    "Välj musik eller en nivå som känns rolig för er båda.",
    "Gör plats och lägg undan det som stör.",
    "Lyssna, prova eller dansa. Avsluta med varsin favorit från stunden.",
  ],
  close: [
    "Berätta vad ni känner för och gör plats för bådas önskemål.",
    "Lägg undan skärmarna och välj en miljö där ni kan slappna av.",
    "Ta det i er egen takt. Närhet och beröring ska kännas bra för båda.",
  ],
  travel: [
    "Välj en känsla, budget och tidsram som passar er båda.",
    "Kontrollera transport, boende och aktuella möjligheter innan ni bokar.",
    "Planera lagom mycket och lämna utrymme för vila och spontana stopp.",
  ],
  remote: [
    "Bestäm en tid och hur ni vill höras: video, telefon eller meddelanden.",
    "Förbered det lilla ni behöver var för sig och starta tillsammans.",
    "Avsluta med att dela en tanke eller höjdpunkt från stunden.",
  ],
  default: [
    "Läs idén tillsammans och välj vad ni känner för att prova.",
    "Gör de små förberedelser som behövs och håll ambitionsnivån lagom.",
    "Ge stunden er uppmärksamhet. Ni kan alltid göra den på ert eget sätt.",
  ],
};
export function activityPlan(activity: DateActivity): string[] {
  const tags = activity.tags ?? [];
  if (activity.category === dateCategories[1]) return plans.remote!;
  if (
    tags.some((t) => ["Fjäll", "Resor"].includes(t)) &&
    activity.category === dateCategories[4]
  )
    return plans.travel!;
  if (tags.some((t) => ["Träning", "Gym", "Löpning"].includes(t)))
    return plans.training!;
  if (
    tags.some((t) => ["Natur", "Vandring", "Friluftsliv"].includes(t)) ||
    activity.category === dateCategories[2] ||
    activity.category === dateCategories[3]
  )
    return plans.outdoors!;
  if (tags.includes("AI & tech")) return plans.tech!;
  if (tags.some((t) => ["Musik", "Dans"].includes(t))) return plans.music!;
  if (activity.category === dateCategories[7]) return plans.food!;
  if (activity.category === dateCategories[6] || tags.includes("Närhet"))
    return plans.close!;
  return plans.default!;
}

export interface ActivityFilters {
  category: string;
  interest: string;
  query: string;
  collection: "all" | "favorites" | "done";
  lowEnergy: boolean;
}
export function filterActivities(
  activities: DateActivity[],
  filters: ActivityFilters,
): DateActivity[] {
  const query = filters.query.trim().toLocaleLowerCase("sv");
  return activities.filter(
    (a) =>
      (!filters.category || a.category === filters.category) &&
      (!filters.interest || a.tags?.includes(filters.interest)) &&
      (!filters.lowEnergy || a.energy === "låg") &&
      (filters.collection !== "favorites" || a.favorite) &&
      (filters.collection !== "done" || a.done) &&
      (!query ||
        [a.title, a.description, ...(a.tags ?? [])]
          .join(" ")
          .toLocaleLowerCase("sv")
          .includes(query)),
  );
}
/** Mix categories so the first screen represents more than just home activities. */
export function discoveryOrder(activities: DateActivity[]): DateActivity[] {
  const groups = dateCategories.map((category) =>
    activities.filter((a) => a.category === category),
  );
  const length = Math.max(0, ...groups.map((group) => group.length));
  const ordered: DateActivity[] = [];
  for (let index = 0; index < length; index++) {
    for (const group of groups) if (group[index]) ordered.push(group[index]!);
  }
  const featuredIds = [
    "activity-171",
    "activity-81",
    "activity-291",
    "activity-84",
    "activity-141",
    "activity-266",
    "activity-201",
    "activity-308",
    "activity-90",
    "activity-1",
    "activity-167",
    "activity-111",
  ];
  const byId = new Map(ordered.map((activity) => [activity.id, activity]));
  const featured = featuredIds.flatMap((id) =>
    byId.has(id) ? [byId.get(id)!] : [],
  );
  const featuredSet = new Set(featuredIds);
  return [
    ...featured,
    ...ordered.filter((activity) => !featuredSet.has(activity.id)),
  ];
}
export function randomActivity(
  pool: DateActivity[],
  previousId?: string,
): DateActivity | undefined {
  const alternatives = pool.filter((a) => a.id !== previousId);
  const choices = alternatives.length ? alternatives : pool;
  return choices[Math.floor(Math.random() * choices.length)];
}
