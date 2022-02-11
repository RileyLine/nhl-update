<template>

	<article v-if="Object.keys(this.playerBoxscoreInfo.stats)[0] == 'skaterStats'" class="boxscoreEntry statsGrid">

		<span class="playerInfoSpan">
			<p class="playerNumber">{{playerBoxscoreInfo.jerseyNumber}}</p>
			<p class="playerName">{{this.firstName.split("")[0]}}. {{this.lastName}},</p>
			<p class="playerPos">{{playerBoxscoreInfo.position.abbreviation}}</p>
		</span>
		
		<p class="playerGoals">{{playerBoxscoreInfo.stats.skaterStats.goals}}</p>
		<p class="playerAssists">{{playerBoxscoreInfo.stats.skaterStats.assists}}</p>
		<p class="playerPoints">{{playerBoxscoreInfo.stats.skaterStats.goals + playerBoxscoreInfo.stats.skaterStats.assists}}</p>
		<p class="playerPlusMinus">{{playerBoxscoreInfo.stats.skaterStats.plusMinus}}</p>
		<p class="playerPIMs">{{playerBoxscoreInfo.stats.skaterStats.penaltyMinutes}}</p>
		<!-- <p class="playerPts">{{this.points()}}</p> -->

	</article>

	<article v-else class="boxscoreEntry statsEntry goalieEntry">

		<p class="playerNumber">{{playerBoxscoreInfo.jerseyNumber}}</p>
		<p class="playerName">{{playerBoxscoreInfo.person.fullName}}</p>
		<!-- <p class="playerGoals">{{playerBoxscoreGoals}}</p> -->
		<!-- <p class="playerAssists">{{playerBoxscoreInfo.stats.skaterStats.assists}}</p> -->
		<!-- <p class="playerPts">{{this.points()}}</p> -->

	</article>

</template>

<script>
export default {
	name: "BoxscoreEntry",
	props: {
		playerBoxscoreInfo: {
			type: Object
		}
	},
	computed: {
		firstName() {
			return this.playerBoxscoreInfo.person.fullName.split(" ")[0];
		},
		lastName() {
			return this.playerBoxscoreInfo.person.fullName.split(" ")[1];
		}
	}
}
</script>

<style>

.playerInfoSpan {
	display: flex;
	justify-self: flex-start;
}

.playerInfoSpan p {
	margin-left: 3px;
}

.boxscoreEntry {
	/* border-top: 1px solid black; */
	border-bottom: 1px solid black;
	margin: 0 auto;
	order: 1;
	width: 75%;
	justify-self: center;
	padding: 10px 8px;
}

.boxscoreEntry:hover {
	background-color: lightgray;
	font-weight: bolder;
}

/* .boxscoreEntry:nth-child(odd) {
	background-color: #eee;
} */

.goalieEntry {
	order: 2;
}

</style>