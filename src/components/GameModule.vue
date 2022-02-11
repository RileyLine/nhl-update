<template>
	<article class="gameHolder">
		
		<section class="gameInfoHolder grid">
			<div class="gameInfoTime">
				<p>{{masterInfo.timeRemainingText}}</p>
			</div>
			<p id="liveBtn" v-if="this.masterInfo.abstractStatus == 'Live'" @click="toBreakdown">Live</p>
			<p id="finalBtn" v-if="this.masterInfo.abstractStatus == 'Final'" @click="toBreakdown">Stats</p>
		</section>

		<section class="gameStatsHolder">
			
			<section class="teamHolder homeTeamHolder grid">
				<div class="teamInfo homeTeamInfo">
					<div class="teamLogo">
						<img v-bind:src="require(`../assets/logos/team${masterInfo.homeTeam.ID}.png`)" alt="">
					</div>
					<p class="teamCity">{{masterInfo.homeTeam.city}} <span id="teamName">{{masterInfo.homeTeam.name}}</span></p>
					<p class="teamRecord">({{masterInfo.homeTeam.record}})</p>
				</div>

				<div class="teamScore homeTeamScore">
					<p :class="masterInfo.awayTeam.score >= masterInfo.homeTeam.score ? 'losingWeight' : 'winningWeight'">{{masterInfo.homeTeam.score}}</p>
				</div>
			</section>

			<section class="teamHolder awayTeamHolder grid">
				<div class="teamInfo awayTeamInfo">
					<div class="teamLogo">
						<img v-bind:src="require(`../assets/logos/team${masterInfo.awayTeam.ID}.png`)" alt="">
					</div>
					<p class="teamCity">{{masterInfo.awayTeam.city}} <span id="teamName">{{masterInfo.awayTeam.name}}</span></p>
					<p class="teamRecord">({{masterInfo.awayTeam.record}})</p>
				</div>

				<div class="teamScore awayTeamScore">
					<p :class="masterInfo.homeTeam.score >= masterInfo.awayTeam.score ? 'losingWeight' : 'winningWeight'">{{masterInfo.awayTeam.score}}</p>
				</div>
			</section>

		</section>
	</article>
</template>

