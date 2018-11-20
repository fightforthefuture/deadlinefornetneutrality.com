<template>
  <div class="media-page text-center sml-push-y2">
    <div class="wrapper">
      <div class="row">
        <div class="sml-c12 lrg-c8 grid-center text-center">
          <h1>Show your support for Net Neutrality</h1>
          <p class="sml-push-y2 med-push-y3">
            The FCC officially gutted the open internet, allowing your cable company
            to scam you for more money, censor websites, and slow down online content.
            By electing Senators and Representatives who support net neutrality, we
            can reverse the FCC’s decision and enshrine net neutrality protections
            into law. Use these great profile pictures and banner ads to spread the
            word!
          </p>
        </div>
      </div>
    </div>

    <MediaGallery/>
  </div>
</template>

<script>
import MediaGallery from '~/components/MediaGallery'

export default {
  components: {
    MediaGallery
  }
}
</script>
