<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Lightbulb,
  MapPin,
  ExternalLink,
} from "lucide-vue-next";
import { ideas } from "../services/storage";
import { ideaTypes, ideaStatuses, type Idea } from "../types/index";
const typeFilter = ref(""),
  statusFilter = ref("");
const visible = computed(() =>
  ideas.value
    .filter(
      (i) =>
        (!typeFilter.value || i.type === typeFilter.value) &&
        (!statusFilter.value || i.status === statusFilter.value),
    )
    .sort(
      (a, b) =>
        ({ hög: 3, mellan: 2, låg: 1 })[b.priority] -
        { hög: 3, mellan: 2, låg: 1 }[a.priority],
    ),
);
const draft = ref<Idea>(),
  titleInput = ref<HTMLInputElement>();
const deleting = ref<string>();
function open(idea?: Idea) {
  draft.value = idea
    ? { ...idea }
    : {
        id: crypto.randomUUID(),
        title: "",
        type: "Testa",
        priority: "mellan",
        status: "idé",
        createdAt: new Date().toISOString(),
      };
  nextTick(() => titleInput.value?.focus());
}
function save() {
  if (!draft.value?.title.trim()) return;
  const item = { ...draft.value, title: draft.value.title.trim() };
  const index = ideas.value.findIndex((i) => i.id === item.id);
  if (index < 0) ideas.value.unshift(item);
  else ideas.value[index] = item;
  draft.value = undefined;
}
function safeLink(link?: string) {
  try {
    const u = new URL(link ?? "");
    return ["https:", "http:"].includes(u.protocol) ? u.href : undefined;
  } catch {
    return undefined;
  }
}
</script>
<template>
  <section class="page">
    <div class="eyebrow">DRÖMMAR, INFALL & NÅGON GÅNG</div>
    <div class="page-title-row">
      <div>
        <h1>Vår <em>idélista.</em></h1>
        <p class="page-intro">Sånt vi vill uppleva. Stort som smått.</p>
      </div>
      <button class="primary" @click="open()">
        <Plus :size="18" /> Lägg till idé
      </button>
    </div>
    <div class="filter-row">
      <label
        >Typ<select v-model="typeFilter">
          <option value="">Alla typer</option>
          <option v-for="type in ideaTypes" :key="type">{{ type }}</option>
        </select></label
      ><label
        >Status<select v-model="statusFilter">
          <option value="">Alla statusar</option>
          <option v-for="status in ideaStatuses" :key="status">
            {{ status }}
          </option>
        </select></label
      ><span class="subtle count">{{ visible.length }} idéer</span>
    </div>
    <div v-if="visible.length" class="list-grid">
      <article v-for="idea in visible" :key="idea.id" class="list-card">
        <div class="card-top">
          <span class="pill">{{ idea.type }}</span
          ><span class="priority" :class="idea.priority"
            >{{ idea.priority }} prioritet</span
          >
        </div>
        <h3>{{ idea.title }}</h3>
        <p v-if="idea.note" class="preserve">{{ idea.note }}</p>
        <p v-if="idea.location" class="metadata">
          <MapPin :size="15" />{{ idea.location }}
        </p>
        <a
          v-if="safeLink(idea.link)"
          :href="safeLink(idea.link)"
          target="_blank"
          rel="noopener noreferrer"
          class="text-button"
          >Öppna länk <ExternalLink :size="15"
        /></a>
        <div class="list-actions">
          <select
            v-model="idea.status"
            :aria-label="`Status för ${idea.title}`"
          >
            <option v-for="status in ideaStatuses" :key="status">
              {{ status }}
            </option></select
          ><button
            class="icon-button"
            @click="open(idea)"
            :aria-label="`Redigera ${idea.title}`"
          >
            <Pencil :size="17" /></button
          ><button
            class="icon-button"
            @click="deleting = idea.id"
            :aria-label="`Ta bort ${idea.title}`"
          >
            <Trash2 :size="17" />
          </button>
        </div>
      </article>
    </div>
    <div v-else class="empty-state">
      <div class="big-icon"><Lightbulb :size="32" /></div>
      <h2>
        {{
          ideas.length ? "Inga idéer med de här filtren" : "Vad drömmer vi om?"
        }}
      </h2>
      <p>
        {{
          ideas.length
            ? "Prova en annan typ eller status."
            : "En resa, en restaurang eller något att prata om. Här får alla våra ”någon gång” en plats."
        }}
      </p>
      <button v-if="!ideas.length" class="secondary" @click="open()">
        <Plus :size="17" /> Skriv vår första idé
      </button>
    </div>
  </section>
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
      aria-labelledby="idea-title"
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
      <div class="eyebrow">NÅGOT ATT SE FRAM EMOT</div>
      <h2 id="idea-title">
        {{
          ideas.some((i) => i.id === draft?.id) ? "Redigera idé" : "En ny idé"
        }}
      </h2>
      <label
        >Titel<input
          ref="titleInput"
          v-model="draft.title"
          required
          maxlength="160"
          placeholder="Vad vill vi göra?"
      /></label>
      <div class="form-columns">
        <label
          >Typ<select v-model="draft.type">
            <option v-for="type in ideaTypes" :key="type">{{ type }}</option>
          </select></label
        ><label
          >Prioritet<select v-model="draft.priority">
            <option>låg</option>
            <option>mellan</option>
            <option>hög</option>
          </select></label
        >
      </div>
      <label
        >Anteckning<textarea
          v-model="draft.note"
          rows="3"
          placeholder="Det här vill vi komma ihåg…"
        ></textarea></label
      ><label
        >Plats<input
          v-model="draft.location"
          placeholder="Var någonstans?" /></label
      ><label
        >Länk<input
          v-model="draft.link"
          type="url"
          pattern="https?://.*"
          placeholder="https://…" /></label
      ><label
        >Status<select v-model="draft.status">
          <option v-for="status in ideaStatuses" :key="status">
            {{ status }}
          </option>
        </select></label
      ><button class="primary full" type="submit">Spara idé</button>
    </form>
  </div>
  <div v-if="deleting" class="modal-backdrop">
    <section
      class="modal small-modal"
      v-focus-trap
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <h2 id="delete-title">Ta bort idén?</h2>
      <p>
        ”{{ ideas.find((i) => i.id === deleting)?.title }}” försvinner från
        listan.
      </p>
      <div class="card-actions">
        <button @click="deleting = undefined">Behåll</button
        ><button
          class="danger"
          @click="
            ideas = ideas.filter((i) => i.id !== deleting);
            deleting = undefined;
          "
        >
          Ta bort
        </button>
      </div>
    </section>
  </div>
</template>
