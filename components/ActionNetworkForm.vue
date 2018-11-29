<template>
  <div>
    <h1 class="sml-push-y2 med-push-y3 text-center">
      Congress, time is running out to save the internet
    </h1>
    <p class="sml-push-y2 med-push-y3 text-center">
      We&rsquo;re days away from the deadline to overturn the FCC.
      Tell lawmakers: &ldquo;Your decision will impact the future of
      humanity. Vote to save net neutrality before it's too late.&rdquo;
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
      <no-ssr>
        <Disclaimer/>
      </no-ssr>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { sendToMothership } from '~/assets/js/helpers'
import Disclaimer from '~/components/Disclaimer'

export default {
  components: {
    Disclaimer,
  },

  data() {
    return {
      isSending: false,
      errorMessage: null
    }
  },

  computed: {
    org() { return this.$store.state.org },

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
        const actionComment = `${this.$store.state.letterText}\n\nSigned, ${this.name}\n\n\n(The sender of this message generated it using tools available at DeadlineForNetNeutrality.com on ${new Date()}.)`

        const response = await sendToMothership({
          subject: "Vote to save net neutrality before it's too late!",
          contact_congress: 1,
          action_comment: actionComment,
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
          org: this.org,
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: this.org === 'dp' ? this.$store.state.dpPetitionId : this.$store.state.anPetitionId
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
