<template>
    <transition name="slide-fade">
        <nav v-show="ok" class="sider-bar">
            <ul>
                <li><router-link to="/login"><i class="fa fa-sign-in fa-lg"></i>登录</router-link></router-link>
                <li><router-link to="/all"><i class="fa fa-calendar-o fa-lg"></i>全部事项</router-link></li>
                <li><router-link to="/completed"><i class="fa fa-calendar-check-o fa-lg"></i>完成事项</router-link></li>
                <li><router-link to="/active"><i class="fa fa-calendar-times-o fa-lg"></i>在忙事项</router-link></li>
                <li><router-link to="/backup"><i class="fa fa-cloud-upload fa-lg" style="margin-left: -2px"></i>云备份</router-link></li>
                <li><router-link to="/about"><i class="fa fa-info fa-lg" style="margin-left: 5px; padding-right: 7px"></i>关于</router-link></li>         
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
        }
    }
</script>

<style lang="scss">
    @import "../scss/nav.scss";
</style>
