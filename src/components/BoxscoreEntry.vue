<template>

	<article v-if="Object.keys(this.playerBoxscoreInfo.stats)[0] == 'skaterStats'" class="boxscoreEntry statsGrid">

		<span class="playerInfoSpan">
			<p class="playerNumber">{{playerBoxscoreInfo.jerseyNumber}}</p>
			<p class="playerName">{{this.firstName.split("")[0]}}. {{this.lastName}}</p>
			<p class="playerPos">{{playerBoxscoreInfo.position.abbreviation}}</p>
		</span>
		
		<p class="playerGoals">{{playerBoxscoreInfo.stats.skaterStats.goals}}</p>
		<p class="playerAssists">{{playerBoxscoreInfo.stats.skaterStats.assists}}</p>
		<p class="playerPoints">{{playerBoxscoreInfo.stats.skaterStats.goals + playerBoxscoreInfo.stats.skaterStats.assists}}</p>
		<p class="playerPlusMinus">{{playerBoxscoreInfo.stats.skaterStats.plusMinus}}</p>
		<p class="playerPIMs">{{playerBoxscoreInfo.stats.skaterStats.penaltyMinutes}}</p>
		<!-- <p class="playerPts">{{this.points()}}</p> -->

	</article>

	<article v-else class="boxscoreEntry goalieStatsGrid goalieEntry">

		<span class="playerInfoSpan">
			<p class="playerNumber">{{playerBoxscoreInfo.jerseyNumber}}</p>
			<p class="playerName">{{this.firstName.split("")[0]}}. {{this.lastName}}</p>
			<p class="playerPos">{{playerBoxscoreInfo.position.abbreviation}}</p>
		</span>
		<p class="goalieGoalsAgainst">{{playerBoxscoreInfo.stats.goalieStats.goals}}</p>
		<p class="goalieShotsAgainst">{{playerBoxscoreInfo.stats.goalieStats.shots}}</p>
		<p class="goalieSaves">{{playerBoxscoreInfo.stats.goalieStats.saves}}</p>
		<p class="goalieSavePercentage">{{this.savePercentage}}</p>
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
		},
		savePercentage() {
			let savePercentage = this.playerBoxscoreInfo.stats.goalieStats.saves /  this.playerBoxscoreInfo.stats.goalieStats.shots

			if (isNaN(savePercentage)) {
				savePercentage = 0
			}
			return savePercentage*100 + "%";
		}
	}
}
</script>

<style>

.playerInfoSpan {
	/* display: flex; */
	display: grid;
	grid-template-columns: 20px auto auto;
	justify-self: flex-start;
	align-items: center;
}

.playerInfoSpan p {
	margin-left: 3px;
}

.playerNumber, .playerPos {
	font-weight: 300;
	font-style: italic;
	font-size: 10pt;
	margin-bottom: 1px;
	margin-right: 3px;
}

.playerNumber {
	justify-self: flex-end;
}

.playerPos {
	margin-top: 1px;
}

.playerName {
	font-size: 12pt;
	font-weight: 700;
	margin-right: 3px;
}

.boxscoreEntry {
	/* border-top: 1px solid black; */
	border: 1px solid #ccc;
	background-color: #fdfdfd;
	border-top: none;
	margin: 0 auto;
	order: 1;
	width: 75%;
	justify-self: center;
	padding: 10px 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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