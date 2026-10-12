<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import {
  Shuffle,
  Heart,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Check,
  X,
  Sparkles,
  ChevronDown,
  Trees,
  Coffee,
  MapPin,
} from "lucide-vue-next";
import { activities } from "../services/storage";
import {
  dateCategories,
  shortCategories,
  type DateActivity,
} from "../types/index";
import {
  filterActivities,
  discoveryOrder,
  randomActivity,
  imageUrl,
  type ActivityFilters,
} from "../services/presentation";
import ActivityCard from "../components/ActivityCard.vue";
import ActivityDetails from "../components/ActivityDetails.vue";
const filters = reactive<ActivityFilters>({
  category: "",
  interest: "",
  query: "",
  collection: "all",
  lowEnergy: false,
});
const interests = [
  "Natur",
  "Friluftsliv",
  "Vandring",
  "Fjäll",
  "Träning",
  "Gym",
  "Löpning",
  "AI & tech",
  "Musik",
  "Dans",
  "Mode",
  "Inredning",
  "Djupa samtal",
  "Personlig utveckling",
  "Närhet",
  "Prova nytt",
  "Resor",
  "Bio & kultur",
  "Mat & dryck",
];
const extraFilters = ref(false);
const selected = ref<DateActivity>();
const surprise = ref(false);
const limit = ref(12);
const ordered = computed(() => discoveryOrder(activities.value));
const pool = computed(() => filterActivities(ordered.value, filters));
const visible = computed(() => pool.value.slice(0, limit.value));
const favoriteCount = computed(
  () => activities.value.filter((a) => a.favorite).length,
);
const doneCount = computed(() => activities.value.filter((a) => a.done).length);
const activeFilters = computed(() => !!filters.interest || filters.lowEnergy);
watch(filters, () => {
  limit.value = 12;
});
function draw() {
  selected.value = randomActivity(pool.value, selected.value?.id);
  surprise.value = true;
}
function open(activity: DateActivity) {
  selected.value = activity;
  surprise.value = false;
}
function reset() {
  Object.assign(filters, {
    category: "",
    interest: "",
    query: "",
    collection: "all",
    lowEnergy: false,
  });
}
function chooseCategory(value: string) {
  filters.category = value;
}
</script>
<template>
  <section class="discovery-page">
    <div class="discovery-hero">
      <img
        class="hero-photo"
        :src="imageUrl('cover')"
        alt=""
        width="1400"
        height="650"
        fetchpriority="high"
      />
      <div class="hero-gradient"></div>
      <div class="hero-content">
        <span class="hero-kicker"
          ><span></span> TOBIAS & JENNY · VÅR TID TILLSAMMANS</span
        >
        <h1>Mer tid för oss.<br /><span>Nya minnen börjar här.</span></h1>
        <p>
          Från dans i köket till en stig vi aldrig gått.<br
            class="desktop-only"
          />
          Hitta något som känns som vi.
        </p>
        <button class="hero-cta" :disabled="!pool.length" @click="draw">
          <Shuffle :size="18" /> Slumpa en dejt <ArrowRight :size="18" />
        </button>
      </div>
      <span class="hero-caption"
        ><MapPin :size="13" /> Små stunder. Stora äventyr.</span
      >
      <div class="hero-image-count">
        <Sparkles :size="15" /><strong>{{ activities.length }}</strong> idéer
        för oss
      </div>
    </div>
    <div class="discovery-heading">
      <div>
        <div class="eyebrow">VAD KÄNNS RÄTT IDAG?</div>
        <h2>Hitta vår nästa dejt</h2>
      </div>
      <p>Välj en känsla. Resten tar vi därifrån.</p>
    </div>
    <div class="category-strip" aria-label="Dejtkategorier">
      <button
        :class="{ active: !filters.category }"
        :aria-pressed="!filters.category"
        @click="chooseCategory('')"
      >
        <Sparkles :size="15" /> Allt för oss</button
      ><button
        v-for="(category, index) in dateCategories"
        :key="category"
        :class="{ active: filters.category === category }"
        :aria-pressed="filters.category === category"
        @click="chooseCategory(category)"
      >
        <component
          :is="
            index === 0
              ? Coffee
              : index === 2 || index === 3 || index === 4
                ? Trees
                : Heart
          "
          :size="15"
        />{{ shortCategories[index] }}
      </button>
    </div>
    <div class="discovery-toolbar">
      <label class="search-field"
        ><Search :size="18" /><input
          v-model="filters.query"
          aria-label="Sök dejter"
          placeholder="Sök efter en dejt, känsla eller ett intresse…" /><button
          v-if="filters.query"
          @click="filters.query = ''"
          aria-label="Rensa sökning"
        >
          <X :size="15" /></button></label
      ><button
        class="filter-toggle"
        :class="{ chosen: activeFilters || extraFilters }"
        :aria-expanded="extraFilters"
        aria-controls="date-filters"
        @click="extraFilters = !extraFilters"
      >
        <SlidersHorizontal :size="17" /> Filter
        <span v-if="activeFilters" class="filter-indicator"></span
        ><ChevronDown :size="14" :class="{ rotated: extraFilters }" />
      </button>
    </div>
    <div v-if="extraFilters" id="date-filters" class="expanded-filters">
      <label for="interest"
        >Vad lockar oss?<select id="interest" v-model="filters.interest">
          <option value="">Alla intressen</option>
          <option v-for="interest in interests" :key="interest">
            {{ interest }}
          </option>
        </select></label
      ><label class="check-label"
        ><input type="checkbox" v-model="filters.lowEnergy" /> Bara låg
        energi</label
      ><span class="diet-note">Matidéer för vår LCHF/LCHP.</span
      ><button
        v-if="activeFilters"
        class="text-button"
        @click="
          filters.interest = '';
          filters.lowEnergy = false;
        "
      >
        Rensa filter <X :size="14" />
      </button>
    </div>
    <div class="collection-row">
      <div class="collection-tabs" aria-label="Visa samling">
        <button
          :class="{ active: filters.collection === 'all' }"
          :aria-pressed="filters.collection === 'all'"
          @click="filters.collection = 'all'"
        >
          Utforska</button
        ><button
          :class="{ active: filters.collection === 'favorites' }"
          :aria-pressed="filters.collection === 'favorites'"
          @click="filters.collection = 'favorites'"
        >
          <Heart :size="14" /> Favoriter
          <span>{{ favoriteCount }}</span></button
        ><button
          :class="{ active: filters.collection === 'done' }"
          :aria-pressed="filters.collection === 'done'"
          @click="filters.collection = 'done'"
        >
          <Check :size="14" /> Gjorda <span>{{ doneCount }}</span>
        </button>
      </div>
      <span class="result-count" role="status"
        >{{ pool.length }} {{ pool.length === 1 ? "dejt" : "dejter" }}</span
      >
    </div>
    <div v-if="pool.length" class="activity-grid">
      <ActivityCard
        v-for="activity in visible"
        :key="activity.id"
        :activity="activity"
        @open="open"
        @favorite="activity.favorite = !activity.favorite"
      />
    </div>
    <div v-else class="empty-state">
      <div class="big-icon">
        <Heart v-if="filters.collection === 'favorites'" /><Search v-else />
      </div>
      <h2>
        {{
          filters.collection === "favorites"
            ? "Här samlar vi våra favoriter"
            : filters.collection === "done"
              ? "Minnena börjar med en dejt"
              : "Ingen dejt matchade just nu"
        }}
      </h2>
      <p>
        {{
          filters.collection === "favorites"
            ? "Tryck på hjärtat på ett kort för att spara det här. Prova att ta bort filter om du redan har favoriter."
            : "Prova en annan kategori eller rensa filtren för att hitta något nytt."
        }}
      </p>
      <button class="secondary" @click="reset">
        Utforska alla dejter <ArrowRight :size="16" />
      </button>
    </div>
    <div v-if="pool.length > limit" class="load-more">
      <button class="secondary" @click="limit += 12">
        Visa fler dejter <ChevronDown :size="17" /></button
      ><span>Visar {{ visible.length }} av {{ pool.length }}</span>
    </div>
    <div class="discovery-endnote">
      <Heart :size="14" /> Det bästa med planen är att vi gör den tillsammans.
    </div>
    <ActivityDetails
      v-if="selected"
      :key="selected.id"
      :activity="selected"
      :surprise="surprise"
      :can-shuffle="!!pool.length"
      @close="selected = undefined"
      @favorite="selected.favorite = !selected.favorite"
      @done="selected.done = !selected.done"
      @shuffle="draw"
    />
  </section>
</template>
