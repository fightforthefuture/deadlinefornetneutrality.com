<style lang="scss" scoped>
.countdown {
  min-height: $font-size-6 * $base-line-height;
}
</style>

<template>
  <h6 class="countdown">
    <transition name="fade">
      <span v-if="now">
        {{countdown.days}} Days {{countdown.hours}} Hours {{countdown.minutes}}
        Minutes {{countdown.seconds}} Seconds
      </span>
    </transition>
  </h6>
</template>

<script>
export default {
  data() {
    return {
      now: null
    }
  },

  computed: {
    endDateTime () {
      return new Date(this.$store.state.countdownEndDateTime).getTime()
    },
    countdown () {
      if (this.now) {
        let delta = this.endDateTime - this.now;

        return {
          days: Math.floor(delta / (1000 * 60 * 60 * 24)),
          hours: Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((delta % (1000 * 60)) / 1000)
        }
      }
    }
  },

  created() {
    this.startCountdown();
  },

  methods: {
    startCountdown() {
      let secondCountdown = setInterval(() => {
        this.now = new Date().getTime()
      }, 1000);
    }
  }
}
</script>
