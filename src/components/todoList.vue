<template>
    <section class="main" v-show="todos.length" v-cloak>
        <div id="wrapper">
            <ul class="todo-list">
                <transition-group
                    name="list"
                >
                    <li v-for="todo in filteredTodos(todos)"
                        class="todo"
                        :key="todo.id"
                        :class="{ completed: todo.completed, editing: todo == editedTodo }"
                    >
                        <div class="view">
                            <input class="toggle" type="checkbox" v-model="todo.completed">
                            <label @click="editTodo(todo)">{{ todo.title }}</label>
                            <button class="destroy" @click="removeTodo(todo)"></button>
                        </div>
                        <input class="edit" type="text"
                            v-model="todo.title"
                            v-todo-focus="todo == editedTodo"
                            @blur="doneEdit(todo)"
                            @keyup.enter="doneEdit(todo)"
                            @keyup.esc="cancelEdit(todo)"
                        >
                    </li>
                </transition-group>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getAllTodos } from "../js/util.js"

export default {
    data() {
        return {
            editedTodo: null,
        }
    },

    props: ['todos'],

    directives: {
        'todo-focus'(el, value) {
            if (el, value) {
                el.focus();
            }
        }
    },

    mounted() {
        let todoScroll = new IScroll('#wrapper', {
            mouseWheel: true,
            bindToWrapper: true
        });
        this.$store.commit('setScroll', todoScroll);
    },

    methods: {
        filteredTodos(todos) {
            return this.$store.getters.filteredTodos(todos);
        },

        removeTodo(todo) {
            this.$store.commit('removeTodo', todo);
        },

        editTodo(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit(todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },

        cancelEdit(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        }
    }
}

</script>
