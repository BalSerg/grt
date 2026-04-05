import {quickOrderList} from "assets/js/const.LocalStorage"

export default class {
  static SAVE_USER_INTO_LOCALSTORAGE(userData) {   // userData = {name, email, countryCallingCode, phone, agreesWithTerms /"true", string!/}
    if (process.client && localStorage) {
      for (const key in userData) {
        if (userData[key]) localStorage.setItem(quickOrderList[key], userData[key])
      }
    }
  }

  static GET_USER_FROM_LOCALSTORAGE() {
    if (process.client && localStorage) {
      const userPasswordData = {}
      for (const key in quickOrderList) {
        userPasswordData[key] = localStorage.getItem(quickOrderList[key]) ? localStorage.getItem(quickOrderList[key]) : ''
      }
      return userPasswordData
    }
    return {result: 'обломос'}
  }
}
