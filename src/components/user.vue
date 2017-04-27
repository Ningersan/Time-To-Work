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
            <input action="password" placeholder="password">
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

<style lang="scss">
    @import "../scss/mixins.scss";

    .tw-mask {
        @include absolute-center;
        z-index: 5;
        background: rgba(0,0,0,0.74);
        .login-box-header {
            width: 100%;
            height: 14%;
            cursor: move;
        }
        .tw-panel {
            @extend .tw-mask;
            width: 290px;
            height: 330px;
            text-algin: center;
            font-family: "Hiragino Sans GB", "Helvetica";
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 8px 20px 0 rgba(0,0,0,0.2);
        }
        .btn-sheet {
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .cancel {
            position: absolute;
            top: 0;
            right: 0;
            a {
                color: #cc9a9a;
                padding: 3px 8px;
                font-size: 20px;
                font-weight: 500;
                text-decoration: none;
                &:hover {
                    color: #af5b5e;
                }
            }
        }
        p {
            width: 100%;
            padding: 3% 15% 10%;
            text-align: center;
            line-height: 1.5;
            color: #42b983;
            font-weight: 500;
        }
        input {
            display: block;
            margin: 0 auto;
            padding-top: 20px;
            padding-left: 10px;
            width: 77%;
            border: 0;
            border-bottom: 1px solid #BFBFC0;
            outline: none;
            font-size: 15px;
            &:focus {
                border-bottom-color: #42b983;
            }
        }
        button {
            display: block;
            padding: 20px 40px;
            width: 100%;
            border: 0;
            outline: 0;
            color: #36bc7f;
            font-size: 20px;
            font-weight: 500;
            letter-spacing: 4px;
            cursor: pointer;
            background: none;
        }
    }

</style>