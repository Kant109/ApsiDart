import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/CricketGame.vue'
import X01Game from '@/views/Darts/X01Game.vue'
import DartsMode from '@/views/Darts/DartsMode.vue'
import DartsPlayer from '@/views/Darts/DartsPlayer.vue'

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
      name: 'darts-player',
      component: DartsPlayer
    },
    {
      path: '/darts/mode',
      name: 'darts-mode',
      component: DartsMode,
    },
    {
      path: '/darts/cricket/game',
      name: 'cricket-game',
      component: CricketGame
    },
    {
      path: '/darts/x01/game',
      name: 'x01-game',
      component: X01Game
    }
  ]
})

export default router
