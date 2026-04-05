<template>
  <div class="header-location" :class="{ 'dropdown-active': active }">
    <div class="header-location__icon">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.47491 1.86915L2.13491 4.93915C1.71991 5.11415 1.72991 5.70415 2.14491 5.86415L4.81491 6.89915C4.94491 6.94915 5.04991 7.05415 5.09991 7.18415L6.12991 9.84915C6.28991 10.2692 6.88491 10.2792 7.05991 9.86415L10.1349 2.52915C10.2999 2.11415 9.88491 1.69915 9.47491 1.86915Z" fill="white"/>
      </svg>
    </div>
    <div class="header-location__label" @click="active = !active">
      {{location}}
    </div>
    <div class="header-location__dropdown">
      asdasd
    </div>
    <div class="header-location__overlay" @click="active = !active"></div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      location: 'Россия, Москва',
      active: false
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.header-location {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  .header-location__icon {
    top: 2px;
    margin-right: 10px;
    position: relative;
  }

  .header-location__label {
    border-bottom: 1px dashed #ffffff;
    cursor: pointer;
    user-select: none;
  }

  .header-location__dropdown {
    position: absolute;
    background-color: #ffffff;
    min-width: 180px;
    padding: 5px 0;
    border-radius: 4px;
    color: #131313;
    visibility: hidden;
    top: 100%;
    left: 0;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    text-align-last: left;
    flex-grow: 1;
    z-index: 500;
    transition: all linear 200ms;

    &::before {
      position: absolute;
      top: -8px;
      left: 60px;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 10px 8px;
      border-color: transparent transparent #ffffff transparent;
    }
  }

  .header-location__overlay {
    position: fixed;
    z-index: 499;
    background-color: transparent;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    visibility: hidden;
  }

  &.dropdown-active {
    .header-location__dropdown,
    .header-location__overlay {
      visibility: visible;
    }
  }
}
</style>
