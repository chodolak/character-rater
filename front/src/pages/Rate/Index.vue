<template>
  <v-layout>
    <div class="card" style="height:650px;" v-if="!character.name"></div>
    <div class="card" v-if="character.name">
      <img class="card-img-top center-block"  v-if="character.image" :src="character.image" alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title text-center">{{character.name}}</h2>
        <div class="center-block">
          <fa-rating :glyph="rating.star" :active-color="rating.activeColor" :inactive-color="rating.inactiveColor" :increment="rating.increment" :show-rating="false" v-model="rating.value"></fa-rating>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h6>Bio</h6>
          {{character.bio}}
        </li>
        <li class="list-group-item">
          <h6>Show</h6>
          {{character.show}}
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
  import { FaRating } from 'vue-rate-it';

  export default {
    /**
     * The name of the page.
     */
    name: 'rate-index',

    data() {
      return {
        rating: {
          activeColor: '#0860A3',
          inactiveColor: '#ffffff',
          star: 'M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z',
          increment: 0.5,
          value: null,
        },
        character: {
          name: null,
          image: null,
          bio: null,
          show: null,
        },
      };
    },

    created() {
      this.setUpCharacter(this.$route);
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
        new CharacterProxy().get(route.params.show, route.params.character)
          .then((response) => {
            this.character = response;
            this.character.image = process.env.API_LOCATION.replace('/api', '') + response.image;
          });
      },
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      FaRating,
    },
  };
</script>
