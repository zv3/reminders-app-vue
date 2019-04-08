<template>
  <div class="time-picker">
    <div class="time-picker__cell">
      <div class="time-picker__header">
        Hour
      </div>
      <select
        id="time-picker-hr"
        class="custom-select"
        :value="dtHours"
        @change="onChangeHours"
      >
        <option
          v-for="hr in 24"
          :key="hr"
          :value="hr"
        >
          {{ hr < 10 ? `0${hr}` : hr }}
        </option>
      </select>
    </div>
    <div class="time-picker__cell">
      <div class="time-picker__header">
        Minute
      </div>
      <select
        v-for="min in 60"
        id="time-picker-min"
        class="custom-select"
        :value="currentMinutes"
        @change="onChangeMinutes"
      >
        <option
          :key="min"
          :value="min"
        >
          {{ min < 10 ? `0${min}` : min }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',

  props: {
    dt: { type: Date, required: true },
  },

  computed: {
    dtHours() {
      return this.dt.getHours();
    },

    currentMinutes() {
      return this.dt.getMinutes();
    },
  },

  methods: {
    onChangeHours(hours) {
      this.$emit('change-hours', hours);
    },

    onChangeMinutes(mins) {
      this.$emit('change-minutes', mins);
    },
  },
};
</script>
