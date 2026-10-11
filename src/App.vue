<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Heart,
  House,
  Shuffle,
  Lightbulb,
  Trees,
  ArrowUpRight,
  Download,
  X,
  MapPin,
  Sparkles,
  ArrowRight,
  Coffee,
  Compass,
} from "lucide-vue-next";
import {
  activities,
  ideas,
  excursions,
  storageError,
  exportData,
  importData,
} from "./services/storage";
import RandomDateView from "./views/RandomDateView.vue";
import IdeasView from "./views/IdeasView.vue";
import ExcursionsView from "./views/ExcursionsView.vue";
const page = ref("home");
const settings = ref(false);
const importMessage = ref("");
const backupFile = ref<File>();
async function restore() {
  if (!backupFile.value) return;
  try {
    await importData(backupFile.value);
    backupFile.value = undefined;
    importMessage.value = "Säkerhetskopian är återställd.";
  } catch (e) {
    importMessage.value =
      e instanceof Error ? e.message : "Filen kunde inte läsas.";
  }
}
const favorites = computed(
  () => activities.value.filter((a) => a.favorite).length,
);
const remaining = computed(
  () =>
    excursions.value.filter(
      (e) => e.status !== "gjort" && e.status !== "inte aktuell",
    ).length,
);
const nav = [
  { id: "home", label: "Hem", icon: House },
  { id: "random", label: "Slumpa dejt", icon: Shuffle },
  { id: "ideas", label: "Idélistan", icon: Lightbulb },
  { id: "excursions", label: "Utflykter", icon: Trees },
];
</script>
<template>
  <div class="app-shell">
    <header class="site-header">
      <button
        class="brand"
        @click="page = 'home'"
        aria-label="T & J Dejter, startsida"
      >
        <span class="brand-mark"><Heart :size="20" /></span
        ><span>T & J <i>Dejter</i></span>
      </button>
      <nav class="desktop-nav" aria-label="Huvudmeny">
        <button
          v-for="item in nav"
          :key="item.id"
          :class="{ active: page === item.id }"
          @click="page = item.id"
        >
          {{ item.label }}
        </button>
      </nav>
      <button
        class="couple"
        @click="settings = true"
        aria-label="Inställningar och säkerhetskopia"
      >
        <span>T</span><span>J</span>
      </button>
    </header>
    <main>
      <div v-if="storageError" class="notice" role="alert">
        {{ storageError }} <button @click="exportData">Exportera</button>
      </div>
      <template v-if="page === 'home'">
        <section class="hero">
          <div class="hero-copy">
            <div class="eyebrow">
              <span class="tiny-heart">♥</span> FÖR TOBIAS & JENNY
            </div>
            <h1>Lite mer vi.<br />Lite fler <em>äventyr.</em></h1>
            <p>
              En kväll hemma, en spontan utflykt eller något<br
                class="desktop-only"
              />
              helt nytt. Här börjar nästa stund tillsammans.
            </p>
            <button class="primary" @click="page = 'random'">
              <Shuffle :size="18" /> Vad ska vi hitta på?
              <ArrowRight :size="18" />
            </button>
            <div class="hero-foot">
              <span class="little-line"></span> Små stunder. Fina minnen. Bara
              vi.
            </div>
          </div>
          <div class="hero-art" aria-hidden="true">
            <div class="orbit orbit-one"></div>
            <div class="orbit orbit-two"></div>
            <span class="art-star star-one">✧</span
            ><span class="art-star star-two">✦</span>
            <div class="art-note"><Heart :size="14" /> vår tid tillsammans</div>
            <div class="postcard">
              <div class="landscape">
                <div class="sun"></div>
                <div class="hill back"></div>
                <div class="hill front"></div>
                <div class="path"></div>
                <div class="tree t1"></div>
                <div class="tree t2"></div>
                <div class="tree t3"></div>
                <div class="tree t4"></div>
                <div class="people"><span></span><span></span></div>
              </div>
              <div class="postcard-caption">
                någonstans, tillsammans <Heart :size="15" />
              </div>
            </div>
            <div class="coffee-stamp">
              <Coffee :size="26" /><span>du + jag</span>
            </div>
            <span class="art-star star-three">✧</span>
          </div>
        </section>
        <section class="choose-section">
          <div class="section-heading">
            <div>
              <div class="eyebrow">VAD ÄR NI SUGNA PÅ?</div>
              <h2>En liten början på något fint</h2>
            </div>
            <span class="subtle desktop-only">Ingen plan behövs.</span>
          </div>
          <div class="entry-grid">
            <button class="entry-card rose" @click="page = 'random'">
              <div class="entry-top">
                <span class="entry-icon"><Shuffle /></span
                ><ArrowUpRight :size="21" />
              </div>
              <h3>Låt slumpen bestämma</h3>
              <p>Välj en känsla. Dra ett kort.<br />Hitta er nästa dejt.</p>
              <span class="entry-bottom"
                >Slumpa dejt <ArrowRight :size="17"
              /></span></button
            ><button class="entry-card sand" @click="page = 'ideas'">
              <div class="entry-top">
                <span class="entry-icon"><Lightbulb /></span
                ><ArrowUpRight :size="21" />
              </div>
              <h3>Alla våra ”någon gång”</h3>
              <p>
                Stora drömmar och små infall.<br />Samla det ni vill göra
                tillsammans.
              </p>
              <span class="entry-bottom"
                >Till idélistan <ArrowRight :size="17"
              /></span></button
            ><button class="entry-card sage" @click="page = 'excursions'">
              <div class="entry-top">
                <span class="entry-icon"><Trees /></span
                ><ArrowUpRight :size="21" />
              </div>
              <h3>Ut på en liten upptäcktsfärd</h3>
              <p>
                Skogsstigar, slottsfika och havsluft.<br />Det fina finns ofta
                nära.
              </p>
              <span class="entry-bottom"
                >Upptäck utflykter <ArrowRight :size="17"
              /></span>
            </button>
          </div>
        </section>
        <section class="stats" aria-label="Vår samling">
          <div>
            <Shuffle :size="18" /><strong>{{ activities.length }}</strong
            ><span>dejtidéer</span>
          </div>
          <div>
            <Heart :size="18" /><strong>{{ favorites }}</strong
            ><span>favoriter</span>
          </div>
          <div>
            <Lightbulb :size="18" /><strong>{{ ideas.length }}</strong
            ><span>egna idéer</span>
          </div>
          <div>
            <Compass :size="18" /><strong>{{ remaining }}</strong
            ><span>utflykter att upptäcka</span>
          </div>
        </section>
        <div class="home-note">
          <Sparkles :size="16" /><span
            >Det behöver inte vara stort för att bli ett fint minne.</span
          >
        </div>
      </template>
      <RandomDateView v-else-if="page === 'random'" />
      <IdeasView v-else-if="page === 'ideas'" />
      <ExcursionsView v-else />
    </main>
    <footer>
      <span>T & J <i>Dejter</i></span
      ><span
        ><MapPin :size="13" /> Med Uppsala som utgångspunkt. Och oss i
        centrum.</span
      ><button @click="settings = true">Sparat på den här enheten</button>
    </footer>
    <nav class="bottom-nav" aria-label="Huvudmeny">
      <button
        v-for="item in nav"
        :key="item.id"
        :class="{ active: page === item.id }"
        @click="page = item.id"
      >
        <component :is="item.icon" :size="21" /><span>{{ item.label }}</span>
      </button>
    </nav>
    <div
      v-if="settings"
      class="modal-backdrop"
      @click.self="settings = false"
      @keydown.esc="settings = false"
    >
      <section
        class="modal"
        v-focus-trap
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <button class="close" @click="settings = false" aria-label="Stäng">
          <X />
        </button>
        <div class="eyebrow">VÅR LILLA SAMLING</div>
        <h2 id="settings-title">Allt sparas hos dig</h2>
        <p>
          Favoriter, idéer och utflykter sparas i den här webbläsaren. En annan
          enhet har sin egen samling. Om webbläsardata raderas försvinner också
          samlingen.
        </p>
        <button class="primary" @click="exportData">
          <Download :size="18" /> Exportera säkerhetskopia</button
        ><label class="import-label"
          >Återställ säkerhetskopia<input
            type="file"
            accept="application/json,.json"
            @change="
              backupFile = ($event.target as HTMLInputElement).files?.[0];
              importMessage = '';
            "
        /></label>
        <div v-if="backupFile">
          <p>
            Återställ ”{{ backupFile.name }}”? Din nuvarande samling ersätts.
            Exportera den först om du vill behålla den.
          </p>
          <button class="secondary" @click="restore">Återställ från fil</button>
        </div>
        <p v-if="importMessage" role="status">{{ importMessage }}</p>
        <p class="subtle">
          Installera appen via webbläsarens meny. På iPhone: Dela → Lägg till på
          hemskärmen. Öppna appen online en gång för att göra den tillgänglig
          offline.
        </p>
      </section>
    </div>
  </div>
</template>
