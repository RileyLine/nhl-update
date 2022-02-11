<template>
	<div class="teamsContainer">

		<h1>NHL Teams</h1>

		<div class="teamsHolder">

			<TeamCard v-for="(team, index) in this.teams" :key="index" :teamInfo="team"/>

			<!-- <div v-for="(team, index) in this.teams" :key="index">

				<p>{{team.name}}</p>
			</div> -->

		</div>

	</div>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue'

export default {
	name: 'Teams',
	props: {

	},
	components: {
		TeamCard
	},
	data() {
		return {
			teamInfo: {
				city: "",
				name: "",
				conference: "",
				division: "",
				teamWebsite: ""
			},
			teams: []
		}
	},

	methods: {
		grabAllTeams() {
			fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
			.then(response => response.json())
			.then(data => {
				// console.log(data.teams)

				// this.teams = data.teams

				function compare( a, b ) {
					if ( a.name < b.name ){
						return -1;
					}
					if ( a.name > b.name ){
						return 1;
					}
					return 0;
					}
			
				// this.teams = data.teams.sort( compare )

				this.teams = data.teams.sort(compare)

				console.log(this.teams)
			})

			
		}
	},
	
	mounted() {
		this.grabAllTeams()
	}
}
</script>

<style>

	.teamsContainer {
		margin-left: 300px;
		overflow-y: auto;
		max-height: 100vh;
	}

	.teamsHolder {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
	}

</style>