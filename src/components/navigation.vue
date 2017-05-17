<template>
    <transition name="slide-fade">
        <nav v-show="ok" class="sider-bar">
            <ul @click="closeNav">
                <li><router-link to="/user/login"><i class="icon-login"></i>登录</router-link></router-link>
                <li><router-link to="/todoList/all"><i class="icon-calendar-empty"></i>全部事项</router-link></li>
                <li><router-link to="/todoList/completed"><i class="icon-calendar-check-o"></i>完成事项</router-link></li>
                <li><router-link to="/todoList/active"><i class="icon-calendar-times-o"></i>在忙事项</router-link></li>
                <li><router-link to="/user/cloud"><i class="icon-upload-cloud" style="margin-left: -2px"></i>云备份</router-link></li>
                <li><router-link to="/user/about"><i class="icon-info"></i>关于</router-link></li>         
            </ul>
        </nav>
    </transition>
</template>

<script>
    import bus from "../js/eventBus.js"

    export default {
        data() {
            return {
                ok: false
            }
        },
        mounted() {
            bus.$on("toggleNav", () => {
                this.ok = !this.ok;
            });
            bus.$on("closeNav", msg => {
                this.ok = false;
            })
        },
        methods: {
            closeNav() {
                this.ok = false;
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/nav.scss";
</style>
