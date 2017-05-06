/*jshint esversion: 6 */
import bus from "./eventBus.js";
import todoList from "../components/todoList.vue";
import { todoStorage, timelineStorage, getTodayDate, getDay } from "./util.js";
import {mapState, mapGetters, mapMutations } from "vuex";

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
        });
    },

    watch: {
        todos: {
            handler(todos) {
                todoStorage.save(todos);
            },
            deep: true
        },
        timeline: {
            handler(timeline) {
                timelineStorage.save(timeline);
            },
            deep: true
        }
    },

    computed: {
        ...mapState([
            'todos',
            'timeline',
            'visibility'
        ]),

        ...mapGetters([
            'remaining'
        ]),

        day() {
            return getDay(this.date);
        },

        allDone: {
            get() {
                return this.remaining === 0;
            },
            set(value) {
                return this.$store.commit('setAllDone', value);
            }
        }
    },
    filters: {
        pluralize(n) {
            return n === 1 ? 'item' : 'items';
        }
    },
    methods: {
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

        ...mapMutations([
            'removeCompleted'
        ]),

        filterTodos(event) {
            let id = event.target.id;
            this.$store.commit('setVisibility', id);
        }
    }
};
