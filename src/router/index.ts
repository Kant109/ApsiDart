import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/CricketGame.vue'
import X01Game from '@/views/Darts/X01Game.vue'
import DartsMode from '@/views/Darts/DartsMode.vue'
import DartsPlayer from '@/views/Darts/DartsPlayer.vue'
import CricketMode from '@/views/Darts/CricketMode.vue'
import X01Mode from '@/views/Darts/X01Mode.vue'
import CricketTeamMode from '@/views/Darts/CricketTeamMode.vue'

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
      path: '/darts/mode/cricket',
      name: 'darts-mode-cricket',
      component: CricketMode,
    },
    {
      path: '/darts/mode/cricket-team',
      name: 'cricket-team-mode',
      component: CricketTeamMode,
    },
    {
      path: '/darts/mode/x01',
      name: 'darts-mode-x01',
      component: X01Mode,
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
