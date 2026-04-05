import API from 'assets/js/const.api'
import { PublishModes } from '@/assets/js/const'
import { handleFetchError } from '@/assets/js/util'
import localStorageService from '@/utils/service.localStorage'

const getActiveTab = (grabs, productsCount, isRemove) => {
  const activeGrap = grabs.find((grub) => grub.isActive)
  if (!activeGrap) return 'buy'
  if (isRemove) return activeGrap.grabType
  if (
    activeGrap.grabType === 'buy' &&
    activeGrap.count === 0 &&
    productsCount !== 0
  )
    return 'order'
  return activeGrap.grabType
}

export const state = () => ({
  cartSet: {
    // only for current grab /tab/ & current pagination
    grabs: [],
    suppliers: [], // only if products of this supplier is checked(!)
    products: [],
    raw: {},
  },
  productsCount: 0,
  grubSupplierIds: [],
  cartForRegistration: [], // [{supplierId, productId, count, isCountAvailable, checked}, ]
  displayedCartTab: '', // 'buy' or 'order'
  notValidSuppliers: [],
  isOrder: false,
})

export const getters = {
  GET_DISPLAYED_TAB_NAME: (state) => state.displayedCartTab,
  GET_SUPPLIER: (state) => (supplierId) => {
    return state.cartSet.suppliers.find(
      (supplier) => supplier.supplierId === supplierId
    )
  },
  GET_SUPPLIER_PRODUCTs: (state) => (supplierId) => {
    return state.cartSet.products.filter(
      (product) => product.supplierId === supplierId
    )
  },
  GET_ITEM_FROM_cartForRegistration: (state) => (productId) => {
    const itemForRegistration = state.cartForRegistration.find(
      (item) => item.productId === productId
    )

    return (
      itemForRegistration || {
        supplierId: 0,
        productId,
        count: 0,
        isCountAvailable: 0,
        statusProduct: 'empty',
        checked: false,
      }
    )
  },
  CHECK_IS_AVAILABLE_SUPPLIER: (state) => (supplierId) => {
    return state.notValidSuppliers.find(
      (supplier) => supplier.supplierId === supplierId
    )
  },
  CHECK_cartForRegistration_DATA:
    (state) =>
      ({
         targetGroup,
         targetVolume,
         checkedField,
         checkedValue,
         result,
         inverseResult = false,
       }) => {
        // from [{supplierId, productId, count, isCountAvailable, checked}, ]
        if (state.cartForRegistration.length > 0) {
          const isHere = state.cartForRegistration.some((item) => {
            if (targetGroup === 'all' || item[targetGroup] === targetVolume) {
              if (item[checkedField] === checkedValue) return true
            }
            return false
          })
          if (inverseResult) return !isHere ? result : null
          return isHere ? result : null
        }
      },
  isInCart: (state) => (productId) =>
    state.cartSet.raw.hasOwnProperty(productId),
  GET_PRODUCT_COUNT: (state) => (productId) => {
    if (state.cartSet.raw.hasOwnProperty(productId)) {
      return state.cartSet.raw[productId].count
    }
    return 0
  },
}

export const mutations = {
  CHANGE_STATUS_ORDER(state, bool) {
    state.isOrder = bool
  },
  SET_CART(state, cartSet) {
    const {
      grabs,
      suppliers,
      products,
      productsCount,
      isRemove = false,
    } = cartSet
    state.productsCount = productsCount

    state.grubSupplierIds = []
    state.cartForRegistration = []

    // переносим response_cart to state.cartSet
    state.cartSet = cartSet

    if (!grabs) return

    suppliers.forEach((supplier) => {
      const idx = products.findIndex(
        (product) =>
          product.minAmountForOrder &&
          product.supplierId === supplier.supplierId
      )
      if (idx !== -1) {
        const checked = products.some(
          (product) =>
            product.checked && product.supplierId === supplier.supplierId
        )
        const productSupplier = {
          supplierId: supplier.supplierId,
          total: supplier.total,
          minAmountForOrder: products[idx].minAmountForOrder,
          supplierSemanticId: supplier.supplierSemanticId,
          supplierName: supplier.supplierName,
          type: supplier.grabType,
          count: products[idx].count,
          checked,
        }
        const index = state.notValidSuppliers.findIndex(
          ({supplierId}) => supplierId === supplier.supplierId
        )
        if (index !== -1) state.notValidSuppliers.splice(index, 1)
        if (
          productSupplier.minAmountForOrder &&
          productSupplier.minAmountForOrder > productSupplier.total &&
          checked
        ) {
          state.notValidSuppliers.push(productSupplier)
        }
      } else if (isRemove) {
        const listRemovingProducts = products.filter((product) =>
          state.notValidSuppliers.indexOf(product.supplierId === -1)
        )
        listRemovingProducts.forEach((removingProduct, index) =>
          state.notValidSuppliers.splice(index, 1)
        )
      }
    })

    // обозначаем активную вкладку
    if ((grabs && isRemove && productsCount !== 0) || !isRemove) {
      state.displayedCartTab = getActiveTab(grabs, productsCount, isRemove)
    }

    // ПЕРЕзаполняем grubSupplierIds
    for (const supplier of suppliers) {
      state.grubSupplierIds.push(supplier.supplierId)
    }

    // дублируем товар карзины в cartForRegistration для предстоящего совершения checked отдельных товаров & совершения registration покупки
    for (const product of products) {
      const {
        productId,
        count,
        available,
        checked,
        supplierId,
        grabType,
        publishMode,
      } = product

      // available - все товары доступны
      // empty - данных товаров нет в наличии
      // too_much - выбрано товаров больше, чем надо
      // deleted - Товар удален

      const isCountAvailable = count <= available || available === 0
      const statusProduct =
        product.isDeleted ? 'deleted' :
          publishMode !== PublishModes.AVAILABLE
            ? 'empty'
            : grabType === 'order' || available >= count
              ? 'available'
              : 'too_much'

      state.cartForRegistration.push({
        supplierId,
        productId,
        count,
        isCountAvailable,
        statusProduct,
        checked,
      })
    }
  },
}

