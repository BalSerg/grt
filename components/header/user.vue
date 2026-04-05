<template>
  <div class="header-tool__wrapper">
    <div v-if="!loaded" class="header-tool__blank"></div>
    <div v-if="loaded" class="header-tool" :class="{ 'active': active }" @click="active = !active">
      <div class="header-tool__icon">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7c0-2.763 2.238-5 5-5 2.763 0 5 2.237 5 5 0 2.762-2.237 5-5 5-2.762 0-5-2.238-5-5zm5 8.382c3.713 0 7.903 2.068 7.903 2.868v1.687H4.132v-1.93c0-.8 4.155-2.625 7.868-2.625zm0-2.132c-3.338 0-10 1.675-10 5v2.5c0 .687.563 1.25 1.25 1.25h17.5c.688 0 1.25-.563 1.25-1.25v-2.5c0-3.325-6.662-5-10-5zm0-3.481a2.778 2.778 0 100-5.555 2.778 2.778 0 000 5.555z" fill="#282828"></path>
        </svg>
      </div>
      <div class="header-tool__text">
        {{ $t('header.enter') }}
      </div>
      <div class="header-tool__badge"></div>
      <div class="header-tool__context">
        <div class="context-block">
          <div class="context-block__container">
            <p style="width: 460px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget vulputate lacus, vitae ornare dolor. Donec sagittis nec arcu in finibus. Duis sit amet porttitor sem, ut egestas dui. Morbi non egestas neque, a blandit mauris. Maecenas sit amet maximus dui. Ut vel ultricies nisi. Phasellus vitae fringilla risus.</p>
            <p>Sed neque augue, luctus eget mollis eu, cursus vitae lectus. Maecenas eget nibh quis mauris congue tincidunt. Fusce aliquet nunc et orci malesuada, sit amet blandit elit vulputate. Quisque molestie eleifend sapien in fermentum. Donec ullamcorper leo nec suscipit luctus. Phasellus nulla tellus, faucibus sit amet elementum quis, egestas vel eros. Duis eget pulvinar mauris. Suspendisse et ultricies sem, id congue diam. Curabitur vitae elit dolor. Aenean sagittis fermentum mauris sit amet egestas.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      loaded: true,
      active: false
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   this.loaded = !this.loaded
    // },1000)
  }
}
</script>

<style lang="scss">
.header-tool__blank {
  animation-delay: 0.25s;
}
</style>
