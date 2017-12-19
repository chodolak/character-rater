<template>
  <v-layout>
    Shows
  </v-layout>
</template>

<script>
  /* ============
   * Admin Shows Index Page
   * ============
   *
   * The admin shows index page.
   */
  import VueNotifications from 'vue-notifications';
  import VLayout from '@/layouts/Admin';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-shows-index',

    /**
     * The methods the page can use.
     */
    methods: {

    },

    notifications: {
      showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Uploaded character',
      },
      showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'Failed to upload character',
      },
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
    },
  };
</script>
