<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Character
      </span>
      <div slot="body">
        <form ref="characterForm" novalidate>
          <div class="form-group">
            <div class="input-group">
              <input
                required="true"
                type="text"
                placeholder="Name"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                required="true"
                type="text"
                placeholder="Show"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <textarea class="form-control" rows="2" id="bio" placeholder="Bio"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input type="file" v-on:change="onFileChange" class="form-control">
            </div>
          </div>
          <!-- <div class="form-group"> -->
            
          <!-- </div> -->
          <div class="form-group">
            <button class="btn custom-button">
              Submit
              <!-- <i v-if="$store.state.auth.loading" class="fa fa-spinner fa-spin"></i> -->
            </button>
          </div>
        </form>
        <img v-if="image" :src="image" style="width:50%" class="img-responsive center-block">
      </div>
    </v-card>
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

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-character-index',

    data() {
      return {
        image: '',
      };
    },

    /**
     * The methods the page can use.
     */
    methods: {
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.createImage(files[0]);
      },
      createImage(file) {
        const reader = new FileReader();
        const vm = this;
        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
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