<script>
export default {
	name: 'GameModule',
	props: {
		gameInfo: {
			type: Object
		}
	},

	data() {
		return {
			masterInfo: {
				gamePk: "",
				gameVenue: "",
				gameStart: "",
				abstractStatus: "",
				gameStatus: "",
				liveData: "",
				liveLink: this.gameInfo.link,
				timeRemainingText: "",
				period: "",
				time: "",
				previewText: "",
				homeTeam: {
					city: "",
					name: "",
					score: "",
					ID: "0",
					record: `${this.gameInfo.teams.home.leagueRecord.wins}-${this.gameInfo.teams.home.leagueRecord.losses}-${this.gameInfo.teams.home.leagueRecord.ot}`
				},
				awayTeam: {
					city: "",
					name: "",
					score: "",
					ID: "0",
					record: `${this.gameInfo.teams.away.leagueRecord.wins}-${this.gameInfo.teams.away.leagueRecord.losses}-${this.gameInfo.teams.away.leagueRecord.ot}`
				}
			}
		}
	},

	methods: {
		grabLiveFeed() {
			fetch(`https://statsapi.web.nhl.com${this.masterInfo.liveLink}`)
			.then(response => response.json())
			.then(data => {

				console.log(data)

				// Basic game info
				this.masterInfo.gamePk = data.gamePk;
				this.masterInfo.liveData = data.liveData;
				this.masterInfo.gameVenue = data.gameData.venue.name;
				
				// Start time of game
				this.masterInfo.gameStart = new Date(data.gameData.datetime.dateTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

				console.log(this.masterInfo.gameStatus)

				if (this.masterInfo.gameStart[0] == "0") {
					// Mutate the gameStart to get rid of the preceding 0
					this.masterInfo.gameStart = this.masterInfo.gameStart.slice(1, this.masterInfo.gameStart.length)
				}

				// Game Status & Period/Time remaining info
				this.masterInfo.abstractStatus = data.gameData.status.abstractGameState
				this.masterInfo.gameStatus = data.gameData.status.detailedState
				this.masterInfo.period = data.liveData.linescore.currentPeriodOrdinal
				this.masterInfo.time = data.liveData.linescore.currentPeriodTimeRemaining
				let period = data.liveData.linescore.currentPeriodOrdinal;
				let timeRemaining = data.liveData.linescore.currentPeriodTimeRemaining;

				switch (this.masterInfo.gameStatus) {
					case "Scheduled":
						this.masterInfo.timeRemainingText = this.masterInfo.gameStart
						break;

					case "Pre-Game":
						this.masterInfo.timeRemainingText = "Starting Soon"
						break;

					case "In Progress":
						case "In Progress - Critical":

							if (timeRemaining == "END") {
								this.masterInfo.timeRemainingText = `${timeRemaining} of ${period}`
							} else {
								this.masterInfo.timeRemainingText = `${period} ${timeRemaining}`
							}
						break;

					case "Final":
						if (period == "OT" || period == "SO") {
							this.masterInfo.timeRemainingText = `Final/${period}`
						} else {
							this.masterInfo.timeRemainingText = "Final"
						}
						break;

					case "Postponed":
						this.masterInfo.timeRemainingText = "POSTPONED"
						break;

					default:
						console.log("Unknown game status - " + this.masterInfo.gameStatus)
						break;
				}

				//! TEAMS INFO
				// Home Team
				this.masterInfo.homeTeam.city = data.gameData.teams.home.locationName
				this.masterInfo.homeTeam.name = data.gameData.teams.home.teamName
				this.masterInfo.homeTeam.score = data.liveData.linescore.teams.home.goals
				this.masterInfo.homeTeam.ID = data.gameData.teams.home.id

				// Away Team
				this.masterInfo.awayTeam.city = data.gameData.teams.away.locationName
				this.masterInfo.awayTeam.name = data.gameData.teams.away.teamName
				this.masterInfo.awayTeam.score = data.liveData.linescore.teams.away.goals
				this.masterInfo.awayTeam.ID = data.gameData.teams.away.id
			})
		},

		toBreakdown() {
			this.$router.push({
				name: "GameBreakdown",
				params: {
					gameID: this.masterInfo.gamePk,
					masterInfo: this.masterInfo
				}
			})
		}
	},

	mounted () {
		this.grabLiveFeed()

		// setInterval(() => {
		// 	this.grabLiveFeed()
		// }, 5000)
	}
}
</script>

<style scoped>

.gameHolder {
	border: 2px solid #ccc;
	border: 2px solid #343b42;
	margin: 10px 10px;
	padding-bottom: 5px;
	width: 300px;
	height: fit-content;
	border-radius: 5px;
	box-shadow: 0px 0px 5px 0px rgba(99, 99, 99, 0.75);
	background-color: white;
}

#liveBtn {
	text-align: right;
	color: hsl(138, 77%, 47%);
	font-weight: bold;
	cursor: pointer;
}

#finalBtn {
	text-align: right;
	color: hsl(0, 0%, 100%);
	cursor: pointer;
}

.gameInfoHolder {
	background-color: #ccc;
	background-color: #343b42;
	color: white;
	padding: 6px 5px;
}

.teamHolder {
	margin-top: 10px;
	padding: 0 7px;
}

.homeTeamHolder {
	padding-bottom: 5px;
}

.teamInfo {
	display: grid;
	grid-template-columns: 30px 1fr;
	grid-template-rows: auto auto;

	justify-items: flex-start;
}

.teamLogo {
	grid-column: 1 / 2;
	grid-row: 1 / 3;
	width: 30px;
	height: 30px;
	align-self: center;
}

.teamLogo img {
	width: 100%;
}

.teamCity  {
	margin-left: 5px;
	font-size: 9pt;
	text-transform: uppercase;
	font-weight: 400;
}


.teamRecord {
	font-size: 10pt;
	margin-left: 5px;
}

#teamName {
	font-size: 11pt;
	text-transform: uppercase;
	font-weight: 600;
}

.teamRecord {
	font-weight: 300;
}

.teamScore {
	display: grid;
	justify-items: center;
	font-size: 14pt;
	width: fit-content;
	justify-self: center;
}

.winningWeight {
	font-weight: 600;
}

.losingWeight {
	font-weight: 300;
}


</style>