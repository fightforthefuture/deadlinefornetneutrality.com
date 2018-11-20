<style lang="scss">
  .modal{
    max-width: 400px;
  }
</style>

<template>
  <div v-if="selfie" class="text-center">
    <SelfieFeature :selfie="selfie"/>
    <SocialShareButtons :url="`https://deadline.fftf.xyz/share/${selfie.id}`" class="sml-push-y3" />
  </div> <!-- v-if -->
</template>

<script>
import SelfieFeature from '~/components/SelfieFeature'
import SocialShareButtons from '~/components/SocialShareButtons'

export default {
  components: {
    SelfieFeature,
    SocialShareButtons
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
