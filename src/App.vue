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
                <router-view name="todoList"></router-view>
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
    @import "./scss/mixins.scss";

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
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
    }
    #app,
    .container {
        height: 100%;
    }

    /* loading */
    #loading{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:white;
        opacity: 1;
        z-index: 999;
        transition: transform 1s ease, opacity 1s ease;
        transform : scale3d(1, 1, 1);
        .content{
            @include absolute-center;
            width: 70px;
            height:70px;
            p{
                text-align:center;
                font-weight: 500;
                color: #42b983;
                text-indent: -8px;
            }
        }
        img{
            width: 77px;
            height: 77px;
        }

        // http://tobiasahlin.com/spinkit/
        .spinner {
            width: 70px;
            height: 70px;
            position: relative;
            margin: 0 auto 16px auto;
        }

        .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #42b983;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;

            -webkit-animation: bounce 2.0s infinite ease-in-out;
            animation: bounce 2.0s infinite ease-in-out;
        }

        .double-bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }

        @-webkit-keyframes bounce {
            0%, 100% { -webkit-transform: scale(0.0) }
            50% { -webkit-transform: scale(1.0) }
        }

        @keyframes bounce {
            0%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            } 50% {
                transform: scale(1.0);
                -webkit-transform: scale(1.0);
            }
        }
    }

    /* App Bar */
    .app-bar {
        z-index: 998;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 58px;
        background: #42b983;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);
        overflow: hidden;
    }

    /* Button add */
    .btn-add {
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

    /* Tips */
    .tips {
        position: absolute;
        bottom: 120px;
        left: 50%;
        width: 230px;
        margin-left: -115px;
        padding: 6px 15px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: #42b983;
    }
</style>
