<template>
  <div class="text-center">
    <h1 class="sml-push-y2 med-push-y3">
      <span class="text-success">Thanks</span> for submitting your photo!
    </h1>

    <div class="sml-push-y2 med-push-y3 sml-pad-2 med-pad-y4 fill-grey is-rounded-top">
      <div class="row">
        <div class="sml-c12 med-c9 lrg-c8 grid-center">
          <img :src="photoSource" alt="A photo of you!"/>
          <a class="btn btn-block sml-push-y2" :href="selfie.photo" target="_blank">Download</a>
        </div> <!-- .c -->

        <SocialShareButtons class="sml-push-y2 med-push-y3"/>
      </div> <!-- .row -->
    </div> <!-- .fill -->
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
