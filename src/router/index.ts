import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CricketGame from '@/views/Darts/Cricket/CricketGame.vue'
import X01Game from '@/views/Darts/X01/X01Game.vue'
import DartsMode from '@/views/Darts/DartsMode.vue'
import DartsPlayer from '@/views/Darts/DartsPlayer.vue'
import CricketMode from '@/views/Darts/Cricket/CricketMode.vue'
import X01Mode from '@/views/Darts/X01/X01Mode.vue'
import CricketTeamMode from '@/views/Darts/Cricket/CricketTeamMode.vue'
import CricketWinner from '@/views/Darts/Cricket/CricketWinner.vue'
import X01Winner from '@/views/Darts/X01/X01Winner.vue'
import DesktopView from '@/views/Darts/Cricket/CricketDesktopView.vue'
import CricketDesktopView from '@/views/Darts/Cricket/CricketDesktopView.vue'

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
      path: '/darts/cricket/winner',
      name: 'cricket-winner',
      component: CricketWinner
    },
    {
      path: '/darts/x01/game',
      name: 'x01-game',
      component: X01Game
    },
    {
      path: '/darts/x01/winner',
      name: 'x01-winner',
      component: X01Winner
    },
    {
      path: '/darts/cricket/desktop-view',
      name: 'cricket-desktop-view',
      component: CricketDesktopView
    },
  ]
})

export default router
