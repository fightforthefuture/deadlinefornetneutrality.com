<template>
  <div>
    <video autoplay loop muted class="sml-hide lrg-show fade-in"
           poster="/earth-poster.png">
      <source src="~assets/videos/earth.mp4" type="video/mp4">
    </video>
    <img src="/earth-poster.png" alt="earth" class="lrg-hide" />

    <section id="intro">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <Countdown/>
            <h1 class="sml-push-y2 med-push-y3">
              Congress, time is running out to save the internet
            </h1>
            <p class="sml-push-y2 med-push-y3">
              We&rsquo;re days away from the deadline. Tell your elected
              officials: &ldquo;Vote to save net neutrality. Your
              decision will alter the course of human history, for better or
              for worse.&rdquo;
            </p>

            <div class="sml-push-y2 med-push-y3 sml-pad-2 med-pad-4 with-border is-rounded">
              <ActionNetworkForm v-if="formStep === 1"/>
              <SelfieForm v-if="formStep === 2"/>
              <FormComplete v-if="formStep === 3"/>
            </div> <!-- .pad -->
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

    <section id="events" class="sml-push-y4 med-push-y8">
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
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>

    <section id="day-of-action" class="sml-push-y4 med-push-y8">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h2>Join our Day of Action on Nov 28</h2>
            <p class="sml-push-y2 med-push-y3">
              We&rsquo;re planning an epic, final push to save net neutrality on
              November 28th, and we need your help to get as many people as
              possible to pressure members of Congress. December 10th is the
              final day for lawmakers to file the CRA discharge petition to
              force a House vote on overturning the FCC. So we&rsquo;re bringing
              the entire Internet together for one last day of action to make
              sure they do the right thing. Do you run a site or blog? Are you
              active on social media? Put your small piece of the Internet on
              alert with these banner ads and social media images.
              <a href="#TODO">Click here</a> to see ideas for blog posts,
              emails, tweets and more.
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
