import { fetchControl } from '@/plugins/vuexPlugins'
import { FETCH_HEADER } from '~/store/header'

export const actions = {
  // https://nuxtjs.org/docs/directory-structure/store/#the-nuxtserverinit-action
  async nuxtServerInit({ commit, dispatch }, { req }) {
    await dispatch('header/' + FETCH_HEADER)

    const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
    const isRuLang = headers['accept-language']?.includes('ru');
    await commit('tech/SET_FNER', !isRuLang)
  },
}

export const plugins = [fetchControl]
