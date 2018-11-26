import Vuex from 'vuex'
import config from '~/config'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      org: 'fftf',
      anPetitionId: config.actionNetworkPetitionId,
      donateUrl: config.donateUrl,
      letterText: config.letterText,
      modalVisible: false,
      modalType: null,
      modalData: null,
      mapboxToken: config.mapboxToken,
      countdownEndDateTime: config.countdownEndDateTime,
      map: {
        zoom: null,
        currentPin: null
      },
      formStep: 1,

      // Selfies Feed
      selfies: null,
      selfiesCurPageNum: 1,

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
      setOrg(state, value) {
        state.org = value
      },

      setModalVisibility(state, value) {
        state.modalVisible = value
      },

      setModalType(state, value) {
        state.modalType = value
      },

      setModalData(state, value) {
        state.modalData = value
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
      },

      setSelfies(state, value) {
        state.selfies = value
        state.selfiesCurPageNum = 1
      },

      addSelfies(state, value) {
        state.selfies.data = state.selfies.data.concat(value.data)
        state.selfies.pages = value.pages
      },

      setSelfiesCurPageNum(state, value) {
        state.selfiesCurPageNum = value
      }
    },
    actions: {
      async getSelfies({ commit, state }, query) {
        let q = ''
        if (query && query.page) {
          q = `-page${query.page}`
        } else if (query && query.state) {
          q = `-${query.state}`
        }

        try {
          const { data } = await axios.get(`https://data.battleforthenet.com/deadline/selfies${q}.json`)
          if (query && query.page > 1) {
            commit('addSelfies', data)
          } else {
            commit('setSelfies', data)
          }
        }
        catch (error) {
          console.log("Something went wrong with fetching the selfies")
        }
      },

      openSelfieModal({ commit, state }, selfie) {
        commit('setModalVisibility', true)
        commit('setModalType', 'selfie')
        commit('setModalData', selfie)
      }
    }
  })
}

export default createStore
