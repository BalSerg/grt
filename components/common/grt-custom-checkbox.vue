<template>
  <label class="grt-custom-checkbox">
    <input class="grt-custom-checkbox__input" type="checkbox">
    <svg class="grt-custom-checkbox__svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
      <path class="grt-custom-checkbox__svg-border" fill="#007aff" d="M16 0H2a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V2a2 2 0 00-2-2z"/>
      <path class="grt-custom-checkbox__svg-bg" fill="#ffffff" d="M15 16H3a1 1 0 01-1-1V3c0-.5.5-1 1-1h12c.6 0 1 .5 1 1v12c0 .6-.4 1-1 1z"/>
      <path class="grt-custom-checkbox__svg-checkmark" fill="none" d="M7.6 13.7a1 1 0 01-1.5 0L2.3 9.9a1 1 0 010-1.4 1 1 0 011.5 0l3 3 7.4-7.2a1 1 0 011.5 0c.4.4.4 1 0 1.5l-8 7.9z"/>
    </svg>
    <slot></slot>
  </label>
</template>

<style lang="scss">
.grt-custom-checkbox {
  --cb-size: 18px;

  display: flex;
  align-items: center;
  column-gap: 19px;

  cursor: pointer;
}

.grt-custom-checkbox__input {
  position: absolute;

  width: var(--cb-size);
  height: var(--cb-size);
  margin: 0;

  opacity: 0.00001;
}

.grt-custom-checkbox__svg {
  flex-shrink: 0;
  width: var(--cb-size);
  height: var(--cb-size);

  * {
    transition: all 0.1s linear;
  }
}

.grt-custom-checkbox__input:checked + .grt-custom-checkbox__svg {
  .grt-custom-checkbox__svg-bg {
    fill: #2f80ed;
  }

  .grt-custom-checkbox__svg-checkmark {
    fill: #ffffff;
  }
}
</style>
