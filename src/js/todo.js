/*jshint esversion: 6 */
import bus from "./eventBus.js";
import todoList from "../components/todoList.vue";
import { timelineStorage, filters, getTodayDate, getDay, getAllTodos } from "./util.js";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
    data() {
        return {
            show: false,
            newTodo: '',
            date: getTodayDate()
        };
    },

    components: {
        todoList
    },

    mounted() {
        bus.$on("startUp", msg => {
            this.show = msg;

            // refresh scroll
            this.refreshScroll();
        });

        bus.$on("addTodo", () => {
            this.addTodo();
        });
    },

    watch: {
        timeline: {
            handler(timeline) {
                timelineStorage.save(timeline);
                this.refreshScroll();
            },
            deep: true
        }
    },

    computed: {
        ...mapState([
            'timeline',
            'visibility',
            'todoScroll'
        ]),

        todos() {
            return getAllTodos(this.timeline);
        },

        remaining() {
            return filters.active(this.todos).length;
        },

        day() {
            return getDay(this.date);
        },

        allDone: {
            get() {
                return this.remaining === 0;
            },
            set(value) {
                return this.todos.forEach(todo => {
                    todo.completed = value;
                });
            }
        }
    },
    filters: {
        pluralize(n) {
            return n === 1 ? 'item' : 'items';
        }
    },
    methods: {
        refreshScroll() {
            if (this.todoScroll) {
                this.$nextTick(() => {
                    this.todoScroll.refresh();
                })
            }
        },

        addTodo() {
            let date = this.date;
            let title = this.newTodo && this.newTodo.trim();

            if (!title) {
                return;
            }

            this.$store.commit('addTodo', {
                title,
                date
            });

            this.newTodo = '';
        },

        filterTodos(event) {
            let id = event.target.id;
            this.$store.commit('setVisibility', id);
        },

        removeCompleted() {
            let todos = filters.completed(this.todos);
            for (let i = 0, len = todos.length; i < len; i++) {
                let todo = todos[i];
                this.$store.commit('removeTodo', todo);
            }
        }
    }
};
