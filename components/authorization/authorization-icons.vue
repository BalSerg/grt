<template>
  <div class="authorization-icons">
    <!--    <a :href="facebookPath" rel="noreferrer" target="_self"><img-->
    <!--      alt="" src="/nimages/icons/common/facebook.png"/></a>-->
    <a :href="googlePath" rel="noreferrer" target="_self" @click="onChooseGoogle"><img
      alt="" src="/nimages/icons/common/google.png"/></a>
    <!--    <a href="/" rel="noreferrer" target="_self"><img src="/nimages/icons/common/telegram.png"/></a>-->
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "AuthorizationIcons",
  computed: {
    facebookPath() {
      return `/napi/auth2/oauth/facebook?path=${this.$route.fullPath}`;
    },
    googlePath() {
      return `/napi/auth2/oauth/google?path=${this.$route.fullPath}`;
    }
  },
  methods: {
    onChooseGoogle() {
      localStorage.setItem('GOOGLE', 'true')
    }
  }
}
</script>

<style lang="scss">
.authorization-icons {
  display: flex;
  justify-content: center;

  > a {
    margin: 0 16px 0 0;
    height: 40px;

    cursor: pointer;

    animation: rotation 10s ease-out infinite 50s;

    &:nth-of-type(2) {
      animation-delay: 50.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 50.4s;
    }

    &:nth-of-type(4) {
      margin: 0;
      animation-delay: 50.6s;
    }
  }
}

@keyframes rotation {
  5% {
    transform: rotate3d(0, 1, 0, 180deg) scale(-1, 1);
  }

  100% {
    transform: rotate3d(0, 1, 0, 180deg) scale(-1, 1);
  }
}
</style>
