<template>
  <div class="toggle-event">
    <div v-if="showEvent" @click="hideEvent" class="show-event">
      <span>隐藏日程</span>
      <arrow-down fill-color="rgba(127, 183, 235, 0.7)" />
    </div>

    <div v-else @click="pullEvent" class="hide-event">
      <span>显示日程</span>
      <arrow-up fill-color="rgba(127, 183, 235, 0.7)" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import ArrowDown from "./icon/ArrowDown.vue";
import ArrowUp from "./icon/ArrowUp.vue";
import MutationsType from "../store/mutationsType";
export default {
  name: "calendar-toggle",
  components: {
    ArrowDown,
    ArrowUp,
  },
  methods: {
    hideEvent() {
      this.showEvent = false;
      setTimeout(() => {
        ipcRenderer.send("hide-event");
      }, 50);
    },
    pullEvent() {
      ipcRenderer.send("show-event");
      setTimeout(() => {
        this.showEvent = true;
      }, 50);
    },
  },
  computed: {
    showEvent: {
      get() {
        return this.$store.state.showEvent;
      },
      set(val) {
        this.$store.commit(MutationsType.TOGGLE_SHOW_EVENT, val);
      },
    },
  },
};
</script>

<style lang="scss">
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

  .show-event,
  .hide-event {
    padding: 10px 20px;

    display: flex;

    justify-content: flex-end;

    align-items: center;

    color: rgba(127, 183, 235, 0.774);

    font-size: 14px;

    cursor: pointer;
  }
}

.day-disable-color {
  color: rgba(180, 175, 175, 0.685);
}

.current-day-bc {
  background-color: rgba(56, 191, 248, 0.5);
}

.select-day-border {
  border: 2px solid rgba(56, 191, 248, 0.5);
}

.no-select-day {
  border: 2px transparent solid;
}
</style>
