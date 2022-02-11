<template>
	<div class="teamCard">

		<div class="visibleInfo">
			<img id="teamLogo" :src="require(`../assets/logos/team${this.teamInfo.id}.png`)" alt="">

			<p>{{teamInfo.city}}</p>
			<h3>{{teamInfo.name}}</h3>
		</div>

	</div>
</template>

<script>
export default {
	name: 'TeamCard',
	props: {
		teamInfo: {
			type: Object
		}
	},
	data() {
		return {
			teamID: "0"
		}
	}
}
</script>

<style scoped>

	#teamLogo {
		width: 100px;
	}

</style>