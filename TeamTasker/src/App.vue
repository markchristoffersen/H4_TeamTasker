<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTasks } from './composables/useTasks'

const { fetchTasks } = useTasks()

onMounted(fetchTasks)
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    
  </div>
</template>
