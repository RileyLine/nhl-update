<template>

	<article class="playEntryHolder">

		<section class="playPeriod playStat">
			<p>P{{playInfo.about.period}}</p>
		</section>

		<section class="playTime playStat">
			<p>{{playInfo.about.periodTime}}</p>
		</section>

		<section class="playType playStat">
			<p>{{playInfo.result.event}}</p>
		</section>

		<section class="playInfo playStat">
			<p>{{playInfo.result.description}}</p>
		</section>

		
	</article>

</template>

<script>
export default {

	name: "PlayEntry",
	props: {
		playInfo: {
			type: Object
		}
	}

}
</script>

<style>

.playEntryHolder {
	display: flex;
	border: 1px solid#ddd;
	margin-bottom: 5px;
	padding: 5px 8px;

	align-items: center;
	width: 650px;
}

.playEntryHolder:nth-child(even) {
	background-color: #eee;
}

.playType {
	background-color: dodgerblue;
	color: white;
	font-weight: bold;
	font-size: 10pt;
	text-transform: uppercase;

	display: grid;
	place-content: center;
	padding: 4px 6px;
	border-radius: 5px;
}

.playStat {
	margin-right: 10px;
	font-size: 10pt;
}

.playPeriod {
	background-color: hsl(16, 50%, 66%);
	color: white;
	padding: 3px 6px;
	font-size: 9pt;
}

</style>