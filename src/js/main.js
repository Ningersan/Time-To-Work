/*jshint esversion: 6 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../vuex/store.js";
import App from '../App.vue';
import todoList from '../components/todoList.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/all', component: todoList },
    { path: '/completed', component: todoList },
    { path: '/active', component: todoList }
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

