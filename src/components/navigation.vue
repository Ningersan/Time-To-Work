<<template>
    <transition name="slide-fade">
        <nav v-show="ok" class="sider-bar">
            <ul>
                <li><a href="#/login"><i class="fa fa-sign-in fa-lg"></i>登录</a></li>
                <li><a href="#/all"><i class="fa fa-calendar-o fa-lg"></i>全部事项</a></li>
                <li><a href="#/done"><i class="fa fa-calendar-check-o fa-lg"></i>完成事项</a></li>
                <li><a href="#/doing"><i class="fa fa-calendar-times-o fa-lg"></i>在忙事项</a></li>
                <li><a href="#/backup"><i class="fa fa-cloud-upload fa-lg"></i>云备份</a></li>
                <li><a href="#/about"><i class="fa fa-info fa-lg"></i>关于</a></li>         
            </ul>
        </nav>
    </transition>
</template>

<<script>
    import bus from "../js/eventBus.js"

    export default {
        data() {
            return {
                ok: false
            }
        },
        mounted() {
            bus.$on("toggleNav", msg => {
                this.ok = msg;
            })
        }
    }
</script>

<style lang="scss">
    @import "../scss/nav.scss";
</style>
