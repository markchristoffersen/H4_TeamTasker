<!--TODO: This is supposed to be the detail view of a selected task-->

<script setup lang="ts">
import { useTasks } from '../composables/useTasks'
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const { getTaskById, isLoading, errorMessage } = useTasks()
const task = computed(() => {
  const id = Number(route.params.id)
  return Number.isInteger(id) ? getTaskById(id) : undefined
})

const dateLabel = computed(() => task.value
    ? new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${task.value.date}T12:00:00`))
    : '')
</script>

<template>

  <p v-if="isLoading && !task" class="detail-status" role="status">Loading task details…</p>
  <section v-else-if="task" class="detail-content">
    <div class="task-detail">
      <p>{{ task.title }}</p>
      <p>title:</p>
      <p>description:</p>
      <p>status: </p>
      <p>priority: </p>
      <p>date: </p>
    </div>
  </section>

</template>

<style scoped>

.task-detail {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--secondary-color);
  color: var(--accent-color);
}

.task-detail h1 {
  margin-bottom: 1rem;
}
</style>