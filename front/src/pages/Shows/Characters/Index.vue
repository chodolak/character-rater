<template>
  <v-layout>
    <div class="container" v-for="character in characters" v-bind:key="character.id" style="padding-bottom: 15px;">
      <div class="card show-card">
        <div class="row">
          <div class="col-md-4">
            <div class="card-img-bottom side-card-image" :style="{ 'background-image': 'url(' + character.thumbnail + ')' }">
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-block show-block">
              <h4 class="card-title">{{character.name}}</h4>
              <p class="card-text">{{character.bio | truncate(500, '...')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
  /* ============
   * Shows Page Index Page
   * ============
   *
   * The shows index page.
   */
  import VLayout from '@/layouts/Default';
  import CharacterProxy from '@/proxies/CharacterProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'shows-characters-index',

    data() {
      return {
        characters: [],
        page: 1,
        totalPages: 1,
        searchParams: {
          name: '',
          show: null,
        },
        selectedShow: null,
        searchArray: [],
        query: {},
        shows: [],
        firstLoad: false,
      };
    },

    beforeRouteEnter(to, from, next) {
      const searchParams = {};
      let page = 1;
      if (to.query.name) {
        searchParams.name = to.query.name;
      }
      if (to.query.show) {
        searchParams.show = to.query.show;
      }
      if (to.query.p) {
        page = to.query.p;
      }
      new CharacterProxy().get(page, searchParams).then((response) => {
        next(vm => vm.setUpCharacters(to.query, response));
      });
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * After the route enters setup all the varaibles
       */
      setUpCharacters(query, info) {
        if (query.p) {
          this.page = query.p;
        }
        if (query.name) {
          this.searchParams.name = query.name;
        }
        if (query.show) {
          this.firstLoad = true;
          this.searchParams.show = query.show;
        }
        info.data.forEach((value) => {
          value.image = process.env.API_LOCATION.replace('/api', '') + value.image;
          value.thumbnail = process.env.API_LOCATION.replace('/api', '') + value.thumbnail;
        });
        this.characters = info.data;
        // this.setUpShows();
        this.page = info.current_page - 1;
        this.totalPages = info.last_page;
        // this.setUpQuery();
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
