/*jshint esversion: 6 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
import App from '../App.vue';
import user from '../components/user.vue';
import todoView from '../components/todoView.vue';
import { timelineStorage } from '../js/util.js';

Vue.use(VueRouter);

const routes = [
    { path: '/user/:id', name:"user", components: { user }},
    { path: '/todoList/:id', name:"todoList", components: { todoView }}
];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    store,
    router,
    components: { App }
});

// window.localStorage.clear();
