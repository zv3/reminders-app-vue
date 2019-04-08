<template>
  <div class="week-header">
    <div
      v-for="(dayLabel, idx) in daysOfTheWeek"
      :key="idx"
      class="week-header__day"
    >
      {{ dayLabel }}
    </div>
  </div>
</template>

<script>
import { DAYS_OF_THE_WEEK } from '../constants/consts';

export default {
  name: 'WeekHeader',

  props: {
    labelDisplayLength: { required: false, type: Number, default: 3 },
  },

  computed: {
    daysOfTheWeek() {
      return DAYS_OF_THE_WEEK.map(day => day.substr(0, this.labelDisplayLength));
    },
  },
};
</script>
