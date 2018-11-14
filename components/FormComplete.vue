<template>
  <div class="text-center">
    <h3>
      Thanks for submitting your selfie!
    </h3>

    <div class="row sml-push-y2 med-push-y3">
      <div class="sml-c12 med-c9 lrg-c8 grid-center">
        <img :src="photoSource" alt="A photo of you!"/>
        <a class="btn btn-block sml-push-y2" :href="selfie.photo" target="_blank">Download</a>
      </div> <!-- .c -->

      <SocialShareButtons class="sml-push-y2 med-push-y3"/>
    </div> <!-- .row -->
  </div>
</template>

<script>
import SocialShareButtons from '~/components/SocialShareButtons'
import { mapState } from 'vuex'

export default {
  components: {
    SocialShareButtons
  },

  computed: {
    ...mapState([ 'photoSource', 'selfie' ])
  }
}
</script>
