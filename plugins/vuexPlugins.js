export function fetchControl(store) {
  if(process.server)
    return

  store.subscribeAction({
    before: (action, state) => {
      if (['cart/FETCH_CART', ''].includes(action.type))   // регистрируем actions, которые мы желаем переклывать заставкой лоадинга.
        store.commit('tech/SET_LOAD_TRIGGER', 1)
    },
    after: (action, state) => {
      if (['cart/FETCH_CART', ''].includes(action.type))
        store.commit('tech/SET_LOAD_TRIGGER', -1)
    },
    error: (action, state) => {

    }
  })
}
