<template functional>
  <button class="favorites-button" @click="listeners.toggle(props.isProductInFaivor)">
      <svg width="24" height="24" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg">
        <path class="favorites-button__body" :class="{'favorites-button_active': props.isProductInFaivor}" clip-rule="evenodd" d="M15.8 23.08a2.66 2.66 0 01-3.59-.02l-.14-.13C5.07 16.6.49 12.45.67 7.28a7.28 7.28 0 013.12-5.72 7.73 7.73 0 0110.2 1.46C16.36.28 20.7-.86 24.22 1.56a7.28 7.28 0 013.12 5.72c.19 5.17-4.4 9.32-11.4 15.68l-.13.12z"/>
        <path class="favorites-button__ring" :class="{'favorites-button_active': props.isProductInFaivor}" fill-rule="evenodd" clip-rule="evenodd" d="M13.3388 2.78754C15.6855 0.0408721 20.0322 -1.07913 23.5522 1.32087C25.4188 2.60087 26.5922 4.76087 26.6722 7.02754C26.8455 12.2009 22.2722 16.3475 15.2722 22.6942L15.1255 22.8275C14.1122 23.7609 12.5522 23.7609 11.5388 22.8409L11.4055 22.7209L11.325 22.6477C4.37034 16.329 -0.180457 12.1943 0.00549263 7.04087C0.0854926 4.76087 1.25883 2.60087 3.12549 1.32087C6.64549 -1.09246 10.9922 0.0408721 13.3388 2.78754ZM13.3385 20.8675L13.4719 20.7341C19.8185 14.9875 24.0052 11.1875 24.0052 7.33415C24.0052 4.66748 22.0052 2.66748 19.3385 2.66748C17.7111 2.66748 16.0825 3.49668 15.1318 4.75014C14.6868 5.3368 14.0498 5.81415 13.3135 5.81415C12.5813 5.81415 11.9471 5.34264 11.5079 4.75676C10.5655 3.4996 8.96884 2.66748 7.33854 2.66748C4.67188 2.66748 2.67188 4.66748 2.67188 7.33415C2.67188 11.1875 6.85854 14.9875 13.2052 20.7341L13.3385 20.8675Z"/>
      </svg>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.favorites-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  cursor: pointer;

  .favorites-button__body {
    fill: $white;
  }

  &:hover {
    .favorites-button__body {
      fill: $mid-grey-ui;
      transition: all 0.3s ease;
    }
  }

  .favorites-button__ring {
    fill: $azure;

    &.favorites-button_active {
      fill: $fuchsia;
    }
  }
}
</style>
