<script setup lang="ts">
import { computed, ref, nextTick, toRaw, watch } from "vue";
import {
  Search,
  Heart,
  Plus,
  X,
  Trees,
  Pencil,
  Trash2,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-vue-next";
import { excursions } from "../services/storage";
import {
  excursionCategories,
  excursionStatuses,
  seasons,
  type Excursion,
} from "../types/index";
const query = ref(""),
  category = ref(""),
  statusFilter = ref(""),
  favoritesOnly = ref(false);
const visible = computed(() =>
  excursions.value.filter(
    (e) =>
      (!category.value ||
        e.categories.includes(
          category.value as (typeof excursionCategories)[number],
        )) &&
      e.title
        .toLocaleLowerCase("sv")
        .includes(query.value.toLocaleLowerCase("sv")) &&
      (!favoritesOnly.value || e.favorite || e.status === "favorit") &&
      (!statusFilter.value || e.status === statusFilter.value),
  ),
);
const selected = ref<Excursion>(),
  draft = ref<Excursion>(),
  titleInput = ref<HTMLInputElement>(),
  deleting = ref(false);
watch(selected, () => { deleting.value = false })

function openForm(e?: Excursion) {
  draft.value = e
    ? structuredClone(toRaw(e))
    : {
        id: crypto.randomUUID(),
        title: "",
        categories: ["Natur"],
        status: "vill göra",
        custom: true,
        season: [],
        tags: [],
      };
  selected.value = undefined;
  nextTick(() => titleInput.value?.focus());
}
function save() {
  if (!draft.value?.title.trim() || !draft.value.categories.length) return;
  const item = { ...draft.value, title: draft.value.title.trim() };
  const index = excursions.value.findIndex((e) => e.id === item.id);
  if (index < 0) excursions.value.unshift(item);
  else excursions.value[index] = item;
  draft.value = undefined;
}
function toggleFavorite(e: Excursion) {
  e.favorite = !(e.favorite || e.status === "favorit");
  if (e.status === "favorit") e.status = "vill göra";
}
</script>
<template>
  <section class="page">
    <div class="eyebrow">NÄRA HEMMA. LÅNGT FRÅN VARDAGEN.</div>
    <div class="page-title-row">
      <div>
        <h1>Ut på <em>utflykt.</em></h1>
        <p class="page-intro">
          Vår lilla bank av platser att upptäcka, med Uppsala som start.
        </p>
      </div>
      <button class="primary" @click="openForm()">
        <Plus :size="18" /> Egen utflykt
      </button>
    </div>
    <div class="search-row">
      <label class="search-field"
        ><Search :size="19" /><input
          v-model="query"
          aria-label="Sök utflykter"
          placeholder="Vart vill vi åka?" /></label
      ><button
        class="secondary"
        :class="{ chosen: favoritesOnly }"
        :aria-pressed="favoritesOnly"
        @click="favoritesOnly = !favoritesOnly"
      >
        <Heart :size="17" /> Favoriter</button
      ><select v-model="statusFilter" aria-label="Filtrera status">
        <option value="">Alla statusar</option>
        <option v-for="status in excursionStatuses" :key="status">
          {{ status }}
        </option>
      </select>
    </div>
    <div class="chips" aria-label="Utflyktskategorier">
      <button :class="{ active: !category }" @click="category = ''">
        Alla utflykter</button
      ><button
        v-for="c in excursionCategories"
        :key="c"
        :class="{ active: category === c }"
        @click="category = c"
      >
        {{ c }}
      </button>
    </div>
    <p class="subtle">{{ visible.length }} platser att längta till</p>
    <div class="list-grid">
      <article
        v-for="e in visible"
        :key="e.id"
        class="list-card excursion-card"
      >
        <div
          class="excursion-symbol"
          :class="'symbol-' + excursionCategories.indexOf(e.categories[0]!)"
        >
          <Trees :size="25" /><button
            class="icon-button"
            :aria-label="`Favorit: ${e.title}`"
            :aria-pressed="!!e.favorite || e.status === 'favorit'"
            @click="toggleFavorite(e)"
          >
            <Heart
              :size="20"
              :fill="
                e.favorite || e.status === 'favorit' ? 'currentColor' : 'none'
              "
            />
          </button>
        </div>
        <div class="excursion-body">
          <span class="card-category">{{ e.categories.join(" · ") }}</span
          ><button class="card-title" @click="selected = e">
            <h3>{{ e.title }}</h3>
            <ArrowUpRight :size="19" />
          </button>
          <p v-if="e.description" class="clamp">{{ e.description }}</p>
          <div class="list-actions">
            <select v-model="e.status" :aria-label="`Status för ${e.title}`">
              <option v-for="status in excursionStatuses" :key="status">
                {{ status }}
              </option></select
            ><button class="text-button" @click="selected = e">Visa mer</button>
          </div>
        </div>
      </article>
    </div>
    <div v-if="!visible.length" class="empty-state">
      <Trees :size="32" />
      <h2>Inga utflykter hittades</h2>
      <p>Prova ett annat namn eller ändra filtren.</p>
      <button
        class="secondary"
        @click="
          query = '';
          category = '';
          statusFilter = '';
          favoritesOnly = false;
        "
      >
        Visa alla utflykter
      </button>
    </div>
  </section>
  <div
    v-if="selected"
    class="modal-backdrop"
    @click.self="selected = undefined"
    @keydown.esc="selected = undefined"
  >
    <section
      class="modal"
      v-focus-trap
      role="dialog"
      aria-modal="true"
      aria-labelledby="excursion-title"
    >
      <button class="close" @click="selected = undefined" aria-label="Stäng">
        <X />
      </button>
      <div class="eyebrow">{{ selected.categories.join(" · ") }}</div>
      <h2 id="excursion-title">{{ selected.title }}</h2>
      <p>
        {{
          selected.description ||
          "En plats i vår utflyktsbank att upptäcka tillsammans. Lägg gärna till egna anteckningar inför besöket."
        }}
      </p>
      <div class="metadata">
        <span v-if="selected.distanceFromUppsala"
          ><MapPin :size="17" />{{ selected.distanceFromUppsala }}</span
        ><span v-if="selected.duration"
          ><Clock :size="17" />{{ selected.duration }}</span
        >
      </div>
      <div class="tags">
        <span v-for="season in selected.season" :key="season">{{ season }}</span
        ><span v-for="tag in selected.tags" :key="tag">{{ tag }}</span>
      </div>
      <label
        >Status<select v-model="selected.status">
          <option v-for="status in excursionStatuses" :key="status">
            {{ status }}
          </option>
        </select></label
      >
      <div class="card-actions">
        <button
          :class="{
            chosen: selected.favorite || selected.status === 'favorit',
          }"
          @click="toggleFavorite(selected)"
        >
          <Heart :size="17" />{{
            selected.favorite || selected.status === "favorit"
              ? "Favorit"
              : "Spara favorit"
          }}</button
        ><button @click="openForm(selected)">
          <Pencil :size="17" />Redigera
        </button>
      </div>
      <button
        v-if="selected.custom"
        class="text-button danger"
        @click="deleting = true"
      >
        <Trash2 :size="16" /> Ta bort egen utflykt
      </button>
      <div v-if="deleting" role="alert">
        <p>Ta bort ”{{ selected.title }}”?</p>
        <div class="card-actions">
          <button @click="deleting = false">Behåll</button
          ><button
            class="danger"
            @click="
              excursions = excursions.filter((e) => e.id !== selected?.id);
              selected = undefined;
              deleting = false;
            "
          >
            Ja, ta bort
          </button>
        </div>
      </div>
    </section>
  </div>
  <div
    v-if="draft"
    class="modal-backdrop"
    @click.self="draft = undefined"
    @keydown.esc="draft = undefined"
  >
    <form
      class="modal"
      v-focus-trap
      role="dialog"
      aria-modal="true"
      aria-labelledby="excursion-form-title"
      @submit.prevent="save"
    >
      <button
        type="button"
        class="close"
        @click="draft = undefined"
        aria-label="Stäng"
      >
        <X />
      </button>
      <div class="eyebrow">EN PLATS FÖR OSS</div>
      <h2 id="excursion-form-title">
        {{
          excursions.some((e) => e.id === draft?.id)
            ? "Redigera utflykt"
            : "Ny utflykt"
        }}
      </h2>
      <label
        >Namn<input
          ref="titleInput"
          v-model="draft.title"
          required
          maxlength="160"
          placeholder="Vart ska vi?"
      /></label>
      <fieldset>
        <legend>Kategorier (välj minst en)</legend>
        <div class="check-grid">
          <label v-for="c in excursionCategories" :key="c"
            ><input type="checkbox" :value="c" v-model="draft.categories" />{{
              c
            }}</label
          >
        </div>
      </fieldset>
      <label
        >Beskrivning<textarea
          v-model="draft.description"
          rows="3"
          placeholder="Vad vill vi upptäcka?"
        ></textarea>
      </label>
      <div class="form-columns">
        <label
          >Avstånd från Uppsala<input
            v-model="draft.distanceFromUppsala"
            placeholder="T.ex. ca 30 km" /></label
        ><label
          >Tidsåtgång<input
            v-model="draft.duration"
            placeholder="T.ex. en halvdag"
        /></label>
      </div>
      <fieldset>
        <legend>Säsong</legend>
        <div class="check-grid">
          <label v-for="season in seasons" :key="season"
            ><input type="checkbox" :value="season" v-model="draft.season" />{{
              season
            }}</label
          >
        </div>
      </fieldset>
      <label
        >Taggar (kommaseparerade)<input
          :value="draft.tags?.join(', ')"
          @input="
            draft.tags = ($event.target as HTMLInputElement).value
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          "
          placeholder="Fika, bad, picknick" /></label
      ><label
        >Status<select v-model="draft.status">
          <option v-for="status in excursionStatuses" :key="status">
            {{ status }}
          </option>
        </select></label
      >
      <p v-if="!draft.categories.length" class="danger">
        Välj minst en kategori.
      </p>
      <button
        class="primary full"
        type="submit"
        :disabled="!draft.categories.length"
      >
        Spara utflykt
      </button>
    </form>
  </div>
</template>
