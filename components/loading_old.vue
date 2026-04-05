<template>
  <div class="header-loader" :class="{ 'loading': loading }"/>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start () {
      this.loading = true;
    },
    finish () {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
}
</script>

<style lang="scss" scoped>
.header .header-loader {
  display: block;
}

.header-loader {
  display: none;
  height: 4px;
  background-color: $grt-blue;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    width: 33%;
    height: 4px;
    content: "";
    position: absolute;
    transition: all linear 2s;
  }

  &::before {
    background-color: #fc3f71;
    left: 0;
  }

  &::after {
    background-color: #1ad6ba;
    right: 0;
  }

  @keyframes loading {
    50% {
      width: 50%;
    }
  }

  &.loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 300;
    height: 2px;

    &::before,
    &::after {
      animation: loading ease infinite 4s;
    }

    @media (min-width: 768px) {
      display: block;
    }
  }
}
</style>
