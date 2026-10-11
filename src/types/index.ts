export const dateCategories = [
  "Saker vi kan hitta på hemma",
  "Saker vi kan göra tillsammans utan att fysiskt vara tillsammans",
  "Saker vi kan hitta på i Uppsalatrakten, max en halvdag",
  "Större saker vi kan göra i Uppsalatrakten, upp till en dag",
  "Flerdagsaktiviteter",
  "Spontant / låg tröskel",
  "Mysigt / romantiskt",
  "Mat, fika och dryck",
] as const;
export const shortCategories = [
  "Hemma",
  "På distans",
  "En halvdag nära oss",
  "En heldag nära oss",
  "Flera dagar",
  "Spontant",
  "Mysigt & romantiskt",
  "Mat & fika",
];
export type DateCategory = (typeof dateCategories)[number];
export type Energy = "låg" | "mellan" | "hög";
export type Budget = "gratis" | "billigt" | "medel" | "dyrt";
export interface DateActivity {
  id: string;
  title: string;
  description: string;
  category: DateCategory;
  duration?: string;
  energy?: Energy;
  budget?: Budget;
  tags?: string[];
  done?: boolean;
  favorite?: boolean;
}
export const ideaTypes = [
  "Resa",
  "Se",
  "Lyssna på",
  "Äta/dricka",
  "Testa",
  "Köpa/boka",
  "Prata om",
] as const;
export const ideaStatuses = [
  "idé",
  "vill göra",
  "planeras",
  "bokat",
  "gjort",
  "parkerad",
] as const;
export interface Idea {
  id: string;
  title: string;
  type: (typeof ideaTypes)[number];
  note?: string;
  link?: string;
  location?: string;
  priority: Energy;
  status: (typeof ideaStatuses)[number];
  createdAt: string;
}
export const excursionCategories = [
  "Natur",
  "Slott, bruk och historia",
  "Gårdscaféer och lantliv",
  "Kust och skärgård",
  "Vandringar",
  "Lite annorlunda",
  "Trädgårdar",
  "Höstutflykter",
] as const;
export const excursionStatuses = [
  "vill göra",
  "favorit",
  "gjort",
  "göra igen",
  "inte aktuell",
] as const;
export const seasons = ["vår", "sommar", "höst", "vinter"] as const;
export interface Excursion {
  id: string;
  title: string;
  categories: (typeof excursionCategories)[number][];
  description?: string;
  distanceFromUppsala?: string;
  duration?: string;
  season?: (typeof seasons)[number][];
  tags?: string[];
  status?: (typeof excursionStatuses)[number];
  favorite?: boolean;
  custom?: boolean;
}
