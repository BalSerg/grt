<template>
  <div class="header-bottom">
    <div class="container">
      <ul class="header-rotated-links">
        <li v-for="promoLink in promoLinks"
            :key="promoLink.id"
            class="header-rotated-links__link-item"
        >
          <old-link class="header-rotated-links__link" :to="promoLink.link">
            <img
              v-if="promoLink.icon"
              class="header-rotated-links__badge"
              :src="`/nimages/icons/common/${promoLink.icon}`"
              :alt="promoLink.name"
            />
              {{ promoLink.name }}
          </old-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    promoLinks: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.header-rotated-links {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;

    list-style: none;

    background-color: #ffffff;

    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none; /* stylelint-disable-line */
      width: 0;
      height: 0;
    }
  }

  .header-rotated-links__link-item {
    display: flex;
    flex-shrink: 0;
    margin: 0 10px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .header-rotated-links__link {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 20px 0;

    font-size: 12px;
    line-height: 1.3;
    font-weight: 600;
    font-family: $main-font-family;
    text-decoration: none;
    color: $text-black;

    &:hover,
    &:focus,
    &:active {
      color: $grt-blue;
    }

    @media (min-width: 768px) {
      padding-top: 0;
      padding-bottom: 16px;
    }

    @media (min-width: $desktop-mid) {
      padding: 0 0 20px;

      font-size: 15px;
    }
  }

  .header-rotated-links__link--active {
    color: $grt-blue;
  }

  .header-rotated-links__badge {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-right: 10px;
    width: 20px;
    height: 20px;

    object-fit: contain;

    @media (min-width: $desktop-mid) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
