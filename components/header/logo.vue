<template>
  <old-link class="header-logo" to="/">
    <picture>
      <source
        media="(min-width: 1025px)"
        srcset="/nimages/logo/logo-desktop.svg"
      />
      <source
        media="(min-width: 768px)"
        srcset="/nimages/logo/logo-tablet.svg"
      />
      <img
        class="header-logo__image"
        src="/nimages/logo/logo-mobile.svg"
        alt="Global Rus Trade"
        width="90"
        height="22"
      />
    </picture>
  </old-link>
</template>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;

  @media (min-width: 768px) {
    padding: 16px 0;
  }

  @media (min-width: $desktop-mid) {
    padding: 30px 0 30px;
  }

  .header-logo__image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 90px;
    height: 22px;

    aspect-ratio: 45 / 11;

    @media (min-width: $pad) {
      width: 112px;
      height: 40px;

      aspect-ratio: 14 / 5;
    }

    @media (min-width: $desktop-mid) {
      width: 224px;
      height: 99px;

      aspect-ratio: 224 / 99;
    }
  }
}
</style>
