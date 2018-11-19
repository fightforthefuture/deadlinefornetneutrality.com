<template>
  <header class="page-header">
    <div class="wrapper">
      <div class="row">
        <div class="sml-c6 med-c8">
          <a href="/" class="logo">
            <div class="back">
              <img src="~assets/images/arrow-left.svg" alt="Back to home" />
            </div> <!-- .back -->
            <div class="sml-hide med-show">
              <h3>Congress, time<br>is running out</h3>
              <Countdown :abbr="true" class="text-warn"/>
            </div> <!-- hide and show -->
          </a>
        </div> <!-- .c -->
        <div class="sml-c6 med-c4">
          <div class="flex-row sml-push-y2">
            <p class="text-meta text-right sml-hide lrg-show">
              <strong>Filter by state:</strong>
            </p>
            <form>
              <select v-model="selectedState" @change="fetchSelfies(selectedState)">
                <option :value="null">Show all states</option>
                <option v-for="(name, code) in states" :key="code" :value="code">
                  {{ name }}
                </option>
              </select>
            </form>
          </div> <!-- .flex-row -->
        </div> <!-- .c -->
      </div> <!-- .row -->
    </div> <!-- .wrapper -->
  </header>
</template>

<script>
import US_STATES from '~/assets/data/states.json'
import Countdown from '~/components/Countdown'

export default {
  components: {
    Countdown
  },

  data () {
    return {
      selectedState: null
    }
  },

  computed: {
    states() { return US_STATES }
  },

  async created() {
    // Fetch selfies (optionally via `/?state=XX` in url query param)
    let newState = this.$route.query.state ? this.$route.query.state.toUpperCase() : null
    if (newState && US_STATES[newState]) {
      this.selectedState = newState
      this.fetchSelfies(this.selectedState)
    } else {
      this.fetchSelfies(null)
    }
  },

  methods: {
    fetchSelfies(newState) {
      if (newState) {
        this.$store.dispatch('getSelfies', { state: newState.toLowerCase() })
      } else {
        this.$store.dispatch('getSelfies', { page: 1 })
      }
    }
  }
}
</script>
