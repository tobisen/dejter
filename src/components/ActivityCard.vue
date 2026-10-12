<script setup lang="ts">
import { Heart, Clock, ArrowUpRight, Check, Wallet } from "lucide-vue-next";
import type { DateActivity } from "../types/index";
import { activityImage, categoryLabel } from "../services/presentation";
defineProps<{ activity: DateActivity }>();
defineEmits<{
  open: [activity: DateActivity];
  favorite: [activity: DateActivity];
}>();
</script>
<template>
  <article class="activity-card">
    <div class="card-photo">
      <button
        class="photo-open"
        :aria-label="`Visa dejt: ${activity.title}`"
        @click="$emit('open', activity)"
      >
        <img
          :src="activityImage(activity)"
          alt=""
          loading="lazy"
          width="600"
          height="400"
        />
        <span class="photo-shade"></span>
        <span class="photo-category">{{ categoryLabel(activity) }}</span>
        <span class="photo-arrow"><ArrowUpRight :size="18" /></span>
      </button>
      <button
        class="favorite-button"
        :class="{ saved: activity.favorite }"
        :aria-label="`${activity.favorite ? 'Ta bort favorit' : 'Spara favorit'}: ${activity.title}`"
        :aria-pressed="!!activity.favorite"
        @click="$emit('favorite', activity)"
      >
        <Heart :size="18" :fill="activity.favorite ? 'currentColor' : 'none'" />
      </button>
      <span v-if="activity.done" class="done-badge"
        ><Check :size="12" /> Gjord</span
      >
    </div>
    <div class="activity-content">
      <button class="activity-title" @click="$emit('open', activity)">
        <h3>{{ activity.title }}</h3>
      </button>
      <p class="card-excerpt">{{ activity.description }}</p>
      <span class="season-label">{{
        activity.season?.length
          ? "Passar: " + activity.season.join(" · ")
          : "Passar året runt"
      }}</span>
      <div class="card-meta">
        <span v-if="activity.duration"
          ><Clock :size="13" />{{ activity.duration }}</span
        ><span v-if="activity.budget"
          ><Wallet :size="13" />{{ activity.budget }}</span
        >
      </div>
      <div class="activity-card-bottom">
        <span class="energy-dot" :class="activity.energy">{{
          activity.energy ? `${activity.energy} energi` : "I vår takt"
        }}</span
        ><button @click="$emit('open', activity)">
          Visa dejt <ArrowUpRight :size="14" />
        </button>
      </div>
    </div>
  </article>
</template>
