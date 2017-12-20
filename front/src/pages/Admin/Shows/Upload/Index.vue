<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Show
      </span>
      <div slot="body">
        <form novalidate @submit.prevent="handleShowSubmit()">
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
  import VLayout from '@/layouts/Admin';
  import VCard from '@/components/Card';
  import ShowProxy from '@/proxies/ShowProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-shows-upload-index',

    data() {
      return {
        show: {
          image: '',
          name: null,
          bio: null,
          fileName: null,
        },
        uploadingShow: false,
        existingShow: false,
        existingShowId: null,
        originalImage: false,
      };
    },

    created() {
      if (this.$route.params.id) {
        this.existingShowId = this.$route.params.id;
        this.getShow(this.$route.params.id);
        this.existingShow = true;
        this.originalImage = true;
      }
    },

    /**
     * The methods the page can use.
     */
    methods: {

      getShow(id) {
        new ShowProxy().getById(id).then((response) => {
          this.show.image = process.env.API_LOCATION.replace('/api', '') + response.image;
          this.show.name = response.name;
          this.show.bio = response.bio;
          const file = response.image.replace('/images/shows/', '');
          this.show.fileName = file.replace(/\.[^/.]+$/, '');
        });
      },

      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        this.originalImage = false;
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

      handleShowSubmit() {
        if (this.existingShow) {
          this.update();
        } else {
          this.create();
        }
      },

      create() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.uploadingShow = true;
            new ShowProxy().create(this.show).then(() => {
              this.showSuccessCreateMsg();
              this.uploadingShow = false;
              this.resetShowVariables();
            })
            .catch(() => {
              this.uploadingShow = false;
              this.showCreateErrorMsg();
            })
            .then(() => {
              this.errors.clear();
            });
          }
        });
      },

      update() {
        this.uploadingShow = true;
        new ShowProxy().update(this.existingShowId, this.show, this.originalImage).then(() => {
          this.showSuccessUpdateMsg();
          this.uploadingShow = false;
        })
        .catch(() => {
          this.uploadingShow = false;
          this.showUpdateErrorMsg();
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
      showSuccessCreateMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Uploaded show',
      },
      showSuccessUpdateMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Updated show',
      },
      showCreateErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'Failed to upload show',
      },
      showUpdateErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'Failed to update show',
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
