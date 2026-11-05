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
      <div class="header-inner">
        <RouterLink class="brand" to="/" aria-label="Gather home">
          <span class="brand-mark" aria-hidden="true">g</span>
          <span>gather<span class="brand-period">.</span></span>
        </RouterLink>
        <nav class="main-nav" aria-label="Main navigation">
          <RouterLink to="/" class="nav-link">Explore</RouterLink>
          <RouterLink to="/create" class="nav-cta">Create task <span aria-hidden="true">+</span></RouterLink>
        </nav>
      </div>
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    
  </div>
</template>
