<template>
  <div id="app">
    <div class="calendar-wrapper">
      <calendar-header />

      <div class="line"></div>

      <calendar-main />

      <div class="line" v-if="showEvent"></div>

      <calendar-footer />

      <calendar-toggle />
    </div>
  </div>
</template>

<script>
import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarMain from "./components/CalendarMain.vue";
import CalendarFooter from "./components/CalendarFooter.vue";
import CalendarToggle from "./components/CalendarToggle.vue";
import MutationsType from "./store/mutationsType";
export default {
  name: "app",
  components: {
    CalendarHeader,
    CalendarMain,
    CalendarFooter,
    CalendarToggle,
  },
  methods: {
    getCurrentTime() {
      setInterval(() => {
        this.$store.commit(MutationsType.GET_CURRENT_TIME);
      }, 1000);
    },
  },
  created() {
    this.getCurrentTime();
    this.$store.commit(MutationsType.GET_CURRENT_TIME);
    this.$store.commit(MutationsType.SET_CURRENT_DATE);
    this.$store.commit(MutationsType.INIT_EVENT_LIST);
  },
  computed: {
    showEvent() {
      return this.$store.state.showEvent;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Arial, "Microsoft YaHei";
}
.calendar-wrapper {
  background-color: rgba(0, 0, 0, 0.7);
  width: 350px;
  color: #fff;
  user-select: none;
  .line {
    height: 1px;
    width: 100%;
    background-color: #fff;
    opacity: 0.3;
  }
}
</style>
