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

- Slumpa bland 80 dejter i åtta kategorier. Favoritmarkera och markera som gjord. Filtrera på favoriter och låg energi.
- Skapa, redigera och ta bort idéer. Filtrera på typ och status och prioritera idéerna.
- Upptäck 70 utflykter. Sök, filtrera kategori/status/favoriter, redigera detaljer och skapa eller ta bort egna utflykter.
- Allt sparas i LocalStorage på aktuell enhet och webbläsare. Första starten laddar startdata; sparade listor ersätts inte vid nästa start.
- Exportera och återställ JSON-säkerhetskopior genom att trycka på T/J-avatarerna eller länken i sidfoten. En återställning ersätter den aktuella samlingen.
- Installerbar PWA med lokala ikoner och service worker. Appens gränssnitt och startdata finns offline efter första onlinebesöket och slutförd cachelagring. Utgående länkar kräver nätverk.

Tidsåtgång, energi och budget på dejtkorten är enkla uppskattningar. Utflykternas avstånd och öppettider är inte verifierade; lägg till egna uppgifter vid planering.

## Publicera på GitHub Pages

1. Pusha projektet till `main` i `tobisen/dejter`.
2. Välj **Settings → Pages → Build and deployment → Source: GitHub Actions** i GitHub.
3. Workflow **Publish to GitHub Pages** installerar med `npm ci`, kör tester och bygge och publicerar `dist`.
4. Adressen blir normalt `https://tobisen.github.io/dejter/`. Workflowens deployment visar den faktiska adressen.

`vite.config.ts` använder `/dejter/` lokalt och hämtar repo-namnet från `GITHUB_REPOSITORY` i Actions. För ett repo som heter `användare.github.io` används `/`. Vid egen domän på root: ändra `base` till `/`.

## Struktur

- `src/views/`: dejtkort, idélista och utflykter.
- `src/data/`: komplett startinnehåll från specifikationen.
- `src/types/`: datamodeller och kategorier.
- `src/services/`: reaktiv LocalStorage, import/export och tangentbordsfokus i dialoger.
- `public/`: SVG- och PNG-ikoner.
- `.github/workflows/deploy.yml`: publicering till GitHub Pages.

Appen synkroniserar inte mellan Tobias och Jennys enheter. Export/import kan användas för att flytta en samling. Rensad webbläsardata tar bort samlingen, så exportera en kopia regelbundet.
