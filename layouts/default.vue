<template>
  <div>
    <nuxt/>

    <Modal>
      <SelfieModal v-if="modalType === 'selfie'" :selfie="modalData"/>
      <ArchivedModal v-if="modalType === 'archived'" />
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '~/components/Modal'
import SelfieModal from '~/components/SelfieModal'
import ArchivedModal from '~/components/ArchivedModal'

export default {
  components: {
    Modal,
    SelfieModal,
    ArchivedModal
  },

  computed: {
    ...mapState(['modalType', 'modalData'])
  }
}
</script>
