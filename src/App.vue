<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Heart,
  Shuffle,
  Lightbulb,
  Trees,
  Download,
  X,
  ArrowUpRight,
  Settings2,
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
const page = ref<"random" | "ideas" | "excursions">("random");
const settings = ref(false);
const importMessage = ref("");
const backupFile = ref<File>();
async function restore() {
  if (!backupFile.value) return;
  try {
    await importData(backupFile.value);
    backupFile.value = undefined;
    importMessage.value = "Säkerhetskopian är återställd.";
  } catch (error) {
    importMessage.value =
      error instanceof Error ? error.message : "Filen kunde inte läsas.";
  }
}
const favoriteCount = computed(
  () => activities.value.filter((a) => a.favorite).length,
);
const nav = computed(() => [
  {
    id: "random" as const,
    label: "Dejter",
    icon: Shuffle,
    count: activities.value.length,
  },
  {
    id: "ideas" as const,
    label: "Idélistan",
    icon: Lightbulb,
    count: ideas.value.length,
  },
  {
    id: "excursions" as const,
    label: "Utflykter",
    icon: Trees,
    count: excursions.value.length,
  },
]);
const currentView = computed(
  () =>
    ({ random: RandomDateView, ideas: IdeasView, excursions: ExcursionsView })[
      page.value
    ],
);
function navigate(id: typeof page.value) {
  page.value = id;
  window.scrollTo({ top: 0, behavior: "instant" });
}
function moveTab(event: KeyboardEvent, index: number) {
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % nav.value.length;
  else if (event.key === "ArrowLeft")
    next = (index + nav.value.length - 1) % nav.value.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = nav.value.length - 1;
  else return;
  event.preventDefault();
  navigate(nav.value[next]!.id);
  document.getElementById(`tab-${nav.value[next]!.id}`)?.focus();
}
</script>
<template>
  <div class="app-shell">
    <header class="site-header">
      <button
        class="brand"
        @click="navigate('random')"
        aria-label="T & J Dejter, startsida"
      >
        <span class="brand-mark"><Heart :size="20" /></span
        ><span>T & J <b>Dejter</b><small>VÅR TID TILLSAMMANS</small></span>
      </button>
      <span class="header-note">Bara vi. Lite oftare.</span>
      <div class="header-right">
        <span
          class="header-favorites"
          :aria-label="`${favoriteCount} sparade favoriter`"
          ><Heart :size="15" />{{ favoriteCount }}</span
        ><button
          class="couple"
          @click="settings = true"
          aria-label="Inställningar och säkerhetskopia"
        >
          <span>T</span><span>J</span><Settings2 :size="14" />
        </button>
      </div>
    </header>
    <div class="navigation-bar">
      <nav class="main-tabs" role="tablist" aria-label="Huvudmeny">
        <button
          v-for="(item, index) in nav"
          :key="item.id"
          :id="`tab-${item.id}`"
          role="tab"
          :aria-selected="page === item.id"
          aria-controls="page-panel"
          :tabindex="page === item.id ? 0 : -1"
          :class="{ active: page === item.id }"
          @click="navigate(item.id)"
          @keydown="moveTab($event, index)"
        >
          <component :is="item.icon" :size="17" /><span>{{ item.label }}</span
          ><span class="tab-count">{{ item.count }}</span>
        </button>
      </nav>
      <span class="nav-location"><span></span> Utgår från Uppsala</span>
    </div>
    <main id="page-panel" role="tabpanel" :aria-labelledby="`tab-${page}`">
      <div v-if="storageError" class="notice" role="alert">
        {{ storageError }} <button @click="exportData">Exportera</button>
      </div>
      <KeepAlive><component :is="currentView" /></KeepAlive>
    </main>
    <footer class="app-footer">
      <span
        ><Heart :size="13" /> T & J Dejter
        <span class="footer-dot">·</span> Gjord för våra stunder.</span
      >
      <div>
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer"
          >Inspirationsbilder <ArrowUpRight :size="12" /></a
        ><button @click="settings = true">Vår samling & inställningar</button>
      </div>
    </footer>
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
