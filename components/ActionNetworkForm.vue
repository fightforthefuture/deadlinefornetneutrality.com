<template>
  <div>
    <h2 class="text-center">
      Enter your information below to sign the petition.
    </h2>

    <form @submit.prevent="submitForm()"
          class="sml-push-y2 med-push-y3">
      <p class="text-warn" v-if="errorMessage">{{ errorMessage }}</p>
      <div class="flex-row">
        <input v-model="name" type="text" placeholder="Name*" required>
        <input v-model="email" type="email" placeholder="Email*" required>
      </div> <!-- .flex-row -->
      <div class="flex-row sml-push-y2">
        <input v-model="address" type="text" placeholder="Address"
               class="sml-flex-2">
        <input v-model="zipCode" type="tel" placeholder="ZIP Code">
        <input v-model="phone" type="tel" placeholder="Phone #"
               class="sml-flex-2">
      </div> <!-- .flex-row -->

      <button class="btn btn-block sml-push-y2 med-push-y3" :disabled="isSending">
        <span v-if="isSending">
          Sending...
        </span>
        <span v-else>
          Take action
        </span>
      </button>
      <p class="sml-push-y1"><small>
        <a href="https://www.fightforthefuture.org/" target="_blank">
          Fight for the Future</a>
        will email you updates, and you can unsubscribe at any time. If
        you enter your number (it&rsquo;s optional) we will follow up by SMS.
        Message &amp; data rates apply. You can always text STOP to stop
        receiving messages.
        <a href="https://www.battleforthenet.com/privacy/" target="_blank">
          Privacy Policy</a>
      </small></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { sendToMothership } from '~/assets/js/helpers'

export default {
  data() {
    return {
      isSending: false,
      errorMessage: null,
      // form fields
      name: null,
      email: null,
      address: null,
      zipCode: null,
      phone: null
    }
  },

  methods: {
    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        const response = await sendToMothership({
          subject: "TODO: subject",
          member: {
            first_name: this.name,
            email: this.email,
            street_address: this.address,
            postcode: this.zipCode,
            phone: this.phone,
            country: 'US'
          },
          hp_enabled: 'true',
          guard: '',
          // contact_congress: 1, // TODO: Optional
          // fcc_ecfs_docket: "17-108", // TODO: Optional
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: this.$store.state.anPetitionId
          // action_comment: TODO add if desired
        })

        this.$trackEvent('petition_form', 'submit')
        this.isSending = false
        this.$store.commit('setFormStep', 2)
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "Sorry, that didn’t work for some reason. Please try again."
      }
    },
  }
}
</script>
