<template>
  <div>
    <h1 class="sml-push-y2 med-push-y3 text-center">
      Congress, time is running out to save the internet
    </h1>
    <p class="sml-push-y2 med-push-y3 text-center">
      We&rsquo;re days away from the deadline. Tell your elected
      officials: &ldquo;Vote to save net neutrality. Your
      decision will alter the course of human history, for better or
      for worse.&rdquo;
    </p>

    <form @submit.prevent="submitForm()" class="sml-push-y2 med-push-y3">
      <p class="text-warn" v-if="errorMessage">{{ errorMessage }}</p>
      <div class="flex-row">
        <input v-model="name" type="text" placeholder="Name*" required>
        <input v-model="email" type="email" placeholder="Email*" required>
      </div> <!-- .flex-row -->
      <div class="flex-row sml-push-y1">
        <input v-model="address" type="text" placeholder="Address"
               class="sml-flex-2">
        <input v-model="zipCode" type="tel" placeholder="ZIP*" required>
        <input v-model="phone" type="tel" placeholder="Phone #"
               class="sml-flex-2">
      </div> <!-- .flex-row -->

      <button class="btn btn-block sml-push-y1" :disabled="isSending">
        <span v-if="isSending">
          Sending...
        </span>
        <span v-else>
          Take action
        </span>
      </button>
      <p class="sml-push-y1 text-meta text-center"><small>
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
      errorMessage: null
    }
  },

  computed: {
    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('setName', value)
      }
    },

    email: {
      get() {
        return this.$store.state.email
      },
      set(value) {
        this.$store.commit('setEmail', value)
      }
    },

    address: {
      get() {
        return this.$store.state.address
      },
      set(value) {
        this.$store.commit('setAddress', value)
      }
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },
      set(value) {
        this.$store.commit('setZipCode', value)
      }
    },

    phone: {
      get() {
        return this.$store.state.phone
      },
      set(value) {
        this.$store.commit('setPhone', value)
      }
    }
  },

  methods: {
    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        const response = await sendToMothership({
          subject: "Deadline for Net Nutrality",
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
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: this.$store.state.anPetitionId
        })

        if (this.phone) {
          this.startTextFlow()
        }

        this.$trackEvent('petition_form', 'submit')
        this.isSending = false
        this.$store.commit('setFormStep', 2)
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "Sorry, that didn’t work for some reason. Please try again."
      }
    },

    startTextFlow() {
      axios.post('https://text-flow-starter.fftf.xyz/opt-ins', {
        opt_in_path: 'OPA87027D0EB3B606B1A60DB391DCA2033',
        phone: this.phone,
        name: this.name,
        email: this.email,
        zip_code: this.zipCode,
        street: this.address
      })
      .catch(console.error)
    }
  }
}
</script>
