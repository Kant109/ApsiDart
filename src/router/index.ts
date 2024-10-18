import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/CricketGame.vue'
import X01Game from '@/views/Darts/X01Game.vue'
import DartsHome from '@/views/Darts/DartsHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/darts',
      name: 'darts-home',
      component: DartsHome
    },
    {
      path: '/darts/cricket',
      name: 'cricket',
      component: CricketGame
    },
    {
      path: '/darts/x01',
      name: 'x01',
      component: X01Game
    },
  ]
})

export default router
