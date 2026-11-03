<!--TODO: This is supposed to be the main overview of all tasks-->

<script setup lang="ts">
import TaskCard from '../components/TaskCard.vue'
import {TASK_STATUS, TASK_PRIORITY, type TaskItem } from '../types/task'

const tasks: TaskItem[] = [
  {
	id: 1,
	title: 'Task 1',
	description: 'This is the first task',
	status: TASK_STATUS[0],
	priority: TASK_PRIORITY[0],
  },
  {
	id: 2,
	title: 'Task 2',
	description: 'This is the second task',
	status: TASK_STATUS[1],
	priority: TASK_PRIORITY[1],
  },
  {
	id: 3,
	title: 'Task 3',
	description: 'This is the third task',
	status: TASK_STATUS[2],
	priority: TASK_PRIORITY[2],
  },
];

</script>

<template>
	<TaskCard v-for="task in tasks" :key="task.id" :task="task" />

</template>

<style scoped>

</style>