import Vue from 'vue';
import Vuex from 'vuex';
import reminders from './modules/reminders';
import reminderForm from './modules/reminderForm';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    reminders,
    reminderForm,
  },
  strict: false,
});
