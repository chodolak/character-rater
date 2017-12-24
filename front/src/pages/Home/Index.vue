<template>
  <v-layout>
    <div slot="outside" class="jumbotron jumbotron-fluid custom-jumbotron">
      <div class="container">
        <h1 class="display-3">Chodolak Anime</h1>
        <p>You can rate characters, see the ratings of each chatacter, filter by show, and much more!</p>
      </div>
    </div>
    <div class="container" v-for="show in shows" v-bind:key="show.id" style="padding-bottom: 15px;">
      <router-link
            :to="{ name: 'shows-characters.index', params: { name:  show.nameUrlSafe } }"
            class="card show-card"
            tag="div"
      >
        <div class="row">
          <div class="col-md-4">
            <div class="card-img-bottom side-card-image" :style="{ 'background-image': 'url(' + show.thumbnail + ')' }">
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-block show-block">
              <h4 class="card-title">{{show.name}}</h4>
              <p class="card-text">{{show.bio | truncate(500, '...')}}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
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
  import ShowProxy from '@/proxies/ShowProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'home-index',

    data() {
      return {
        shows: [],
      };
    },

    beforeRouteEnter(to, from, next) {
      new ShowProxy().get(1, {})
        .then((response) => {
          response.data.forEach((value) => {
            value.image = process.env.API_LOCATION.replace('/api', '') + value.image;
            value.thumbnail = process.env.API_LOCATION.replace('/api', '') + value.thumbnail;
          });
          next(vm => vm.setShows(response));
        });
    },

    /**
     * The methods the page can use.
     */
    methods: {
      setShows(info) {
        this.shows = info.data;
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
