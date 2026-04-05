<template>
  <main class="page-main homepage">
    <div class="container">
      <HomeGenerator :data="homeData"/>
    </div>
  </main>
</template>

<script>
import HomeGenerator from "@/components/home/Home-generator"

export default {
  name: 'MainPage',
  components: {
    HomeGenerator,
  },
  data() {
    return {
      homeData: [],
    };
  },
  async fetch() {
    try {
      let path = "napi/catalog-search/promo/sections?page=home";

      if (this.$route.query.preview === "true") {
        path = `${path}&preview=true`;
      }
      const {data} = await this.$axios.get(path);
      this.homeData = data.result;
    } catch (err) {
      // TODO: GRT-3993 сделать нормальное логгирование через sentry
      if (err.response && err.response.status === 404) {
        this.$nuxt.context.error({
          statusCode: 404,
          message: "page does not exist",
        });
      } else {
        this.$nuxt.context.error({
          statusCode: 500,
          message: err?.response?.data ? JSON.stringify(err?.response?.data) : "",
        });
      }
    }
  },
  head() {
    return {
      title: this.$t("title"),
    };
  }
}
</script>


<style lang="scss">
.homepage {
  .catalog-product {
    display: flex;
    flex-direction: column;
    padding: 10px;
    transition: none;
    min-width: 140px;
    box-sizing: border-box;

    &__title {
      order: 2;
    }

    .product-card-price {
      order: 1;
    }

    @media screen and (min-width: $desktop-mid) {
      &:hover {
        z-index: 20;
        position: absolute;
        top: -8px;
        left: -5px;
        right: -5px;
        padding: 18px 15px 15px;

        .catalog-product__controls {
          @media screen and (min-width: $pad + 1) {
            display: flex;
          }
        }
      }
    }

    &__controls {
      order: 3;
      display: none;
    }

    &__vendor-code {
      display: none;
    }
  }
}
</style>
