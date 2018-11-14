<style lang="scss">
@keyframes blur-in {
  0% {
    opacity: 0;
    filter:blur(25px);
  }
  100% {
    opacity: 1;
    filter:blur(0px);
  }
}

.preview-container {
  overflow: hidden;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: blur-in 2s;
  }

  .overlay {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
  }
}
</style>

<template>
  <div>
    <h2 class="text-center">
      Thanks for signing the letter!<br>
      Take a selfie to share in our gallery
    </h2>

    <form @submit.prevent="submitForm()" class="sml-push-y2 med-push-y3">
      <p class="text-warn" v-if="errorMessage">{{ errorMessage }}</p>
      <div class="row">
        <div class="sml-c12 med-c9 lrg-c8 grid-center">
          <div class="preview-container" :style="{ width: previewWidth, height: previewHeight }" @click="clickPreview">
            <img v-if="!photoSource && !videoStream" src="~assets/images/selfie-default.png" alt="Your image goes here" ref="placeholderImage"/>
            <img v-else-if="photoSource" :src="photoSource" ref="photo">

            <!-- This always needs to be present in the DOM, but should only be
                 visible if there's a video stream -->
            <video v-show="videoStream" autoplay ref="liveView"></video>

            <!-- This will be combined with the uploaded photo -->
            <img src="~/assets/images/selfie-frame.png" alt="" ref="overlay" class="overlay">
          </div>

          <div class="sml-push-y2" v-if="hasWebcam">
            <a class="btn btn-block" @click.prevent="startLiveView()" :disabled="isCapturing">{{ captureButtonText }}</a>
          </div>

          <label class="sml-push-y2 med-push-y3">
            Or Upload image:
            <input type="file" :disabled="isCapturing" @change="uploadPhoto" ref="fileInput">
          </label>

          <label class="sml-push-y2 med-push-y3">
            Tell us why you care about Net Neutrality
          </label>
          <textarea v-model="comment"
                    placeholder="I care about Net Neutrality because...">
          </textarea>

          <button class="btn btn-block sml-push-y2 med-push-y3" :disabled="isSending">
            <span v-if="isSending">
              Sending...
            </span>
            <span v-else>
              Submit my selfie
            </span>
          </button>
          <p class="sml-push-y1"><small>
            TODO: possibly add photo guidelines?
          </small></p>
        </div> <!-- .c -->
      </div> <!-- .row -->
    </form>
    <audio preload="auto" ref="countdownSound">
      <source src="/sounds/countdown.mp3">
    </audio>
    <audio preload="auto" ref="shutterSound">
      <source src="/sounds/shutter.mp3">
    </audio>
  </div>
</template>

<script>
import axios from 'axios'
import { createPNG } from '~/assets/js/selfie'
import { isMobileOS } from '~/assets/js/helpers'

export default {
  data() {
    return {
      videoStream: null,
      previewWidth: '',
      previewHeight: '',
      isCapturing: false,
      captureButtonText: 'Take Photo',
      hasWebcam: false,
      isSending: false,
      errorMessage: null,
      comment: null
    }
  },

  computed: {
    photoSource: {
      get() {
        return this.$store.state.photoSource
      },

      set(value) {
        this.$store.commit('setPhotoSource', value)
      }
    }
  },

  created() {
    this.timers = {}
  },

  async mounted() {
    if (this.$refs.placeholderImage) {
      const self = this
      this.$refs.placeholderImage.onload = function() {
        self.previewWidth = `${this.width}px`
        self.previewHeight = `${this.height}px`
        this.onload = null
      }
    }

    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(d => d.kind === 'videoinput')

    if (videoDevices.length > 0 && !isMobileOS()) {
      this.hasWebcam = true
    }
  },

  destroyed() {
    this.stopLiveView()

    for (let key of Object.keys(this.timers)) {
      clearTimeout(this.timers[key])
    }
  },

  methods: {
    playSound(name) {
      this.$refs[`${name}Sound`].play()
    },

    handleLiveViewError() {
      this.hasWebcam = false
      this.isCapturing = false
      this.videoStream = null
      this.errorMessage = "Couldn't connect to camera 😞"
    },

    async startLiveView() {
      this.photoSource = null

      try {
        const constraits = {
          video: {
            width: 1280,
            height: 720,
            facingMode: 'user'
          },
          audio: false
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraits)

        if (!stream.active) {
          throw new Error('Received inactive video stream')
        }

        // this can't be bound via :srcObject for some reason
        this.$refs.liveView.srcObject = stream

        this.videoStream = stream
        this.isCapturing = true
        this.captureButtonText = 'Creating preview...'

        // some browsers will just hang forever if your laptop is in clamshell mode
        this.timers.captureFail = setTimeout(() => {
          console.error('Failed to start live view!')
          this.handleLiveViewError()
        }, 5000)

        // start countdown when video is ready
        this.$refs.liveView.oncanplay = () => {
          this.countdown(3)
          clearTimeout(this.timers.captureFail)
        }
      }
      catch (error) {
        console.error(error)
        this.handleLiveViewError()
      }
    },

    stopLiveView() {
      if (this.videoStream) {
        this.videoStream.getTracks()[0].stop()
      }
    },

    countdown(seconds) {
      if (seconds > 0) {
        this.captureButtonText = `Taking photo in ${seconds}…`
        this.playSound('countdown')

        this.timers.countdown = setTimeout(() => {
          this.countdown(seconds-1)
        }, 1000);
      }
      else {
        this.playSound('shutter')
        this.takePhoto()
      }
    },

    async createSelfie({ source, file }) {
      this.photoSource = await createPNG({
        sourceElement: source,
        sourceFile: file,
        overlayElement: this.$refs.overlay
      })

      this.isCapturing = false
      this.stopLiveView()
      this.captureButtonText = "Retake Photo"
    },

    takePhoto() {
      this.createSelfie({
        source: this.$refs.liveView
      })
      this.$trackClick('take_photo')
    },

    uploadPhoto(event) {
      this.createSelfie({
        file: event.target.files[0]
      })
      this.$trackClick('upload_photo')
    },

    clickPreview() {
      if (this.hasWebcam) {
        this.startLiveView()
      }
      else {
        this.$refs.fileInput.click()
      }
    },

    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        const { data } = await axios.post('https://selfie-api.fftf.xyz/selfies', {
          photo: this.photoSource,
          comment: this.comment,
          name: this.$store.state.name,
          email: this.$store.state.email,
          zip_code: this.$store.state.zipCode
        })

        this.$trackEvent('selfie_form', 'submit')
        this.isSending = false
        this.$store.commit('setFormStep', 3)
        this.$store.commit('setSelfie', data)
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "Sorry, that didn’t work for some reason. Please try again."
      }
    },
  }
}
</script>
