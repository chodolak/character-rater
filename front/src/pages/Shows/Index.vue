<template>
  <v-layout>
    <div class="shows-page-header">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <h1>Shows</h1>
          </div>
          <div class="col-10 show-name-input">
            <div class="form-group">
              <div class="input-group">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  class="form-control"
                  v-model="searchParams.name"
                  @input="search"
                >
              </div>
            </div>
          </div>
        </div>
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
    <nav v-if="shows.length > 0">
      <paginate 
        :pageCount="totalPages"
        :initial-page="page"
        :containerClass="'pagination'"
        :clickHandler="pageClick"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'">
      </paginate>
    </nav>
  </v-layout>
</template>

<script>
  /* ============
   * Shows Index Page
   * ============
   *
   * The shows index page.
   */
  import VLayout from '@/layouts/Default';
  import ShowProxy from '@/proxies/ShowProxy';
  import debounce from 'debounce';
  import Paginate from 'vuejs-paginate';

  export default {
    /**
     * The name of the page.
     */
    name: 'shows-index',

    data() {
      return {
        shows: [],
        page: 0,
        totalPages: 1,
        searchParams: {
          name: '',
        },
      };
    },

    beforeRouteEnter(to, from, next) {
      const searchParams = {};
      let page = 1;
      if (to.query.name) {
        searchParams.name = to.query.name;
      }
      if (to.query.p) {
        page = to.query.p;
      }
      new ShowProxy().get(page, searchParams)
        .then((response) => {
          response.data.forEach((value) => {
            value.image = process.env.API_LOCATION + value.image;
            value.thumbnail = process.env.API_LOCATION + value.thumbnail;
          });
          next(vm => vm.setShows(to.query, response));
        });
    },
    /**
     * The methods the page can use.
     */
    methods: {
      setShows(query, info) {
        if (query.p) {
          this.page = query.p;
        }
        if (query.name) {
          this.searchParams.name = query.name;
        }

        this.shows = info.data;
        this.page = info.current_page - 1;
        this.totalPages = info.last_page;
        this.setUpQuery();
      },
      /**
       * Grabs shows from endpoint and assigns variables
       */
      getShows(page) {
        new ShowProxy().get(page, this.searchParams).then((response) => {
          response.data.forEach((value) => {
            value.image = process.env.API_LOCATION + value.image;
            value.thumbnail = process.env.API_LOCATION + value.thumbnail;
          });
          this.shows = response.data;
          this.page = response.current_page - 1;
          this.totalPages = response.last_page;
          this.setUpQuery();
        });
      },
      /**
       * Sets up the url query so on refresh same info displays
       */
      setUpQuery() {
        this.query = {};
        if (this.page !== 0) {
          this.query.p = this.page + 1;
        }
        if (this.searchParams.name) {
          this.query.name = this.searchParams.name;
        }
        this.$router.replace({ query: this.query });
      },
      /**
       * On page click send a request to get new shows
       */
      pageClick(page) {
        this.page = page;
        this.getShows(page);
      },
      /**
       * On name input change after 0.5 seconds of no new info call endpoint
       */
      search: debounce(function search() {
        this.page = 0;
        this.getShows(1);
      }, 500),
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      Paginate,
    },
  };
</script>
