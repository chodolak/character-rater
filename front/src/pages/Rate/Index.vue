<template>
  <v-layout>
    <div class="card row justify-content-center align-self-center" style="height:650px;" v-if="!character.name">
      <div class="custom-center">
        <!-- <i class="fa fa-spinner fa-spin fa-5x"></i> -->
      </div>
    </div>
    <div class="card" v-if="character.name">
      <div class="rate-img-container center-block">
        <img class="rate-img"  v-if="character.image" :src="character.image" alt="Card image cap" />
      </div>
      <div class="card-body">
        <h2 class="card-title text-center">{{character.name}}</h2>
        <div class="custom-center rate-stars">
          <el-rate v-model="rating.value" 
            :allow-half="true"
            :colors="['#007bff', '#0860a3', '#043b65']"
            v-on:change="ratingChange"></el-rate>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h6>Bio</h6>
          {{character.bio}}
        </li>
        <li class="list-group-item">
          <h6>Show</h6>
          <router-link
                :to="{ name: 'shows-characters.index', params: { name:  character.showUrlSafe } }"
                tag="a"
          >
            {{character.show}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="prev-character" v-if="character.prev">
      <router-link
            :to="{ name: 'rate.index', params: { show:  character.prev.showUrlSafe, character: character.prev.nameUrlSafe } }"
            class="btn custom-button"
            tag="button"
      >
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        <span>{{character.prev.name}}</span>
      </router-link>
    </div>
    <div class="next-character" v-if="character.next">
      <router-link
            :to="{ name: 'rate.index', params: { show:  character.next.showUrlSafe, character: character.next.nameUrlSafe } }"
            class="btn custom-button"
            tag="button"
      >
          <span>{{character.next.name}}</span>
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </router-link>
    </div>
  </v-layout>
</template>

<script>
  /* ============
   * Rate Index Page
   * ============
   *
   * The rate index page.
   */
  import VLayout from '@/layouts/Default';
  import CharacterProxy from '@/proxies/CharacterProxy';
  import VueNotifications from 'vue-notifications';
  import debounce from 'debounce';

  export default {
    /**
     * The name of the page.
     */
    name: 'rate-index',

    data() {
      return {
        rating: {
          id: null,
          value: null,
          avg: null,
          exists: false,
        },
        first: true,
        loading: true,
        character: {
          id: null,
          name: null,
          image: null,
          bio: null,
          show: null,
        },
      };
    },
    beforeRouteEnter(to, from, next) {
      new CharacterProxy().getByShowCharacter(to.params.show, to.params.character)
        .then((response) => {
          next(vm => vm.setCharacter(response));
        });
    },

    beforeRouteUpdate(to, from, next) {
      this.setUpCharacter(to);
      next();
    },

    /**
     * The methods the page can use.
     */
    methods: {
      setUpCharacter(route) {
        new CharacterProxy().getByShowCharacter(route.params.show, route.params.character)
          .then((response) => {
            this.character = response;
            this.character.image = process.env.API_LOCATION + response.image;
            if (response.rating) {
              this.rating.value = response.rating.rating;
              this.rating.id = response.rating.id;
              this.rating.exists = true;
            } else {
              this.rating.value = null;
              this.rating.exists = false;
            }
          });
      },

      setCharacter(info) {
        this.character = info;
        this.character.image = process.env.API_LOCATION + info.image;
        if (info.rating) {
          this.rating.id = info.rating.id;
          this.rating.value = info.rating.rating;
          this.rating.exists = true;
        } else {
          this.rating.exists = false;
        }
      },
      ratingChange: debounce(function ratingChange() {
        if (this.$store.state.auth.authenticated) {
          if (this.rating.exists) {
            new CharacterProxy().updateRating(this.character.id, this.rating.id, { rating: this.rating.value }).then(() => {
              this.ratingUpdatedSuccessMsg();
            });
          } else {
            new CharacterProxy().createRating({ character: this.character.id, rating: this.rating.value }).then((response) => {
              this.rating.exists = true;
              this.rating.id = response.id;
              this.ratingCreatedSuccessMsg();
            });
          }
        } else {
          this.loginRequiredErrorMsg();
        }
      }, 250),
    },

    notifications: {
      ratingCreatedSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Created rating',
      },
      ratingUpdatedSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Updated rating',
      },
      loginRequiredErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'You have to be logged in to rate',
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
