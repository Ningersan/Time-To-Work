<template>
	<div class="contianer">
		<app-bar></app-bar>
		<nav-drawer></nav-drawer>
		<div class="action-add" v-bind:class="{ 'active': isActive }" v-on:click="isActive = !isActive, sendMsg(isActive)">
			<i class="fa fa-plus fa-lg"></i>
		</div>
		<todo-core></todo-core>
	</div>
</template>

<script>
    import bus from "./js/eventBus.js"

	import appBar from "./components/appBar.vue"
	import navDrawer from "./components/navigation.vue"
	import todoCore from "./components/todo.vue"

	export default {
		data() {
			return {
				isActive: false
			}
		},
		methods: {
			sendMsg(show) {
				bus.$emit("startUp", this.isActive)
			}
		},
		components: {
			appBar,
			navDrawer,
			todoCore
		}
	}

</script>

<style lang="scss">
	* {
		margin: 0;
        padding: 0;
		box-sizing: border-box;
	}
	html,
	body {
        width: 100%;
        height: 100%;
		background-color: #F0F0F0;
        overflow: hidden;
		font-weight: 300;
        font-family: "Source Code Pro", "Consolas", "Microsoft yahei", "Segoe UI", sans-serif;
    }
	#app,
	.contianer {
		height: 100%;
	}
	.app-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 58px;
		background: #42b983;
		box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);
		overflow: hidden;
	}
	.action-add {
		position: fixed;
		right: 25px;
		bottom: 25px;
		width: 56px;
		height: 56px;
		cursor: pointer;
		border-radius: 50%;
		box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);
		text-align: center;		
		transition: all .25s ease-out;		
		background-color: #FF5B45;
		&:hover {
	 		box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.2);
		}
		i {
			line-height: 56px;
			color: #fff;					
		}
	}
	.active {
		transform: rotate(-45deg);
	}
</style>
