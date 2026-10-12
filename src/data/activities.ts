import { variedActivities } from "./variedActivities";
import { withSeasons } from "./seasons";
import { dateCategories, type DateActivity } from "../types/index";
import { additionalActivities } from "./additionalActivities";

const entries = [
  {
    id: "activity-1",
    title: "Temamiddag enligt vår kost",
    description:
      "Välj ett land eller tema och laga en LCHF/LCHP-middag med en tydlig proteinkälla, grönsaker och tillbehör som passar er båda.",
    categoryIndex: 0,
  },
  {
    id: "activity-2",
    title: "Vin, kaffe eller alkoholfri provningskväll",
    description:
      "Jämför små smakprov av torra viner, kaffe, te eller alkoholfria drycker utan socker. Läs produktinformationen och välj efter era egna kolhydratgränser.",
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
      "Spela brädspel, kortspel eller frågespel. Gör det mysigt med musik, oliver, ost, ägg eller annat plock som passar er LCHF/LCHP.",
    categoryIndex: 0,
  },
  {
    id: "activity-5",
    title: "Laga trerätters LCHF/LCHP",
    description:
      "Gör en enkel förrätt med ägg eller fisk, en proteinrik huvudrätt med grönsaker och en avslutande osttallrik i stället för söt dessert.",
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
    title: "Hemmabrunch med proteinfokus",
    description:
      "Långsam frukost med ägg, lax eller annan proteinkälla, grönsaker och kaffe eller te utan socker. Välj mängder efter er egen LCHF/LCHP.",
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
    description:
      "Laga en enkel proteinrik middag med grönsaker, sätt på musik och låt kvällen rulla utan stress.",
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
    title: "Laga samma LCHF/LCHP-rätt på varsitt håll",
    description:
      "Välj en rätt med fisk, kött, kyckling eller tofu och grönsaker. Skicka bilder under tiden och jämför resultatet.",
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
    description:
      "Ta kaffe eller te utan socker i video eller telefon. Om ni vill ha något till: välj exempelvis ägg, ost eller annat som passar er kost.",
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
    title: "Kaffe och promenad i Gamla Uppsala",
    description:
      "Kort utflykt med historia, högarna och promenad. Ta med kaffe och LCHF/LCHP-matsäck om ni vill äta något.",
    categoryIndex: 2,
  },
  {
    id: "activity-22",
    title: "Fjällnora med kaffe i termos",
    description:
      "Natur, vatten och promenad utan att det behöver bli heldag. Packa kaffe utan socker och proteinrikt plock om ni är hungriga.",
    categoryIndex: 2,
  },
  {
    id: "activity-23",
    title: "Hammarskog och Dalkarlskärret",
    description:
      "Gå en sväng, ta termos och få lite naturkänsla nära stan. Packa egen matsäck som passar er LCHF/LCHP.",
    categoryIndex: 2,
  },
  {
    id: "activity-24",
    title: "Wik slott kortutflykt",
    description:
      "Promenad vid slottet och vattnet med egen termos. Ta gärna med ägg, ost eller annan matsäck som passar er kost.",
    categoryIndex: 2,
  },
  {
    id: "activity-25",
    title: "Ulva kvarn-runda",
    description:
      "Titta på hantverk, promenera och ta kaffe eller te utan socker. Egen LCHF/LCHP-matsäck gör matstoppet enkelt.",
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
      "Lågtröskel, fint och lagom även med mindre energi. Ta kaffe eller te utan socker och eget proteinrikt mellanmål om ni vill.",
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
    title: "Termosdejt med bil",
    description:
      "Välj en fin plats en kort bilresa bort. Packa kaffe eller te utan socker och något proteinrikt som passar er LCHF/LCHP.",
    categoryIndex: 2,
  },
  {
    id: "activity-31",
    title: "Heldag vid Fjällnora",
    description:
      "Promenad, bad när det passar och en lugn naturdag. Packa vatten och LCHF/LCHP-mat med protein och grönsaker.",
    categoryIndex: 3,
  },
  {
    id: "activity-32",
    title: "Skokloster slott",
    description:
      "Slott, Mälaren och bilutflykt. Ta med egen termos och matsäck enligt er kost eller välj ett matstopp med passande alternativ.",
    categoryIndex: 3,
  },
  {
    id: "activity-33",
    title: "Salsta slott + kaffe",
    description:
      "Slottsmiljö och promenad med kaffe eller te utan socker. Kontrollera aktuella öppettider och ta med egen matsäck vid behov.",
    categoryIndex: 3,
  },
  {
    id: "activity-34",
    title: "Sigtuna-dag",
    description:
      "Gå runt, titta i små butiker och välj lunch med protein och grönsaker. Be om tillbehör som passar er LCHF/LCHP.",
    categoryIndex: 3,
  },
  {
    id: "activity-35",
    title: "Öregrund över dagen",
    description:
      "Kustkänsla och promenad med en lunch som passar er kost. Packa egen mat eller kontrollera menyn före restaurangstoppet.",
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
    description:
      "Parkpromenad, kaffe eller te och en lunch med tydlig proteinkälla och grönsaker. Ta gärna egen matsäck.",
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
    description:
      "Välj möjliga stopp och kontrollera öppettider. Leta efter ägg, ost, kött, fisk eller grönsaker till en LCHF/LCHP-picknick.",
    categoryIndex: 3,
  },
  {
    id: "activity-40",
    title: "Badplats-turné",
    description:
      "Välj två badplatser, packa vatten och proteinrik LCHF/LCHP-matsäck och gör det till en lugn sommardag.",
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
    description:
      "Hyr en liten stuga, laga LCHF/LCHP-middagar, promenera och ta det lugnt. Använd eldplats bara där och när det är tillåtet.",
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
    description:
      "Välj en mysig vintermiljö med promenader och ett lugnt boende. Planera egen mat eller restaurangalternativ som passar er kost.",
    categoryIndex: 4,
  },
  {
    id: "activity-51",
    title: "Kaffe i bilen",
    description:
      "Köp kaffe eller te utan socker, kör till en fin plats och sitt kvar en stund. Ta med proteinrikt plock om ni vill.",
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
    title: "Kaffe- och ostpaus",
    description:
      "Gör en kort paus med kaffe eller te och en bit ost, ett ägg eller något annat som passar er LCHF/LCHP.",
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
    title: "Välj ett fik för kaffets skull",
    description:
      "Välj ett fik utan att leta för länge och njut av kaffe, te och miljön. Något sött behöver inte ingå.",
    categoryIndex: 5,
  },
  {
    id: "activity-56",
    title: "Matbutiksdejt",
    description:
      "Välj en proteinkälla, grönsaker och ett tillbehör som passar er LCHF/LCHP. Gör kvällens middag av de tre valen.",
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
    description:
      "Välj protein och grönsaker med tillbehör som passar er kost. Ät vid vattnet, i bilen eller på en filt.",
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
    description:
      "Packa kaffe eller te utan socker, en filt och något proteinrikt om ni är hungriga. Sitt nära och se ljuset förändras.",
    categoryIndex: 6,
  },
  {
    id: "activity-64",
    title: "Middag med klädkod hemma",
    description:
      "Klä upp er lite och laga en LCHF/LCHP-middag med protein och grönsaker. Fint men avslappnat, hemma och tillsammans.",
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
    title: "Proteinrik frukostdejt",
    description:
      "Hemma eller ute med långsam start. Välj ägg, lax eller annan proteinkälla och tillbehör som passar er kost, med kaffe eller te utan socker.",
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
      "Packa exempelvis ägg, kyckling, ost och grönsaker enligt er LCHF/LCHP. Fungerar ute på sommaren eller på vardagsrumsgolvet på vintern.",
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
    description:
      "Välj ett ställe ni inte har testat och kontrollera menyn. Leta efter protein och grönsaker och be om tillbehör som passar er kost.",
    categoryIndex: 7,
  },
  {
    id: "activity-72",
    title: "Hemmapizza med LCHF-botten",
    description:
      "Prova en botten av exempelvis blomkål, ägg och ost i stället för vanlig pizzadeg. Toppa med protein och grönsaker och jämför två smakvarianter.",
    categoryIndex: 7,
  },
  {
    id: "activity-73",
    title: "Fikabetyg utan bakverk",
    description:
      "Testa fik och betygsätt kaffe, miljö och känsla. Välj kaffe eller te utan socker och eget kostanpassat mellanmål vid behov.",
    categoryIndex: 7,
  },
  {
    id: "activity-74",
    title: "Proteinrikt ost- och plockfat",
    description:
      "Lägg upp ägg, fisk, kyckling eller chark med ost, oliver och grönsaker. Välj proportioner och produkter efter er LCHF/LCHP.",
    categoryIndex: 7,
  },
  {
    id: "activity-75",
    title: "LCHF/LCHP-middag för oss båda",
    description:
      "Laga något proteinrikt som passar både Tobias och Jenny och ändå känns festligt. Prova en ny kryddning eller grönsak som tillbehör.",
    categoryIndex: 7,
  },
  {
    id: "activity-76",
    title: "Söndagsbrunch enligt vår kost",
    description:
      "Hemma eller ute, långsamt och utan stress. Välj ägg, fisk eller annan proteinkälla med grönsaker i stället för bröd, juice och söta tillbehör.",
    categoryIndex: 7,
  },
  {
    id: "activity-77",
    title: "Asiatisk matkväll utan ris och nudlar",
    description:
      "Prova en buljong med kyckling, ägg och svamp eller wok med protein och grönsaker. Använd zucchini i stället för nudlar och undvik sötade såser.",
    categoryIndex: 7,
  },
  {
    id: "activity-78",
    title: "Matmarknad / saluhall / gårdsbutik",
    description:
      "Leta efter proteinråvaror, ost och grönsaker och bygg en LCHF/LCHP-middag av era fynd. Kontrollera öppettider innan ni åker.",
    categoryIndex: 7,
  },
  {
    id: "activity-79",
    title: "Blindtest av ost och kaffe",
    description:
      "Testa olika ostar, kaffesorter eller drycker utan socker. Gissa sort, sätt betyg och välj en ny favorit.",
    categoryIndex: 7,
  },
  {
    id: "activity-80",
    title: "Kvällskaffe eller ostdejt",
    description:
      "Ät middag hemma och avsluta med kaffe, te eller en liten ostprovning. Välj sådant som passar bådas kost i stället för en söt dessert.",
    categoryIndex: 7,
  },
];
const originalActivities: DateActivity[] = entries.map(
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
      ["Mat & dryck", "LCHF/LCHP"],
    ][categoryIndex],
  }),
);

export const initialActivities: DateActivity[] = [
  ...originalActivities,
  ...additionalActivities,
  ...variedActivities,
].map(withSeasons);
