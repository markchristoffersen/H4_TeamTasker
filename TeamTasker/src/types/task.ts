export const TASK_STATUS = ['Not started', 'In progress', 'Completed'] as const
export const TASK_PRIORITY = ['Low', 'Medium', 'High'] as const

export type TaskStatus = (typeof TASK_STATUS)[number]
export type TaskPriority = (typeof TASK_PRIORITY)[number]

export interface TaskItem {
    id: number
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
}
