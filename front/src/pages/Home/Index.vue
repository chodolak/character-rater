<template>
  <v-layout>
    <div slot="outside" class="jumbotron jumbotron-fluid custom-jumbotron">
      <div class="container">
        <h1 class="display-3">Chodolak Anime</h1>
        <p>You can rate characters, see the ratings of each chatacter, filter by show, and much more!</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
      </div>
    </div>
    <div class="custom-center" v-if="shows.length == 0">
      <!-- <i class="fa fa-spinner fa-spin fa-5x"></i> -->
    </div>
    <div class="container" v-for="show in shows" v-bind:key="show.id" style="padding-bottom: 15px;">
      <div class="card">
        <div class="row">
          <div class="col-md-4">
            <div class="card-img-bottom side-card-image" :style="{ 'background-image': 'url(' + show.image + ')' }">
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-block">
              <h4 class="card-title">{{show.name}}</h4>
              <p class="card-text">Some text goes here</p>
              <a href="#" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="card">
      
      <div class="card-body">
        <div class="media">
          <img class="mr-3" src="https://i.imgur.com/SS7GYfV.jpg" alt="Generic placeholder image">
          <div class="media-body">
            <h5 class="mt-0">Media heading</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>
      </div>
    </div> -->
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
        backgroundImage: 'https://cdn.discordapp.com/attachments/183215451634008065/393202636502859777/66348983_p0.jpg',
      };
    },

    beforeRouteEnter(to, from, next) {
      new ShowProxy().get(1, {})
        .then((response) => {
          response.data.forEach((value) => {
            value.image = process.env.API_LOCATION.replace('/api', '') + value.image;
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
