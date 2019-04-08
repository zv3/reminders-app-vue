<template>
  <div class="cal-grid-cell">
    <div class="cal-grid-cell__header">
      <div class="cal-grid-cell__label">
        {{ dt.getDate() }}
      </div>
      <button
        type="button"
        class="btn btn-link cal-grid-cell__add-btn"
        @click="onClickAddReminderBtn"
      >
        <FontAwesomeIcon icon="calendar-plus" />
      </button>
    </div>

    <div class="cal-grid-cell__events">
      <Reminder
        v-for="r in filteredReminders"
        :key="r.id"
        :value="r"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions, mapGetters } from 'vuex';
import Reminder from './Reminder.vue';
import { getDummyReminder } from '../utils/reminder';

export default {
  name: 'MonthGridCell',

  components: { FontAwesomeIcon, Reminder },

  props: {
    dt: { required: true, type: Date },
  },

  computed: {
    ...mapGetters('reminders', ['reminders']),

    filteredReminders() {
      return this.reminders[this.dt.getTime()];
    },
  },

  methods: {
    ...mapActions('reminderForm', [
      'showFormDialog',
    ]),

    onClickAddReminderBtn() {
      this.showFormDialog({ ...getDummyReminder(), dt: this.dt });
    },
  },
};
</script>
