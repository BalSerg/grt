import API from 'assets/js/const.api'
import {getStringifiedQueriesFrom, handleFetchError, isEmptyObject, setIsFavorite} from '@/assets/js/util'
import { NOT_FOUND } from '@/assets/js/const'


// Слишком много надо переделывать. Дерьмо полное. Оставлю на потом, когда разберусь с Избранным. В него упираемся.
// for components/catalog/catalog-goods.vue

export const state = () => ({
  catalogProducts: {}
})

export const getters = {

}

export const mutations = {
  SET_PRODUCTS(state, cartSet) {
    if (this.isUserHasNoFavorites) {
      return products
    }

    return products.map(product => setIsFavorite(product, this.user))
  }
}

export const actions = {
  async FETCH_CATALOG_PRODUCTS({commit}, {query, baseUrl, encodedSlug}) {
    const filterQueriesString = !isEmptyObject(query)
      ? `/?${getStringifiedQueriesFrom(query)}`
      : '';

    const productsUrl = `${baseUrl}/${encodedSlug}/products${filterQueriesString}`;

    await this.$axios.$get(productsUrl)
      .then(({result}) => commit('SET_PRODUCTS', result))
      .catch(err => handleFetchError(err))

    this.products = this.getProductsMergedWithFavs(result);

    if (process.server && result.length === 0) {
      const { res } = this.$nuxt.context;
      res.statusCode = NOT_FOUND;
    }
  },
}
