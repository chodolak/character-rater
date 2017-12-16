<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Register
      </span>
      <div slot="body">
        <div class="alert alert-danger" role="alert" v-if="!passwordValid">
          Passwords don't match.
        </div>
        <div v-if="$store.state.auth.invalidRegister.name">
          <div class="alert alert-danger" role="alert" v-for="message in $store.state.auth.invalidRegister.name" v-bind:key="message">
            {{message}}
          </div>
        </div>
        <div v-if="$store.state.auth.invalidRegister.email">
          <div class="alert alert-danger" role="alert" v-for="message in $store.state.auth.invalidRegister.email" v-bind:key="message">
            {{message}}
          </div>
        </div>
        <div v-if="$store.state.auth.invalidRegister.password">
          <div class="alert alert-danger" role="alert" v-for="message in $store.state.auth.invalidRegister.password" v-bind:key="message">
            {{message}}
          </div>
        </div>
        <form @submit.prevent="register(user)" ref="registerForm" novalidate>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-user fa-fw"></i>
              </div>
              <input
                v-model="user.name"
                v-validate="'required'"
                type="text"
                placeholder="Username"
                class="form-control"
                name="username"
                :class="{'input': true, 'is-invalid': errors.has('username') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-envelope fa-fw"></i>
              </div>
              <input
                v-model="user.email"
                v-validate="'required'"
                type="email"
                placeholder="Email"
                class="form-control"
                name="email"
                :class="{'input': true, 'is-invalid': errors.has('email') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-lock fa-fw"></i>
              </div>
              <input
                v-model="user.password"
                v-validate="'required'"
                type="password"
                placeholder="Password"
                class="form-control"
                name="password"
                :class="{'input': true, 'is-invalid': errors.has('password') }"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-lock fa-fw"></i>
              </div>
              <input
                v-model="user.passwordConfirm"
                v-validate="'required|confirmed:password'"
                type="password"
                placeholder="Confirm password"
                class="form-control"
                name="confirm_password"
                data-vv-as="password"
                :class="{'input': true, 'is-invalid': errors.has('confirm_password') }"
              >
            </div>
          </div>
          <div class="form-group">
            <button class="btn custom-button">
              Register
              <i v-if="$store.state.auth.loading" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>
      <!-- <form class="container" ref="needsValidation" novalidate>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="validationCustom01">First name</label>
            <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="validationCustom02">Last name</label>
            <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="validationCustom03">City</label>
            <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
            <div class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="validationCustom04">State</label>
            <input type="text" class="form-control" id="validationCustom04" placeholder="State" required>
            <div class="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="validationCustom05">Zip</label>
            <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>
            <div class="invalid-feedback">
              Please provide a valid zip.
            </div>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit form</button>
      </form> -->
      </div>
      <div slot="footer">
        Already got an account?
        <router-link :to="{ name: 'login.index' }">Login</router-link>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Register Index Page
   * ============
   *
   * Page where the user can register.
   */

  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';

  export default {
    /**
     * The name of the page.
     */
    name: 'register-index',

    /**
     * The data that can be used by the page.
     *
     * @returns {Object} The view-model data.
     */
    data() {
      return {
        user: {
          name: null,
          email: null,
          passwordConfirm: null,
          password: null,
        },
        passwordValid: true,
        checkedValidation: false,
      };
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * Validates and registers the user.
       *
       * @param {Object} user The user to be registered.
       */
      register(user) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('auth/register', user);
          }
        });
      },

      /**
       * Checks to see if passwords match if register has already been clicked
       */
      passwordChecker() {
        if (this.checkedValidation) {
          if (this.user.password !== this.user.passwordConfirm) {
            this.passwordValid = false;
          } else {
            this.passwordValid = true;
          }
        }
      },
    },

    /**
     * The components the page can use.
     */
    components: {
      VLayout,
      VCard,
    },
  };
</script>
