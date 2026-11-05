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
  <RouterLink to="/create">Create a task ↗</RouterLink>
  <TaskFilters v-model:search="search" v-model:status="status" v-model:priority="priority" />
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
	

</style>