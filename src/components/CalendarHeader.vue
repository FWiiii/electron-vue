<template>
  <div class="calendar-header">
    <div class="current-time">{{ currentTime }}</div>
    <div class="current-date">
      <span>{{ headerTodayText }}</span>
      <span>{{ todayLunarText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar-header",
  computed: {
    currentTime() {
      return this.$store.state.currentTime;
    },
    currentDate() {
      return this.$store.state.currentDate;
    },
    headerTodayText() {
      return this.$store.getters.headerTodayText;
    },
    todayLunarText() {
      return this.$store.getters.todayLunarText;
    },
  },
};
</script>

<style lang="scss">
.calendar-header {
  padding: 20px 20px 0 20px;
  -webkit-app-region: drag;
  .current-time {
    font-size: 44px;

    font-weight: 200;
  }

  .current-date {
    font-size: 14px;

    color: rgba(127, 183, 235, 0.774);

    margin-bottom: 20px;
  }
}
</style>
