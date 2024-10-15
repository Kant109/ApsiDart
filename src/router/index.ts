import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/CricketGame.vue'
import X01Game from '@/views/Darts/X01Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/cricket',
      name: 'cricket',
      component: CricketGame
    },
    {
      path: '/x01',
      name: 'x01',
      component: X01Game
    },
  ]
})

export default router
