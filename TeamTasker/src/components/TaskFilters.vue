<script setup lang="ts">
import { TASK_STATUS, TASK_PRIORITY } from '../types/task'

defineProps<{ search: string; status: string; priority: string; }>()
const emit = defineEmits<{
  'update:search': [value: string]
  'update:status': [value: string]
  'update:priority': [value: string]
}>()
</script>

<template>
  <section class="filter-bar" aria-label="Filter events">
    <label class="search-field">
      <span class="search-icon" aria-hidden="true">⌕</span>
      <span class="visually-hidden">Search tasks</span>
      <input :value="search" type="search" placeholder="Search by title or keyword..." @input="emit('update:search', ($event.target as HTMLInputElement).value)" />
      <kbd>⌘ K</kbd>
    </label>

    <label class="status-field">
      <span class="visually-hidden">Filter by status</span>
      <select :value="status" @change="emit('update:status', ($event.target as HTMLSelectElement).value)">
        <option value="">All statuses</option>
        <option v-for="taskStatus in TASK_STATUS" :key="taskStatus" :value="taskStatus">{{ taskStatus }}</option>
      </select>
      <span class="select-chevron" aria-hidden="true">⌄</span>
    </label>

    <label class="priority-field">
      <span class="visually-hidden">Filter by priority</span>
      <select :value="priority" @change="emit('update:priority', ($event.target as HTMLSelectElement).value)">
        <option value="">All priorities</option>
        <option v-for="taskPriority in TASK_PRIORITY" :key="taskPriority" :value="taskPriority">{{ taskPriority }}</option>
      </select>
      <span class="select-chevron" aria-hidden="true">⌄</span>
    </label>
  </section>
</template>

<style scoped>
.filter-bar { display: flex; gap: 10px; width: 100%; }
.search-field,
.status-field { display: flex; min-height: 49px; align-items: center; border: 1px solid var(--line); border-radius: 7px; background: var(--paper); }
.priority-field { display: flex; min-height: 49px; align-items: center; border: 1px solid var(--line); border-radius: 7px; background: var(--paper); }
.search-field { flex: 1; gap: 10px; padding: 0 14px; }
.search-icon { color: var(--muted); font-size: 24px; line-height: 1; transform: rotate(-20deg); }
input,
select { min-width: 0; border: 0; outline: 0; background: transparent; color: var(--ink); font: inherit; font-size: 12px; }
input { width: 100%; }
input::placeholder { color: #93948d; }
kbd { flex: none; border: 1px solid var(--line); border-radius: 4px; padding: 3px 6px; color: var(--muted); font-family: inherit; font-size: 9px; }
.status-field { position: relative; width: 170px; padding: 0 13px; }
.priority-field { position: relative; width: 170px; padding: 0 13px; }
select { width: 100%; appearance: none; cursor: pointer; }
.select-chevron { position: absolute; right: 13px; color: var(--muted); pointer-events: none; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }

@media (max-width: 540px) {
  .filter-bar { flex-direction: column; }
  .status-field { width: 100%; }
  .priority-field { width: 100%; }
  kbd { display: none; }
}
</style>
