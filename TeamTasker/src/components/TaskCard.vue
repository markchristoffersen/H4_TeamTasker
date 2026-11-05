<script setup lang="ts">
import type { TaskItem } from '../types/task'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ task: TaskItem; index: number }>()

const dateLable = computed(() => 
	new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric'}).format(new Date(`${props.task.date}T12:00:00`)),
)

const router = useRouter()

function openTask() {
	router.push({ name: 'task-detail', params: { id: props.task.id } })
}

const priorityClass = computed(() => `priority-${props.task.priority.toLowerCase()}`)
</script>

<template>
	<div class="task-card" @click="openTask">
			<h2>{{ task.title }}</h2>
			<!-- <p>{{ task.description }}</p> -->
			<p>Status: {{ task.status }}</p>
			<span class="priority-badge" :class="priorityClass">
			<p>priority: {{ task.priority }}</p>
			</span>
			<p>date: {{ dateLable }}</p>
	</div>

</template>

<style scoped>

	.task-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  min-height: 14rem;
  padding: 1.25rem;
  margin: 0;
  border-radius: 0.875rem;
  background: var(--secondary-color);
  color: var(--text-color);
  box-shadow: 0 0.5rem 1.25rem rgb(9 35 40);
  cursor: pointer;
}

.task-card:hover {
  transform: translateY(-0.25rem);
}

.task-card h2 {
  color: var(--accent-color);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-color);
}

.priority-badge {
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.priority-low {
  border: 2px solid rgb(59 130 246 / 50%);
  background: rgb(59 130 246 / 20%);
  color: var(--text-color);
}

.priority-medium {
  border: 2px solid rgb(255 193 7 / 50%);
  background: rgb(255 193 7 / 20%);
  color: var(--text-color);
}

.priority-high {
  border: 2px solid rgb(255 107 107 / 50%);
  background: rgb(255 107 107 / 30%);
  color: var(--text-color);
}

</style>