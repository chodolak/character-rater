<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home.index' }"
      >
        Chodolak Anime
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
    <div class="page">
      <div class="page-content d-flex align-items-stretch"> 
        <!-- Side Navbar -->
        <nav class="side-navbar">
          <span class="heading"></span>
          <ul class="list-unstyled">
            <router-link
              :to="{ name: 'admin.index' }"
              tag="li"
            >
              <a> <i class="fa fa-home" aria-hidden="true"></i>Dashboard</a>
            </router-link>
            <router-link
              :to="{ name: 'admin-characters.index' }"
              active-class="active"
              tag="li"
            >
              <a> <i class="fa fa-user" aria-hidden="true"></i>Characters</a>
            </router-link>
            <router-link
              :to="{ name: 'admin-shows.index' }"
              active-class="active"
              tag="li"
            >
              <a> <i class="fa fa-folder-open" aria-hidden="true"></i>Shows</a>
            </router-link>
          </ul>
        </nav>
        <div class="container pt-4">
          <div class="row">
            <div class="col col-12">
              <!-- Content will be placed here -->
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* ============
   * Admin Layout
   * ============
   */

  export default {
    /**
     * The name of the layout.
     */
    name: 'admin-layout',

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
