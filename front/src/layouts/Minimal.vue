<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home.index' }"
      >
        Chodolak Character Rater
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        :class="{ show : menuCollapsed}"
      >
        <ul class="navbar-nav">
          <router-link
            :to="{ name: 'rate.index', params: { show: 'hunter-x-hunter', character: 'gon-freecss' } }"
            active-class="active"
            class="nav-item"
            tag="li"
            v-if="$store.state.auth.authenticated"
          >
            <a class="nav-link">
              Rate
            </a>
          </router-link>
        </ul>
        <ul class="navbar-nav mr-auto">
          <router-link
            :to="{ name: 'admin.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
            v-if="$store.state.auth.admin"
          >
            <a class="nav-link">
              Admin
            </a>
          </router-link>
        </ul>
        <span class="navbar-text" v-if="$store.state.auth.authenticated">
          <a
            class="btn btn-light"
            href="#"
            @click.prevent="logout"
          >
            <i class="fa fa-sign-out"></i>
          </a>
        </span>
        <span class="navbar-text" v-if="!$store.state.auth.authenticated">
          <router-link
            :to="{ name: 'login.index' }"
            class="btn btn-dark login-nav"
            tag="a"
          >
              Login
          </router-link>
        </span>
      </div>
    </nav>
    <slot></slot>
  </div>
</template>

<script>
  /* ============
   * Minimal Layout
   * ============
   *
   * Used for the register and login pages.
   *
   * Layouts are used to store a lot of shared code.
   * This way the app stays clean.
   */

  export default {
    /**
     * The name of the layout.
     */
    name: 'minimal-layout',

    data() {
      return {
        menuCollapsed: false,
      };
    },

    methods: {
      /**
       * Will toggle the menu.
       */
      toggleMenu() {
        this.menuCollapsed = !this.menuCollapsed;
      },
    },
  };
</script>
