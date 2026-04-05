<template>
      <nuxt-link :to="langTo"><slot/></nuxt-link>
</template>

<script>
  export default {
    props : {
      to : String,
    },
    data(){
      const lang = this.$cookies.get('lang');
      if(!lang || lang=='en')
        this.langTo = this.to;
      else
        this.langTo = '/'+lang+this.to;
      return {};
    }
  }
</script>
