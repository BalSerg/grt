export const state = () => ({
  currency: '',
  isDesktop: false,
  isDesktopWithScroll: false,
  isTablet: false,
  isMobile: false,
  isDevEnv: false,
  loadTrigger: 0,
  modalComponentName: '',
  targetData: {},          // {routerPushTo, dispatchName}
  isFner:true
})

export const getters = {
  GET_LOAD_TRIGGER: st => st.loadTrigger,
  GET_MODAL_COMPONENT_NAME: st => st.modalComponentName,
  GET_TARGET_DATA: st => st.targetData,
  isDesktop: state => state.isDesktop,
  isDesktopWithScroll: state => state.isDesktopWithScroll,
  isTablet: state => state.isTablet,
  isMobile: state => state.isMobile,
  currency: state => state.currency,
  isDevEnv: state => state.isDevEnv,
  isFner: state=>state.isFner
}

export const mutations = {
  updateIsDesktop(state, newValue) {
    state.isDesktop = newValue
  },
  updateIsTablet(state, newValue) {
    state.isTablet = newValue
  },
  updateIsMobile(state, newValue) {
    state.isMobile = newValue
  },
  setCurrency(state, currency) {
    state.currency = currency
  },
  setIsDevEnv(state, value) {
    state.isDevEnv = value
  },
  SET_LOAD_TRIGGER(state, status) {
    state.loadTrigger = status
  },
  SET_MODAL_COMPONENT_NAME(state, name) {
    state.modalComponentName = name
  },
  SET_TARGET_DATA(state, data) {
    state.targetData = data
  },
  SET_FNER(state,value){
    state.isFner = value;
  }
}
