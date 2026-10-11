import { dateCategories, type DateActivity } from "../types/index";
const entries = [
  {
    id: "activity-1",
    title: "Temamiddag hemma",
    description: "Välj land eller tema och laga något som passar.",
    categoryIndex: 0,
  },
  {
    id: "activity-2",
    title: "Vin/alkoholfri provningskväll",
    description:
      "Testa 3 sorter vin, bubbel, alkoholfritt, te eller kaffe och sätt betyg.",
    categoryIndex: 0,
  },
  {
    id: "activity-3",
    title: "Filmkväll med regel",
    description:
      "Till exempel 90-tal, dålig action, svensk klassiker eller något ingen av oss sett.",
    categoryIndex: 0,
  },
  {
    id: "activity-4",
    title: "Spelkväll hemma",
    description:
      "Spela brädspel, kortspel, frågespel eller något enkelt som inte kräver för mycket förberedelse. Gör det mysigt med snacks, musik och något gott att dricka.",
    categoryIndex: 0,
  },
  {
    id: "activity-5",
    title: "Laga trerätters light",
    description:
      "Förrätt, huvudrätt och enkel dessert, men utan att göra det för avancerat.",
    categoryIndex: 0,
  },
  {
    id: "activity-6",
    title: "Frågekort / relationsfrågor",
    description:
      "En kväll där vi svarar på frågor om liv, framtid, minnen och drömmar.",
    categoryIndex: 0,
  },
  {
    id: "activity-7",
    title: "Hemmabrunch",
    description: "Sen frukost, kaffe, långsam start och ingen stress.",
    categoryIndex: 0,
  },
  {
    id: "activity-8",
    title: "Spa hemma",
    description:
      "Dusch, massage, ansiktsmask, lugn musik och låg ambitionsnivå.",
    categoryIndex: 0,
  },
  {
    id: "activity-9",
    title: "Planera en drömresa",
    description:
      "Inte boka, bara drömma: hotell, mat, platser, bilder och budget.",
    categoryIndex: 0,
  },
  {
    id: "activity-10",
    title: "Kökshäng med musik",
    description: "Laga något enkelt, ha musik på och låt kvällen bara rulla.",
    categoryIndex: 0,
  },
  {
    id: "activity-11",
    title: "Se samma film samtidigt",
    description: "Starta samtidigt och kommentera under tiden.",
    categoryIndex: 1,
  },
  {
    id: "activity-12",
    title: "Kvällspromenad i telefon",
    description: "Båda går varsin promenad men pratar under tiden.",
    categoryIndex: 1,
  },
  {
    id: "activity-13",
    title: "Laga samma maträtt på varsitt håll",
    description: "Skicka bilder under tiden och jämför resultatet.",
    categoryIndex: 1,
  },
  {
    id: "activity-14",
    title: "Gemensam spellista",
    description: "Lägg in 5 låtar var utifrån ett tema.",
    categoryIndex: 1,
  },
  {
    id: "activity-15",
    title: "Digital frågekväll",
    description: "Turas om att ställa frågor: lättsamma, djupa eller knasiga.",
    categoryIndex: 1,
  },
  {
    id: "activity-16",
    title: "Planera nästa dejt ihop",
    description: "Ni tar fram tre alternativ var och väljer ett.",
    categoryIndex: 1,
  },
  {
    id: "activity-17",
    title: "Skicka dagens tre bilder",
    description:
      "Tre bilder från dagen som visar läge, känsla eller något fint.",
    categoryIndex: 1,
  },
  {
    id: "activity-18",
    title: "Distansfika",
    description: "Kaffe eller te i video eller telefon, kort och enkelt.",
    categoryIndex: 1,
  },
  {
    id: "activity-19",
    title: "Samma podd-avsnitt",
    description: "Lyssna var för sig och prata om det efteråt.",
    categoryIndex: 1,
  },
  {
    id: "activity-20",
    title: "Kvällens “jag tänkte på dig när…”",
    description: "Skicka en sak från dagen som fick er att tänka på den andra.",
    categoryIndex: 1,
  },
  {
    id: "activity-21",
    title: "Fika och promenad i Gamla Uppsala",
    description: "Kort utflykt med historia, högarna och promenad.",
    categoryIndex: 2,
  },
  {
    id: "activity-22",
    title: "Fjällnora med kaffe i termos",
    description: "Natur, vatten och promenad utan att det behöver bli heldag.",
    categoryIndex: 2,
  },
  {
    id: "activity-23",
    title: "Hammarskog och Dalkarlskärret",
    description: "Gå en sväng, fika och få lite naturkänsla nära stan.",
    categoryIndex: 2,
  },
  {
    id: "activity-24",
    title: "Wik slott kortutflykt",
    description: "Promenad vid slottet, vatten och eventuell fika.",
    categoryIndex: 2,
  },
  {
    id: "activity-25",
    title: "Ulva kvarn-runda",
    description: "Fika, hantverk, liten promenad och titta runt.",
    categoryIndex: 2,
  },
  {
    id: "activity-26",
    title: "Linnés Hammarby light",
    description: "Kort kultur- och naturutflykt.",
    categoryIndex: 2,
  },
  {
    id: "activity-27",
    title: "Botaniska trädgården + kaffe",
    description:
      "Lågtröskel, fint och lagom även om man inte har massor av energi.",
    categoryIndex: 2,
  },
  {
    id: "activity-28",
    title: "Promenad längs Fyrisån",
    description: "Börja i stan och gå tills ni hittar ett bra stopp.",
    categoryIndex: 2,
  },
  {
    id: "activity-29",
    title: "Second hand-runda i Uppsala",
    description: "Välj 2–3 ställen och hitta varsin ful, fin eller rolig sak.",
    categoryIndex: 2,
  },
  {
    id: "activity-30",
    title: "Glass- eller fikadejt med bil",
    description: "Välj ett fik eller glassställe max 30 minuter bort.",
    categoryIndex: 2,
  },
  {
    id: "activity-31",
    title: "Heldag vid Fjällnora",
    description: "Promenad, bad, fika/mat och lugn naturdag.",
    categoryIndex: 3,
  },
  {
    id: "activity-32",
    title: "Skokloster slott",
    description: "Slott, Mälaren, fika och bilutflykt.",
    categoryIndex: 3,
  },
  {
    id: "activity-33",
    title: "Salsta slott + fika",
    description: "Slottsmiljö, café och promenad.",
    categoryIndex: 3,
  },
  {
    id: "activity-34",
    title: "Sigtuna-dag",
    description: "Gå runt, fika, titta i små butiker och ät lunch.",
    categoryIndex: 3,
  },
  {
    id: "activity-35",
    title: "Öregrund över dagen",
    description: "Kustkänsla, promenad, mat och sommarkänsla.",
    categoryIndex: 3,
  },
  {
    id: "activity-36",
    title: "Stockholm light",
    description:
      "Välj ett område: Söder, Djurgården, Gamla stan eller någon utställning.",
    categoryIndex: 3,
  },
  {
    id: "activity-37",
    title: "Enköping och parkerna",
    description: "Parkpromenad, fika och lunch.",
    categoryIndex: 3,
  },
  {
    id: "activity-38",
    title: "Älvkarleby/Laxön",
    description: "Vatten, natur, promenad och fotovänlig miljö.",
    categoryIndex: 3,
  },
  {
    id: "activity-39",
    title: "Gårdsbutiksrunda",
    description: "Välj 2–3 stopp, köp något gott och avsluta med picknick.",
    categoryIndex: 3,
  },
  {
    id: "activity-40",
    title: "Badplats-turné",
    description:
      "Välj två sjöar/badplatser, packa fika och gör det till en sommardag.",
    categoryIndex: 3,
  },
  {
    id: "activity-41",
    title: "Weekend Höga Kusten",
    description: "Natur, hotell, utsikter, mat och bilresa.",
    categoryIndex: 4,
  },
  {
    id: "activity-42",
    title: "Spaweekend",
    description: "Ett dygn med hotell, spa, middag och frukost.",
    categoryIndex: 4,
  },
  {
    id: "activity-43",
    title: "Stockholm med hotellnatt",
    description:
      "Middag, konsert, museum eller bara stadspuls utan hemresa samma kväll.",
    categoryIndex: 4,
  },
  {
    id: "activity-44",
    title: "Gotland light",
    description: "2–3 dagar med Visby, mat, hav och promenader.",
    categoryIndex: 4,
  },
  {
    id: "activity-45",
    title: "Dalarna-weekend",
    description: "Bo mysigt, hitta loppisar, natur och någon bra restaurang.",
    categoryIndex: 4,
  },
  {
    id: "activity-46",
    title: "Kustweekend i Roslagen",
    description: "Öregrund, Grisslehamn, Norrtälje eller liknande.",
    categoryIndex: 4,
  },
  {
    id: "activity-47",
    title: "Konsertresa",
    description:
      "Välj artist först, stad sen. Hotell och middag gör det till en miniresa.",
    categoryIndex: 4,
  },
  {
    id: "activity-48",
    title: "Stughelg med mat och eld",
    description: "Hyra liten stuga, laga mat, gå promenad och ta det lugnt.",
    categoryIndex: 4,
  },
  {
    id: "activity-49",
    title: "Roadtrip utan exakt mål",
    description: "Bestäm riktning, boka boende samma dag eller kvällen innan.",
    categoryIndex: 4,
  },
  {
    id: "activity-50",
    title: "Julmarknadshelg / vinterweekend",
    description: "Mysigare kategori för mörkare delen av året.",
    categoryIndex: 4,
  },
  {
    id: "activity-51",
    title: "Kaffe i bilen",
    description: "Köp kaffe, kör till fin plats och sitt kvar en stund.",
    categoryIndex: 5,
  },
  {
    id: "activity-52",
    title: "Kvällspromenad utan mål",
    description: "Gå 30–60 minuter och välj väg i korsningarna.",
    categoryIndex: 5,
  },
  {
    id: "activity-53",
    title: "Glasspaus",
    description:
      "Kort tur för att köpa glass, även om det inte är “en riktig aktivitet”.",
    categoryIndex: 5,
  },
  {
    id: "activity-54",
    title: "Åk till vatten",
    description: "Närmaste sjö, å, brygga eller utsiktsplats.",
    categoryIndex: 5,
  },
  {
    id: "activity-55",
    title: "Välj första bästa fik",
    description: "Inte googla för mycket, bara åka.",
    categoryIndex: 5,
  },
  {
    id: "activity-56",
    title: "Matbutiksdejt",
    description: "Gå in och välj tre saker som blir kvällens middag.",
    categoryIndex: 5,
  },
  {
    id: "activity-57",
    title: "Kort loppis/second hand-stopp",
    description: "30 minuter, inget krav på köp.",
    categoryIndex: 5,
  },
  {
    id: "activity-58",
    title: "Solnedgångsjakt",
    description: "Kolla riktning, åk till en öppen plats och titta.",
    categoryIndex: 5,
  },
  {
    id: "activity-59",
    title: "Promenad + en fråga var",
    description: "Under promenaden får båda ställa en fråga.",
    categoryIndex: 5,
  },
  {
    id: "activity-60",
    title: "Takeaway på oväntad plats",
    description: "Köp mat och ät i bilen, vid vattnet eller på filt.",
    categoryIndex: 5,
  },
  {
    id: "activity-61",
    title: "Återskapa en tidig dejt",
    description: "Samma typ av mat, plats, musik eller känsla.",
    categoryIndex: 6,
  },
  {
    id: "activity-62",
    title: "Brev till framtiden",
    description: "Skriv varsitt brev som ni öppnar om ett år.",
    categoryIndex: 6,
  },
  {
    id: "activity-63",
    title: "Solnedgång med filt",
    description: "Kaffe, varm choklad eller något gott med.",
    categoryIndex: 6,
  },
  {
    id: "activity-64",
    title: "Middag med klädkod hemma",
    description: "Lite finare, men hemma och avslappnat.",
    categoryIndex: 6,
  },
  {
    id: "activity-65",
    title: "Minneskväll",
    description: "Titta på bilder från saker ni gjort och välj favoriter.",
    categoryIndex: 6,
  },
  {
    id: "activity-66",
    title: "Överraskningsdejt light",
    description: "En av er planerar två timmar, den andra får bara följa med.",
    categoryIndex: 6,
  },
  {
    id: "activity-67",
    title: "Frukostdejt",
    description: "Antingen hemma eller ute, men med långsam start.",
    categoryIndex: 6,
  },
  {
    id: "activity-68",
    title: "Massage och lugn musik",
    description: "Enkel närhetskväll utan skärm.",
    categoryIndex: 6,
  },
  {
    id: "activity-69",
    title: "Picknick med filt",
    description:
      "Funkar ute på sommaren eller på vardagsrumsgolvet på vintern.",
    categoryIndex: 6,
  },
  {
    id: "activity-70",
    title: "Tre saker jag uppskattar med dig",
    description: "En enkel men fin stund där ni säger tre saker var.",
    categoryIndex: 6,
  },
  {
    id: "activity-71",
    title: "Ny restaurang i Uppsala",
    description: "Välj ett ställe ingen av er har testat.",
    categoryIndex: 7,
  },
  {
    id: "activity-72",
    title: "Bästa pizzan-test",
    description: "Testa olika pizzerior över tid och sätt betyg.",
    categoryIndex: 7,
  },
  {
    id: "activity-73",
    title: "Fikabetyg",
    description: "Testa fik och betygsätt kaffe, miljö och känsla.",
    categoryIndex: 7,
  },
  {
    id: "activity-74",
    title: "Chark/ost/plockkväll",
    description: "Hemma eller som picknick.",
    categoryIndex: 7,
  },
  {
    id: "activity-75",
    title: "LCHF-middag ihop",
    description: "Gör något som passar Tobias men ändå känns lyxigt.",
    categoryIndex: 7,
  },
  {
    id: "activity-76",
    title: "Söndagsbrunch",
    description: "Hemma eller ute, gärna långsam och utan stress.",
    categoryIndex: 7,
  },
  {
    id: "activity-77",
    title: "Asiatisk matkväll",
    description: "Thai, ramen, sushi eller koreanskt.",
    categoryIndex: 7,
  },
  {
    id: "activity-78",
    title: "Matmarknad / saluhall / gårdsbutik",
    description: "Köp några saker och bygg middag av det.",
    categoryIndex: 7,
  },
  {
    id: "activity-79",
    title: "Blindtest hemma",
    description: "Ost, kaffe, alkoholfritt, chips eller något annat.",
    categoryIndex: 7,
  },
  {
    id: "activity-80",
    title: "Efterrättsdejt",
    description: "Ät middag hemma men åk iväg för dessert eller kaffe.",
    categoryIndex: 7,
  },
];
export const initialActivities: DateActivity[] = entries.map(
  ({ categoryIndex, ...item }) => ({
    ...item,
    category: dateCategories[categoryIndex]!,
    duration: [
      "1–3 timmar",
      "30–90 min",
      "2–4 timmar",
      "En dag",
      "2–3 dagar",
      "30–60 min",
      "1–2 timmar",
      "1–3 timmar",
    ][categoryIndex],
    energy:
      categoryIndex === 4 ? "mellan" : categoryIndex === 3 ? "hög" : "låg",
    budget:
      categoryIndex === 4
        ? "dyrt"
        : categoryIndex === 3 || categoryIndex === 7
          ? "medel"
          : "billigt",
    tags: [
      ["Hemma", "Tillsammans"],
      ["På distans"],
      ["Nära Uppsala", "Utflykt"],
      ["Dagsutflykt"],
      ["Minisemester"],
      ["Enkelt", "Spontant"],
      ["Tid för oss"],
      ["Något gott"],
    ][categoryIndex],
  }),
);
