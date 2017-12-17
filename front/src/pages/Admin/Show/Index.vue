<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Show
      </span>
      <div slot="body">
        <form novalidate @submit.prevent="create()">
          <div class="form-group">
            <div class="input-group">
              <input
                v-validate="'required'"
                name="name"
                type="text"
                placeholder="Name"
                class="form-control"
                v-model="show.name"
                :class="{'input': true, 'is-invalid': errors.has('name') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <textarea 
                class="form-control" 
                rows="2" 
                id="bio" 
                placeholder="Bio" 
                v-model="show.bio"
                v-validate="'required'"
                name="bio" 
                :class="{'input': true, 'is-invalid': errors.has('bio') }"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                v-validate="'required'"
                type="text"
                name="fileName"
                placeholder="File name"
                class="form-control"
                v-model="show.fileName"
                :class="{'input': true, 'is-invalid': errors.has('fileName') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input 
                id="show-image" 
                type="file" 
                v-on:change="onFileChange" 
                class="form-control" 
                v-validate="'required'"
                name="file"
                :class="{'input': true, 'is-invalid': errors.has('file') }">
            </div>
          </div>
          <div class="form-group">
            <button class="btn custom-button">
              Submit
              <i v-if="uploadingShow" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>
        <img v-if="show.image" :src="show.image" style="width:50%" class="img-responsive center-block">
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Admin Character Index Page
   * ============
   *
   * The admin character index page.
   */
  import VueNotifications from 'vue-notifications';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';
  import ShowProxy from '@/proxies/ShowProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-shows-index',

    data() {
      return {
        show: {
          image: '',
          name: null,
          bio: null,
          fileName: null,
        },
        uploadingShow: false,
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
          vm.show.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      create() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.uploadingShow = true;
            new ShowProxy().create(this.show).then(() => {
              this.showSuccessMsg();
              this.uploadingShow = false;
              this.resetShowVariables();
            })
            .catch(() => {
              this.uploadingShow = false;
              this.showErrorMsg();
            })
            .then(() => {
              this.errors.clear();
            });
          }
        });
      },

      resetShowVariables() {
        this.show.image = '';
        this.show.name = null;
        this.show.bio = null;
        this.show.fileName = null;
        document.getElementById('show-image').value = '';
      },
    },

    notifications: {
      showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Uploaded show',
      },
      showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'Failed to upload show',
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
