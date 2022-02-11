<template>
	<section class="gameBreakdownContainer">

		<header class="breakdownHeader">

			<section class="homeTeamBreakdown teamBreakdown">
				<img :src="require(`../assets/logos/team${masterInfo.homeTeam.ID}.png`)" alt="">
				<div id="homeTeamInfoHolder" class="teamInfoHolder">
					<p class="teamCity">{{masterInfo.homeTeam.city}}</p>
					<p class="teamName">{{masterInfo.homeTeam.name}}</p>
					<p class="teamRecord">({{masterInfo.homeTeam.record}})</p>
				</div>
				<p class="teamScore">{{masterInfo.homeTeam.score}}</p>
			</section>

			<section class="gameBreakdown">
				<p class="gameTime">{{masterInfo.time}}</p>
				<p class="gamePeriod">{{masterInfo.period}}</p>
			</section>

			<section class="awayTeamBreakdown teamBreakdown">
				<p class="teamScore">{{masterInfo.awayTeam.score}}</p>
				<div id="awayTeamInfoHolder" class="teamInfoHolder">
					<p class="teamCity">{{masterInfo.awayTeam.city}}</p>
					<p class="teamName">{{masterInfo.awayTeam.name}}</p>
					<p class="teamRecord">({{masterInfo.awayTeam.record}})</p>
				</div>
				<img :src="require(`../assets/logos/team${masterInfo.awayTeam.ID}.png`)" alt="">
			</section>

		</header>

		<section class="gameBreakdownMenu">

			<div :class="showBoxscore ? 'halfBtnSelected' : 'halfBtnUnselected'" @click="boxscoreHandler" class="boxscoreBtn halfBtn">Boxscore</div>
			<div :class="showPlays ? 'halfBtnSelected' : 'halfBtnUnselected'" @click="playsHandler" class="playsBtn halfBtn">Plays</div>

		</section>

		<section v-show="showBoxscore" class="boxscoreContainer">

			<div class="boxscoreMenu">
				<button @click="homeTeamHandler">Home Team</button>
				<button @click="awayTeamHandler">Away Team</button>
			</div>

			<article class="boxscorePlayerHolder">
				<h1 style="text-align:center">Boxscore</h1>
				<div v-show="showHomeTeam" class="homePlayersHolder">

					<header class="skaterLegend statsGrid">
						<p>Skater</p>
						<p>G</p>
						<p>A</p>
						<p>Pts</p>
						<p>+/-</p>
						<p>PIMs</p>
					</header>

					<header class="goalieLegend goalieStatsGrid">
						<p>Goalie</p>
						<p>SA</p>
						<p>GA</p>
						<p>SV</p>
						<p>SV%</p>
						<p>PIMs</p>
						<p>TOI</p>
					</header>

					<BoxscoreEntry v-for="(boxscore, index) in this.homePlayers" :key="index" :playerBoxscoreInfo="boxscore"/>
					
				</div>

				<div v-show="showAwayTeam" class="awayPlayersHolder">
					
					<header class="skaterLegend statsGrid">
						<p>Skater</p>
						<p>G</p>
						<p>A</p>
						<p>Pts</p>
						<p>+/-</p>
						<p>PIMs</p>
					</header>

					<header class="goalieLegend goalieStatsGrid">
						<p>Goalie</p>
						<p>SA</p>
						<p>GA</p>
						<p>SV</p>
						<p>SV%</p>
						<p>PIMs</p>
						<p>TOI</p>
					</header>
					
					<BoxscoreEntry v-for="(boxscore, index) in this.awayPlayers" :key="index" :playerBoxscoreInfo="boxscore"/>

				</div>
			</article>

		</section>

		<section v-show="showPlays" class="playsContainer">

			<h1>Play-by-Play Feed</h1>

			<div class="filtersHolder">
				<h4>Filter Plays</h4>
				<button id="playsBtn-all" @click="switchFilter($event)">All</button>
				<button id="playsBtn-goals" @click="switchFilter($event)">Goals</button>
				<button id="playsBtn-penalties" @click="switchFilter($event)">Penalties</button>
				<button id="playsBtn-shots" @click="switchFilter($event)">Shots</button>
				<button id="playsBtn-hits" @click="switchFilter($event)">Hits</button>
				<button id="playsBtn-faceoffs" @click="switchFilter($event)">Faceoffs</button>
			</div>

			<div class="entriesHolder">
				<PlayEntry v-for="(play, index) in this.currentPlays" :key="index" :playInfo="play"/>
			</div>
			

		</section>

	</section>
</template>

<script>
import BoxscoreEntry from '@/components/BoxscoreEntry.vue'
import PlayEntry from '@/components/PlayEntry.vue'

