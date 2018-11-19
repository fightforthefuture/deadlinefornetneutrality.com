<template>
  <div class="text-center">
    <h1 class="sml-push-y2 med-push-y3">
      <span class="text-success">Thanks</span> for sending a photo!
    </h1>

    <div class="row">
      <div class="sml-c12 med-c7 lrg-c6 grid-center">
        <div class="sml-push-y2 med-push-y3 sml-pad-2 fill-grey is-rounded-top">
          <img :src="photoSource" alt="A photo of you!"/>
        </div> <!-- .fill -->
        <div class="sml-pad-2 fill-grey-dark is-rounded-bottom">
          <a class="btn btn-block" :href="selfie.photo" target="_blank">
            Download
          </a>

          <SocialShareButtons class="sml-push-y2"/>
        </div> <!-- .fill -->
      </div> <!-- .c -->
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
