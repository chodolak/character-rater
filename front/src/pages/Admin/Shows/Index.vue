<template>
  <v-layout>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <router-link
            :to="{ name: 'admin-shows-upload.index' }"
            tag="button"
            class="btn custom-button"
          >
            Add New
          </router-link>
        </div>
        <div class="col-4">
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
        <div class="col-6">
        </div>
      </div>
    </div>
    <table class="table table-bordered table-hover" v-if="shows.length > 0">
      <thead class="thead-custom">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="show in shows" v-bind:key="show.id">
          <th scope="row">{{show.id}}</th>
          <td>{{show.name}}</td>
          <td>
            <div class="custom-center">
              <router-link
                :to="{ name: 'admin-shows-upload.index', params: { id: show.id } }"
                tag="button"
                class="btn custom-button"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
   * Admin Shows Index Page
   * ============
   *
   * The admin shows index page.
   */
  import VLayout from '@/layouts/Admin';
  import ShowProxy from '@/proxies/ShowProxy';
  import debounce from 'debounce';
  import Paginate from 'vuejs-paginate';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-shows-index',

    /**
     * Variables
     */
    data() {
      return {
        shows: [],
        page: 1,
        totalPages: 1,
        searchParams: {
          name: '',
        },
      };
    },

    /**
     * Before the route is entered call endpoint to setup page
     */
    beforeRouteEnter(to, from, next) {
      const searchParams = {};
      let page = 1;
      if (to.query.name) {
        searchParams.name = to.query.name;
      }
      if (to.query.p) {
        page = to.query.p;
      }
      new ShowProxy().get(page, searchParams).then((response) => {
        next(vm => vm.setUpShows(to.query, response));
      });
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * After the route enters setup all the variables
       */
      setUpShows(query, info) {
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
          this.shows = response.data;
          this.page = response.current_page - 1;
          this.totalPages = response.last_page;
          this.setUpQuery();
        });
      },
      /**
       * On page click send a request to get new shows
       */
      pageClick(page) {
        this.page = page;
        this.getShows(page);
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
