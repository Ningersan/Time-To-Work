<template>
    <div class="tw-mask">
        <form id="login" class="tw-panel">
            <p>{{ tips }}</p>
            <input type="text" placeholder="username" contenteditable="false">
            <input type="password" placeholder="password">
            <div class="btn-sheet">
                <button class="btn-login">登录</button>
            </div>
            <div class="cancel">
                <button @click="redirToHome">x</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tips: '如果账号不存在，系统会自动为您完成注册'
            }
        },
        methods: {
            redirToHome() {
                this.$router.push("/");
            }
        }
    }
</script>

<style lang="scss">
    .tw-mask {
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 5;
        background: rgba(0,0,0,0.74);
        .tw-panel {
            @extend .tw-mask;
            width: 290px;
            height: 300px;
            text-algin: center;
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 8px 20px 0 rgba(0,0,0,0.2);
        }
        .btn-sheet {
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .btn-login {
            padding: 20px 40px;
            width: 100%;
            color: #36bc7f;
            letter-spacing: 4px;
        }
        .cancel {
            position: absolute;
            top: 0;
            right: 0;
            button {
                color: #cc9a9a;
                padding: 3px 8px;
                &:hover {
                    color: #af5b5e;
                }
            }
        }
        p {
            width: 100%;
            padding: 15% 15% 10%;
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
            border: 0;
            outline: 0;
            font-size: 20px;
            font-weight: 500;
            cursor: pointer;
            background: none;
        }
    }

</style>