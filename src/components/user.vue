<template>
    <div class="tw-mask">
        <!-- login -->
        <form id="login" class="tw-panel" v-show="action === 'login'">
            <div class="login-box-header">
                <div class="cancel">
                    <router-link to="/">x</router-link>
                </div>
            </div>
            <p>{{ tips }}</p>
            <input action="text" placeholder="username" contenteditable="false">
            <input type="password" placeholder="password">
            <div class="btn-sheet">
                <button class="btn-login">登录</button>
            </div>
        </form>
        <!-- end -->

        <!-- cloud -->
        <div class="tw-panel" v-show="action === 'cloud'">
            <div class="login-box-header">
                <div class="cancel">
                    <router-link to="/">x</router-link>
                </div>
            </div>
            <p>登录了才可以使用云备份哦！</p>
            <div class="btn-sheet">
                <button>上传</button>
                <button>下载</button>
            </div>
        </div>
        <!-- end -->

        <!-- about -->
        <div class="tw-panel" v-show="action === 'about'">
            <div class="login-box-header">
                <div class="cancel">
                    <router-link to="/">x</router-link>
                </div>
            </div>
            <p><b>Time To Work</b> is a time-based Todo-list Web App<br><b>enjoy</b> your time!</p>
            <p class="btn-sheet">
                <span>@2017</span>
                <a><strong>Ningersan</strong></a>
            </p>
        </div>
    </div>
    <!--end-->
</template>

<script>
    import bus from '../js/eventBus.js';

    export default {
        data() {
            return {
                action: 'login',
                tips: '如果账号不存在，系统会自动为您完成注册'
            }
        },
        mounted() {
            bus.$on("showAction", msg => {
                this.action = msg;
            })
        }
    }

</script>
