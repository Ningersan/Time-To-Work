/*jshint esversion: 6 */
import bus from "./eventBus.js";
import todoList from "../components/todoList.vue";
import { todoStorage } from "./util.js";
import {mapState, mapGetters, mapMutations } from "vuex";

export default {
    data() {
        return {
            show: false,
            newTodo: '',
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
        }
    },

    computed: {
        ...mapState([
            'todos',
            'visibility'
        ]),

        ...mapGetters([
            'remaining'
        ]),

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
            let value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.$store.commit('addTodo', value);
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

