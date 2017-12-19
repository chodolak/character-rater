<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Dashboard
      </span>
      <div slot="body">
        Hey
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
  import VLayout from '@/layouts/Admin';
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
