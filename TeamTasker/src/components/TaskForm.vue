<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TASK_STATUS, TASK_PRIORITY, type NewTask } from '../types/task'

const emit = defineEmits<{ submit: [task: NewTask] }>()

const form = reactive({ title: '', description: '', priority: '' })
const errorMessage = ref('')

function submitForm() {
  if (!form.title.trim() || !form.priority ) {
    errorMessage.value = 'Please add a title, and choose a priority.'
    return
  }

  errorMessage.value = ''
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim() || 'Placeholder text.',
    status: TASK_STATUS[0],
    priority: form.priority as NewTask['priority'],
    date: new Date().toISOString(),
  })
}
</script>

<template>
  <form class="task-form" novalidate @submit.prevent="submitForm">
    <div class="field-row">
      <label class="form-field">
        <span>Task title <span class="required-mark">*</span></span>
        <input v-model="form.title" type="text" placeholder="e.g. A morning of creative thinking" required maxlength="100" />
      </label>
      <label class="form-field">
        <span>Priority <span class="required-mark">*</span></span>
        <select v-model="form.priority" required>
          <option disabled value="">Choose a priority</option>
          <option v-for="priority in TASK_PRIORITY" :key="priority" :value="priority">{{ priority }}</option>
        </select>
      </label>
    </div>

    <label class="form-field">
      <span>About the task</span>
      <textarea v-model="form.description" rows="4" placeholder="What is your issue?" maxlength="500"></textarea>
    </label>
    <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
    <div class="form-actions">
      <p><span class="required-mark">*</span> Required fields</p>
      <button class="button-primary" type="submit">Publish task <span aria-hidden="true">↗</span></button>
    </div>
  </form>
</template>

<style scoped>
.task-form { display: grid; gap: 22px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.form-field { display: grid; gap: 8px; color: var(--ink); font-size: 12px; font-weight: 600; }
.form-field input,
.form-field select,
.form-field textarea { width: 100%; min-height: 47px; border: 1px solid var(--line); border-radius: 6px; padding: 12px 13px; outline-color: var(--accent); background: var(--paper); color: var(--ink); font: inherit; font-size: 12px; font-weight: 400; }
.form-field textarea { resize: vertical; }
.form-field input::placeholder,
.form-field textarea::placeholder { color: #a09f98; }
.required-mark { color: var(--accent); }
.form-error { margin: -8px 0 0; color: #a24537; font-size: 12px; }
.form-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 8px; }
.form-actions p { margin: 0; color: var(--muted); font-size: 11px; }
.button-primary { display: inline-flex; min-height: 46px; align-items: center; gap: 24px; border: 0; border-radius: 5px; padding: 0 18px; background: var(--ink); color: white; cursor: pointer; font: inherit; font-size: 12px; transition: background 160ms ease; }
.button-primary:hover { background: var(--accent); }
.button-primary span { font-size: 16px; }

@media (max-width: 540px) {
  .field-row { grid-template-columns: 1fr; }
}
</style>