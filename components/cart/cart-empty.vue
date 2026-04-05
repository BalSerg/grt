<template>
  <section class="dummy">
    <img src="~/static/nimages/cart/noCartOrder.svg"/>
    <div class="dummy__repriment">
      {{ $t('cart.your_basket_is_empty') }}
    </div>
    <div class="dummy__suggestion">
      {{ $t('cart.go_to') }}
      <NuxtLink :to="localePath('/catalog/products/')">{{
          $t('cart.the_catalog')
        }}
      </NuxtLink>
      {{ $tc('cart.and_choose_a_product', productsCount) }}
    </div>
  </section>
</template>

<script>
export default {
  name: "CartEmpty",
  props: {
    productsCount: {
      type: Number
    }
  }
}
</script>
