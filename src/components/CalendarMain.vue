<template>
  <div class="calendar-main">
    <div class="main-header">
      <span class="seleted-date">{{ selectedDate }}</span>
      <div class="select-button">
        <div class="arrow-up" @click="prevMonth">
          <arrow-up fill-color="#fff" />
        </div>
        <div class="arrow-down" @click="nextMonth">
          <arrow-down fill-color="#fff" />
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="calendar-week">
        <span class="week-item" v-for="(week, index) in weeksList" :key="index"
          >{{ week }}
        </span>
      </div>

      <div class="calendar-day">
        <div
          class="day-item"
          v-for="(day, index) in calendarList"
          :key="index"
          @click="clickDay(index)"
          :class="[
            day.disable ? 'day-disable-color' : '',
            day.isToday ? 'current-day-bc' : '',
            index === selectIndex ? 'select-day-border' : 'no-select-day',
          ]"
        >
          <span>{{ day.cDay }}</span>
          <span>{{ day.term || day.dayCn }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowUp from "./icon/ArrowUp.vue";
import ArrowDown from "./icon/ArrowDown.vue";
import MutationsType from "../store/mutationsType";
export default {
  name: "calendar-main",
  components: { ArrowUp, ArrowDown },
  data: () => {
    return {
      weeksList: ["一", "二", "三", "四", "五", "六", "日"],
    };
  },
  methods: {
    clickDay(index) {
      this.selectIndex = index;
    },
    nextMonth() {
      this.$store.commit(MutationsType.NEXT_MONTH);
    },
    prevMonth() {
      this.$store.commit(MutationsType.PREV_MONTH);
    },
    changeSelectedDate() {
      this.$store.commit(MutationsType.CREATE_CALENDAR_LIST, {
        year: this.selectYear,
        month: this.selectMonth,
      });
    },
  },
  created() {
    this.selectYear = this.currentDate.year;
    this.selectMonth = this.currentDate.month;
    this.changeSelectedDate();
    this.calendarList.forEach((calendarData, index) => {
      if (calendarData.isToday) {
        this.selectIndex = index;
      }
    });
  },
  watch: {
    selectMonth() {
      this.changeSelectedDate();
    },
  },
  computed: {
    calendarList() {
      return this.$store.state.calendarList;
    },
    currentDate() {
      return this.$store.state.currentDate;
    },
    selectedDate() {
      return `${this.selectYear}年${this.selectMonth}月`;
    },
    selectIndex: {
      get() {
        return this.$store.state.selectIndex;
      },
      set(val) {
        this.$store.commit(MutationsType.SET_SELECT_INDEX, val);
      },
    },
    selectMonth: {
      get() {
        return this.$store.state.selectMonth;
      },
      set(val) {
        this.$store.commit(MutationsType.SET_SELECE_MONTH, val);
      },
    },
    selectYear: {
      get() {
        return this.$store.state.selectYear;
      },
      set(val) {
        this.$store.commit(MutationsType.SET_SELECT_YEAR, val);
      },
    },
  },
};
</script>

<style lang="scss">
.calendar-main {
  .main-header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 10px 20px 10px 20px;

    font-weight: 200;

    font-size: 14px;

    opacity: 0.7;

    .select-button {
      display: flex;

      flex-direction: row;

      align-items: center;

      font-weight: 200;

      .arrow-up {
        margin-right: 20px;
      }

      .arrow-up,
      .arrow-down {
        cursor: pointer;
      }
    }
  }

  .main-content {
    padding-bottom: 5px;

    padding: 0 20px 20px 20px;

    .calendar-week {
      display: flex;

      justify-content: center;

      align-items: center;

      gap: 5px;

      margin-bottom: 10px;

      .week-item {
        width: 40px;

        text-align: center;

        font-size: 13px;
      }
    }

    .calendar-day {
      display: flex;

      flex-wrap: wrap;

      justify-content: flex-start;

      gap: 5px;

      .day-item {
        width: 40px;

        height: 38px;

        text-align: center;

        box-sizing: border-box;

        font-size: 10px;

        display: flex;

        flex-direction: column;

        justify-content: center;

        align-items: center;

        cursor: default;

        &:hover {
          border: 2px solid rgba(238, 238, 238, 0.3);
        }
      }
    }
  }
}
</style>
