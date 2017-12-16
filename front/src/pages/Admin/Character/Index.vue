<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Character
      </span>
      <div slot="body">
        <form ref="characterForm" novalidate @submit.prevent="upload()">
          <div class="form-group">
            <div class="input-group">
              <input
                required="true"
                type="text"
                placeholder="Name"
                class="form-control"
                v-model="image.name"
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
                v-model="image.show"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <textarea class="form-control" rows="2" id="bio" placeholder="Bio" v-model="image.bio" required="true"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                required="true"
                type="text"
                placeholder="File name"
                class="form-control"
                v-model="image.fileName"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input id="character-image" type="file" v-on:change="onFileChange" class="form-control" required="true">
            </div>
          </div>
          <div class="form-group">
            <button class="btn custom-button">
              Submit
              <i v-if="uploadingImage" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>
        <img v-if="image.data" :src="image.data" style="width:50%" class="img-responsive center-block">
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
  import CharacterProxy from '@/proxies/CharacterProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-character-index',

    data() {
      return {
        image: {
          data: '',
          name: null,
          show: null,
          bio: null,
          fileName: null,
        },
        uploadingImage: false,
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
          vm.image.data = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      upload() {
        const form = this.$refs.characterForm;
        if (form.checkValidity() !== false) {
          this.uploadingImage = true;
          new CharacterProxy().upload(this.image).then(() => {
            this.showSuccessMsg();
            this.uploadingImage = false;
            this.resetImage();
          })
          .catch(() => {
            this.showErrorMsg();
          });
        } else {
          form.classList.add('was-validated');
        }
      },
      resetImage() {
        this.image.data = '';
        this.image.name = null;
        this.image.show = null;
        this.image.bio = null;
        this.image.fileName = null;
        document.getElementById('character-image').value = '';
      },
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
      VCard,
    },
  };
</script>
