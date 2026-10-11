import { excursionCategories, type Excursion } from "../types/index";
const entries = [
  {
    id: "excursion-1",
    title: "Färnebofjärdens nationalpark",
    categoryIndex: 0,
  },
  {
    id: "excursion-2",
    title: "Tyresta nationalpark",
    categoryIndex: 0,
  },
  {
    id: "excursion-3",
    title: "Stendörrens naturreservat",
    categoryIndex: 0,
  },
  {
    id: "excursion-4",
    title: "Fiby urskog",
    categoryIndex: 0,
  },
  {
    id: "excursion-5",
    title: "Lunsen",
    categoryIndex: 0,
  },
  {
    id: "excursion-6",
    title: "Morga hage",
    categoryIndex: 0,
  },
  {
    id: "excursion-7",
    title: "Hammarskog",
    categoryIndex: 0,
  },
  {
    id: "excursion-8",
    title: "Fjällnora",
    categoryIndex: 0,
  },
  {
    id: "excursion-9",
    title: "Hågadalen",
    categoryIndex: 0,
  },
  {
    id: "excursion-10",
    title: "Vedyxaskogen och Viltvattnet",
    categoryIndex: 0,
  },
  {
    id: "excursion-11",
    title: "Tunåsen",
    categoryIndex: 0,
  },
  {
    id: "excursion-12",
    title: "Broborg fornborg",
    categoryIndex: 0,
  },
  {
    id: "excursion-13",
    title: "Rödhäll",
    categoryIndex: 0,
  },
  {
    id: "excursion-14",
    title: "Florarna naturreservat",
    categoryIndex: 0,
  },
  {
    id: "excursion-15",
    title: "Billudden",
    categoryIndex: 0,
  },
  {
    id: "excursion-16",
    title: "Skoklosters slott",
    categoryIndex: 1,
  },
  {
    id: "excursion-17",
    title: "Salsta slott och slottskafé",
    categoryIndex: 1,
  },
  {
    id: "excursion-18",
    title: "Lövstabruk",
    categoryIndex: 1,
  },
  {
    id: "excursion-19",
    title: "Österbybruk",
    categoryIndex: 1,
  },
  {
    id: "excursion-20",
    title: "Gimo herrgård",
    categoryIndex: 1,
  },
  {
    id: "excursion-21",
    title: "Engelsbergs bruk",
    categoryIndex: 1,
  },
  {
    id: "excursion-22",
    title: "Sala silvergruva",
    categoryIndex: 1,
  },
  {
    id: "excursion-23",
    title: "Gamla Uppsala",
    categoryIndex: 1,
  },
  {
    id: "excursion-24",
    title: "Gamla Uppsala museum",
    categoryIndex: 1,
  },
  {
    id: "excursion-25",
    title: "Friluftsmuseet Disagården",
    categoryIndex: 1,
  },
  {
    id: "excursion-26",
    title: "Hågahögen",
    categoryIndex: 1,
  },
  {
    id: "excursion-27",
    title: "Tidernas väg",
    categoryIndex: 1,
  },
  {
    id: "excursion-28",
    title: "Ekbolanda gård",
    categoryIndex: 2,
  },
  {
    id: "excursion-29",
    title: "Wåffelbaren i Gäddeholm",
    categoryIndex: 2,
  },
  {
    id: "excursion-30",
    title: "Café Kulturhaus Ekensberg",
    categoryIndex: 2,
  },
  {
    id: "excursion-31",
    title: "Linnés Sävja gård",
    categoryIndex: 2,
  },
  {
    id: "excursion-32",
    title: "Ulva kvarn",
    categoryIndex: 2,
  },
  {
    id: "excursion-33",
    title: "Salsta slottskafé",
    categoryIndex: 2,
  },
  {
    id: "excursion-34",
    title: "Fjärdhundraland",
    categoryIndex: 2,
  },
  {
    id: "excursion-35",
    title: "Bondens egna marknader",
    categoryIndex: 2,
  },
  {
    id: "excursion-36",
    title: "Självplocksgårdar",
    categoryIndex: 2,
  },
  {
    id: "excursion-37",
    title: "Musterier under hösten",
    categoryIndex: 2,
  },
  {
    id: "excursion-38",
    title: "Öregrund",
    categoryIndex: 3,
  },
  {
    id: "excursion-39",
    title: "Gräsö",
    categoryIndex: 3,
  },
  {
    id: "excursion-40",
    title: "Norrtälje",
    categoryIndex: 3,
  },
  {
    id: "excursion-41",
    title: "Herräng",
    categoryIndex: 3,
  },
  {
    id: "excursion-42",
    title: "Trosa",
    categoryIndex: 3,
  },
  {
    id: "excursion-43",
    title: "Mariefred",
    categoryIndex: 3,
  },
  {
    id: "excursion-44",
    title: "Sigtuna",
    categoryIndex: 3,
  },
  {
    id: "excursion-45",
    title: "Upplandsleden",
    categoryIndex: 4,
  },
  {
    id: "excursion-46",
    title: "Roslagsleden",
    categoryIndex: 4,
  },
  {
    id: "excursion-47",
    title: "Hågadalen–Nåsten",
    categoryIndex: 4,
  },
  {
    id: "excursion-48",
    title: "Salstaleden",
    categoryIndex: 4,
  },
  {
    id: "excursion-49",
    title: "Fjällnora",
    categoryIndex: 4,
  },
  {
    id: "excursion-50",
    title: "Hammarskog",
    categoryIndex: 4,
  },
  {
    id: "excursion-51",
    title: "Tyresta",
    categoryIndex: 4,
  },
  {
    id: "excursion-52",
    title: "Färnebofjärden",
    categoryIndex: 4,
  },
  {
    id: "excursion-53",
    title: "Broborg",
    categoryIndex: 4,
  },
  {
    id: "excursion-54",
    title: "Stendörren",
    categoryIndex: 4,
  },
  {
    id: "excursion-55",
    title: "Lennakatten",
    categoryIndex: 5,
  },
  {
    id: "excursion-56",
    title: "Museijärnvägen Mariefred",
    categoryIndex: 5,
  },
  {
    id: "excursion-57",
    title: "Ångbåt på Mälaren",
    categoryIndex: 5,
  },
  {
    id: "excursion-58",
    title: "Älvkarleby fiskecentrum",
    categoryIndex: 5,
  },
  {
    id: "excursion-59",
    title: "Dragon Gate",
    categoryIndex: 5,
  },
  {
    id: "excursion-60",
    title: "Gysinge bruk",
    categoryIndex: 5,
  },
  {
    id: "excursion-61",
    title: "Hedesunda",
    categoryIndex: 5,
  },
  {
    id: "excursion-62",
    title: "Linnés Hammarby",
    categoryIndex: 6,
  },
  {
    id: "excursion-63",
    title: "Botaniska trädgården",
    categoryIndex: 6,
  },
  {
    id: "excursion-64",
    title: "Linnéträdgården",
    categoryIndex: 6,
  },
  {
    id: "excursion-65",
    title: "Wij Trädgårdar",
    categoryIndex: 6,
  },
  {
    id: "excursion-66",
    title: "Svamp i Florarna",
    categoryIndex: 7,
  },
  {
    id: "excursion-67",
    title: "Äppelmustning",
    categoryIndex: 7,
  },
  {
    id: "excursion-68",
    title: "Färnebofjärden när löven skiftar",
    categoryIndex: 7,
  },
  {
    id: "excursion-69",
    title: "Vallonbruken i höstfärger",
    categoryIndex: 7,
  },
  {
    id: "excursion-70",
    title: "Roslagen när sommargästerna åkt hem",
    categoryIndex: 7,
  },
];
export const initialExcursions: Excursion[] = entries.map(
  ({ categoryIndex, ...item }) => ({
    ...item,
    categories: [excursionCategories[categoryIndex]!],
    status: "vill göra",
    season: categoryIndex === 7 ? ["höst"] : [],
    tags: [],
    custom: false,
  }),
);
