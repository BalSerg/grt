<template functional>
  <div class="cwi-wrapper header-tool">
    <div>
      <div v-if="props.count > 0" class="header-tool__badge">
        {{ props.count }}
      </div>
      <div class="header-tool__icon">
        <svg width="28" height="27" fill="null" viewBox="0 0 28 27" xmlns="http://www.w3.org/2000/svg">
          <path fill="#282828" fill-rule="evenodd" clip-rule="evenodd"
                d="M20.2398 14.6672H10.3065L8.83984 17.3338H23.5065C24.2398 17.3338 24.8398 17.9338 24.8398 18.6672C24.8398 19.4005 24.2398 20.0005 23.5065 20.0005H8.83984C6.81318 20.0005 5.53318 17.8272 6.50651 16.0405L8.30651 12.7872L3.50651 2.66716H2.17318C1.43984 2.66716 0.839844 2.06716 0.839844 1.33382C0.839844 0.600488 1.43984 0.000488281 2.17318 0.000488281H4.35984C4.86651 0.000488281 5.34651 0.293822 5.55984 0.760488L10.8798 12.0005H20.2398L24.7598 3.82715C25.1065 3.18716 25.9198 2.96049 26.5598 3.30716C27.1998 3.66716 27.4398 4.48049 27.0798 5.12049L22.5732 13.2938C22.1198 14.1205 21.2398 14.6672 20.2398 14.6672ZM8.83985 21.3338C7.37318 21.3338 6.18651 22.5338 6.18651 24.0005C6.18651 25.4672 7.37318 26.6672 8.83985 26.6672C10.3065 26.6672 11.5065 25.4672 11.5065 24.0005C11.5065 22.5338 10.3065 21.3338 8.83985 21.3338ZM22.1732 21.3338C20.7065 21.3338 19.5198 22.5338 19.5198 24.0005C19.5198 25.4672 20.7065 26.6672 22.1732 26.6672C23.6398 26.6672 24.8398 25.4672 24.8398 24.0005C24.8398 22.5338 23.6398 21.3338 22.1732 21.3338Z"/>
        </svg>
      </div>
    </div>
    <div class="header-tool__text">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cwi-wrapper {
  position: relative;
  margin-left: 32px;

  font-size: 13px;
  line-height: 1;
  text-align: center;
  color: $text-black;
  cursor: pointer;

  &:hover {
    & > .cart-icon__text {
      color: $grt-blue;
    }

    svg path {
      fill: $grt-blue;
    }
  }

  .cart-icon__text {
    margin-top: 4px;
  }

  .header-tool__badge {
    position: absolute;
    // right: -11px;
    // top: -16px;
    z-index: 2;
    box-sizing: border-box;
    padding: 3px 7px 4px 7px;
    border-radius: 1em;
    background: $grt-blue;
    line-height: 11px;
    font-size: 11px;
    color: $white;

    &:empty {
      display: none;
    }

    @media screen and (max-width: $pad - 1) {
      font-size: 8px;
      padding: 2px 5px 3px 5px;
    }
  }
}
</style>
