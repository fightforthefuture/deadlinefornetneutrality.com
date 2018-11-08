<template>
  <div>
    <h2 class="text-center">
      Thanks for signing the petition!<br>
      Take a selfie to share in our gallery
    </h2>

    <form @submit.prevent="submitForm()"
          class="sml-push-y2 med-push-y3">
      <p class="text-warn" v-if="errorMessage">{{ errorMessage }}</p>
      <div class="row">
        <div class="sml-c12 med-c9 lrg-c8 grid-center">
          <img src="~assets/images/selfie-default.png" alt="Your image goes here"/>
          <div class="row sml-push-y2">
            <div class="sml-c6">
              <a class="btn btn-block">Take</a>
            </div> <!-- .c -->
            <div class="sml-c6">
              <a class="btn btn-block">Upload</a>
            </div> <!-- .c -->
          </div> <!-- .row -->

          <label class="sml-push-y2 med-push-y3">
            Tell us why you care about Net Neutrality
          </label>
          <textarea v-model="comment"
                    placeholder="I care about Net Neutrality because...">
          </textarea>

          <button class="btn btn-block sml-push-y2 med-push-y3" :disabled="isSending">
            <span v-if="isSending">
              Sending...
            </span>
            <span v-else>
              Submit my selfie
            </span>
          </button>
          <p class="sml-push-y1"><small>
            TODO: possibly add photo guidelines?
          </small></p>
        </div> <!-- .c -->
      </div> <!-- .row -->
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isSending: false,
      errorMessage: null,
      // form fields
      photo: null,
      comment: null
    }
  },

  methods: {
    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        // TODO: Submit Form
        this.$trackEvent('petition_form', 'submit')
        this.isSending = false
        this.$store.commit('setFormStep', 3)
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "Sorry, that didn’t work for some reason. Please try again."
      }

      // FIXME: remove, this is temporary!
      this.$store.commit('setFormStep', 3)
    },
  }
}
</script>
