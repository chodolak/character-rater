<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Character
      </span>
      <div slot="body">
        <form ref="characterForm" novalidate @submit.prevent="handleCharacterSubmit()">
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
              <v-select data-vv-name="show" v-validate="'required'" v-model="character.show" :options="shows" :on-search="getShows" placeholder="Show">
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
  import VLayout from '@/layouts/Admin';
  import VCard from '@/components/Card';
  import CharacterProxy from '@/proxies/CharacterProxy';
  import ShowProxy from '@/proxies/ShowProxy';

  export default {
    /**
     * The name of the page.
     */
    name: 'admin-characters-upload-index',

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
        shows: [],
        existingCharacter: false,
        existingCharacterId: null,
        originalImage: false,
      };
    },

    created() {
      if (this.$route.params.id) {
        this.existingCharacterId = this.$route.params.id;
        this.getCharacter(this.$route.params.id);
        this.existingCharacter = true;
        this.originalImage = true;
      }
    },

    /**
     * The methods the page can use.
     */
    methods: {

      getCharacter(id) {
        new CharacterProxy().getById(id).then((response) => {
          this.character.image = process.env.API_LOCATION.replace('/api', '') + response.image;
          this.character.name = response.name;
          this.character.bio = response.bio;
          this.character.show = { value: response.show.id,
            label: response.show.name };
          const file = response.image.replace('/images/characters/', '');
          this.character.fileName = file.replace(/\.[^/.]+$/, '');
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
          vm.character.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      handleCharacterSubmit() {
        if (this.existingCharacter) {
          this.update();
        } else {
          this.create();
        }
      },

      create() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.uploadingCharacter = true;
            new CharacterProxy().upload(this.character).then(() => {
              this.showCreatedSuccessMsg();
              this.uploadingCharacter = false;
              this.resetCharacterVariables();
            })
            .catch(() => {
              this.uploadingCharacter = false;
              this.showCreatedErrorMsg();
            })
            .then(() => {
              this.errors.clear();
            });
          }
        });
      },

      update() {
        this.uploadingCharacter = true;
        new CharacterProxy().update(this.existingCharacterId, this.character, this.originalImage)
        .then(() => {
          this.showUpdatedSuccessMsg();
          this.uploadingCharacter = false;
        })
        .catch(() => {
          this.uploadingCharacter = false;
          this.showUpdatedErrorMsg();
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
        new ShowProxy().getByName(search).then((response) => {
          const options = [];
          response.forEach((value) => {
            options.push({ value: value.id, label: value.name });
          });
          this.shows = options;
          loading(false);
        });
      }, 500),
    },

    notifications: {
      showCreatedSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Uploaded character',
      },
      showUpdatedSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Success!',
        message: 'Updated character',
      },
      showUpdatedErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Error!',
        message: 'Failed to update character',
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