export const actions = {
  async FETCH_CART({commit}, {grab}) {
    return await this.$axios
      .$get(`${API.cart}`, {params: {grab}})
      .then(({result}) => commit('SET_CART', result))
      .catch((err) => handleFetchError(err))
  },
  async POST_PRODUCT_TO_CART({commit, getters}, {id, count, grabTyp = ''}) {
    return await this.$axios
      .$post(`${API.cart}/${id}${grabTyp ? '?grab=' + grabTyp : ''}`, {count})
      .then(({result}) => {
        commit('SET_CART', result)
        return result
      })
      .catch((err) => handleFetchError(err))
  },
  async CHANGE_CART({commit, getters}, {cartToSend}) {
    // order = [{"id": 0, "count": 0, "checked": true}, ]
    return await this.$axios
      .$put(`${API.cart}`, cartToSend, {
        params: {grab: getters.GET_DISPLAYED_TAB_NAME},
      })
      .then(({result}) => commit('SET_CART', result))
      .catch((err) => handleFetchError(err))
  },
  async REMOVE_PRODUCTs(
    {getters, commit, state},
    {type, volume, grabTyp = ''}
  ) {
    // type ~ {supplierId, productId, count, isCountAvailable, checked}
    let removedProductIds = []

    if (type === 'productId') {
      removedProductIds.push(volume)
    } else if (grabTyp) {
      removedProductIds = state.cartForRegistration.reduce((total, item) => {
        if (item[type] === volume) return total.concat(item.productId)
        return total
      }, [])
    } else {
      return console.log('wrong with REMOVE_PRODUCTs')
    }
    return await this.$axios
      .$delete(`${API.cart}${grabTyp ? '?grab=' + grabTyp : ''}`, {
        data: removedProductIds,
      })
      .then(({result}) => commit('SET_CART', {...result, isRemove: true}))
      .catch((err) => handleFetchError(err))
  },
  async MAKE_ITEM_ALTERATION(
    {state, dispatch},
    {target, changedField, newVal}
  ) {
    // target = {type, volume} (!)
    // Проверяем наричие перестраиваемого товара в cartForRegistration.
    // он может отсутствовать, если сходу увеличиваем каунт товара в счетчике на странице отдельного товара, не добавив его предворительно в корзину через кнопку To_cart.
    // Если товара в cartForRegistration нет, то не "изменяем", а "добавляем" его в корзину.
    if (['id', 'productId'].includes(target.type)) {
      const isProductInTheCart = state.cartForRegistration.some(
        (item) => item[target.type] === target.volume
      ) // find in [{supplierId, productId, count, isCountAvailable, checked}, ]
      if (!isProductInTheCart) {
        await dispatch('POST_PRODUCT_TO_CART', {
          id: target.volume,
          count: newVal,
        })
        return
      }
    }

    // перестраиваем cartForRegistration
    const cartToSend = state.cartForRegistration.map((product) => {
      // checkbox - у товаров перетираем поле 'checked' to true or false
      // игнорируем излишние для бака поля, отбираем только нужные
      const {productId, count, checked} = product
      const productToSend = {id: productId, count, checked}

      // перетираем одно из полей {id: 6322, count: 1, checked: false}
      if (target.type === 'all' || product[target.type] === target.volume)
        // for all checkbox & for supplier checkbox & product checkbox
        return {...productToSend, [changedField]: newVal}
      else return productToSend
    })

    // обновляем корзину на баке
    await dispatch('CHANGE_CART', {
      cartToSend,
    })
  },
  async SEND_ORDER(
    {state, dispatch, commit},
    {userData = localStorageService.GET_USER_FROM_LOCALSTORAGE(), params}
  ) {
    return await this.$axios
      .$post(`${API.orders}?${params || ''}`, userData)
      .then(({result}) => result)
      .catch((err) => handleFetchError(err))
  },
}
