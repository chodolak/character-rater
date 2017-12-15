/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import {
  CHECK,
  REGISTER,
  LOGIN,
  INVALID_LOGIN,
  INVALID_REGISTER,
  LOGOUT,
  LOADING,
  REFRESH,
} from './mutation-types';

export default {
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem('id_token');
    state.admin = !!localStorage.getItem('admin');
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
    }
  },

  [REGISTER]() {
    //
  },

  [LOGIN](state, params) {
    state.authenticated = true;
    state.loading = false;
    if (params.admin) {
      state.admin = true;
      localStorage.setItem('admin', true);
    } else {
      state.admin = false;
    }
    localStorage.setItem('id_token', params.token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${params.token}`;
  },

  [INVALID_LOGIN](state, bool) {
    state.invalidLogin = bool;
    state.loading = false;
  },

  [INVALID_REGISTER](state, message) {
    state.invalidRegister = message;
    state.loading = false;
  },

  [LOGOUT](state) {
    state.authenticated = false;
    state.admin = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('admin');
    Vue.$http.defaults.headers.common.Authorization = '';
  },

  [LOADING](state, bool) {
    state.loading = bool;
  },

  [REFRESH](state, token) {
    localStorage.removeItem('id_token');
    Vue.$http.defaults.headers.common.Authorization = '';
    localStorage.setItem('id_token', token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};
