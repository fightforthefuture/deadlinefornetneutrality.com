<template>
  <div>
    <section class="sml-pad-y3 med-pad-y6">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h3>12 Days 13 Hours 09 Minutes 32 Seconds</h3>
            <h1 class="sml-push-y2 med-push-y3">
              Congress, time is running out to save the internet
            </h1>
            <p class="sml-push-y2 med-push-y3">
              The future of humanity is counting on you.
              Please vote before it&rsquo;s too late.
            </p>

            <div class="sml-push-y2 med-push-y3 sml-pad-2 med-pad-4 with-border is-rounded">
              <ActionNetworkForm v-if="formStep === 1"/>
              <SelfieForm v-if="formStep === 2"/>
              <FormComplete v-if="formStep === 3"/>
            </div> <!-- .pad -->

            <ul class="hoz sml-push-y2 med-push-y3">
              <li>
                <a @click.prevent="scrollTo('#letter')">
                  Read the Letter
                </a>
              </li>
            </ul>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>


    <section id="letter" class="sml-push-y3 med-push-y6">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center">
            <div class="fill-white sml-pad-2 med-pad-4 sml-pad-y3 med-pad-y6">
              <ReadTheLetter/>
            </div>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>

    <section id="logos" class="sml-pad-y3 med-pad-y6">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h2>Logo Cloud</h2>

            <LogoCloud class="sml-push-y2 med-push-y3"/>
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
import ActionNetworkForm from '~/components/ActionNetworkForm'
import SelfieForm from '~/components/SelfieForm'
import FormComplete from '~/components/FormComplete'
import ReadTheLetter from '~/components/ReadTheLetter'
import LogoCloud from '~/components/LogoCloud'

export default {
  components: {
    ActionNetworkForm,
    SelfieForm,
    FormComplete,
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
