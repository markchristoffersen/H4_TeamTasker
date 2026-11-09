<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue'
import { useTasks } from '../composables/useTasks'
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import type { NewTask } from '../types/task'

const route = useRoute()
const router = useRouter()
const { addTask, updateTask, getTaskById, isLoading, errorMessage } = useTasks()
const isSubmitting = ref(false)
const saveError = ref('')

const isEditing = computed(() => route.name === 'task-edit')

const taskId = computed(() => {
  const param = route.params.id
  if (typeof param !== 'string') return undefined
  const id = Number(param)
  return Number.isSafeInteger(id) ? id : undefined
})

const task = computed(() => taskId.value === undefined ? undefined : getTaskById(taskId.value))

const cancelTo = computed(() => isEditing.value && taskId.value !== undefined
  ? { name: 'task-detail', params: { id: taskId.value } }
  : { name: 'task-list' })

async function saveTask(values: NewTask) {
  if (isSubmitting.value) return
  isSubmitting.value = true
  saveError.value = ''

  try {
    let savedTask
    if (isEditing.value) {
      const id = taskId.value
      if (id === undefined || !task.value) return
      savedTask = await updateTask(id, values)
    } else {
      savedTask = await addTask(values)
    }

    if (!savedTask) {
      saveError.value = 'This task could not be found.'
      return
    }
    await router.push({ name: 'task-detail', params: { id: savedTask.id } })
  } catch (error) {
    saveError.value = error instanceof Error
      ? error.message
      : 'We couldn’t save the task. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

function cancelForm() {
  router.push(cancelTo.value)
}
</script>

<template>
  <section class="form-overlay">
    <RouterLink :to="cancelTo" class="form-backdrop" aria-label="Close task form" />
    <article class="form-dialog" role="dialog" aria-modal="true" :aria-labelledby="'task-form-title'">
      <h1 id="task-form-title">{{ isEditing ? 'Edit task' : 'Create a task' }}</h1>
      <p v-if="isEditing && isLoading && !task" class="form-status" role="status">Loading task…</p>
      <template v-else-if="!isEditing || task">
        <TaskForm
          :initial-task="task"
          :is-editing="isEditing"
          :is-submitting="isSubmitting"
          :save-error="saveError"
          @submit="saveTask"
          @cancel="cancelForm"
        />
      </template>
      <div v-else class="form-status" role="alert">
        <p>{{ errorMessage || 'This task could not be found.' }}</p>
        <RouterLink to="/">Back to tasks</RouterLink>
      </div>
    </article>
  </section>
</template>

<style scoped>
.form-overlay { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 1rem; }
.form-backdrop { position: absolute; inset: 0; background: rgb(0 0 0 / 50%); backdrop-filter: blur(4px); }
.form-dialog { position: relative; z-index: 1; width: min(100%, 680px); max-height: calc(100vh - 2rem); overflow-y: auto; padding: clamp(1.5rem, 5vw, 2.5rem); border: 1px solid rgb(139 187 146); border-radius: 18px; background: var(--secondary-color); color: var(--text-color); box-shadow: 0 16px 36px rgb(9 35 40); }
.form-dialog h1 { margin-top: 0; }
.form-status { line-height: 1.6; }
</style>