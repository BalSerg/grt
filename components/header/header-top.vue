<template>
  <div class="header-top">
    <div class="container">
      <div class="header-row">
        <Links/>
        <Currency
          v-if="currencyList"
          :currency-list="currencyList"
        />
        <Langs/>
      </div>
    </div>
  </div>
</template>

<script>
import Links from '@/components/header/links';
import Currency from '@/components/header/currency';
import Langs from '@/components/header/langs';
import { CookieName } from '@/assets/js/const'

export default {
  component: {
    Links,
    Currency,
    Langs,
  },
  props: {
    currencyList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.header-top {
  background: linear-gradient(88.73deg, #2372eb 5.54%, #fc3f71 93.84%);
  color: #ffffff;
  font-size: 13px;
  line-height: 1;
  padding: 9px 0;

  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.dropdown {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: center;

  .dropdown-label {
    cursor: pointer;
  }

  .dropdown-options {
    position: absolute;
    background-color: #ffffff;
    min-width: 180px;
    padding: 5px 0;
    border-radius: 12px;
    opacity: 0;
    visibility: hidden;
    top: 100%;
    right: 0;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    text-align-last: left;
    flex-grow: 1;
    height: 0;
    overflow: hidden;
    z-index: 1200;
    transition: height linear 200ms;

    &::before {
      position: absolute;
      top: -10px;
      right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 10px 8px;
      border-color: transparent transparent #ffffff transparent;
    }

    .dropdown-container {
      border-radius: 12px;
      max-height: 100%;
      overflow-y: auto;
      margin: 5px 10px;
      padding: 8px 0;
    }

    .dropdown-container::-webkit-scrollbar {
      background-color: #ffffff;
      border-radius: 0 12px 12px 0;
      width: 16px;
    }

    /* background of the scrollbar except button or resizer */
    .dropdown-container::-webkit-scrollbar-track {
      background-color: #ffffff;
      border-radius: 0 12px 12px 0;
    }

    .dropdown-container::-webkit-scrollbar-track:hover {
      background-color: #f4f4f4;
    }

    /* scrollbar itself */
    .dropdown-container::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 5px solid #ffffff;
    }

    .dropdown-container::-webkit-scrollbar-thumb:hover {
      background-color: #a0a0a5;
      border: 4px solid #f4f4f4;
    }

    /* set button(top and bottom of the scrollbar) */
    .dropdown-container::-webkit-scrollbar-button {
      display: none;
    }

    .dropdown-option {
      padding: 5px 10px;
      background-color: #ffffff;
      transition: all linear 140ms;
      color: #131313;
      flex-shrink: 0;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background-color: rgb(201, 245, 253);
      }
    }
  }

  .dropdown-overlay {
    position: fixed;
    z-index: 499;
    background-color: transparent;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    display: none;
    transition: opacity 200ms linear;
  }

  &.dropdown-active {
    .dropdown-options {
      visibility: visible;
      opacity: 1;
      height: auto;
      max-height: 220px;
      overflow: visible;
    }

    .dropdown-overlay {
      visibility: visible;
      opacity: 1;
      display: block;
    }
  }
}
</style>
