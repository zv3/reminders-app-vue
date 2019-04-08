import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';
import './assets/sass/index.sass';
import 'vue-multiselect/dist/vue-multiselect.min.css';

library.add(faAngleLeft, faAngleRight, faCalendar, faCalendarPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
