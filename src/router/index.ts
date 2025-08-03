import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AddReminderComponent from '../views/AddReminderComponent.vue';
import ReminderForm from '@/views/ReminderForm.vue';
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
    name:'AddReminder',
    component: ReminderForm,
  },
  {
    path:'/edit/:id',
    name:'EditReminder',
    component: ReminderForm,
    props:true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
