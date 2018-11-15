<style lang="scss">
.letter-wrapper {
   position: relative;
   box-shadow: 0 0 60px transparentize($black, 0.1);
}
.letter-content {
  position: relative;
  z-index: 10;
}
.letter-content:before,
.letter-wrapper:after {
  display: block;
  content: '';
}
.letter-content:before {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 36px;
  height: 38px;
  background: $background-color url('~assets/images/letter-corner.png') left bottom no-repeat;
  background-size: contain;
}
.letter-wrapper:after {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: -6px;
  height: 50px;
  background: #BDBDBD; // NOTE: one off color
  transform: skewY(-0.8deg);
}
</style>

<template>
  <div class="letter-wrapper">
    <div class="letter-content fill-white sml-pad-3 med-pad-8">
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
    </div> <!-- .letter-content -->
  </div> <!-- .letter-wrapper -->
</template>

<script>
import { simpleFormat } from '~/assets/js/helpers'

export default {
  computed: {
    letterText() { return simpleFormat(this.$store.state.letterText) }
  }
}
</script>
