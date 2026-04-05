<template>
  <div class="question-tooltip">
    <div class="question-tooltip__icon">
      ?
    </div>
    <span class="question-tooltip__content">
        {{text}}
    </span>
  </div>
</template>

<script>
export default {
  name: "Question",

  props: {
    filter: Object,
    text: '',
  }
}
</script>

<style lang="scss">

.question-tooltip {
  display: inline-block;
  margin: 0 0 0 8px;

  &__icon {
    position: relative;

    width: 15px;
    height: 15px;
    line-height: 13px;

    box-sizing: border-box;

    font-size: 10px;

    border-radius: 50%;
    color: $text-black;
    border: 1px solid #b8b8b8;
    text-align: center;
    cursor: pointer;
    pointer-events: auto;

    &::after {
      position: absolute;
      left: -5px;
      top: 15px;
      z-index: 20;

      width: 0;
      height: 0;

      content: "";
      border-style: solid;
      border-width: 0 11px 10px 11px;
      border-color: transparent transparent $white transparent;
      opacity: 0;
      transition: all ease-out 250ms;
    }

    &:hover {
      & + .question-tooltip__content {
        z-index: 10;

        opacity: 1;
        transition: opacity ease-in 250ms;
      }

      &::after {
        z-index: 20;

        opacity: 1;
        transition: opacity ease-in 250ms;
      }
    }
  }

  &__content {
    position: absolute;
    top: calc(100% + 10px);//100% + высота стрелки
    left: -10px;
    z-index: -1;

    width: 260px;
    padding: 12px;
    box-sizing: border-box;

    font-size: 13px;
    font-weight: normal;
    text-align: left;

    opacity: 0;
    background: $white;
    box-shadow: 0 0 10px 3px $grey;
    border: 1px solid $grey;
    border-radius: 4px;
    transition: opacity ease-in 250ms;

    @media (max-width: $desktop-mid) {
      width: 100%;
      left: 0;
    }
  }
}
</style>
