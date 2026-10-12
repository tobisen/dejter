# T & J Dejter

En mobilförst PWA för Tobias och Jenny, byggd med Vue 3, TypeScript och Vite. Ingen backend eller inloggning.

## Kör lokalt

Node.js 20.19+ eller 22.12+ rekommenderas.

```sh
npm install
npm run dev
```

Öppna adressen som Vite visar, normalt `http://localhost:5173/dejter/`.

```sh
npm test
npm run build
npm run preview
```

## Funktioner

- Slumpa bland 320 dejter i åtta kategorier, 40 per kategori. Favoritmarkera och markera som gjord. Sök, filtrera på kategori/intresse/energi och bläddra bland bildkort. Favoriter och gjorda aktiviteter har egna snabbfilter.
- Tre tydliga tabbar: Dejter, Idélistan och Utflykter. Filter och sökning behålls när du byter tabb.
- Öppna ett dejtkort för bild, beskrivning, tidsåtgång, budget, energi och tre kom-igång-steg. Slumpa från det aktuella urvalet eller bläddra själv.
- Skapa, redigera och ta bort idéer. Filtrera på typ och status och prioritera idéerna.
- Upptäck 70 utflykter. Sök, filtrera kategori/status/favoriter, öppna detaljer och kartlänk, redigera och skapa eller ta bort egna utflykter.
- Allt sparas i LocalStorage på aktuell enhet och webbläsare. Första starten laddar startdata. Nya inbyggda dejtkort läggs till automatiskt vid uppdatering; favorit- och gjortmarkeringar bevaras. Inbyggda dejtkorts texter uppdateras, medan egna/importerade kort, idéer och redigerade utflykter behålls.
- Exportera och återställ JSON-säkerhetskopior genom att trycka på T/J-avatarerna eller länken i sidfoten. En återställning ersätter den aktuella samlingen; äldre säkerhetskopior kompletteras med den senaste inbyggda dejtkatalogen.
- Installerbar PWA med lokala ikoner och service worker. Appens gränssnitt och startdata finns offline efter första onlinebesöket och slutförd cachelagring. Utgående länkar kräver nätverk.

Tidsåtgång, energi och budget på dejtkorten är enkla uppskattningar. Utflykternas avstånd och öppettider är inte verifierade; lägg till egna uppgifter vid planering.

## Publicera på GitHub Pages

1. Pusha projektet till `main` i `tobisen/dejter`.
2. Välj **Settings → Pages → Build and deployment → Source: GitHub Actions** i GitHub.
3. Workflow **Publish to GitHub Pages** installerar med `npm ci`, kör tester och bygge och publicerar `dist`.
4. Adressen blir normalt `https://tobisen.github.io/dejter/`. Workflowens deployment visar den faktiska adressen.

`vite.config.ts` använder `/dejter/` lokalt och hämtar repo-namnet från `GITHUB_REPOSITORY` i Actions. För ett repo som heter `användare.github.io` används `/`. Vid egen domän på root: ändra `base` till `/`.

## Struktur

- `src/views/`: dejtkatalog, idélista och utflykter.
- `src/components/`: återanvändbara aktivitetskort och detaljdialog.
- `src/data/`: komplett startinnehåll från specifikationen.
- `src/types/`: datamodeller och kategorier.
- `src/services/`: reaktiv LocalStorage, import/export och tangentbordsfokus i dialoger.
- `public/`: appikoner, lokala inspirationsbilder och licenser.
- `.github/workflows/deploy.yml`: publicering till GitHub Pages.

Appen synkroniserar inte mellan Tobias och Jennys enheter. Export/import kan användas för att flytta en samling. Rensad webbläsardata tar bort samlingen, så exportera en kopia regelbundet.

## Personligt innehåll

Tobias och Jenny äter båda LCHF/LCHP. Matidéer bygger därför på protein, grönsaker och anpassningsbara tillbehör. Vanligt bröd, ris, pasta, söta desserter, sockerlag och söta mixers föreslås inte som standard. Vin- och drinkidéer har torra alternativ eller drycker utan socker och kan göras alkoholfria. Kortens matförslag är idéer, inte näringsberäknade recept.

Katalogen prioriterar natur, friluftsliv, vandring, fjäll, gym, löpning, AI och teknik, musik, dans, bio, mode, inredning, resor, djupa samtal, personlig utveckling och frivillig närhet. Tidsåtgång, budget och energi varierar mellan de nya korten.

## Design och bilder

Gränssnittet använder en ljus, grön färgskala, direkt tillgängliga tabbar och fotobaserade kort. Alla foton, omslag och typsnitt lagras lokalt och ingår i offlinecachen. Bilderna väljs efter aktivitetens tema; de är inte unika för varje dejt och utflyktsbilderna är inte dokumentationsfoton från respektive plats.

[Bildkällor, genererade filer och fullständiga bildprompter](docs/design-assets.md).
