<!--TODO: This is supposed to be the detail view of a selected task-->

<script setup lang="ts">
import { useTasks } from '../composables/useTasks'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const { getTaskById, isLoading, errorMessage } = useTasks()

const task = computed(() => {
  const param = route.params.id
  if (typeof param !== 'string') return undefined
  const id = Number(param)
  return Number.isSafeInteger(id) ? getTaskById(id) : undefined
})

const dateLabel = computed(() => task.value
    ? new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${task.value.date}T12:00:00`))
    : '')
</script>

<template>
  <p v-if="isLoading && !task" class="detail-status" role="status">Loading task details…</p>
  <section v-else class="detail-content">
	<RouterLink to="/" class="detail-backdrop" aria-label="Close task details"></RouterLink>
     <article class="task-detail">
		<RouterLink to="/" class="back-button">Back to tasks</RouterLink>
      <template v-if="task">
        <h1>{{ task.title }}</h1>

        <div class="description">
          <h2>Description</h2>
          <p>{{ task.description }}</p>
        </div>

        <div class="task-info">
          <p>Status: {{ task.status }}</p>
          <p>Priority: {{ task.priority }}</p>
          <p>Due date: {{ dateLabel }}</p>
        </div>

        <RouterLink class="edit-button" :to="{ name: 'task-edit', params: { id: task.id } }">Edit task</RouterLink>
      </template>
      <template v-else>
        <h1>Task unavailable</h1>
        <p>{{ errorMessage || 'This task could not be found.' }}</p>
      </template>
	    </article>
  </section>
</template>

<style scoped>
.detail-backdrop {
  position: absolute;
  inset: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.detail-content {
  position: fixed;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100%;
  place-content: center;
  justify-items: center;
}

.task-detail {
  position: relative;	
  width: min(100% - 2rem, 680px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid rgb(139 187 146);
  border-radius: 18px;
  background: var(--secondary-color);
  color: var(--text-color);
  box-shadow: 0 16px 36px rgb(9 35 40);
  z-index: 10;
}

.task-detail > p:nth-child(2) {
  padding-bottom: 1.5rem;
  color: var(--text-color);
  line-height: 1.8;
}

.task-info {
  padding: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.task-info p {

  align-self: center;	
  width: fit-content;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  background: var(--tertiary-color);
  color: var(--text-color);
  line-height: 1.5;
}

.detail-status {
  margin: 3rem auto;
  text-align: center;
}

.back-button {
  background: var(--tertiary-color);
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--tertiary-color);
  border-radius: 0.5rem;
  color: var(--text-color);
  text-decoration: none;
}
.back-button:hover {
  background: var(--main-color);
  color: var(--text-color);
}
.edit-button {
  display: inline-flex;
  margin-top: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  background: var(--main-color);
  color: var(--text-color);
  text-decoration: none;
}
.edit-button:hover { background: var(--tertiary-color); }
</style>