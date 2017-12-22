<template>
  <v-layout>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <router-link
            :to="{ name: 'admin-characters-upload.index' }"
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
          <div class="form-group">
            <div class="input-group">
              <v-select data-vv-name="show" v-model="selectedShow" :on-change="setShow" :options="shows" :on-search="getShows" placeholder="Show">
                <div slot="no-options">
                  Search for a show
                </div>
              </v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered table-hover" v-if="characters.length > 0">
      <thead class="thead-custom">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Show</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in characters" v-bind:key="character.id">
          <th scope="row">{{character.id}}</th>
          <td>{{character.name}}</td>
          <td>{{character.show.name}}</td>
          <td>
            <div class="custom-center">
              <router-link
                :to="{ name: 'admin-characters-upload.index', params: { id: character.id } }"
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
    <nav v-if="characters.length > 0">
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
   * Admin Character Index Page
   * ============
   *
   * The admin character index page.
   */
  import VLayout from '@/layouts/Admin';
  import CharacterProxy from '@/proxies/CharacterProxy';
  import ShowProxy from '@/proxies/ShowProxy';
  import Paginate from 'vuejs-paginate';
  import debounce from 'debounce';
  import vSelect from 'vue-select';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-characters-index',

    /**
     * Variables
     */
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

    /**
     * Before the route is entered call endpoint to setup page
     */
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

        this.characters = info.data;
        this.setUpShows();
        this.page = info.current_page - 1;
        this.totalPages = info.last_page;
        this.setUpQuery();
      },
      /**
       * Calls endpoint to get characters
       */
      getCharacters(page) {
        new CharacterProxy().get(page, this.searchParams).then((response) => {
          this.characters = response.data;
          this.setUpShows();
          this.page = response.current_page - 1;
          this.totalPages = response.last_page;
          this.setUpQuery();
        });
      },
      /**
       * Sets up the show dropdown if it is the first time
       */
      setUpShows() {
        if (this.firstLoad) {
          this.firstLoad = false;
          const options = [];
          options.push({ value: -1, label: 'None' });
          options.push({ value: this.searchParams.show, label: this.characters[0].show.name });
          this.shows = options;
          this.selectedShow = { value: this.searchParams.show,
            label: this.characters[0].show.name };
        }
      },
      /**
       * On page click update characters
       */
      pageClick(page) {
        this.page = page;
        this.getCharacters(page);
      },
      /**
       * Sets up the query and updates the url
       */
      setUpQuery() {
        this.query = {};
        if (this.page !== 0) {
          this.query.p = this.page + 1;
        }
        if (this.searchParams.name) {
          this.query.name = this.searchParams.name;
        }
        if (this.searchParams.show) {
          this.query.show = this.searchParams.show;
        }
        this.$router.replace({ query: this.query });
      },
      /**
       * On show select filter
       */
      setShow(show) {
        this.page = 0;
        if (show.value !== -1) {
          this.searchParams.show = show.value;
        } else {
          this.searchParams.show = null;
        }
        this.getCharacters(1);
      },
      /**
       * On name search update, send request after 0.5 seconds
       */
      search: debounce(function () {
        this.page = 0;
        this.getCharacters(1);
      }, 500),
      /**
       * On show search, send request after 0.5 seconds
       */
      getShows: debounce(function (search, loading) {
        loading(true);
        new ShowProxy().getByName(search).then((response) => {
          const options = [];
          options.push({ value: -1, label: 'None' });
          response.forEach((value) => {
            options.push({ value: value.id, label: value.name });
          });
          this.shows = options;
          loading(false);
        });
      }, 500),
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      Paginate,
      vSelect,
    },
  };
</script>
