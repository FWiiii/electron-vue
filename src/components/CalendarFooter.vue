<template>
  <div class="calendar-footer" v-show="showEvent">
    <div class="footer-title">
      <div class="today-text">
        {{ todayText }}
      </div>

      <div
        class="close-icon"
        @click="closeAddEventInput"
        v-if="eventTextLength"
      >
        <close-icon fill-color="#fff" />
      </div>
    </div>

    <div class="add-notice-input">
      <input
        type="text"
        placeholder="添加事件或提醒"
        v-model="eventObj.eventText"
      />

      <div class="option" v-if="eventTextLength">
        <select>
          <option value="日历">日历</option>
        </select>
      </div>
    </div>

    <div class="show-event-info">
      <div class="today-event" v-if="!eventTextLength">
        <span class="no-event-text" v-if="currentDayHasEvent">无事件</span>

        <template v-else>
          <div
            class="event-item"
            v-for="(event, index) in currentDayEvent"
            :key="index"
            @contextmenu.prevent="delEvent(event)"
          >
            <div class="color-item"></div>

            <div class="event-time">
              <span class="start-time">{{ event.startTime }}</span>

              <span class="end-time">{{ event.endTime }}</span>
            </div>

            <div class="event-text">
              <span>{{ event.eventText }}</span>
            </div>
          </div>
        </template>
      </div>

      <div class="event-config" v-else>
        <div class="choose-time">
          <time-line />

          <div class="start-time">
            <input type="time" v-model="eventObj.startTime" />
          </div>

          <div>到</div>

          <div class="end-time">
            <input type="time" v-model="eventObj.endTime" />
          </div>
        </div>

        <div class="choose-place">
          <map-line />

          <input
            type="text"
            placeholder="添加位置"
            v-model="eventObj.eventPlace"
          />
        </div>

        <div class="footer-button" v-if="eventTextLength">
          <button class="add-event" @click="addEvent">保存</button>

          <button class="more-info">更多详细信息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "./icon/CloseIcon.vue";

import TimeLine from "./icon/TimeLine.vue";

import MapLine from "./icon/MapLine.vue";

import MutationsType from "../store/mutationsType";

export default {
  name: "calendar-footer",

  components: { CloseIcon, TimeLine, MapLine },

  data: () => {
    return {
      eventObj: {
        startTime: "",

        endTime: "",

        eventText: "",

        eventPlace: "",
      },
    };
  },

  methods: {
    closeAddEventInput() {
      this.eventObj.eventText = "";
    },

    createEventObject() {
      return {
        eventYear: this.selectedData.cYear,

        eventMonth: this.selectedData.cMonth,

        eventDate: this.selectedData.cDay,

        startTime: this.eventObj.startTime,

        endTime: this.eventObj.endTime,

        eventText: this.eventObj.eventText,

        eventPlace: this.eventObj.eventPlace,
      };
    },

    addEvent() {
      let eventObject = this.createEventObject();

      this.$store.commit(MutationsType.ADD_EVENT, eventObject);

      this.eventObj = {
        startTime: "",

        endTime: "",

        eventText: "",

        eventPlace: "",
      };
    },

    delEvent(event) {
      this.$store.commit(MutationsType.DEL_EVENT, event);
    },
  },

  computed: {
    selectIndex() {
      return this.$store.state.selectIndex;
    },

    eventList() {
      return this.$store.state.eventList;
    },

    showEvent() {
      return this.$store.state.showEvent;
    },

    selectedData() {
      return this.$store.getters.selectedData;
    },

    todayText() {
      return this.$store.getters.todayText;
    },

    currentDayEvent() {
      return this.$store.getters.currentDayEvent;
    },

    eventTextLength() {
      return this.eventObj.eventText.length;
    },

    currentDayHasEvent() {
      return this.currentDayEvent.length === 0;
    },
  },
};
</script>

