<template>
    <div class="container">
        <!--loading-->
        <transition name="fade">
            <div id="loading" v-show="!loaded">
                <div class="content">
                    <div class="spinner">
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
                    </div>
                    <p>loading...</p>
                </div>
            </div>
        </transition>

        <!-- tw-mask -->
        <transition name="fade">
            <keep-alive>
                <router-view name="user"></router-view>
            </keep-alive>
        </transition>

        <!--top-bar-->
        <app-bar></app-bar>

        <!-- Navigation -->
        <nav-drawer></nav-drawer>

        <!-- btn-add -->
        <div class="btn-add" :class="{ 'active': isActive }" v-on:click="redirToHome(), isActive = !isActive, sendMsg(isActive)">
            <i class="fa fa-plus fa-lg"></i>
        </div>

        <!--Todo App-->
        <todo-core></todo-core>

        <!--Todo List-->
        <transition name="slide-fade">
            <keep-alive>
                <router-view name="todoView"></router-view>
            </keep-alive>
        </transition>

        <!-- tips -->
        <div class="tips"><span>点击红色按钮，开启新的一天</span></div>
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
                loaded: false,
                isActive: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loaded = true;
            });

            bus.$on("btnBack", () => {
                this.isActive = false;
            });
        },
        watch: {
            '$route'(to, from) {
                let action = this.$route.params.id;

                if (this.$route.name === "todoList") {
                    this.$store.commit("setVisibility", action);
                } else {
                    bus.$emit("showAction", action);
                }
            }
        },
        methods: {
            sendMsg(show, back) {
                bus.$emit("closeNav");
                bus.$emit("startUp", this.isActive);
                bus.$emit("isTyping", this.isActive);
                bus.$emit("backToIndex", !this.isActive);
            },
            redirToHome() {
                this.$router.push("/");
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
    @import "./scss/style.scss";
</style>
