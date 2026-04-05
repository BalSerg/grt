// eslint-disable-next-line import/named
import sanitizeHtml from 'sanitize-html'
import {
  AllowedQuery,
  CatalogFilterQuery,
  FilterType,
  SEARCH_PAGE_NAME,
  SANITIZER_DEFAULT_CONFIG,
} from './const'

export const getRandomIntFromZeroToTenThounsand = () => {
  const min = 0
  const max = 10000
  return Math.floor(Math.random() * (max - min)) + min
}

export const composePageCatalogUrl = (route, toPage) => {
  const query = Object.assign({}, route.query)
  delete query.page

  const obj = { path: route.path, query }
  if (toPage !== 1) {
    obj.query = { ...obj.query, page: toPage }
  }
  return obj
}

export const composeSearchAreaUrl = (route, activeTab, localePath) => {
  const query = Object.assign({}, route.query)

  query.area = activeTab

  const path = `/${SEARCH_PAGE_NAME}/${route.params.slug}/`
  const obj = { path: localePath(path), query }
  return obj
}

export const composeSearchClearAreaUrl = (route, activeTab, localePath) => {
  const query = Object.assign({}, route.query)

  const queryKeys = Object.values(CatalogFilterQuery)
  queryKeys.forEach((k) => {
    delete query[k]
  })

  query.area = activeTab

  const path = `/${SEARCH_PAGE_NAME}/${route.params.slug}/`
  const obj = { path: localePath(path), query }
  return obj
}

export const composeRouteWithFiltersQuery = (route, filtersString) => {
  const query = Object.assign({}, route.query)

  delete query.filters
  delete query.page // при изменении фильтров сбрасываем страницу

  const newRoute = { path: route.path, query }

  if (filtersString) {
    newRoute.query = { ...newRoute.query, filters: filtersString }
  }

  return newRoute
}

export const composeSortCatalogUrl = (route, sort, defaultSortOption) => {
  const query = Object.assign({}, route.query)
  delete query.sort

  const obj = { path: route.path, query }
  if (sort.toLowerCase() !== defaultSortOption) {
    obj.query = { ...obj.query, sort }
  }
  return obj
}

export const composeRouteOnAllFiltersClear = (route) => {
  const query = Object.assign({}, route.query)

  if (query.sort) {
    return { path: route.path, query: { sort: query.sort } }
  }

  return { path: route.path }
}

export const handleFetchError = (nuxtContext, err) => {
  console.log('fetch error', err)
  if (err && err.response && err.response.status === 404) {
    return nuxtContext.context.error({
      statusCode: 404,
      message: 'page does not exist',
    })
  }

  nuxtContext.context.error({
    statusCode: 500,
    message: err?.response?.data ? JSON.stringify(err?.response?.data) : '',
  })
}

export const parseFilterArrayToString = (filterArray) => {
  return filterArray
    .map((it) => it.values.join(','))
    .join(',')
    .replace(/^,|,$/g, '')
}

export const getStringifiedFilterQueriesFrom = (routerQueries) => {
  return Object.entries(routerQueries)
    .filter(
      (queryEntries) =>
        queryEntries[0].startsWith(CatalogFilterQuery.RANGE) ||
        queryEntries[0].startsWith(CatalogFilterQuery.FILTERS)
    )
    .map((filteredQuery) => filteredQuery.join('='))
    .join('&')
}

export const isEmailType = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}

export const isOneStringIncludesAnother = (stringA, stringB) => {
  return stringA.toLowerCase().includes(stringB.toLowerCase())
}

export const composeRouteWithRangeQuery = (route, rangeMap) => {
  const query = Object.assign({}, route.query)

  Object.keys(query).forEach((key) => {
    if (
      key.startsWith(CatalogFilterQuery.RANGE) ||
      key === CatalogFilterQuery.PAGE
    ) {
      delete query[key]
    }
  })

  const newRoute = { path: route.path, query }

  if (rangeMap) {
    rangeMap.forEach((item) => {
      const newQuery = { ...item.values }
      newRoute.query = { ...newRoute.query, ...newQuery }
    })
  }

  return newRoute
}