<style lang="scss">
.calendar-footer {
  position: relative;

  .footer-title {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 10px 13px 0 20px;

    .today-text {
      color: #fff;

      font-size: 17px;
    }

    .close-icon {
      font-size: 20px;

      line-height: 20px;
    }
  }

  .add-notice-input {
    display: flex;

    flex-direction: row;

    align-items: center;

    margin-bottom: 10px;

    padding: 10px 20px 0 20px;

    input {
      font-family: inherit;

      width: 100%;

      font-size: 13px;

      box-sizing: border-box;

      outline: solid 1px #ffffff4d;

      border: 0;

      padding: 8px;

      color: #fff;

      background-color: #ffffff1a;

      height: 30px;

      &::placeholder {
        color: #d1d5db;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }

      &:focus {
        color: #000;

        background-color: #fff;

        outline: solid 1px #a5f3fc;
      }
    }

    .without-text {
      width: 100%;
    }

    .with-text {
      width: 75%;
    }

    .option {
      width: 35%;

      position: relative;

      height: 30px;

      box-sizing: border-box;

      outline: solid 1px #ffffff4d;

      margin-left: 1px;

      select {
        font-size: 13px;

        appearance: none;

        width: 100%;

        height: 100%;

        border: none;

        outline: none;

        box-sizing: border-box;

        font-family: inherit;

        background-color: #ffffff1a;

        color: #fff;

        position: relative;

        padding-left: 30px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }

        &:focus {
          color: #000;

          background-color: #fff;

          outline: solid 1px #a5f3fc;
        }
      }

      &:after {
        content: "";

        width: 14px;

        height: 14px;

        border-radius: 50%;

        background-color: #38bff880;

        border: 1px #fff solid;

        position: absolute;

        left: 9px;

        top: 7px;
      }
    }
  }

  .show-event-info {
    height: 150px;

    overflow: auto;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;

      background: rgba(238, 238, 238, 0.5);
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;

      background: transparent;
    }

    .today-event {
      color: #fff;

      font-size: 13px;

      display: flex;

      flex-direction: column;

      justify-content: center;

      align-items: flex-start;

      .no-event-text {
        padding: 10px 20px 0 20px;
      }

      .event-item {
        height: 50px;

        width: 100%;

        box-sizing: border-box;

        display: flex;

        justify-content: flex-start;

        align-items: center;

        margin-bottom: 3px;

        font-size: 10px;

        gap: 10px;

        &:hover {
          background-color: #b3aeaed0;
        }

        .event-time {
          padding: 0 8px;

          display: flex;

          flex-direction: column;

          justify-content: center;

          align-items: center;

          margin-right: 25px;

          .end-time {
            opacity: 0.5;
          }
        }

        .event-text {
          position: relative;

          height: 30px;

          span {
            position: absolute;

            top: 0;

            left: 0;

            display: block;

            word-break: keep-all;

            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;

            font-size: 14px;
          }
        }

        .color-item {
          height: 100%;

          width: 8px;

          background-color: #38bff880;
        }
      }
    }

    .event-config {
      display: flex;

      flex-direction: column;

      gap: 20px;

      padding: 0 20px;

      input {
        width: 100%;

        box-sizing: border-box;

        outline: none;

        border: none;

        border-bottom: 1px rgba(255, 255, 255, 0.2) solid;

        padding: 8px;

        background: transparent;

        color: #fff;

        font-family: inherit;

        &::placeholder {
          color: #d1d5db;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }

        &:focus {
          color: #000;

          background-color: #fff;

          outline: solid 1px #a5f3fc;
        }
      }

      .choose-time {
        display: flex;

        gap: 15px;

        align-items: center;

        .start-time,
        .end-time {
          input {
            text-align: center;

            width: 60px;

            appearance: none;

            &::-webkit-calendar-picker-indicator {
              opacity: 0;

              position: absolute;
            }

            &:hover {
              background-color: rgba(255, 255, 255, 0.5);
            }

            &:focus {
              color: #000;

              background-color: #fff;

              outline: none;
            }
          }
        }
      }

      .choose-place {
        display: flex;

        gap: 15px;

        align-items: center;

        font-weight: 200;

        width: 100%;
      }
    }
  }

  .footer-button {
    display: flex;

    justify-content: flex-end;

    align-items: center;

    gap: 10px;

    .add-event {
      font-size: 13px;

      padding: 5px 30px;

      background-color: #38bff880;

      border: 2px solid transparent;

      color: #fff;

      &:hover {
        border: 2px solid #2cb7f3e5;
      }
    }

    .more-info {
      font-size: 13px;

      padding: 5px 10px;

      background-color: rgba(238, 238, 238, 0.5);

      border: 2px solid transparent;

      color: #fff;

      &:hover {
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
