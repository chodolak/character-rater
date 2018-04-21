<template>
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
          :to="{ name: 'shows.index' }"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">
            Shows
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
          class="btn btn-dark login-nav"
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
</template>

<script>
  /* ============
   * Nav Component
   * ============
   */

  export default {
    /**
     * The name of the component.
     */
    name: 'nav',

    data() {
      return {
        menuCollapsed: false,
      };
    },

    /**
     * The methods that the layout can use.
     */
    methods: {
      /**
       * Will log the user out.
       */
      logout() {
        this.$store.dispatch('auth/logout');
      },
      /**
       * Will toggle the menu.
       */
      toggleMenu() {
        this.menuCollapsed = !this.menuCollapsed;
      },
    },
  };
</script>