const selectedFiltersMap = {
  [FilterType.CHECKBOX]: (filter) =>
    filter.propertyValues.some((item) => item.checked),
  [FilterType.RADIO]: (filter) =>
    filter.propertyValues.some((item) => item.checked),
  [FilterType.SWITCH]: (filter) => filter.propertyValues.value.checked,
  [FilterType.RANGE]: (filter) =>
    filter.propertyValues.selectedMin || filter.propertyValues.selectedMax,
}

export const hasFilterSelectedValue = (filter) =>
  selectedFiltersMap[filter.type](filter)

export const findCheckedFilters = (filterValues) => {
  return filterValues
    .filter((filterValue) => filterValue.checked)
    .map((filteredValue) => filteredValue.id)
}

export const setIsFavorite = (product, user) => {
  const newProduct = Object.assign({}, product)

  newProduct.isFavorite = user.likes.has(newProduct.id)

  return newProduct
}

export const getRangeMin = (selectedMin, rangeMin, rangeMax) => {
  if (selectedMin !== null && selectedMin > rangeMin) {
    return selectedMin < rangeMax ? selectedMin : rangeMax
  }

  return rangeMin
}

export const getRangeMax = (selectedMax, rangeMin, rangeMax) => {
  if (selectedMax !== null && selectedMax < rangeMax) {
    return selectedMax > rangeMin ? selectedMax : rangeMin
  }

  return rangeMax
}

export const getDevider = (precision) => {
  return Number('1'.concat('0'.repeat(precision)))
}

export const scrollToTop = () => {
  const COMFORT_FPS = 30

  const scrollStep = -window.scrollY / COMFORT_FPS
  const scrollInterval = setInterval(() => {
    if (window.scrollY != 0) {
      window.scrollBy(0, scrollStep)
    } else clearInterval(scrollInterval)
  }, 15)
}

export const scrollToTitle = (selector, options) => {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView(options)
  }
}

export const getStringifiedQueriesFrom = (routerQueries) => {
  const allowedFilters = Object.values(AllowedQuery)
  const regexFilters = new RegExp(allowedFilters.join('|'))
  const queries = []

  for (const [key, value] of Object.entries(routerQueries)) {
    if (regexFilters.test(key) && value.length > 0) {
      queries.push(`${key}=${value}`)
    }
  }

  return queries.length > 0 ? queries.join('&') : ''
}

export const ComposeCdnImageUrl = (imageLink, preset) => {
  const pieces = imageLink.match(/^(.*)\/(.*)\/(.*)\.(.*)$/)
  if (pieces === null) {
    return imageLink
  }
  return `${
    process.env.NUXT_ENV_IMAGE_HOST
  }/ps/${preset}/${pieces[2].trim()}.jpg`
}

export const DetectHost = () => {
  if (process.browser) {
    const host = window.location.hostname
    const hostArr = host.split('.')

    if (hostArr.length > 2) {
      return `.${hostArr.shift().join('.')}`
    }

    return host
  }
}

export const mergeEmptyFields = (dest, src) => {
  if (!src) return dest
  if (!dest) return src
  Object.entries(dest).forEach((field) => {
    // ['name', undefined]
    if (!field[1] && src[field[0]]) {
      // if(!dest.name && src.name)
      dest[field[0]] = src[field[0]] // dest.name = src.name
    }
  })
  return dest
}

export const areEqualObjectProperties = (obj1, obj2) => {
  if (!obj1 || !obj2) return false
  return Object.entries(obj1).every(
    (field) => obj1[field[0]] === obj2[field[0]]
  )
}

export const getLocalizedDate = (dateISO, lang) => {
  return new Date(dateISO).toLocaleString(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const sanitize = (dirtyHtml) => {
  return sanitizeHtml(dirtyHtml, SANITIZER_DEFAULT_CONFIG).replace(
    /\u00A0/g,
    ' '
  )
}

export const sortCurrency = (currencies) => {
  const filterCurrencyList = currencies.filter(currency => currency !== 'USD' && currency !== 'EUR' && currency !== 'RUB')
    .sort()
  const currencyList = ['USD', 'EUR', 'RUB', ...filterCurrencyList]
  return currencyList
}
