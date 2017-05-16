<template>
    <div class="tw-mask">
        <!-- login -->
        <div id="login" class="tw-panel" v-show="action === 'login'">
            <form class="login-box" v-if="!login.logined" @keyup.enter.prevent="userLogIn" @submit.prevent="userLogIn">
                <div class="login-box-header">
                    <div class="cancel">
                        <router-link to="/">x</router-link>
                    </div>
                </div>
                <p>{{ login.tips }}</p>
                <input action="text" placeholder="username" contenteditable="false" v-model="login.username">
                <input type="password" placeholder="password" v-model="login.password">
                <div class="btn-sheet">
                    <button class="btn-login" type="submit">登录</button>
                </div>
            </form>
            <div class="login-box" v-else>
                <div class="login-box-header">
                    <div class="cancel">
                        <router-link to="/">x</router-link>
                    </div>
                </div>
                <p class="">{{ "早上好！" + login.username }}</p>
                <p>现在，你可以使用云备份来上传下载你的个人数据啦！</p>
                <div class="btn-sheet">
                    <button class="btn-login-out" @click='userLogOut'>退出登录</button>
                </div>
            </div>
        </div>
        <!-- end -->

        <!-- cloud -->
        <div class="tw-panel" v-show="action === 'cloud'">
            <div class="login-box-header">
                <div class="cancel">
                    <router-link to="/">x</router-link>
                </div>
            </div>
            <p v-if="!login.logined">登录了才可以使用云备份哦！</p>
            <p v-else>上传数据将会覆盖云端数据，下载数据也将覆盖本地数据，请小心操作哦</p>
            <div class="btn-sheet">
                <button type="button" :disabled="!login.logined" @click="uploadData">上传</button>
                <button type="button" :disabled="!login.logined" @click="downloadDate">下载</button>
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
            <p><b>Time To Work</b> is a time-based Todo-list Web App<br><b>enjoy</b> your time!<br><br>ps:click date to chose one, the default is today.</p>
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
    import { timelineStorage } from '../js/util.js'

    export default {
        data() {
            return {
                login: {
                    logined: false,
                    tips: '如果账号不存在，系统会自动为您完成注册',
                    username: '',
                    password: ''
                }, 
                action: 'login',
                tips: '如果账号不存在，系统会自动为您完成注册'
            }
        },
        mounted() {
            bus.$on("showAction", msg => {
                this.action = msg;
            })
        },
        methods: {
            // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
            userLogIn() {
                let [username, password] = [this.login.username, this.login.password];

                AV.User.logIn(username, password).then(() => {
                    console.log("login success!");
                    this.login.logined = true;
                }, (error) => {
                    console.log(JSON.stringify(error));
                    if (error.code === 211) {
                        alert("该用户不存在，正在为您注册");
                        this.userSignUp();
                        return;
                    }
                    if (error.code === 210) {
                        alert("用户名与密码不匹配");
                    }
                })
            },

            // https://leancloud.cn/docs/leanstorage_guide-js.html#注册
            userSignUp() {
                console.log("注册中...");
                let user = new AV.User();
                let [username, password] = [this.login.username, this.login.password];

                user.setUsername(username);
                user.setPassword(password);
                user.signUp().then(() => {
                    alert("注册成功！将自动为您登录");
                    console.log(AV.User.current());
                    this.login.logined = true;
                }, ((error) => {
                    console.log(JSON.stringify(error));
                }));
            },

            userLogOut() {
                console.log("退出登录...");

                this.login.logined = false;
                this.login.username = "";
                this.login.password = "";
                AV.User.logOut();
            },

            // cloud
            uploadData() {
                let currentUser = AV.User.current();
                let data = {
                    timeline:  timelineStorage.fetch()
                }

                currentUser.save(data).then(() => {
                    console.log(AV.User.current().get('username'));
                    alert("上传成功！");
                }, (error) => {
                     console.error('Failed to create new object, with error message: ' + error.message);
                     alert(JSON.stringify(error));
                });

                /**
                let Todo = AV.Object.extend('Todo');
                let todo = new Todo();

                todo.set('timeline', timeline);

                todo.save().then(() => {
                    console.log(AV.User.current().get('username'));
                    console.log('New object created with objectId: ' + todo.id);
                    alert("上传成功！");
                }, (error) => {
                     console.error('Failed to create new object, with error message: ' + error.message);
                     alert(JSON.stringify(error));
                })
                */
            },

            downloadDate() {
                let timeline = AV.User.current().get("timeline");

                if (timeline) {
                    alert("下载成功！")
                    this.$store.commit('setTimeline', timeline);
                }

                /**
                let query = new AV.Query('Todo');

                // https://leancloud.cn/docs/leanstorage_guide-js.html#查询
                query.get('5913047a128fe100586c0b65').then((todo) => {
                    this.$store.commit('setTimeline', todo.get('timeline'));
                }, (error) => {
                    alert(JSON.stringify(error));
                });
                 */
            }
        }
}

</script>
