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
            <label>Image</label>
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
            <label>Thumbnail</label>
            <div class="input-group">
              <input 
                id="show-thumbnail" 
                type="file" 
                v-on:change="onThumbnailFileChange" 
                class="form-control" 
                v-validate="'required'"
                name="thumbnail"
                :class="{'input': true, 'is-invalid': errors.has('thumbnail') }">
            </div>
          </div>
          <div class="form-group">
            <button class="btn custom-button">
              Submit
              <i v-if="uploadingShow" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="card" v-if="show.image">
                <div class="card-body">
                  <h4 class="card-title custom-center">Image</h4>
                </div>
                <img class="card-img-bottom" :src="show.image">
              </div>
            </div>
            <div class="col-sm">
              <div class="card" v-if="show.thumbnail">
                <div class="card-body">
                  <h4 class="card-title custom-center">Thumbnail</h4>
                </div>
                <img class="card-img-bottom" :src="show.thumbnail">
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Admin Show Upload Index Page
   * ============
   *
   * The admin show upload index page.
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

    /**
     * Variables
     */
    data() {
      return {
        show: {
          image: '',
          thumbnail: '',
          name: null,
          bio: null,
          fileName: null,
        },
        uploadingShow: false,
        existingShow: false,
        existingShowId: null,
        originalImage: false,
        originalThumbnail: false,
      };
    },

    /**
     * Before the route is entered call endpoint to setup page
     */
    beforeRouteEnter(to, from, next) {
      if (to.params.id) {
        new ShowProxy().getById(to.params.id).then((response) => {
          next(vm => vm.setUpShow(response));
        });
      } else {
        next();
      }
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * After route enter setup all the variables
       */
      setUpShow(info) {
        this.existingShow = true;
        this.existingShowId = info.id;
        this.originalImage = true;
        this.show.image = process.env.API_LOCATION + info.image;
        this.show.thumbnail = process.env.API_LOCATION + info.thumbnail;
        this.show.name = info.name;
        this.show.bio = info.bio;
        const file = info.image.replace('/images/shows/', '');
        this.show.fileName = file.replace(/\.[^/.]+$/, '');
      },
      /**
       * On file input change create image
       */
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        this.originalImage = false;
        if (!files.length) {
          return;
        }
        this.createImage(files[0]);
      },
      /**
       * Creates image
       */
      createImage(file) {
        const reader = new FileReader();
        const vm = this;
        reader.onload = (e) => {
          vm.show.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      /**
       * On file input change create image
       */
      onThumbnailFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        this.originalThumbnail = false;
        if (!files.length) {
          return;
        }
        this.createThumbnailImage(files[0]);
      },
      /**
       * Creates image
       */
      createThumbnailImage(file) {
        const reader = new FileReader();
        const vm = this;
        reader.onload = (e) => {
          vm.show.thumbnail = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      /**
       * On submit either update or create a show
       */
      handleShowSubmit() {
        if (this.existingShow) {
          this.update();
        } else {
          this.create();
        }
      },
      /**
       * Sends request to create a show
       */
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
      /**
       * Sends request to update a show
       */
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
      /**
       * Reset variables after creating a show
       */
      resetShowVariables() {
        this.show.image = '';
        this.show.thumbnail = '';
        this.show.name = null;
        this.show.bio = null;
        this.show.fileName = null;
        document.getElementById('show-image').value = '';
        document.getElementById('show-thumbnail').value = '';
      },
    },

    /**
     * Notifications
     */
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
