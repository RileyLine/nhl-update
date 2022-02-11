<template>
	<div id="app">
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->

		<main class="mainContentArea">

			<Sidebar/>
			<router-view/>

		</main>

		
	</div>
</template>

<script>
	import Sidebar from '@/components/Sidebar.vue'

	export default {

		components: {
			Sidebar
		},

		data() {
			return {
				games: [],
				teamColors: [
					{teamID:"ANA", colorPrimary:'#F47A38', colorSecondary:'#B9975B'},
					{teamID:"ARI", colorPrimary:'#8C2633', colorSecondary:'#E2D6B5'},
					{teamID:"BOS", colorPrimary:'#FFB81C', colorSecondary:'#000000'},
					{teamID:"BUF", colorPrimary:'#002654', colorSecondary:'#FCB514'},
					{teamID:"CGY", colorPrimary:'#C8102E', colorSecondary:'#F1BE48'},
					{teamID:"NJD", colorPrimary:'#CE1126', colorSecondary:'#000000'},
				]
			}
		},

		methods: {
			grabSchedule() {
				fetch("https://statsapi.web.nhl.com/api/v1/schedule")
				.then(response => response.json())
				.then(data => {
					this.games = data.dates[0].games

					console.log(this.games)
				})
			}
		},

		mounted () {
			this.grabSchedule()

			// setInterval(() => {
			// 	console.log("firing")
			// 	this.grabSchedule()
			// }, 5000);
		}

	}

</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.grid {
	display: grid;
	grid-template-columns: 4fr 1fr;
	grid-template-rows: auto;
}

.statsGrid {
	display: grid;
	grid-template-columns: 3fr repeat(3, 0.5fr) 1fr 1fr;

	justify-items: center;
}

.goalieStatsGrid {
	display: grid;
	grid-template-columns: 3fr repeat(6, 0.75fr);

	justify-items: center;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #303030;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

.mainContentArea {
	/* display: flex; */
	position: relative;

	height: 100vh;
}
</style>
