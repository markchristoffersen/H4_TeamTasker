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

</script>

<template>
	<div class="task-card" @click="openTask">
			<h2>{{ task.title }}</h2>
			<p>{{ task.description }}</p>
			<p>Status: {{ task.status }}</p>
			<p>priority: {{ task.priority }}</p>
			<p>date: {{ dateLable }}</p>
	</div>

</template>

<style scoped>

	.task-card {
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 8px;
		width: 100%;
		max-width: 15rem;
		justify-self: center;
		background-color: var(--secondary-color);
		color: var(--accent-color);
	}
	.task-card:hover {
		cursor: pointer;
	}

</style>