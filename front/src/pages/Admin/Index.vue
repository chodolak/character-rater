<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Admin
      </span>
      <div slot="body">
        <router-link
          :to="{ name: 'admin-character.index' }"
          tag="div"
        >
          <a class="nav-link">
            <button class="btn custom-button">
              Character Upload
            </button>
          </a>
        </router-link>
        <router-link
          :to="{ name: 'admin-show.index' }"
          tag="div"
        >
          <a class="nav-link">
            <button class="btn custom-button">
              Show Upload
            </button>
          </a>
        </router-link>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Admin Index Page
   * ============
   *
   * The admin index page.
   */
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-index',

    /**
     * The methods the page can use.
     */
    methods: {

    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      VCard,
    },
  };
</script>
