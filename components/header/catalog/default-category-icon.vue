<template>
  <svg class="catalog__item-icon-svg" width="20" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.63 8.8a.4.4 0 10.8 0c-.01-.88-.72-1.6-1.6-1.6a1.6 1.6 0 00-1.58 1.6.4.4 0 10.8 0c0-.44.35-.8.78-.8.44 0 .8.36.8.8zM13.17 7.2a1.6 1.6 0 00-1.59 1.6.4.4 0 10.8 0c0-.44.35-.8.79-.8a.8.8 0 01.79.8.4.4 0 10.8 0c-.01-.88-.72-1.6-1.6-1.6z" fill="#007aff"/>
    <path d="M19.1 5.6V0H.9v5.6H.5V24h19V5.6h-.4zm-.99 0l-2.05-2.76L18.08.8h.23v4.8h-.2zm-13.26 0V2.77c0-.02 0-.05-.02-.07v-.05l-.02-.03-.04-.06-.03-.04L3.04.8h13.92l-1.7 1.72-.03.04-.04.06-.01.03-.01.05-.02.07V5.6H4.85zm-1.97 0L4.05 4v1.6H2.88zM15.94 4l1.19 1.6h-1.2V4zM1.69.8h.23l2.02 2.04L1.89 5.6h-.2V.8zM18.7 23.2H1.29V6.4h17.42v16.8z" fill="#007aff"/>
    <path d="M13.17 8.4a.4.4 0 00-.4.4v2.4c0 1.54-1.24 2.8-2.77 2.8a2.79 2.79 0 01-2.77-2.8V8.8a.4.4 0 00-.4-.4.4.4 0 00-.4.4v2.4c0 1.99 1.6 3.6 3.57 3.6a3.59 3.59 0 003.56-3.6V8.8a.4.4 0 00-.4-.4z" fill="#007aff"/>
  </svg>
</template>

<style lang="scss" scoped>
.catalog__item {
  &:hover {
    .catalog__item-icon-svg {
      filter: grayscale(0);
    }
  }

  &-icon-svg {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: scale-down;
    filter: grayscale(1);
    flex-shrink: 0;
    margin-right: 10px;
  }
}
</style>

