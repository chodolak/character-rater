/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // Home
  {
    path: '/',
    name: 'home.index',
    component: () => import('@/pages/Home/Index'),
  },
  // Rate
  {
    path: '/rate',
    name: 'rate.index',
    component: () => import('@/pages/Rate/Index'),
  },
  {
    path: '/admin/character',
    name: 'admin-character.index',
    component: () => import('@/pages/Admin/Character/Index'),

    // If the user needs to be admin to view this page.
    meta: {
      admin: true,
    },
  },
  // Account
  {
    path: '/account',
    name: 'account.index',
    component: () => import('@/pages/Account/Index'),

    // If the user needs to be authenticated to view this page.
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/pages/Login/Index'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },

  // Register
  {
    path: '/register',
    name: 'register.index',
    component: () => import('@/pages/Register/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },
];
