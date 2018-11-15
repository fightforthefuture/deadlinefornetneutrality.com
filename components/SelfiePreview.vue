<template>
  <div v-if="selfies" class="flex-row sml-push-y1 med-push-y2">
    <div v-for="(selfie, index) in selfies" :key="`selfie-${index}`">
      <img v-if="selfie.photo"
           :src="selfie.photo"
           :alt="`${selfie.name}`"/>
    </div> <!-- v-for -->
  </div> <!-- .flex-row -->
</template>

<script>
export default {
  computed: {
    selfies() {
      if (this.$store.state.selfies) {
        return this.$store.state.selfies.data.slice(0,8)
      }
    }
  },

  created() {
    this.$store.dispatch('getSelfies', { page: 1 })
  }
}
</script>
