/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';

/* ============
* Plugins
* ============
*
* Import and bootstrap the plugins.
*/
import VueFilter from 'vue-filter';
import VueProgressBar from 'vue-progressbar';
import {
  Rate,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueProgressiveImage from 'vue-progressive-image';
import VTooltip from 'v-tooltip';
import VueNotifications from 'vue-notifications';
import VeeValidate from 'vee-validate';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import VModal from 'vue-js-modal';

import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/bootstrap';
import './plugins/font-awesome';

/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Import the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */

import './assets/stylus/app.styl';

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import App from './App';
import store from './store';

function toast({ title, message, type, timeout }) {
  if (type === VueNotifications.types.warn) type = 'warning';
  return iziToast[type]({ title, message, timeout });
}

const toastOptions = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
};

const progressOptions = {
  color: '#007bff',
  failedColor: 'red',
  thickness: '5px',
};

Vue.use(VueFilter);
Vue.use(VueProgressBar, progressOptions);
Vue.use(Rate);
Vue.use(VueProgressiveImage);
Vue.use(VueNotifications, toastOptions);
Vue.use(VeeValidate);
Vue.use(VTooltip);
Vue.use(VModal, { dialog: true });
Vue.config.productionTip = false;

store.dispatch('auth/check');

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App),
});
