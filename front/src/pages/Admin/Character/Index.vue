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
                v-validate="'required'"
                name="name"
                type="text"
                placeholder="Name"
                class="form-control"
                v-model="character.name"
                :class="{'input': true, 'is-invalid': errors.has('name') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <v-select data-vv-name="show" v-validate="'required'" v-model="character.show" :options="options" :on-search="getShows" placeholder="Show">
                <div slot="no-options">
                  Search for a show
                </div>
              </v-select>
            </div>
            <span v-show="errors.has('show')" class="help is-danger">{{ errors.first('show') }}</span>
          </div>
          <div class="form-group">
            <div class="input-group">
              <textarea 
                class="form-control" 
                rows="2" 
                id="bio" 
                placeholder="Bio" 
                v-model="character.bio"
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
                v-model="character.fileName"
                :class="{'input': true, 'is-invalid': errors.has('fileName') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input 
                id="character-image" 
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
              <i v-if="uploadingCharacter" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>
        <img v-if="character.image" :src="character.image" style="width:50%" class="img-responsive center-block">
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
  import debounce from 'debounce';
  import vSelect from 'vue-select';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';
  import CharacterProxy from '@/proxies/CharacterProxy';
  import ShowProxy from '@/proxies/ShowProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-character-index',

    data() {
      return {
        character: {
          image: '',
          name: null,
          show: null,
          bio: null,
          fileName: null,
        },
        uploadingCharacter: false,
        options: [],
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
          vm.character.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      upload() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.uploadingCharacter = true;
            new CharacterProxy().upload(this.character).then(() => {
              this.showSuccessMsg();
              this.uploadingCharacter = false;
              this.resetCharacterVariables();
            })
            .catch(() => {
              this.uploadingCharacter = false;
              this.showErrorMsg();
            })
            .then(() => {
              this.errors.clear();
            });
          }
        });
      },

      resetCharacterVariables() {
        this.character.image = '';
        this.character.name = null;
        this.character.show = null;
        this.character.bio = null;
        this.character.fileName = null;
        document.getElementById('character-image').value = '';
      },

      getShows: debounce(function (search, loading) {
        loading(true);
        new ShowProxy().get(search).then((response) => {
          const options = [];
          response.forEach((value) => {
            options.push({ value: value.id, label: value.name });
          });
          this.options = options;
          loading(false);
        });
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
      VCard,
      vSelect,
    },
  };
</script>
