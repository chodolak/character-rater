<template>
  <div>
    <v-nav></v-nav>
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
  import VNav from '@/components/Nav';

  export default {
    /**
     * The name of the layout.
     */
    name: 'admin-layout',

    components: {
      VNav,
    },
  };
</script>
