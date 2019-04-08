<template>
  <div class="main">
    <ReminderFormModal
      v-if="modalVisibility"
      :value="modalValue"
      @cancel="onCancelReminder"
      @submit="onSubmitReminder"
      @delete="onDeleteReminder"
    />
    <MonthSelector
      :dt="dt"
      @input="onInputMonth"
    />
    <WeekHeader />
    <MonthGrid
      :dt="dt"
      :cell-component="MonthGridCell"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ReminderFormModal from './ReminderFormModal.vue';
import MonthSelector from './MonthSelector.vue';
import WeekHeader from './WeekHeader.vue';
import MonthGrid from './MonthGrid.vue';
import MonthGridCell from './MonthGridCell.vue';

export default {
  name: 'TheMainSection',

  components: {
    ReminderFormModal,
    MonthSelector,
    WeekHeader,
    MonthGrid,
  },

  props: {

  },

  data() {
    return {
      dt: new Date(),
    };
  },

  computed: {
    ...mapGetters('reminderForm', {
      modalVisibility: 'visibility',
      modalValue: 'reminder',
    }),

    MonthGridCell() {
      return MonthGridCell;
    },
  },

  methods: {
    ...mapActions('reminders', [
      'createReminder', 'editReminder', 'deleteReminder',
    ]),

    ...mapActions('reminderForm', ['hideFormDialog']),

    onInputMonth(dt) {
      this.dt = dt;
    },

    onCancelReminder() {
      this.hideFormDialog();
    },

    onSubmitReminder(reminder) {
      if (reminder.id) {
        this.editReminder(reminder);
      } else {
        this.createReminder(reminder);
      }

      this.hideFormDialog();
    },

    onDeleteReminder(reminder) {
      this.deleteReminder((reminder));
      this.hideFormDialog();
    },
  },
};
</script>

<style scoped>

</style>
