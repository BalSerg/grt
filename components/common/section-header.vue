<template>
  <h2 class="section-title">
    <old-link
      v-if="link.link || link.url"
      classes="section-title__header"
      :to="link.link || link.url"
    >
      {{ link.title }}
      <span class="section-title__goto-link">
        {{ $t("section.header.watch") }}
        <svg
          width="17"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.619 3.004H1.609c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35v1.8z"
            fill="#007AFF"
          />
        </svg>
      </span>
    </old-link>
    <span v-else class="section-title__header">
      {{ link.title }}
    </span>
  </h2>
</template>

<script>
export default {
  props: {
    link: Object,
  },
};
</script>

<style lang="scss">
.section-title {
  display: inline-flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;

  @media (min-width: $pad) {
    justify-content: flex-start;
    margin-bottom: 22px;
  }

  @media (min-width: $desktop-large) {
    margin-bottom: 32px;
  }
}

.section-title__header {
  font-family: $main-font-family;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
  color: $text-black;
  transition: color ease-out 250ms;
  text-decoration: none;

  @media (min-width: $pad) {
    font-size: 28px;
    line-height: 1.4;
  }
}

.section-title:hover,
.section-title:focus {
  a.section-title__header,
  .section-title__goto-link path {
    color: $grt-blue;
    transition: all ease-in 250ms;

    fill: $grt-blue;
  }
}

.section-title__goto-link {
  margin-left: 20px;

  font-family: $main-font-family;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;

  path {
    fill: $text-black;
    transition: fill ease-out 250ms;
  }

  @media (min-width: $pad) {
    font-size: 15px;
    line-height: 1.4;
  }
}
</style>
