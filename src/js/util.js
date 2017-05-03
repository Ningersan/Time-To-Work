/*jshint esversion: 6 */

//localStorage persistence
export const STORAGE_KEY = "todos-vuejs-2.0";

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

// date manage
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

//事件绑定函数，兼容浏览器差异
export function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}
