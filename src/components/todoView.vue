<template>
    <section class="todo-display" v-cloak>
        <div class="todo-view">
            <div class="tw-day"
                v-for="date in sortedDates"
                :key="date"
            >
                <div class="date-info"
                    :class="{ today: date === getTodayDate }"
                    v-show="filteredTodos(timeline[date].todos).length"
                >
                    <em>{{ getDayDiff(date) }}</em>
                    <span>{{ date }}</span>
                </div>
                <ul class="todo-list">
                    <transition-group
                        name="custom-classes-transition"
                        leave-active-class="animated bounceOutRight"
                    >
                        <li v-for="todo in filteredTodos(timeline[date].todos)"
                        key="todo.id"
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
        </div>
    </section>
</template>

<script>
    import { mapState } from "vuex";
    import { dateComparisonFunc, getDateDiff, getTodayDate } from "../js/util.js";

    export default {
        data() {
            return {
                editedTodo: null
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
            ...mapState(['timeline']),

            getTodayDate() {
                return getTodayDate();
            },
            sortedDates() {
                let dates = this.$store.getters.getDates;
                return dates.sort(dateComparisonFunc);
            }
        },
        methods: {
            filteredTodos(todos) {
                return this.$store.getters.filteredTodos(todos);
            },

            getDayDiff(startDate) {
                let endDate = getTodayDate();
                let dayDiff = getDateDiff(startDate, endDate);
                let dayDiffStr = "";

                if (dayDiff < 0) {
                    dayDiffStr = `${-dayDiff}天后`;
                } else if (dayDiff === 0) {
                    dayDiffStr = "今天";
                } else {
                    dayDiffStr = `${dayDiff}天前`;
                }

                return dayDiffStr;
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
