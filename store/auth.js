import API from 'assets/js/const.api'
import { handleFetchError } from '@/assets/js/util'
import localStorageService from '@/utils/service.localStorage'

export const state = () => ({
  verificationGuid: '',
  timeLimitSec: 0,
})

export const getters = {
  GET_GUID: (state) => state.verificationGuid,
  GET_TIME_LIMIT_SEC: (state) => state.timeLimitSec,
}

export const mutations = {
  SET_GUID(state, guid) {
    state.verificationGuid = guid
  },
  SET_TIME_LIMIT_SEC(state, time) {
    state.timeLimitSec = time
  },
}

export const actions = {
  async INIT_SMS_VERIFICATION({ commit, dispatch }) {
    const { name, email, countryCallingCode, phone, countryAlpha2 } =
      localStorageService.GET_USER_FROM_LOCALSTORAGE()

    return await this.$axios
      .$post(`${API.SMSverification}/sms`, {
        firstName: name,
        email,
        phoneNumber: countryCallingCode + phone,
        countryAlpha2,
      })
      .then(async ({ result }) => {
        if (result.alreadyVerified) {
          return await dispatch('DO_PERMISSION_ACTIONS').then((result) => ({
            result,
          })) // >>> router.rush()
        } else {
          // просим ввести код, полученный по SMS
          commit('SET_GUID', result.verificationGuid)
          commit('SET_TIME_LIMIT_SEC', result.timeLimitSec)
          return { orderId: null, result }
        }
      })
      .catch((err) => handleFetchError(err))
  },
  async POST_SMS_CODE({ commit, dispatch, getters }, pinCode) {
    return await this.$axios
      .$post(`${API.SMSverification}/validation`, {
        guid: getters.GET_GUID,
        pinCode,
      })
      .then(async ({ result }) => {
        if (result.successfulValidation)
          return await dispatch('DO_PERMISSION_ACTIONS').then((result) => ({
            result,
            validationResponse: 'all_is_normos',
          }))
        // >>> router.rush()
        else if (result.expiredValidation)
          return { result, validationResponse: 'expired_validation' }
        else return { result, validationResponse: 'wrong_code' }
      })
      .catch((err) => handleFetchError(err))
  },
  async DO_PERMISSION_ACTIONS({ commit, dispatch, getters, rootGetters }) {
    // перезагружаем корзину
    await dispatch(
      'cart/FETCH_CART',
      { grab: rootGetters['cart/GET_DISPLAYED_TAB_NAME'] },
      { root: true }
    )
    const targetData = rootGetters['tech/GET_TARGET_DATA']

    return await dispatch(targetData.dispatchName, '', { root: true }) // 'cart/SEND_ORDER'
      .then((orderId) => orderId)
  },
  async POST_VERIFICATION(state, { type, data }) {
    const result = await this.$axios.$post(`${API.sendingCode}/${type}`, data)
    return result.result
  },
  async CHECK_LOGIN() {
    const result = await this.$axios.$get(`${API.sendingCode}/check-login`)
    return result
  },
  async GET_CODE(state, { type, data }) {
    return await this.$axios.post(`${API.sendingCode}/${type}/confirm`, data)
  },
  async UPDATE_USER_PERSONAL_DATA(state, data) {
    return await this.$axios.$put(`${API.updatePersonalData}`, data)
  },
}
