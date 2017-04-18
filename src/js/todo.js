/*jshint esversion: 6 */
import bus from "./eventBus.js";

//localStorage persistence
const STORAGE_KEY = "todos-vuejs-2.0";
var todoStorage = {
    fetch() {
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach((todo, index) => {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

// visibility filters
var filters = {
    all(todos) {
        return todos;
    },
    active(todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed(todos) {
        return todos.filter(todo => todo.completed);
    }
};

export default {
    data() {
        return {
            show: false,
            todos: todoStorage.fetch(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all'
        };
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
        filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return filters.active(this.todos).length;
        },
        allDone: {
            get() {
                return this.remaining === 0;
            },
            set(value) {
                this.todos.forEach(todo => {
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
        addTodo() {
            let value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = '';
        },

        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
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
        },

        removeCompleted() {
            this.todos = filters.active(this.todos);
        },

        filterTodos(event) {
            let id = event.target.id;
            if (id) {
                this.visibility = filters[id] ? id : '';
            }
        }
    },

    directives: {
        'todo-focus'(el, value) {
            if (el, value) {    
                el.focus();
            }
        }
    }
};
