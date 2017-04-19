<template>
    <transition name="fade">
        <section class="todoapp" v-show="show">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo"
                autofocus autocompleted="off"
                v-model="newTodo"
                @keyup.enter="addTodo"
                placeholder="What needs to be done?">
            </header>
            <section class="main" v-show="todos.length" v-cloak>
                <input class="toggle-all" type="checkbox" v-model="allDone">
                <ul class="todo-list">
                    <li v-for="todo in filteredTodos"
                        class="todo"
                        :key="todo.id"
                        :class="{ completed: todo.completed, editing: todo == editedTodo }">
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
                </ul>
            </section>
            <footer class="footer" v-cloak>
                <span class="todo-count">
                <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
                </span>
                <ul class="filters" @click="filterTodos">
                    <li><a href="#/all" id="all" :class="{ selected: visibility == 'all' }">All</a></li>
                    <li><a href="#/active" id="active" :class="{ selected: visibility == 'active' }">Active</a></li>
                    <li><a href="#/completed" id="completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
                </ul>
                <button class="clear-completed" @click="removeCompleted" v-show="todos.length">
                Clear completed
                </button>
            </footer>
        </section>
    </transition>
</template>

<style lang="scss">
    @import "../scss/todo.scss"
</style>

<script src="../js/todo.js"></script>

