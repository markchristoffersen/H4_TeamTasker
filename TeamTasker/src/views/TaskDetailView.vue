<!--TODO: This is supposed to be the detail view of a selected task-->

<script setup lang="ts">
import type { TaskItem } from '../types/task'
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'



</script>

<template>

	<div class="task-detail">
		<p>{{ task.id }}</p>
		<p>title:</p>
		<p>description:</p>
		<p>status: </p>
		<p>priority: </p>
		<p>date: </p>
	</div>

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