<!--TODO: This is supposed to be a form for creating or editing a task-->

<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue'
import { useTasks } from '../composables/useTasks'
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import type { NewTask } from '../types/task'

const router = useRouter()
const { addTask } = useTasks()

function createTask(task: NewTask) {
  const newTask = addTask(task)
  router.push({ name: 'task-detail', params: { id: newTask.id } })
}
</script>


<template>
  <TaskForm @submit="createTask" />
</template>


<style scoped>

</style>