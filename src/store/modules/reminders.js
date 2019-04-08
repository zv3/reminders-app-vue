import {
  CREATE_REMINDER,
  DELETE_REMINDER,
  REORDER_REMINDERS,
  UPDATE_REMINDER,
} from '../mutationTypes';
import { getUniqId } from '../../utils/uniqueId';
import { getStartOfDay } from '../../utils/datetime';

const state = {
  reminders: {},
  mappedEntries: {},
};

const getters = {
  reminders(st) {
    return st.reminders;
  },
};

const actions = {
  createReminder({ commit }, reminder) {
    const startOfDay = getStartOfDay(reminder.dt);

    commit(CREATE_REMINDER, { reminder, startOfDay });
    commit(REORDER_REMINDERS, startOfDay);
  },

  editReminder({ commit }, reminder) {
    if (!reminder.id) {
      throw new Error('Invalid `reminder` argument passed in');
    }

    const startOfDay = getStartOfDay(reminder.dt);

    commit(UPDATE_REMINDER, reminder, startOfDay);
    commit(REORDER_REMINDERS, startOfDay);
  },

  deleteReminder({ commit }, reminder) {
    if (!reminder.id) {
      throw new Error('Invalid `reminder` argument passed in');
    }

    const startOfDay = getStartOfDay(reminder.dt);

    commit(DELETE_REMINDER, { reminder, startOfDay });
    commit(REORDER_REMINDERS, startOfDay);
  },
};

const mutations = {
  /* eslint-disable no-param-reassign */
  [CREATE_REMINDER]({ reminders, mappedEntries }, { reminder, startOfDay }) {
    const entries = reminders[startOfDay] || [];
    const newId = getUniqId();

    entries.push({ ...reminder, id: newId });
    reminders[startOfDay] = entries;

    mappedEntries[newId] = startOfDay; // store the `startOfDay` that this entry maps to.
  },

  /* eslint-disable no-param-reassign */
  [UPDATE_REMINDER]({ reminders, mappedEntries }, { reminder, startOfDay }) {
    const entries = reminders[startOfDay] || [];
    const idx = entries.findIndex(e => e.id === reminder.id);

    if (idx === -1 && mappedEntries[reminder.id]) {
      // the reminder's date has been changed and therefore should be removed from the
      // old date's entries and added to the new date's entries.
      const oldKey = mappedEntries[reminder.id];
      const oldIdx = reminders[oldKey].findIndex(e => e.id === reminder.id);

      reminders[oldKey].splice(oldIdx, 1);
      entries.push(reminder);
    } else {
      // the reminders date hasn't been changed, we can do an in place replacement.
      entries.splice(idx, 1, reminder);
    }

    mappedEntries[reminder.id] = startOfDay; // remap this reminder to it's `startOfDay` value.
  },

  /* eslint-disable no-param-reassign */
  [DELETE_REMINDER]({ reminders, mappedEntries }, { reminder, startOfDay }) {
    const entries = reminders[startOfDay] || [];
    const idx = entries.findIndex(e => e.id === reminder.id);

    entries.splice(idx, 1);

    delete mappedEntries[reminder.id];
  },

  [REORDER_REMINDERS](st, startOfDay) {
    const entries = st.reminders[startOfDay] || [];

    // Re-order reminders by time.
    st = {
      ...st,
      reminders: {
        ...st.reminders,
        [startOfDay]: entries.sort((ra, rb) => ra.dt - rb.dt),
      },
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
