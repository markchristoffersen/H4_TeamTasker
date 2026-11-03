<!--TODO: This is supposed to be the main overview of all tasks-->

<script setup lang="ts">
import TaskCard from '../components/TaskCard.vue'
import type { TaskItem } from '../types/task'
import { ref, computed } from 'vue'


const filteredTasks: TaskItem[] = [
    {
        userId: 1,
        id: 1,
        title: 'Test task one',
        description: 'A sample task to check the card layout.',
        status: 'Not started',
        priority: 'High',
        date: '2026-11-10',
    },
    {
        userId: 1,
        id: 2,
        title: 'Test task two',
        description: 'Another sample task for testing.',
        status: 'In progress',
        priority: 'Medium',
        date: '2026-11-12',
    },
	 {
        userId: 1,
        id: 3,
        title: 'Test task two',
        description: 'Another sample task for testing.',
        status: 'In progress',
        priority: 'Medium',
        date: '2026-11-12',
    },
	 {
        userId: 1,
        id: 4,
        title: 'Test task two',
        description: 'Another sample task for testing.',
        status: 'In progress',
        priority: 'Medium',
        date: '2026-11-12',
    },
	 {
        userId: 1,
        id: 5,
        title: 'Test task two',
        description: 'Another sample task for testing.',
        status: 'In progress',
        priority: 'Medium',
        date: '2026-11-12',
    },
]


</script>

<template>
	<div class="task-grid">
		<TaskCard v-for="(task, index) in filteredTasks" :key="task.id" :task="task" :index="index" />
	</div>
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