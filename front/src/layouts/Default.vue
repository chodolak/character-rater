<template>
  <div>
    <v-nav></v-nav>
    <slot name="outside"></slot>
    <div class="container pt-4">
      <div class="row">
        <div class="col col-12">
          <!-- Content will be placed here -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* ============
   * Default Layout
   * ============
   *
   * Used for the home and account pages.
   *
   * Layouts are used to store a lot of shared code.
   * This way the app stays clean.
   */

  import VNav from '@/components/Nav';

  export default {
    /**
     * The name of the layout.
     */
    name: 'default-layout',

    components: {
      VNav,
    },
  };
</script>
