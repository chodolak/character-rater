<template>
  <v-layout>
    <div class="shows-page-header">
      <div class="container">
        <div class="row">
          <div class="col-3">
            <h1>Characters</h1>
          </div>
          <div class="col-9 show-name-input">
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
    <div class="container" v-for="character in characters" v-bind:key="character.id" style="padding-bottom: 15px;">
      <router-link
            :to="{ name: 'rate.index', params: { show: character.showUrlSafe, character: character.nameUrlSafe } }"
            class="card show-card"
            tag="div"
      >
        <div class="row">
          <div class="col-md-4">
            <div class="card-img-bottom side-card-image" :style="{ 'background-image': 'url(' + character.thumbnail + ')' }">
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-block show-block">
              <h4 class="card-title">{{character.name}}</h4>
              <p class="card-text">{{character.bio | truncate(500, '...')}}</p>
              <div>
                <!-- <span class="custom-center">Average</span> -->
                <el-rate
                  v-model="character.avg_rating[0].value"
                  disabled
                  show-score
                  :colors="['#007bff', '#0860a3', '#043b65']"
                  :text-color="'#0860a3'"
                  score-template="{value} points">
                </el-rate>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="alert alert-primary" v-if="characters.length == 0">
      No characters match right now!
    </div>
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
   * Shows Page Index Page
   * ============
   *
   * The shows index page.
   */
  import VLayout from '@/layouts/Default';
  import CharacterProxy from '@/proxies/CharacterProxy';
  import debounce from 'debounce';
  import Paginate from 'vuejs-paginate';

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
        },
        selectedShow: null,
        searchArray: [],
        query: {},
        shows: [],
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
      new CharacterProxy().getCharactersByShow(to.params.name, page, searchParams).then((response) => {
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
        info.data.forEach((value) => {
          value.image = process.env.API_LOCATION.replace('/api', '') + value.image;
          value.thumbnail = process.env.API_LOCATION.replace('/api', '') + value.thumbnail;
        });
        this.characters = info.data;
        this.page = info.current_page - 1;
        this.totalPages = info.last_page;
        this.setUpQuery();
      },
      /**
       * Calls endpoint to get characters
       */
      getCharacters(page) {
        new CharacterProxy().getCharactersByShow(this.$route.params.name, page, this.searchParams).then((response) => {
          response.data.forEach((value) => {
            value.image = process.env.API_LOCATION.replace('/api', '') + value.image;
            value.thumbnail = process.env.API_LOCATION.replace('/api', '') + value.thumbnail;
          });
          this.characters = response.data;
          this.page = response.current_page - 1;
          this.totalPages = response.last_page;
          this.setUpQuery();
        });
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
        this.$router.replace({ query: this.query });
      },
      /**
       * On page click update characters
       */
      pageClick(page) {
        this.page = page;
        this.getCharacters(page);
      },
      /**
       * On name search update, send request after 0.5 seconds
       */
      search: debounce(function search() {
        this.page = 0;
        this.getCharacters(1);
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
