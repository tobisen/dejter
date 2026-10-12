<script setup lang="ts">
import {
  Heart,
  Check,
  Clock,
  Wallet,
  Zap,
  X,
  Shuffle,
  ArrowRight,
} from "lucide-vue-next";
import type { DateActivity } from "../types/index";
import {
  activityImage,
  categoryLabel,
  activityPlan,
} from "../services/presentation";
defineProps<{
  activity: DateActivity;
  canShuffle?: boolean;
  surprise?: boolean;
}>();
defineEmits<{ close: []; favorite: []; done: []; shuffle: [] }>();
</script>
<template>
  <div
    class="modal-backdrop"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <section
      class="modal activity-detail"
      v-focus-trap
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-detail-title"
    >
      <div class="detail-cover">
        <img
          :src="activityImage(activity)"
          alt=""
          width="900"
          height="500"
        /><span class="photo-shade"></span
        ><span class="detail-image-label">{{
          surprise ? "Slumpen valde åt oss" : categoryLabel(activity)
        }}</span
        ><button
          class="close photo-close"
          @click="$emit('close')"
          aria-label="Stäng"
        >
          <X :size="20" /></button
        ><span class="image-disclaimer">Inspirationsbild</span>
      </div>
      <div class="detail-body">
        <div class="eyebrow">
          {{ categoryLabel(activity) }}
          <span v-if="activity.done" class="inline-done"
            ><Check :size="12" /> Det här har vi gjort</span
          >
        </div>
        <h2 id="activity-detail-title">{{ activity.title }}</h2>
        <div class="detail-facts">
          <div>
            <Clock :size="18" /><span
              >Tidsåtgång<strong>{{
                activity.duration || "I vår takt"
              }}</strong></span
            >
          </div>
          <div>
            <Wallet :size="18" /><span
              >Budget<strong>{{ activity.budget || "Valfritt" }}</strong></span
            >
          </div>
          <div>
            <Zap :size="18" /><span
              >Energi<strong>{{ activity.energy || "Valfritt" }}</strong></span
            >
          </div>
        </div>
        <h3>Det här gör vi</h3>
        <p class="date-description">{{ activity.description }}</p>
        <div class="tags">
          <span v-for="tag in activity.tags" :key="tag">{{ tag }}</span>
        </div>
        <section class="plan-box">
          <h3>Så kommer vi igång</h3>
          <ol>
            <li v-for="step in activityPlan(activity)" :key="step">
              {{ step }}
            </li>
          </ol>
        </section>
        <p class="detail-note">
          Tidsåtgång och budget är ungefärliga. Gör idén till er egen.
        </p>
        <div class="detail-actions">
          <button
            class="secondary"
            :class="{ chosen: activity.favorite }"
            :aria-pressed="!!activity.favorite"
            @click="$emit('favorite')"
          >
            <Heart
              :size="17"
              :fill="activity.favorite ? 'currentColor' : 'none'"
            />{{
              activity.favorite ? "Sparad favorit" : "Spara favorit"
            }}</button
          ><button
            class="primary"
            :class="{ completed: activity.done }"
            :aria-pressed="!!activity.done"
            @click="$emit('done')"
          >
            <Check :size="18" />{{
              activity.done ? "Markerad som gjord" : "Det här har vi gjort"
            }}
          </button>
        </div>
        <button
          v-if="canShuffle"
          class="shuffle-next"
          @click="$emit('shuffle')"
        >
          <Shuffle :size="17" /> Ge oss ett annat förslag
          <ArrowRight :size="17" />
        </button>
      </div>
    </section>
  </div>
</template>
