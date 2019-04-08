<template>
  <div class="month-selector">
    <button
      type="button"
      class="btn btn-link month-selector__link month-selector__link--prev"
      @click="onClickPrevMonthBtn"
    >
      <FontAwesomeIcon icon="angle-left" />
    </button>

    <div class="month-selector__label">
      {{ title }}
    </div>

    <button
      type="button"
      class="btn btn-link month-selector__link month-selector__link--next"
      @click="onClickNextMonthBtn"
    >
      <FontAwesomeIcon icon="angle-right" />
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'MonthSelector',

  components: { FontAwesomeIcon },

  props: {
    dt: { type: Date, required: true },
  },

  computed: {
    currentMonth() {
      return this.dt.toLocaleString('en-us', { month: 'long' });
    },

    currentYear() {
      return this.dt.getFullYear();
    },

    title() {
      return `${this.currentMonth} ${this.currentYear}`;
    },
  },

  methods: {
    onClickPrevMonthBtn() {
      const dt = new Date(this.dt.getTime());

      dt.setDate(0); // 0 will result in the last day of the previous month

      this.$emit('input', dt);
    },

    onClickNextMonthBtn() {
      const dt = new Date(this.dt.getTime());

      dt.setDate(32); // 32 will result in the first day of the next month

      this.$emit('input', dt);
    },
  },
};
</script>
