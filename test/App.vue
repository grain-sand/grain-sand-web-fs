<template>
	<nav>
		<router-link v-for="r of router.getRoutes()" :to="r.path" v-text="r.name"></router-link>
	</nav>
	<router-view />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<style lang="scss">
	#app{
		max-width: 90%;
		margin: auto;
		nav {
			padding-top: 25px;
			>a {
				font-size: 13px;
				margin: 0 1vw;
				font-weight: bold;
				color: #2c3e50;
				&.router-link-exact-active {
					color: #42b983;
				}
			}
		}
	}
</style>
