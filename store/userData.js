import API from "assets/js/const.api";
import {handleFetchError} from '@/assets/js/util';
import Avatar from "@/static/nimages/account/accountAvatarLogin.svg"

export const state = () => {
  return {
    user: null,
    userIsFetchingNow: false,
    favoriteProductIds: [],
    cart: [],
    avatarSrc: Avatar
    // TODO  надо удалить, но пока где-то востребуется
  }
};

export const getters = {
  user: state => state.user,
  IS_PRODUCT_IN_FAVOR: state => productId => state.favoriteProductIds.includes(productId),
  cart: state => state.cart,    // TODO  надо удалить, но пока где-то востребуется
  getFavoriteProductIds: state => state.favoriteProductIds,
  GET_AVATAR_SRC: state => state.avatarSrc
}

export const mutations = {
  SET_FAVORITE_PRODUCT_IDs(state, ids) {
    state.favoriteProductIds = ids
  },
  SET_AVATAR_SRC(state, src) {
    if (src.includes('napi')) {
      state.avatarSrc = `${src}?t=${Date.now()}`
    } else {
      state.avatarSrc = src
    }
  },
  setUser(state, user) {
    const newUserObj = Object.assign({}, user);
    newUserObj.likes = new Set(
      user.likes.map(x => {
        return parseInt(x, 10);
      })
    );
    state.user = newUserObj;
  },
  // TODO  надо удалить, но пока где-то востребуется
  addGoodsItemToUserFavorites(state, like) {
    state.user.likes.add(like);
  },
  removeGoodsItemFromUserFavorites(state, like) {
    if (state.user.likes.has(like)) {
      state.user.likes.delete(like);
    }
  },
  // TODO  надо удалить, но пока где-то востребуется
  removeUser(state) {
    state.user = null;
  },
  startFetchingUser(state) {
    state.userIsFetchingNow = true;
  },
  releaseFetchingUser(state) {
    state.userIsFetchingNow = false;
  },
  // TODO  надо удалить, но пока где-то востребуется
  setCart(state, products) {
    state.cart = products.slice();
  },
};

export const actions = {
  async HANDLING_of_FAVORITE_PRODUCT({commit}, {operationType, id}) {
    await this.$axios[operationType](`${API.favorites}${id ? '/' + id : ''}`)
      .then(({result}) => {
        commit('SET_FAVORITE_PRODUCT_IDs', result)
      })
      .catch(err => handleFetchError(err))
  },
  async fetchUserData({state, commit}) {
    if (process.server || state.userIsFetchingNow) {
      // not on SSR side & throttling protect
      return;
    }
    commit('startFetchingUser');
    try {
      const response = await this.$axios.get('napi/user/user-widget');

      if (
        response?.context?.isAuthorized &&
        response?.data?.result &&
        response?.data?.success
      ) {
        return commit('setUser', response.data.result);
      }

      if (!response?.data?.success) {
        return commit('removeUser');
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
    } finally {
      commit('releaseFetchingUser');
    }
  },

  // TODO  надо удалить, но пока где-то востребуется
  async fetchCart({commit}) {
    if (process.server) {
      return;
    }

    try {
      const response = await this.$axios.$get('napi/user/cart');

      if (response?.result) {
        return commit('setCart', response.result);
      }

      throw new Error(this.$i18n.t('errors.something_wrong'));
    } catch (err) {
      if (!err.response || err.response.status !== 401) {
        throw err;
      }

      handleFetchError(this.$nuxt, err);
    }
  },
}
