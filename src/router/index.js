import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GameBreakdown from '../views/GameBreakdown.vue'
import Teams from '../views/Teams.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/teams',
		name: 'Teams',
		component: Teams
	},
	{
		path: '/breakdown/:gameID',
		name: 'GameBreakdown',
		component: GameBreakdown,
		props: true
	},
]

const router = new VueRouter({
mode: 'history',
base: process.env.BASE_URL,
routes
})

export default router
