<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Shuffle,
  Heart,
  Check,
  Clock,
  Wallet,
  Zap,
  Sparkles,
} from "lucide-vue-next";
import { activities } from "../services/storage";
import {
  dateCategories,
  shortCategories,
  type DateActivity,
} from "../types/index";
const category = ref("");
const onlyFavorites = ref(false);
const lowEnergy = ref(false);
const selected = ref<DateActivity>();
const pool = computed(() =>
  activities.value.filter(
    (a) =>
      (!category.value || a.category === category.value) &&
      (!onlyFavorites.value || a.favorite) &&
      (!lowEnergy.value || a.energy === "låg"),
  ),
);
function draw() {
  const options = pool.value.filter((a) => a.id !== selected.value?.id);
  const list = options.length ? options : pool.value;
  selected.value = list[Math.floor(Math.random() * list.length)];
}
</script>
<template>
  <section class="page">
    <div class="eyebrow">LITE NYFIKENHET RÄCKER</div>
    <h1>Vad blir vår nästa <em>dejt?</em></h1>
    <p class="page-intro">
      Låt slumpen bjuda på en idé. Resten gör vi tillsammans.
    </p>
    <div class="random-layout">
      <aside class="panel">
        <h3>Vad är ni på humör för?</h3>
        <label for="category">Välj kategori</label
        ><select id="category" v-model="category">
          <option value="">Alla kategorier</option>
          <option v-for="(c, i) in dateCategories" :key="c" :value="c">
            {{ shortCategories[i] }}
          </option>
        </select>
        <div class="checkboxes">
          <label
            ><input type="checkbox" v-model="onlyFavorites" /> Bara våra
            favoriter</label
          ><label
            ><input type="checkbox" v-model="lowEnergy" /> Bara låg
            energi</label
          >
        </div>
        <p class="subtle">{{ pool.length }} idéer att upptäcka</p>
        <button class="primary full" :disabled="!pool.length" @click="draw">
          <Shuffle :size="18" /> Slumpa dejt
        </button>
        <p v-if="!pool.length" class="subtle">
          Inga kort matchar. Prova en annan kategori eller ta bort ett filter.
        </p>
      </aside>
      <div class="date-result" aria-live="polite">
        <article v-if="selected" :key="selected.id" class="date-card">
          <div class="eyebrow"><Sparkles :size="16" /> EN STUND FÖR OSS</div>
          <h2>{{ selected.title }}</h2>
          <p class="date-description">{{ selected.description }}</p>
          <p class="category-label">{{ selected.category }}</p>
          <div class="metadata">
            <span v-if="selected.duration"
              ><Clock :size="16" />{{ selected.duration }}</span
            ><span v-if="selected.budget"
              ><Wallet :size="16" />{{ selected.budget }}</span
            ><span v-if="selected.energy"
              ><Zap :size="16" />{{ selected.energy }} energi</span
            >
          </div>
          <div class="tags">
            <span v-for="tag in selected.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="card-actions">
            <button
              :class="{ chosen: selected.favorite }"
              :aria-pressed="!!selected.favorite"
              @click="selected.favorite = !selected.favorite"
            >
              <Heart
                :size="18"
                :fill="selected.favorite ? 'currentColor' : 'none'"
              />{{ selected.favorite ? "Favorit" : "Spara favorit" }}</button
            ><button
              :class="{ chosen: selected.done }"
              :aria-pressed="!!selected.done"
              @click="selected.done = !selected.done"
            >
              <Check :size="18" />{{
                selected.done ? "Den har vi gjort!" : "Markera som gjord"
              }}
            </button>
          </div>
          <button class="text-button" :disabled="!pool.length" @click="draw">
            <Shuffle :size="16" /> Slumpa igen
          </button>
        </article>
        <div v-else class="empty-date">
          <div class="big-icon"><Shuffle :size="34" /></div>
          <h2>Nästa fina stund väntar</h2>
          <p>Välj en kategori och låt slumpen<br />ge er en liten knuff.</p>
          <span class="hand-note">kanske blir det en ny favorit ♡</span>
        </div>
      </div>
    </div>
  </section>
</template>
