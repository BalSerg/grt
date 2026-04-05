import merge from 'lodash.merge'
import { handleFetchError, isEmailType } from '@/assets/js/util'
import { validateOnLetters } from '~/assets/js/customValidation'

const checkoutUrl = '/napi/order-processing/checkout'

const validateOnData = ({ phone, name, email }) => {
  if (
    !name ||
    validateOnLetters(phone) ||
    phone.length < 6 ||
    !isEmailType(email)
  )
    return false
  return true
}

export const state = () => ({
  checkout: {
    customer: {
      name: '',
      phone: '',
      email: '',
    },
    recipient: {
      name: '',
      phone: '',
      email: '',
    },
  },
  parcelRates: [],
  isCheckoutValid: false,
  isRecipientValid: true,
})
export const getters = {
  CHECKOUT: (st) => st.checkout,
}
export const mutations = {
  UPDATE_CHECKOUT(state, checkout) {
    state.checkout = checkout
  },
  VALIDATE_CHECKOUT(state) {
    state.isCheckoutValid = false
    const customer = state.checkout.customer

    const parcels = state.checkout.parcels
    
    if (
      !validateOnData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      })
    )
      return

    if (parcels.length < 1) return
    if (
      parcels.some(
        (x) =>
          !validateOnData({
            name: x.recipient.name,
            phone: x.recipient.phone,
            email: x.recipient.email,
          }) ||
          !x.recipient.phone ||
          !x.recipient.address ||
          !x.recipient.postalCode ||
          !x.rateCalcId
      )
    ) {
      state.isRecipientValid = false
      return
    }
    state.isRecipientValid = true
    state.isCheckoutValid = true
  },
}
export const actions = {
  async SAVE_CHECKOUT({ commit }, checkout) {
    commit('UPDATE_CHECKOUT', checkout)
    await this.$axios
      .$put(`${checkoutUrl}`, checkout)
      .then(({ result }) => commit('UPDATE_CHECKOUT', result))
      .catch((err) => {
        this.$sentry.captureException(`Error response at save checkout: ${err}`)
        this.$toast.error(err.toString())
        handleFetchError(err)
      })
    commit('VALIDATE_CHECKOUT')
  },
  async REFRESH_CHECKOUT(state, body) {
    await this.$axios.$post(`${checkoutUrl}/refresh`, body)
  },
  async SAVE_PARCEL({ commit, dispatch, getters }, parcel) {
    const parcelIndex = getters.CHECKOUT.parcels.findIndex(
      (x) => x.number === parcel.number
    )
    const parcels = getters.CHECKOUT.parcels
    parcels[parcelIndex] = parcel
    const checkout = merge({}, getters.CHECKOUT, { parcels: [...parcels] })
    await dispatch('SAVE_CHECKOUT', checkout)
  },
  async GET_CHECKOUT({ commit }) {
    await this.$axios
      .$get(`${checkoutUrl}`)
      .then(({ result }) => commit('UPDATE_CHECKOUT', result))
      .catch((err) => {
        this.$sentry.captureException(`Error response at get checkout: ${err}`)
        handleFetchError($nuxt, err)
      })
    commit('VALIDATE_CHECKOUT')
  },
  async REMOVE_PARCEL({ commit }, parcelNumber) {
    await this.$axios
      .$delete(`${checkoutUrl}/parcels/${parcelNumber}`)
      .then(({ result }) => commit('UPDATE_CHECKOUT', result))
      .catch((err) => handleFetchError(err))
    commit('VALIDATE_CHECKOUT')
  },
}
