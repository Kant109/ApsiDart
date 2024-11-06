import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/CricketGame.vue'
import X01Game from '@/views/Darts/X01Game.vue'
import DartsHome from '@/views/Darts/DartsHome.vue'
import CricketSettings from '@/views/Darts/CricketSettings.vue'

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
      component: DartsHome,
    },
    {
      path: '/darts/cricket',
      name: 'cricket',
      component: CricketSettings
    },
    {
      path: '/darts/cricket/game',
      name: 'cricket-game',
      component: CricketGame
    },
    {
      path: '/darts/x01',
      name: 'x01',
      component: CricketSettings
    },
    {
      path: '/darts/x01/game',
      name: 'x01-game',
      component: X01Game
    }
  ]
})

export default router
