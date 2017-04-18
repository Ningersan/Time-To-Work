<template>
    <header class="app-bar">
        <div class="app-bar-wrapper">
            <button v-on:click="sendMsg(show = !show)" class="menu fa fa-bars fa-lg"></button>
            <h1>{{ message }}</h1>
            <button class="more fa fa-cog fa-lg"></button>
        </div>
    </header>
</template>

<script>
    import bus from "../js/eventBus.js"

    export default {
        data () {
            return {
                message: "BusyWeek!",
                show: false
            }
        },
        methods: {
            sendMsg (show) {
                bus.$emit("toggleNav", show)
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/bar.scss";
</style>
