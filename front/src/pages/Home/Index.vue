<template>
  <v-layout>
    <v-card>
      <span slot="header">
        Welcome!
      </span>
      <div slot="body">
        <a
          class="btn btn-outline-primary"
          v-on:click="test()"
        >
          <i class="fa fa-github fa-fw" aria-hidden="true"></i>
          <span class="pl-2">
            Test
          </span>
        </a>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Home Index Page
   * ============
   *
   * The home index page.
   */

  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';
  import AccountProxy from '../../proxies/AccountProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'home-index',

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * Will log the user in.
       *
       * @param {Object} user The user to be logged in.
       */
      test() {
        // // this.$store.dispatch('auth/login', user);
        new AccountProxy()
          .me()
          .then((response) => {
            // commit(types.FIND, Transformer.fetch(response));
            console.log(response);
          })
          .catch(() => {
            console.log('Request failed...');
          });
        // console.log(this.$store.state.auth.admin);
      },
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
