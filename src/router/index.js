import { createRouter, createWebHistory } from 'vue-router';
import principal from '@/views/principal.vue';
import app from '@/views/app.vue';


const routes= [
  {
path: '/',
    name: 'home',
    component: principal
  },
  {
path: '/app',
    name: 'app',
    component: app
  } 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
    scrollBehavior(to,from,savedPosition){
    if(to.hash){
    return{
      el:to.hash,
      behavior:'smooth',
    }

  }
      return savedPosition || { top: 0 }

  }
})

export default router
