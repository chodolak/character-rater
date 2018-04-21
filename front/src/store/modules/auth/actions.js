/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
// import store from '@/store';
import * as types from './mutation-types';
import AuthProxy from '../../../proxies/AuthProxy';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }, user) => {
  commit(types.INVALID_REGISTER, {});
  commit(types.LOADING, true);

  const userObj = { name: user.name, email: user.email, password: user.password };
  new AuthProxy().register(userObj).then((response) => {
    const loginParams = { token: response.token, admin: null };
    commit(types.LOGIN, loginParams);
    Vue.router.push({
      name: 'home.index',
    });
  })
  .catch((response) => {
    commit(types.INVALID_REGISTER, response.error.errors);
  });
};

export const login = ({ commit }, user) => {
  commit(types.INVALID_LOGIN, false);
  commit(types.LOADING, true);

  new AuthProxy().login(user).then((response) => {
    const loginParams = { token: response.token, admin: response.admin };
    commit(types.LOGIN, loginParams);
    Vue.router.push({
      name: 'home.index',
    });
  })
  .catch(() => {
    commit(types.INVALID_LOGIN, true);
  });
};

export const logout = ({ commit }) => {
  new AuthProxy().logout();
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index',
  });
};

export const refresh = ({ commit }, token) => {
  commit(types.REFRESH, token);
};

export default {
  check,
  register,
  login,
  logout,
  refresh,
};
