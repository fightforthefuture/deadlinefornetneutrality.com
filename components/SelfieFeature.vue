<template>
  <div v-if="selfie" class="text-center">
    <div class="selfie-wrapper">
      <img v-if="selfie.photo"
           :src="selfie.photo"
           :alt="`${selfie.name}`"
           class="grid-center"/>
    </div> <!-- .selfie-wrapper -->
    <blockquote v-if="selfie.comment" class="sml-push-y1" >{{ selfie.comment }}</blockquote>
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
