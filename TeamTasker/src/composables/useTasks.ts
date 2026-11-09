import { computed, ref } from 'vue'
import { TASK_STATUS, TASK_PRIORITY, type TaskItem, type NewTask } from '../types/task'

const tasks = ref<TaskItem[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const localTasks = ref<TaskItem[]>([])
let hasFetched = false
let nextLocalId = -1
const TASKS_API_URL = 'https://jsonplaceholder.typicode.com/posts'

const statusus = computed(() => [...new Set(tasks.value.map((task) => task.status))].sort())
const priorities = computed(() => [...new Set(tasks.value.map((task) => task.priority))].sort())

// Uses posts endpoint from the jsonplaceholder api instead of todos as they have a body to put into the description
function mapTodoToTask(todo: { userId: number; id: number; title: string; body: string }): TaskItem {
    const status = TASK_STATUS[(Math.abs(todo.id) - 1) % TASK_STATUS.length] ?? TASK_STATUS[0]
    const priority = TASK_PRIORITY[(Math.abs(todo.userId) - 1) % TASK_PRIORITY.length] ?? TASK_PRIORITY[0]
    const date = new Date()
    date.setDate(date.getDate() + (todo.id % 30) + 1)
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    return {
        userId: todo.userId,
        id: todo.id,
        title: todo.title,
        description: todo.body,
        status,
        priority,
        date: dateString,
    }
}

async function fetchTasks() {
    if (hasFetched || isLoading.value) return
    hasFetched = true
    isLoading.value = true
    errorMessage.value = ''

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=50')
        if (!response.ok) throw new Error('The task list could not be loaded right now.')

        const todos = (await response.json()) as { id: number; title: string; body: string; userId: number }[]
        const remoteTasks = todos.map(mapTodoToTask)
        const localTaskIds = new Set(localTasks.value.map((task) => task.id))
        tasks.value = [...localTasks.value, ...remoteTasks.filter((task) => !localTaskIds.has(task.id))]
    } catch {
        errorMessage.value = 'We couldn’t load the tasks. Please check your connection and try again.'
        hasFetched = false
    } finally {
        isLoading.value = false
    }
}

async function postTask(task: NewTask, userId: number, id?: number) {
    const payload = {
        title: task.title,
        body: task.description,
        userId,
        status: task.status,
        priority: task.priority,
        date: task.date,
        ...(id === undefined ? {} : { id }),
    }

    try {
        const response = await fetch(TASKS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error()
    } catch {
        throw new Error('We couldn’t save the task. Please check your connection and try again.')
    }
}

function storeTask(task: TaskItem) {
    const taskIndex = tasks.value.findIndex((currentTask) => currentTask.id === task.id)
    if (taskIndex === -1) {
        tasks.value.unshift(task)
    } else {
        tasks.value.splice(taskIndex, 1, task)
    }

    const localTaskIndex = localTasks.value.findIndex((currentTask) => currentTask.id === task.id)
    if (localTaskIndex === -1) {
        localTasks.value.unshift(task)
    } else {
        localTasks.value.splice(localTaskIndex, 1, task)
    }
}

async function addTask(task: NewTask) {
    const id = nextLocalId--
    const newTask: TaskItem = { ...task, userId: 1, id }
    await postTask(task, newTask.userId)
    errorMessage.value = ''
    storeTask(newTask)
    return newTask
}

async function updateTask(id: number, task: NewTask) {
    const currentTask = tasks.value.find((currentTask) => currentTask.id === id)
    if (!currentTask) return undefined

    await postTask(task, currentTask.userId, id)
    const latestTask = tasks.value.find((currentTask) => currentTask.id === id)
    if (!latestTask) return undefined

    const updatedTask: TaskItem = { ...latestTask, ...task }
    storeTask(updatedTask)
    errorMessage.value = ''
    return updatedTask
}

function getTaskById(id: number) {
    return tasks.value.find((task) => task.id === id)
}

export function useTasks() {
    return { tasks, statusus, priorities, isLoading, errorMessage, fetchTasks, addTask, updateTask, getTaskById }
}