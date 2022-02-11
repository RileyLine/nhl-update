<template>

	

	<div class="gamesHolder">
		<h1 class="title">LIVE GAMES</h1>
		<GameModule v-for="(game, index) in this.$parent.games" :key="index" :gameInfo="game"/>

	</div>

</template>

<script>
// @ is an alias to /src
import GameModule from '@/components/GameModule.vue'

export default {
	name: 'Home',
	components: {
		GameModule
	}
}
</script>

<style scoped>

.gamesHolder {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;
	margin-left: 300px;
	padding: 0 10px;

	width: fit-content;

	min-height: 100%;
	max-height: 100vh;
	overflow-y: auto;
	/* background-color: #343b42; */
	background: rgb(212,212,212);
	background: linear-gradient(27deg, rgba(212,212,212,1) 0%, rgba(255,255,255,1) 100%);
}

.title {
	width: 100%;
	text-align: center;
	font-size: 36pt;
	font-style: italic;
	margin: 50px auto 20px auto;
}

</style>
