<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { TASK_STATUS, TASK_PRIORITY, type NewTask, type TaskItem } from '../types/task'
import { getTaskFormError, todayAsDateString, type TaskFormValues } from '../utils/taskForm'

const props = withDefaults(defineProps<{ initialTask?: TaskItem; isEditing?: boolean }>(), { isEditing: false })
const emit = defineEmits<{ submit: [task: NewTask]; cancel: [] }>()

const form = reactive<TaskFormValues>({
  title: '',
  description: '',
  status: TASK_STATUS[0],
  priority: '',
  date: todayAsDateString(),
})
const errorMessage = ref('')

watch(() => props.initialTask, (task) => {
  form.title = task?.title ?? ''
  form.description = task?.description ?? ''
  form.status = task?.status ?? TASK_STATUS[0]
  form.priority = task?.priority ?? ''
  form.date = task?.date ?? todayAsDateString()
  errorMessage.value = ''
}, { immediate: true })

function submitForm() {
  const validationError = getTaskFormError(form)
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  errorMessage.value = ''
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    priority: form.priority as NewTask['priority'],
    date: form.date,
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
      <label class="form-field">
        <span>Status</span>
        <select v-model="form.status">
          <option v-for="status in TASK_STATUS" :key="status" :value="status">{{ status }}</option>
        </select>
      </label>
      <label class="form-field">
        <span>Due date <span class="required-mark">*</span></span>
        <input v-model="form.date" type="date" required />
      </label>
    </div>

    <label class="form-field">
      <span>About the task</span>
      <textarea v-model="form.description" rows="4" placeholder="What is your issue?" maxlength="500"></textarea>
    </label>
    <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
    <div class="form-actions">
      <p><span class="required-mark">*</span> Required fields</p>
      <div class="action-buttons">
        <button class="button-secondary" type="button" @click="emit('cancel')">Cancel</button>
        <button class="button-primary" type="submit">{{ isEditing ? 'Save changes' : 'Create task' }} <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.task-form { display: grid; gap: 22px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.form-field { display: grid; gap: 8px; color: var(--text-color); font-size: 12px; font-weight: 600; }
.form-field input,
.form-field select,
.form-field textarea { outline: none; width: 100%; min-height: 47px; border: 1px solid var(--accent-color); border-radius: 6px; padding: 12px 13px; background: var(--tertiary-color); color: var(--text-color); font: inherit; font-size: 12px; font-weight: 400; }
.form-field textarea { resize: vertical; }
.form-field input::placeholder,
.form-field textarea::placeholder { color: var(--text-color); }
.required-mark { color: var(--accent); }
.form-error { margin: -8px 0 0; color: #a24537; font-size: 12px; }
.form-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 8px;}
.form-actions p { margin: 0; color: var(--text-color); font-size: 11px; }
.action-buttons { display: flex; align-items: center; gap: 10px; }
.button-primary { display: inline-flex; min-height: 46px; align-items: center; gap: 24px; border: 0; border-radius: 5px; padding: 0 18px; background: var(--tertiary-color); color: var(--text-color); cursor: pointer; font: inherit; font-size: 12px; transition: background 160ms ease; border: 2px solid var(--tertiary-color);}
.button-secondary:hover,
.button-primary:hover { background: var(--main-color); border: 2px solid var(--tertiary-color);}
.button-primary span { font-size: 16px; }
.button-secondary { min-height: 46px; border: 1px solid var(--tertiary-color); border-radius: 5px; padding: 0 16px; background: var(--tertiary-color); color: var(--text-color); cursor: pointer; font: inherit; font-size: 12px; }

@media (max-width: 540px) {
  .field-row { grid-template-columns: 1fr; }
}
</style>