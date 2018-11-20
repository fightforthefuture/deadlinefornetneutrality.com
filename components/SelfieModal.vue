<style lang="scss">
  .modal{
    max-width: 400px;
  }
</style>

<template>
  <div v-if="selfie" class="text-center">
    <SelfieFeature :selfie="selfie"/>
  </div> <!-- v-if -->
</template>

<script>
import SelfieFeature from '~/components/SelfieFeature'

export default {
  components: {
    SelfieFeature
  },

  props: {
    selfie: {
      type: Object,
      required: true
    }
  },

  created() {
    const query = Object.assign({}, this.$route.query, { photo: this.selfie.id })
    this.$router.replace({ path: this.$route.path, query: query })
  },

  destroyed() {
    const query = Object.assign({}, this.$route.query, { photo: undefined })
    this.$router.replace({ path: this.$route.path, query: query })
  }
}
</script>
