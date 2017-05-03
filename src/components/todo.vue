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
                <input class="toggle-all" type="checkbox" v-show="todos.length" v-model="allDone">
            </header>
            <todo-list></todo-list>
            <footer class="footer" v-cloak>
                <span class="todo-count">
                <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
                </span>
                <ul class="filters" @click="filterTodos">
                    <li><a id="all" :class="{ selected: visibility == 'all' }">All</a></li>
                    <li><a id="active" :class="{ selected: visibility == 'active' }">Active</a></li>
                    <li><a id="completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
                </ul>
                <div class="date-picker" v-show="todos.length <= remaining">
                    <input type="date" v-model="date">
                    <span class="week">{{ day }}</span>
                </div>
                <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">Clear completed</button>
            </footer>
        </section>
    </transition>
</template>

<style lang="scss">
    @import "../scss/todo.scss"
</style>

<script src="../js/todo.js"></script>

