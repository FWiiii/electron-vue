import Vuex from "vuex";

import Vue from "vue";

import solarLunar from "solarlunar";

import MutationsType from "./mutationsType";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDate: null,

    currentTime: null,

    calendarList: null,

    eventList: null,

    selectYear: null,

    selectMonth: null,

    selectIndex: null,

    selectMonth: null,

    selectYear: null,

    showEvent: true,
  },

  getters: {
    selectedData(state) {
      return state.calendarList[state.selectIndex];
    },

    headerTodayText(state) {
      let currentYear = state.currentDate.year;

      let currentMonth = state.currentDate.month;

      let currentDate = state.currentDate.date;

      return `${currentYear}年${currentMonth}月${currentDate}日`;
    },

    todayLunarText(state) {
      let currentMonthCn = state.currentDate.monthCn;

      let currentDayCn = state.currentDate.dayCn;

      return ` ${currentMonthCn}${currentDayCn}`;
    },

    todayText(state, getters) {
      let ncWeek = getters.selectedData.ncWeek;

      let date = getters.selectedData.cDay;

      let monthCn = getters.selectedData.monthCn;

      let dayCn = getters.selectedData.dayCn;

      if (getters.selectedData.isToday) {
        ncWeek = "今天";

        date = "";
      }

      return `${ncWeek} ${date} ${monthCn}${dayCn}`;
    },

    currentDayEvent(state, getters) {
      return state.eventList.filter((event) => {
        return (
          event.eventYear === getters.selectedData.cYear &&
          event.eventMonth === getters.selectedData.cMonth &&
          event.eventDate === getters.selectedData.cDay
        );
      });
    },
  },

  mutations: {
    [MutationsType.SET_CURRENT_DATE](state) {
      let date = new Date();

      let year = date.getFullYear();

      let month = date.getMonth() + 1;

      let dates = date.getDate();

      let { monthCn, dayCn } = solarLunar.solar2lunar(year, month, dates);

      state.currentDate = {
        year,

        month,

        date: dates,

        monthCn,

        dayCn,
      };
    },

    [MutationsType.GET_CURRENT_TIME](state) {
      let date = new Date();

      let hours = date.getHours();

      let minutes = date.getMinutes();

      let seconds = date.getSeconds();

      let transformedMinutes = addZero(minutes);

      let transformedSeconds = addZero(seconds);

      state.currentTime = `${hours}:${transformedMinutes}:${transformedSeconds}`;
    },

    [MutationsType.CREATE_CALENDAR_LIST](state, { year, month }) {
      let carlendarList = [];

      let days = getDaysByMonth(year, month - 1);

      let firstDay = getFirstDayByMonth(year, month - 1);

      let prefix = firstDay === 0 ? 6 : firstDay - 1;

      let suffix = 42 - days - prefix;

      let lastMonthDays = getDaysByMonth(year, month - 2);

      while (suffix > 0) {
        let nextMonth = createMonthList(year, month + 1, suffix);

        nextMonth.disable = true;

        carlendarList.push(nextMonth);

        suffix--;
      }

      while (days > 0) {
        let currentMonth = createMonthList(year, month, days);

        currentMonth.disable = false;

        carlendarList.push(currentMonth);

        days--;
      }

      while (prefix > 0) {
        let date = lastMonthDays--;

        let lastMonth = createMonthList(year, month - 1, date);

        lastMonth.disable = true;

        carlendarList.push(lastMonth);

        prefix--;
      }

      state.calendarList = carlendarList.reverse();
    },

    [MutationsType.ADD_EVENT](state, eventObj) {
      let startTime = eventObj.startTime;

      let endTime = eventObj.endTime;

      let eventText = eventObj.eventText;

      let eventPlace = eventObj.eventPlace;

      if (startTime === "" || endTime === "" || eventText === "") {
        return;
      }

      let selectedData = state.calendarList[state.selectIndex];

      state.eventList.push({
        eventYear: selectedData.cYear,

        eventMonth: selectedData.cMonth,

        eventDate: selectedData.cDay,

        startTime,

        endTime,

        eventText,

        eventPlace,
      });

      let eventList = JSON.stringify(state.eventList);

      console.log(eventList)

      localStorage.setItem("event-list", eventList);
    },

    [MutationsType.DEL_EVENT](state, e) {
      state.eventList = state.eventList.filter((event) => event !== e);

      let eventList = JSON.stringify(state.eventList);

      localStorage.setItem("event-list", eventList);
    },

    [MutationsType.NEXT_MONTH](state) {
      if (state.selectMonth === 12) {
        state.selectYear++;

        state.selectMonth = 1;
      } else {
        state.selectMonth++;
      }
    },

    [MutationsType.PREV_MONTH](state) {
      if (state.selectMonth === 1) {
        state.selectYear--;

        state.selectMonth = 12;
      } else {
        state.selectMonth--;
      }
    },

    [MutationsType.SET_SELECT_INDEX](state, val) {
      state.selectIndex = val;
    },

    [MutationsType.SET_SELECE_MONTH](state, val) {
      state.selectMonth = val;
    },

    [MutationsType.SET_SELECT_YEAR](state, val) {
      state.selectYear = val;
    },

    [MutationsType.TOGGLE_SHOW_EVENT](state, val) {
      state.showEvent = val;
    },

    [MutationsType.INIT_EVENT_LIST](state) {
      state.eventList = JSON.parse(localStorage.getItem("event-list")) || [];
    },
  },
});

function addZero(timeNumber) {
  let timeStr;

  if (timeNumber < 10) {
    timeStr = `0${timeNumber}`;
  } else {
    timeStr = timeNumber;
  }

  return timeStr;
}

function getFirstDayByMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function getDaysByMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function createMonthList(year, month, date) {
  let { cDay, cMonth, cYear, dayCn, ncWeek, monthCn, term, isToday } =
    solarLunar.solar2lunar(year, month, date);

  return {
    disable: null,

    cDay,

    cMonth,

    cYear,

    dayCn,

    ncWeek,

    monthCn,

    term,

    isToday,
  };
}
