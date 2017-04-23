<template>
    <header class="app-bar">
        <div class="app-bar-wrapper">
            <button class="menu fa fa-lg" @click="sendMsg(show = !show)" :class="[isBars ? barsClass : arrowClass]"></button>
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
                show: false,
                isBars: true,
                barsClass: "fa-bars",
                arrowClass: "fa-arrow-left"
            }
        },
        mounted() {
            bus.$on("backToIndex", msg => {
                this.isBars = msg;
            })
        },
        methods: {
            sendMsg (show) {
                if (this.isBars) {
                    bus.$emit("toggleNav")
                } else {
                    this.show = !this.show;
                    this.isBars = !this.isBars;
                    bus.$emit("startUp", false);
                    bus.$emit("btnBack");
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/bar.scss";
</style>
