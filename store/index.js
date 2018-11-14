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
      countdownEndDateTime: config.countdownEndDateTime,
      map: {
        zoom: null,
        currentPin: null
      },
      formStep: 1,

      // form fields
      name: null,
      email: null,
      address: null,
      zipCode: null,
      phone: null,

      // selfie form
      photoSource: null,
      selfie: {}
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
      },

      setName(state, value) {
        state.name = value
      },

      setEmail(state, value) {
        state.email = value
      },

      setAddress(state, value) {
        state.address = value
      },

      setZipCode(state, value) {
        state.zipCode = value
      },

      setPhone(state, value) {
        state.phone = value
      },

      setPhotoSource(state, value) {
        state.photoSource = value
      },

      setSelfie(state, value) {
        state.selfie = value
      }
    }
  })
}

export default createStore
