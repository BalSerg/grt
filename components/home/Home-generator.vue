<template>
  <div class="homepage">
    <component
      :is="item.component"
      v-for="item in data"
      :key="item.data.length"
      :collection-data="item.data"
    ></component>
    <benefitsHome />

  </div>
</template>

<script>
export default {
  components: {
    news: () => import("./news"),
    events: () => import("./events"),
    benefitsHome: () => import("./benefitsHome"),
    // collections
    slider: () => import("@/components/home/collections/slider/slider"),
    "categories-collection": () =>
      import(
        "@/components/home/collections/categories-collection/categories-collection"
      ),
    "categories-collection-1r-3b-2c": () =>
      import(
        "@/components/home/collections/categories-collection/categories-collection-1r-3b-2c"
      ),
    "categories-collection-2r-1b-12c": () =>
      import(
        "@/components/home/collections/categories-collection/categories-collection"
      ),
    "brands-collection": () =>
      import(
        "@/components/home/collections/brands-collection/brands-collection"
      ),
    "brands-collection-1r-4b-2br" : () =>
      import(
          "@/components/home/collections/brands-collection/brands-collection-1r-4b-2br"
        ),
    "banners-collection-1b": () =>
      import(
        "@/components/home/collections/banners-collection/banners-collection"
      ),
    "banners-collection-2b": () =>
      import(
        "@/components/home/collections/banners-collection/banners-collection"
      ),
    "banners-collection-3b": () =>
      import(
        "@/components/home/collections/banners-collection/banners-collection-3b"
      ),
    "banners-collection-4b": () =>
      import(
        "@/components/home/collections/banners-collection/banners-collection"
      ),
    "products-collection-1r-1b-5p": () =>
      import(
        "@/components/home/collections/products-collection/common-products-collection"
      ),
    "products-collection-1r-6p": () =>
      import(
        "@/components/home/collections/products-collection/common-products-collection"
      ),
    "products-collection-2r-12p": () =>
      import(
        "@/components/home/collections/products-collection/common-products-collection"
      ),
    "products-collection-2r-8p-1b": () =>
      import(
        "@/components/home/collections/products-collection/products-collection-2r-8p-1b"
      ),
    // "collectionSlider": () =>
    //   import(
    //     "@/components/home/collection-slider"
    //     ),
    //  twoSixTwo: () => import("@/components/home/collections/twoSixTwo")
  },
  props: {
    data: Array,
  },
  data() {
    return {};
  },
};
</script>
