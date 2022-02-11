<template>

	<aside class="sidebarContainer">

		<header class="sidebarHeader">

			<h3>NHL Stats</h3>

		</header>

		<section class="sidebarNav">

			<span @click="goHome" class="menuLinkStyle">Today's Games</span>
			<span @click="goTeams" class="menuLinkStyle">Views Teams</span>

		</section>

	</aside>

</template>

<script>
export default {

	name: "Sidebar",
	methods: {
		goHome() {
			this.$router.push({path: "/"});
		},
		goTeams() {
			this.$router.push({path: '/teams'})
		}
	}
}
</script>

<style scoped>

	.sidebarContainer {
		width: 300px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;

		background-color: #ccc;
		min-height: 100vh;
		max-height: 100%;

		position: absolute;

		box-shadow: inset 0px 7px 15px 0px rgba(0, 0, 0, 0.35);
	}

	.sidebarHeader {
		background-color: #343b42;
		color: white;
		padding: 20px 0;
		text-align: center;
	}

	.sidebarNav {
		/* padding: 10px; */
		display: flex;
		flex-direction: column;
	}

	.menuLinkStyle {
		width: 100%;
		/* margin: 10px  0;*/
		padding: 15px;
		text-align: center;
		font-weight: lighter;
		text-transform: uppercase;
		border-top: 1px solid #707070;
		border-bottom: 1px solid #707070;
	}

	.menuLinkStyle:hover {
		color: white;
		background-color: #707070;
		cursor: pointer;
	}

	.menuLinkStyle:first-child {
		border-bottom: none;
	}

</style>