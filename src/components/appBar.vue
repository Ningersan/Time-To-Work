<template>
    <header class="app-bar">
        <div class="app-bar-wrapper">
            <button @click="sendMsg(show = !show)" :class="[isBars ? barsClass : arrowClass]"></button>
            <h1>{{ message }}</h1>
            <button class="more" v-show="!isAdd" @click="redirToAbout"><i class="icon-info-circled"></i></button>
            <button class="add" v-show="isAdd" @click="addTodo">添加</button>
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
                isAdd: false,
                barsClass: "menu icon-menu",
                arrowClass: "arrow icon-left-big"
            }
        },

        mounted() {
            bus.$on("backToIndex", msg => {
                this.isBars = msg;
            })

            bus.$on("isTyping", msg => {
                this.isAdd = msg;
            })
        },

        methods: {
            sendMsg (show) {
                if (this.isBars) {
                    bus.$emit("toggleNav");
                } else {
                    this.show = !this.show;
                    this.isBars = !this.isBars;
                    this.isAdd = !this.isAdd;

                    bus.$emit("startUp", false);
                    bus.$emit("btnBack");
                }
            },

            redirToAbout() {
                this.$router.push('/user/about');
            },

            addTodo() {
                bus.$emit("addTodo");
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/bar.scss";
</style>
