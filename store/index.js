import Vuex from 'vuex'
import config from '~/config'

const createStore = () => {
  return new Vuex.Store({
    state: {
      anPetitionId: config.actionNetworkPetitionId,
      donateUrl: config.donateUrl,
      letterText: config.letterText,
      modalVisible: false,
      modalType: null,
      mapboxToken: config.mapboxToken,
      map: {
        zoom: null,
        currentPin: null
      },
      formStep: 1
    },
    mutations: {
      setModalVisibility(state, value) {
        state.modalVisible = value
      },

      setModalType(state, value) {
        state.modalType = value
      },

      setMapZoom(state, value) {
        state.map.zoom = value
      },

      setMapCurrentPin(state, value) {
        state.map.currentPin = value
      },

      setFormStep(state, value) {
        state.formStep = value
      }
    }
  })
}

export default createStore
