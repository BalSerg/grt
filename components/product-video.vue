<template>
  <div ref="videoRef" class="product-video">
    <div v-if="isYoutube">
      <iframe
        width="787"
        height="787"
        class="product-video__embed"
        :src="src"
        :title="title"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        preload="none"
      ></iframe>
    </div>

    <video
      v-else
      class="product-video__embed"
      :src="src"
      controls
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    isYoutube() {
      return this.src.includes('youtube.com');
    }
  }
}
</script>

<style lang="scss">
.product-video__embed {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
</style>
