<template>
    <section class="todo-display" v-cloak>
        <div class="todo-view">
            <div class="tw-day"
                v-for="date in sortedDates"
                :key="date"
            >
                <div class="date-info"
                    :class="{ today: date === getTodayDate }"
                    v-show="filteredTodos(date).length"
                >
                    <em>{{ getDayDiff(date) }}</em>
                    <span>{{ date }}</span>
                </div>

                <!--component-->
                <todo-list :todos="filteredTodos(date)"></todo-list>
                <!--end-->
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from "vuex";
    import todoList from "../components/todoList.vue";
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
        components: {
            todoList
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
            filteredTodos(date) {
                let todos = this.timeline.hasOwnProperty(date) ? this.timeline[date].todos : {};
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
            }
        }
    }
</script>