export default {
	name: 'GameBreakdown',
	props: {
		masterInfo: Object
	},
	components: {
		BoxscoreEntry,
		PlayEntry
	},
	data() {
		return {
			showBoxscore: true,
			showPlays: false,
			showHomeTeam: true,
			showAwayTeam: false,

			currentPlays: this.masterInfo.liveData.plays.allPlays
		}
	},
	methods: {
		homeTeamHandler() {
			this.showHomeTeam = true,
			this.showAwayTeam = false;

			console.log(this.masterInfo)

			this.homePlayers.forEach(player => {
				if (player.position.code == "G") {
					console.log(player)
				}
			})
		},
		awayTeamHandler() {
			this.showHomeTeam = false,
			this.showAwayTeam = true;
		},
		boxscoreHandler() {
			this.showBoxscore = true;
			this.showPlays = false;
		},
		playsHandler() {
			this.showBoxscore = false;
			this.showPlays = true;
		},
		switchFilter(event) {
			//! USe this to create filters for goal, penalties, periods, etc.. 
			this.currentPlays = this.goalPlays

			console.log(event.target)

			switch(event.target.id) {
				case "playsBtn-all":
					this.currentPlays = this.masterInfo.liveData.plays.allPlays
					break;
				case "playsBtn-goals":
					this.currentPlays = this.goalPlays
					break;
				case "playsBtn-penalties":
					this.currentPlays = this.penaltyPlays
					break;
				case "playsBtn-shots":
					this.currentPlays = this.shotPlays
					break;
				case "playsBtn-hits":
					this.currentPlays = this.hitPlays
					break;
				case "playsBtn-faceoffs":
					this.currentPlays = this.faceoffPlays
					break;
				default:
					this.currentPlays = this.masterInfo.plays.allPlays
					break;
			}
		}
	},
	computed: {
		
		// Filter out any scratches (listed as position of "N/A")
		awayPlayers() {
			return Object.values(this.masterInfo.liveData.boxscore.teams.away.players).filter(player => {
				if (player.position.code != "N/A") {
					return player
				}
			})
		},
		homePlayers() {
			return Object.values(this.masterInfo.liveData.boxscore.teams.home.players).filter(player => {
				if (player.position.code != "N/A") {
					return player
				}
			})
		},
		goalPlays() {
			// Returns only goal plays
			return this.masterInfo.liveData.plays.allPlays.filter(play => {
				if (play.result.event == "Goal") {
					return play
				}
			})
		},
		penaltyPlays() {
			// Returns only goal plays
			return this.masterInfo.liveData.plays.allPlays.filter(play => {
				if (play.result.event == "Penalty") {
					return play
				}
			})
		},
		shotPlays() {
			// Returns only goal plays
			return this.masterInfo.liveData.plays.allPlays.filter(play => {
				if (play.result.event == "Shot") {
					return play
				}
			})
		},
		hitPlays() {
			// Returns only goal plays
			return this.masterInfo.liveData.plays.allPlays.filter(play => {
				if (play.result.event == "Hit") {
					return play
				}
			})
		},
		faceoffPlays() {
			// Returns only goal plays
			return this.masterInfo.liveData.plays.allPlays.filter(play => {
				if (play.result.event == "Faceoff") {
					return play
				}
			})
		},
	}

}
</script>

<style>

.gameBreakdownContainer {
	margin-left: 300px;
	overflow-y: auto;
	max-height: 100vh;
}

.breakdownHeader {
	width: 100%;
	margin: 0px auto;
	background-color: #ccc;
	/* border-radius: 25px; */
	padding: 10px 15px;

	display: flex;
	justify-content: center;
	align-items: center;
}

.gameBreakdownMenu {
	display: flex;
}

.halfBtn {
	width: 50%;
	text-align: center;
	padding: 10px 0;
	font-size: 16pt;
	cursor: pointer;
}

.halfBtnUnselected {
	background-color: rgb(170, 170, 170);
	box-shadow: inset 0px -5px 10px -1px rgba(0, 0, 0, 0.25);
	font-weight: normal;
}

.halfBtnSelected {
	background-color: white;
	font-weight: bolder;
}

.teamBreakdown {
	display: flex;
	align-items: center;
}

.teamBreakdown img {
	width: 50px;
	height: 50px;
}

/* .teamInfoHolder {
	margin: 0 20px;
} */

#homeTeamInfoHolder {
	margin: 0 20px 0 10px;
}

#awayTeamInfoHolder {
	margin: 0 10px 0 20px;
	text-align: right;
}

.teamName {
	font-weight: bolder;
	font-size: 16pt;
}

.teamCity {
	font-size: 10pt;
	text-transform: uppercase;
	font-weight: lighter;
}

.teamScore {
	font-weight: bolder;
	font-size: 36pt;
}

.teamRecord {
	font-size: 10pt;
}

.gameTime {
	margin: 0 40px;
	text-align: center;
	font-size: 24pt;
	font-weight: lighter;
}

.gamePeriod {
	margin: 0 40px;
	text-align: center;
	text-transform: uppercase;
}

.playsContainer, .boxscoreContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.boxscorePlayerHolder {
	width: 100%;
}

.homePlayersHolder, .awayPlayersHolder {
	display: flex;
	flex-direction: column;
	width: 60%;
	margin: 0 auto;
}

.skaterLegend, .goalieLegend {
	width: 75%;
	margin: 0 auto;

	background-color: #333;
	color: #eee;
	padding: 5px 8px;
	font-weight: bold;
}

.skaterLegend p:first-child, .goalieLegend p:first-child {
	justify-self: flex-start;
}

.goalieLegend {
	order: 2;
}

</style>