import merge from 'lodash.merge'

export const UPDATE_HEADER = 'UPDATE_HEADER'
export const state = () => ({
  productsCount: 170000, // sample init before fetch
  currencies: ['RUB', 'USD', 'EUR'],
  promoLinks: [],
})

export const mutations = {
  [UPDATE_HEADER](state, header) {
    merge(state, header)
  },
}

export const FETCH_HEADER = 'FETCH_HEADER'
export const actions = {
  async [FETCH_HEADER]({ commit }) {
    const preview = this.app.router.currentRoute.query.preview === 'true'
    await this.$axios
      .$get(`/napi/catalog-search/header/?preview=${preview}`)
      .then(({ result }) => commit(UPDATE_HEADER, result))
  },
}
