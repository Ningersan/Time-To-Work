/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';
import { filters, STORAGE_KEY, todoStorage } from "../js/util.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: todoStorage.fetch(),
        visibility: 'all'
    },

    getters: {
        remaining(state) {
            return filters.active(state.todos).length;
        },
        filteredTodos(state) {
            return filters[state.visibility](state.todos);
        }
    },

    mutations: {
        addTodo(state, value) {
            state.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
        },

        removeTodo(state, todo) {
            state.todos.splice(state.todos.indexOf(todo), 1);
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