import type { TaskPriority, TaskStatus } from '../types/task'

export interface TaskFormValues {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority | ''
    date: string
}

export function todayAsDateString(date = new Date()) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function getTaskFormError(values: TaskFormValues) {
    if (!values.title.trim()) return 'Please add a task title.'
    if (!values.priority) return 'Please choose a priority.'
    if (!values.date) return 'Please choose a date.'
    return ''
}