<template>
  <section class="promo">
    <div v-for="banner in data" :key="banner.id" class="promo__item" :style="{backgroundImage: 'url('+banner.img+')'}">
      <a :href="banner.link"></a>
    </div>
  </section>
</template>

<script>
export default {
  props: {data: Array},
  data(){
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.promo {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 -10px;

  &__item {
    flex-grow: 1;
    height: 345px;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 10px;
    background-color: #eeeeee;
    background-position: 50% 50%;
    flex-shrink: 1;
    cursor: pointer;
    position: relative;

    a {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  }
}
</style>
