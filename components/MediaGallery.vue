<style lang="scss" scoped>
$item-width: 250px;
$item-padding: $gutter * 2;

.gallery {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .item {
    background-color: $grey-dark-color;
    width: $item-width;
    height: $item-width;
    margin: $gutter;
    padding: $gutter * 3;
    border-radius: 16px;
    position: relative;
    color: inherit;

    label {
      position: absolute;
      top: $gutter;
      left: $item-padding;
      right: $item-padding;
      width: $item-width - ($item-padding * 2);
    }

    img {
      max-width: $item-width * .6;
      max-height: $item-width * .6;
      margin-bottom: $gutter * 3;
      margin-top: $gutter;
    }

    .btn {
      position: absolute;
      bottom: $gutter;
      left: $item-padding;
      right: $item-padding;
    }

    &:hover {
      cursor: pointer;
      background-color: $grey-color;
      transform: scale(1.02);
      transition: background-color .3s, transform .2s;
    }
  }
}
</style>

<template>
  <div>
    <section v-for="(gallery, id) in galleries" :key="id" :id="id"
             class="text-center sml-push-y4 med-push-y8">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h2>{{ gallery.title }}</h2>
            <p class="sml-push-y2 med-push-y3" v-html="gallery.description"></p>
          </div> <!-- .c -->
        </div> <!-- .row -->

        <div class="gallery sml-push-y2">
          <a v-for="(image, imgId) in visibleImages(gallery)" :key="image" :href="image"
             target="_blank" class="item flex-center">
            <label class="truncate">{{ imageLabel(image, gallery.type, imgId+1) }}</label>
            <img :src="image" :alt="image">
            <span class="btn btn-sml btn-alt">Download</span>
          </a>
        </div>

        <p v-if="preview && !gallery.viewAll" class="sml-push-y1">
          <a :href="`/media/#${id}`">View all</a>
        </p>
        <p v-if="gallery.type === 'external' && gallery.viewAll" class="sml-push-y1">
          <a :href="gallery.viewAll.url">{{ gallery.viewAll.text }}</a>
        </p>
      </div> <!-- .wrapper -->
    </section>
  </div>
</template>

<script>
import galleries from '~/assets/data/media'

export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    galleries: () => galleries
  },

  methods: {
    imageLabel(image, type, id) {
      let label = image.split('/').pop().split('@')[0].replace(/\.(png|jpg|jpeg|gif)$/i, '')
      if (type === 'external') {
        return `${label} (${id})`
      }
      return label
    },

    visibleImages({ images }) {
      const previewImageCount = 3

      if (this.preview) {
        return images.slice(0, previewImageCount)
      }

      return images
    }
  }
}
</script>
