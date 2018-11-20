<style lang="scss" scoped>
video.earth {
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 100%;
  object-fit: cover;
}
.video-container:after {
  display: block;
  content: '';
  position: absolute;
  top: 170px;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    $background-color 100%
  );
}
</style>

<template>
  <div>
    <div class="flex-center video-container">
      <video autoplay loop muted class="sml-hide lrg-show fade-in earth"
             poster="/earth-poster.png">
        <source src="~assets/videos/earth.mp4" type="video/mp4">
      </video>
    </div> <!-- .video-container -->
    <img src="/earth-bg.jpg" alt="earth" class="lrg-hide" />

    <section id="intro" class="lrg-push-y15">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center">
            <Countdown class="text-center"/>

            <ActionNetworkForm v-if="formStep === 1"/>
            <SelfieForm v-if="formStep === 2"/>
            <FormComplete v-if="formStep === 3"/>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>

    <section id="signers" class="sml-push-y2 med-push-y4">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c10 grid-center text-center">
            <h3>Recent signers:</h3>
            <SelfiePreview/>

            <p class="sml-push-y1 med-push-y2">
              <nuxt-link to="/gallery">View all</nuxt-link>
            </p>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>

    <section id="letter">
      <div class="wrapper">
        <div class="row sml-pad-y3 med-push-y2">
          <div class="sml-c12 lrg-c10 grid-center">
            <ReadTheLetter/>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>

    <!-- <section id="events" class="sml-push-y4 med-push-y8">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h2>Join the nationwide protests</h2>
            <p class="sml-push-y2 med-push-y3">
              Want to make your voice heard? Check out the map below to find a
              protest or a meeting with a representative in your state. And if
              there are no events in your area, consider organizing one!
            </p>
            <a href="https://www.battleforthenet.com/map/" target="_blank">
              <img src="https://data.battleforthenet.com/events.png"
                   alt="A map of net neutrality protests"
                   class="is-rounded sml-push-y2 med-push-y3">
              <p class="sml-push-y2 med-push-y3">
                <span class="faux-link">View full map</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section> -->

    <section id="day-of-action" class="sml-push-y4 med-push-y8">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h2>Join our Day of Action<br>on Nov 29th</h2>
            <p class="sml-push-y2 med-push-y3">
              Congress has until the end of the year to reverse Ajit Pai’s net neutrality
              repeal &mdash; afterwards, it gets way harder to restore protections against
              blocking, throttling, and new fees. Our last best chance to save the open
              Internet is to pass the Congressional Review Act resolution and overturn the
              FCC before the end of this Congress. So we’re bringing together tech companies,
              small businesses, and Internet users for an epic push on November 29th to make
              lawmakers take action.
              <a href="https://docs.google.com/document/d/1WFhmv86b9xy-0zE0YgqF7wP6K3QsgwYfXFRDqXLLK4o" target="_blank">Click here</a>
              to see ideas for how you can use your slice of the Internet to spread the word
              with social media posts, banner ads, and shareable images.
            </p>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import config from '~/config'
import { createMetaTags, smoothScrollToElement } from '~/assets/js/helpers'
import Countdown from '~/components/Countdown'
import ActionNetworkForm from '~/components/ActionNetworkForm'
import SelfieForm from '~/components/SelfieForm'
import FormComplete from '~/components/FormComplete'
import SelfiePreview from '~/components/SelfiePreview'
import ReadTheLetter from '~/components/ReadTheLetter'
import LogoCloud from '~/components/LogoCloud'

export default {
  components: {
    Countdown,
    ActionNetworkForm,
    SelfieForm,
    FormComplete,
    SelfiePreview,
    ReadTheLetter,
    LogoCloud
  },

  head() {
    return {
      title: config.sharing.title,
      meta: createMetaTags({
        title: config.sharing.title,
        description: config.sharing.description,
        image: config.sharing.image,
        url: config.sharing.url
      })
    }
  },

  computed: {
    formStep () { return this.$store.state.formStep }
  },

  methods: {
    scrollTo(hash) {
      const duration = 500
      smoothScrollToElement(hash, duration)
      // WARNING: Since there is no server a setTimeout is ok. However, with a
      // server this is a dangerous eval. Remove if this project ever is hosted
      // with a JS server.
      setTimeout(() => {
        location.hash = hash
      }, duration)
    }
  }
}
</script>
