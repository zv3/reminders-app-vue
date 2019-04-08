import { HIDE_FORM_DIALOG, SHOW_FORM_DIALOG } from '../mutationTypes';

const state = {
  visible: false,
  reminder: null,
};

const actions = {
  showFormDialog({ commit }, reminder) {
    commit(SHOW_FORM_DIALOG, reminder);
  },

  hideFormDialog({ commit }) {
    commit(HIDE_FORM_DIALOG);
  },
};

const mutations = {
  /* eslint-disable no-param-reassign */
  [SHOW_FORM_DIALOG](st, reminder) {
    st.visible = true;
    st.reminder = reminder;
  },

  /* eslint-disable no-param-reassign */
  [HIDE_FORM_DIALOG](st) {
    st.visible = false;
  },
};

const getters = {
  visibility(st) {
    return st.visible;
  },

  reminder(st) {
    return st.reminder;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
