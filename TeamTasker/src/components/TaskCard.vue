<script setup lang="ts">
import type { TaskItem } from '../types/task'

defineProps<{
  task: TaskItem;
}>();

</script>

<template>
	<article class="task-card">
		<h2>Task Detail View</h2>
		<div v-if="task">
			<h2>{{ task.title }}</h2>
			<p>{{ task.description }}</p>
			<p>Status: {{ task.status }}</p>
			<p>priority: {{ task.priority }}</p>
		</div>
	</article>

</template>

<style scoped>

	.task-card {
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 8px;
		background-color: darkblue;
	}

</style>