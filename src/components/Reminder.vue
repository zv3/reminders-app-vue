<template>
  <div
    class="reminder"
    :style="reminderStyles"
    @click="onClickReminderBtn"
  >
    <div
      class="reminder__overlay"
      :style="{ 'background-color': value.color }"
    ></div>

    <span class="reminder__time">
      {{ twelveHourValue === 0 ? 12 : twelveHourValue }}
      {{ minutes }}
      {{ meridiem }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Reminder',

  props: {
    value: {
      type: Date,
      required: true,
    },
  },

  computed: {
    hours() {
      return this.value.dt.getHours();
    },

    meridiem() {
      return this.hours >= 12 ? 'pm' : 'am';
    },

    minutes() {
      const minutes = this.value.dt.getMinutes();

      if (minutes > 0) {
        return `:${(minutes < 10 ? `0${minutes}` : minutes)}`;
      }

      return '';
    },

    twelveHourValue() {
      return this.hours % 12;
    },

    reminderStyles() {
      return {
        ...(value.color ? { color: 'white' } : {}),
      };
    },
  },

  methods: {
    onClickReminderBtn() {
      this.$emit('click');
    },
  },
};
</script>
