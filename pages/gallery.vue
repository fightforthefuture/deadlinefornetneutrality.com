<template>
  <div>
    <PageHeader/>

    <div class="site-content">
      <section class="sml-pad-y5">
        <div class="wrapper">
          <div class="sml-c12 med-c9 lrg-c8 grid-center text-center">
            <h2>We support Net Neutrality</h2>
          </div> <!-- .c -->

          <SelfieGrid/>
        </div> <!-- .wrapper -->
      </section>
    </div> <!-- .site-content -->

    <Modal>
      <SelfieModal v-if="modalType === 'selfie'" :selfie="modalData"/>
    </Modal>
  </div>
</template>

<script>
import config from '~/config'
import { createMetaTags } from '~/assets/js/helpers'
import { mapState } from 'vuex'
import PageHeader from '~/components/PageHeader'
import SelfieGrid from '~/components/SelfieGrid'
import Modal from '~/components/Modal'
import SelfieModal from '~/components/SelfieModal'

export default {
  layout: 'skeleton',

  components: {
    PageHeader,
    SelfieGrid,
    Modal,
    SelfieModal
  },

  head() {
    return {
      title: `${config.sharing.title} - Selfies`,
      meta: createMetaTags({
        title: config.sharing.title,
        description: config.sharing.description,
        image: config.sharing.image,
        url: config.sharing.url
      }),
      bodyAttrs: {
        class: 'full-width'
      }
    }
  },

  computed: {
    ...mapState(['modalType', 'modalData'])
  }
}
</script>
