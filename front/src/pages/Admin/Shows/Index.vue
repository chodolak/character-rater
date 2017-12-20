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
  import VueNotifications from 'vue-notifications';
  import VLayout from '@/layouts/Admin';
  import ShowProxy from '@/proxies/ShowProxy';
  import debounce from 'debounce';
  import Paginate from 'vuejs-paginate';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-shows-index',

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

    created() {
      if (this.$route.query.p) {
        this.page = this.$route.query.p;
      }
      if (this.$route.query.name) {
        this.searchParams.name = this.$route.query.name;
      }
      this.getShows(1);
    },

    /**
     * The methods the page can use.
     */
    methods: {
      getShows(page) {
        new ShowProxy().get(page, this.searchParams)
          .then((response) => {
            this.shows = response.data;
            this.page = response.current_page - 1;
            this.totalPages = response.last_page;
            this.setUpQuery();
          });
      },
      pageClick(page) {
        this.page = page;
        this.getCharacters(page + 1);
      },
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
      search: debounce(function () {
        this.page = 0;
        this.getShows(1);
      }, 500),
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
      Paginate,
    },
  };
</script>
