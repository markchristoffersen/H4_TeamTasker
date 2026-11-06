<!--TODO: This is supposed to be the main overview of all tasks-->

<script setup lang="ts">
import TaskCard from '../components/TaskCard.vue'
import TaskFilters from '../components/TaskFilters.vue'
import { useTasks } from '../composables/useTasks'
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'

const { tasks, isLoading, errorMessage, fetchTasks } = useTasks()
const search = ref('')
const status = ref('')
const priority = ref('')

const filteredTasks = computed(() => {
  const query = search.value.trim().toLocaleLowerCase()
  return tasks.value.filter((task) => {
    const matchesSearch = !query || `${task.title} ${task.description}`.toLocaleLowerCase().includes(query)
    const matchesStatus = !status.value || task.status === status.value
    const matchesPriority = !priority.value || task.priority === priority.value
    return matchesSearch && matchesStatus && matchesPriority
  })
})

</script>

<template>
  
  <TaskFilters v-model:search="search" v-model:status="status" v-model:priority="priority" />
  <RouterLink class="button-create" to="/create">Create a task ↗</RouterLink>
	<div class="task-grid">
		<TaskCard v-for="(task, index) in filteredTasks" :key="task.id" :task="task" :index="index" />
	</div>
	<RouterView />
</template>

<style scoped>
	.task-grid{
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		padding: 2% 10%;
	}
	.button-create {
		display: inline-block;
		position: relative;
		left: 100%;
		transform: translateX(-100%);
		background-color: var(--tertiary-color);
		border: 2px solid var(--tertiary-color);
		padding: 0.5rem 0.5rem;
		margin: 1rem 0;
		border-radius:  0.5rem;
		color: var(--text-color);
	}
	.button-create:hover {
		background-color: var(--main-color);
		border: 2px solid var(--tertiary-color);
	}
	
	

</style>