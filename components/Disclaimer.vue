<template>
  <p class="sml-push-y1 text-meta text-center">
    <small>
      <a v-if="org == 'dp'" href="https://www.demandprogress.org" target="_blank">
        Demand Progress</a>
      <a v-else href="https://www.fightforthefuture.org" target="_blank">
        Fight for the Future</a>
      will email you updates, and you can unsubscribe at any time. If
      you enter your number (it&rsquo;s optional) we will follow up by SMS.
      Message &amp; data rates apply. You can always text STOP to stop
      receiving messages.
      <a href="https://www.battleforthenet.com/privacy/" target="_blank">
        Privacy Policy</a>
    </small>
  </p>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['org'])
}
</script>
