/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';
import { filters, sortedDates, getAllTodos, STORAGE_KEY, todoStorage, timelineStorage } from "../js/util.js";

Vue.use(Vuex);

// cloud
// https://leancloud.cn/
const appId = '2jwWwi1FCWnxfA2YzUEQG3Ar-gzGzoHsz';
const appKey = 'TFBwcxwUSCV9fyx3ys3QYusl';
AV.init({ appId, appKey });

export default new Vuex.Store({
    state: {
        timeline: timelineStorage.fetch(),
        visibility: 'all',
        todoScroll : null
    },

    getters: {
        getDates(state) {
            return Object.keys(state.timeline);
        },
        getTodoScroll(state) {
            return state.todoScroll;
        },
        filteredTodos: (state) => (todos) => filters[state.visibility](todos),
    },

    mutations: {
        addTodo(state, payload) {
            // todos
            let todo = {
                id: timelineStorage.uid++,
                title: payload.title,
                completed: false,
                date: payload.date
            };

            // timeline
            if (!state.timeline[payload.date]) {
                Vue.set(state.timeline, payload.date, {
                    date: new Date(payload.date),
                    todos: []
                });
            }

            state.timeline[payload.date].todos.push(todo);
        },

        removeTodo(state, todo) {
            let date = todo.date;
            let timelineTodos = state.timeline[date].todos;

            timelineTodos.splice(timelineTodos.indexOf(todo), 1);

            // if todos is empty in date, delete date property.
            if (!timelineTodos.length) {
                delete state.timeline[date];
            }
        },

        setTimeline(state, value) {
            state.timeline = value;
        },

        setVisibility(state, value) {
            if (value) {
                state.visibility = filters[value] ? value : 'all';
            }
        },

        setScroll(state, value) {
            state.todoScroll = value;
        }
    }
});
