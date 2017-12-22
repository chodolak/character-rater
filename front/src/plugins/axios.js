/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue';
import Axios from 'axios';
import store from '@/store';

Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';

Axios.interceptors.response.use(
  undefined,
  (error) => {
    const res = error.response;
    if (res.status === 500 && res.data.error && res.data.error.message === 'Unauthenticated.' && res.request.responseURL.indexOf('/auth/logout') === -1) {
      const originalRequest = error.config;
      let refreshEndpoint = process.env.API_LOCATION;
      refreshEndpoint += '/auth/refresh';
      return Axios.post(refreshEndpoint)
        .then(({ data }) => {
          store.dispatch('auth/refresh', data.token);
          originalRequest.headers.Authorization = 'Bearer ';
          originalRequest.headers.Authorization += data.token;
          return Axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

// Bind Axios to Vue.
Vue.http = Axios;
Object.defineProperty(Vue.prototype, 'http', {
  get() {
    return Axios;
  },
});
