<template>
  <div class="text-center">
    <h2>
      Thanks for submitting your selfie!
    </h2>

    <div class="row sml-push-y2 med-push-y3">
      <div class="sml-c12 med-c9 lrg-c8 grid-center">
        <img src="~assets/images/selfie-default.png" alt="Your image goes here"/>
        <a class="btn btn-block sml-push-y2">Download</a>
      </div> <!-- .c -->

      <SocialShareButtons class="sml-push-y2 med-push-y3"/>
    </div> <!-- .row -->
  </div>
</template>

<script>
import SocialShareButtons from '~/components/SocialShareButtons'

export default {
  components: {
    SocialShareButtons
  }
}
</script>
