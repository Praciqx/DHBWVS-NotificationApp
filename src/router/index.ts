import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path:'/add',
    name:'add',
    // component: ReminderForm,
    component: () => import('@/views/ReminderForm.vue')
  },
  {
    path:'/edit/:id',
    name:'edit',
    component: () => import('@/views/ReminderForm.vue'),
    props:true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
