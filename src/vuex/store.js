/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';
import { filters, sortedDates, STORAGE_KEY, todoStorage, timelineStorage } from "../js/util.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: todoStorage.fetch(),
        timeline: timelineStorage.fetch(),
        visibility: 'all'
    },

    getters: {
        remaining(state) {
            return filters.active(state.todos).length;
        },
        getDates(state) {
            return Object.keys(state.timeline);
        },
        filteredTodos: (state) => (todos) => filters[state.visibility](todos),
    },

    mutations: {
        addTodo(state, payload) {
            // todos
            let todo = {
                id: todoStorage.uid++,
                title: payload.title,
                completed: false,
                date: payload.date
            };

            state.todos.push(todo);

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
            let stateTodos = state.todos;
            let timelineTodos = state.timeline[date].todos;

            stateTodos.splice(stateTodos.indexOf(todo), 1);
            timelineTodos.splice(timelineTodos.indexOf(todo), 1);

            // if todos is empty in date, delete date property.
            if (!timelineTodos.length) {
                delete state.timeline[date];
            }
        },

        setAllDone(state, value) {
            state.todos.forEach(todo => {
                todo.completed = value;
            });
        },

        removeCompleted(state) {
            state.todos = filters.active(state.todos);
        },

        setVisibility(state, value) {
            if (value) {
                state.visibility = filters[value] ? value : 'all';
            }
        }
    }
});
