<template>
  <div v-if="selfieRows" class="sml-push-y1 med-push-y2">
    <div v-for="(row, index) in selfieRows" :key="`selfie-row-${index}`"
         class="flex-row sml-push-y1">
      <div v-for="(selfie, index) in row" :key="`selfie-${index}`">
        <img v-if="selfie.thumbnail"
             :src="selfie.thumbnail"
             :alt="`${selfie.name}`"/>
      </div> <!-- v-for -->
    </div> <!-- v-for row -->
  </div> <!-- v-if -->
</template>

<script>
import shuffle from 'lodash/shuffle'

export default {
  computed: {
    selfieRows() {
      if (this.$store.state.selfies) {
        const shuffledSelfies = shuffle(this.$store.state.selfies.data)
        return [
          shuffledSelfies.slice(0, 8),
          shuffledSelfies.slice(8, 16)
        ]
      }
    }
  },

  created() {
    this.$store.dispatch('getSelfies', { page: 1 })
  }
}
</script>
