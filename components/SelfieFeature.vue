<template>
  <div v-if="selfie" class="text-center">
    <div class="selfie-wrapper">
      <img v-if="selfie.photo"
           :src="selfie.photo"
           :alt="`${selfie.name}`"
           class="grid-center"/>
      <div v-if="selfie.first_time_voter"
           class="is-first-time-voter">
        1st Time Voter
      </div> <!-- .is-first-time-voter -->
    </div> <!-- .selfie-wrapper -->
    <blockquote class="sml-push-y1"
        v-text="selfie.comment ? selfie.comment : 'I\'m voting for Net Neutrality!'">
    </blockquote>
    <p v-if="selfie.name" class="sml-push-y-half">
      <strong>
        {{ selfie.name }}
        <span v-if="selfie.location">
          from {{ selfie.location }}
        </span>
      </strong>
    </p>
  </div> <!-- v-if -->
</template>

<script>
export default {
  props: {
    selfie: {
      type: Object,
      required: true
    }
  }
}
</script>
