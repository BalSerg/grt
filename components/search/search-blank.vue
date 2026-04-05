<template>
  <div class="search-result blank">
    <h3>{{$t('search.blank.title')}}</h3>
    <p>{{$t('search.blank.description')}}</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.search-result {
  &.blank {
    min-height: 50vh;
    padding: 50px 0;
    color: $text-black;

    @media screen and (max-width: $desktop-mid) {
      padding: 90px 0;
    }

    h3 {
      margin-bottom: 10px;
    }
  }
}
</style>
