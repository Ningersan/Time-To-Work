<template>
    <section class="main" v-show="todos.length" v-cloak>
        <ul class="todo-list">
            <transition-group 
                name="custom-classes-transition"
                enter-class="list-enter"
                enter-active-class="list-enter-active"
                leave-active-class="animated bounceOutRight"
            >
                <li v-for="todo in filteredTodos"
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
    </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            editedTodo: null,
        }
    },
    directives: {
        'todo-focus'(el, value) {
            if (el, value) {
                el.focus();
            }
        }
    },
    computed: {
        ...mapState([
            'todos'
        ]),

        ...mapGetters([
            'filteredTodos'
        ])
    },
    methods: {
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

<style lang="scss">
    .container {
        > .main {
            margin: 90px 300px 40px 300px;
            background: #fff;
            button {
                border: 0;
                background: none;
                font-size: 100%;
                vertical-align: baseline;
                font-family: inherit;
                font-weight: 400;
                color: inherit;
                -webkit-appearance: none;
                appearance: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            li {
                height: 48px;
                font-size: 16px;
                font-weight: 400;
                view {
                    height: inherit;
                }
            }
            .toggle {
                margin-left: 10px;
                height: 34px;
                &:after {
                    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
                }
                &:checked:after {
                    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
                }
                
            }
            .editing {
                .edit {
                    height: 47px;
                    font-size: inherit;
                    font-weight: 500;
                }
            }
            .destroy {
                color: #cc9a9a;
                font-size: 24px;
                bottom: -5px;
            }
        }
    }

    .list-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .list-enter-active {
        transition: all .5s;
    }

</style>