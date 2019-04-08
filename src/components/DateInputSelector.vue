<template>
  <div class="date-input-sel">
    <div
      class="input-group date-input-sel__input"
      @click="onClickDateInput"
    >
      <div class="input-group-prepend">
        <span class="input-group-text date-input-sel__input-icon">
          <FontAwesomeIcon icon="calendar" />
        </span>
      </div>
      <div
        id="date-input"
        class="form-control date-input-sel__input-field"
      >
        {{ currentDt.toLocaleDateString('en-US', $options.localeOptions) }}
      </div>
    </div>

    <div
      v-show="showSelector"
      class="date-input-sel__popup"
    >
      <div class="date-input-sel__popup-inner">
        <div class="date-input-sel__popup-body">
          <div class="date-input-sel__popup-body-block">
            <MonthSelector
              :dt="new Date(currentMonth.getTime())"
              @set-month="onChangeMonth"
            />
            <WeekHeader :label-display-length="1" />
            <MonthGrid
              :dt="currentMonth"
              :selected-dt="pickerDt"
              :cell-component="dateInputSelectorGridCellComp"
            />
          </div>
        </div>
        <div class="date-input-sel__popup-body-block">
          <hr class="date-input-sel__popup-block-separator" />
          <TimePicker
            :dt="pickerDt"
            @change-hours="onChangeHours"
            @change-minutes="onChangeMinutes"
          />
        </div>
      </div>

      <div class="date-input-sel__popup-footer">
        <button
          type="button"
          class="btn btn-default"
          @click="onClickCancelBtn"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="onClickSubmitBtn"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WeekHeader from './WeekHeader.vue';
import MonthSelector from './MonthSelector.vue';
import MonthGrid from './MonthGrid.vue';
import TimePicker from './TimePicker.vue';
import DateInputSelector from './DateInputSelectorGridCell.vue';

const localeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export default {
  name: 'DateInputSelector',

  components: {
    FontAwesomeIcon, WeekHeader, MonthSelector, MonthGrid, TimePicker,
  },

  props: {
    selectedDt: { type: Date, required: true },
  },

  localeOptions,

  data() {
    return {
      showSelector: false,
      currentMonth: this.selectedDt,
      currentDt: this.selectedDt,
      pickerDt: this.selectedDt,
    };
  },

  computed: {
    dateInputSelectorGridCellComp() {
      return DateInputSelector;
    }
  },

  methods: {
    onChangeMonth(dt) {
      this.currentMonth = dt;
    },

    onChangeDate(dt) {
      this.pickerDt = new Date(dt.getTime());
    },

    onClickCancelBtn() {
      this.showSelector = false;
    },

    onClickSubmitBtn() {
      this.showSelector = false;
      this.currentDt = new Date(this.pickerDt.getTime());

      this.$emit('input', this.currentDt);
    },

    onClickDateInput() {
      this.showSelector = true;
    },

    onChangeMinutes() {

    },

    onChangeHours() {

    },
  },
};
</script>
