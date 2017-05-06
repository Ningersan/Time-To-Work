/*jshint esversion: 6 */

//localStorage persistence
export const STORAGE_KEY = "todos-vuejs-2.0";
export const STORAGE_TIMELINE = "todos-timeline";

export var todoStorage = {
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

export var timelineStorage = {
    fetch() {
        let timeline = JSON.parse(localStorage.getItem(STORAGE_TIMELINE) || '{}');
        timelineStorage.uid = timeline.length;
        return timeline;
    },
    save(timeline) {
        localStorage.setItem(STORAGE_TIMELINE, JSON.stringify(timeline));
    }
};

// visibility filters
export var filters = {
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

// date management
export function getDateStr(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateStr = null;

    month = month < 10 ? ("0" + month) : month;
    day = day < 10 ? ("0" + day) : day;
    dateStr = `${year}-${month}-${day}`;

    return dateStr;
}

export function getTodayDate() {
    let date = new Date();
    return getDateStr(date);
}

export function getDay(dateStr) {
    let date = new Date(dateStr);
    let day = date.getDay();
    let dayMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return dayMap[day];
}

export function dateComparisonFunc(a, b) {
    let [dateA, dateB] = [new Date(a), new Date(b)];
    return dateA - dateB;
}

// 计算两个日期相差天数
export function getDateDiff(startDate, endDate) {
    let [date1, date2, dateDiff] = [new Date(startDate), new Date(endDate), null];
    dateDiff = (date2 - date1)/1000/60/60/24;
    return dateDiff;
}
