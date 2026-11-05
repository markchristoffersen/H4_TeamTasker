import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '../views/TaskListView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'
import TaskFormView from '../views/TaskFormView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'task-list', component: TaskListView, children: [{ path: '/tasks/:id', name: 'task-detail', component: TaskDetailView}] },
        // { path: '/tasks/:id', name: 'task-detail', component: TaskDetailView },
        { path: '/create', name: 'task-form', component: TaskFormView },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router