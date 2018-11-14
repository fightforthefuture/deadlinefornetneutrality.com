<template>
  <div class="fill-white sml-pad-3 med-pad-8">
    <h1 class="text-center">
      Our Open Letter<span class="lrg-c12">to Congress</span>
    </h1>
    <div v-html="letterText" class="sml-push-y2 med-push-y3 text-serif"></div>
    <p class="sml-push-y2 med-push-y3 text-serif">
      <strong>Signed,</strong>
    </p>
    <p class="sml-push-y2 text-serif">
      <strong>The Internet</strong>
    </p>
  </div> <!-- .fill -->
</template>

<script>
import { simpleFormat } from '~/assets/js/helpers'

export default {
  computed: {
    letterText() { return simpleFormat(this.$store.state.letterText) }
  }
}
</script>
