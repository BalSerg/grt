import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_sentryserver_d83d8a2e from 'nuxt_plugin_sentryserver_d83d8a2e' // Source: .\\sentry.server.js (mode: 'server')
import nuxt_plugin_sentryclient_2e27c961 from 'nuxt_plugin_sentryclient_2e27c961' // Source: .\\sentry.client.js (mode: 'client')
import nuxt_plugin_plugin_a69fedfc from 'nuxt_plugin_plugin_a69fedfc' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_toast_3a2bbcd4 from 'nuxt_plugin_toast_3a2bbcd4' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_pluginrouting_ec48b818 from 'nuxt_plugin_pluginrouting_ec48b818' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_a826280a from 'nuxt_plugin_pluginmain_a826280a' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_f2bbb466 from 'nuxt_plugin_cookieuniversalnuxt_f2bbb466' // Source: .\\cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_6dfb7025 from 'nuxt_plugin_axios_6dfb7025' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_googleanalytics_801a623e from 'nuxt_plugin_googleanalytics_801a623e' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_gtm_8c18078a from 'nuxt_plugin_gtm_8c18078a' // Source: .\\gtm.js (mode: 'all')
import nuxt_plugin_axios_5659d192 from 'nuxt_plugin_axios_5659d192' // Source: ..\\plugins\\axios.js (mode: 'all')
import nuxt_plugin_vuelidate_4be431c8 from 'nuxt_plugin_vuelidate_4be431c8' // Source: ..\\plugins\\vuelidate.js (mode: 'all')
import nuxt_plugin_i18n_1fba523a from 'nuxt_plugin_i18n_1fba523a' // Source: ..\\plugins\\i18n.js (mode: 'all')
import nuxt_plugin_checkView_79e05580 from 'nuxt_plugin_checkView_79e05580' // Source: ..\\plugins\\checkView.js (mode: 'all')
import nuxt_plugin_lazysizesclient_60ea0274 from 'nuxt_plugin_lazysizesclient_60ea0274' // Source: ..\\plugins\\lazysizes.client.js (mode: 'client')
import nuxt_plugin_bodyScrollclient_70b0caa3 from 'nuxt_plugin_bodyScrollclient_70b0caa3' // Source: ..\\plugins\\bodyScroll.client.js (mode: 'client')
import nuxt_plugin_axiosAddToCartclient_23aafc3a from 'nuxt_plugin_axiosAddToCartclient_23aafc3a' // Source: ..\\plugins\\axiosAddToCart.client.js (mode: 'client')
import nuxt_plugin_redirectAction_a72c7262 from 'nuxt_plugin_redirectAction_a72c7262' // Source: ..\\plugins\\redirectAction.js (mode: 'all')
import nuxt_plugin_googlemapsclient_79ad8fda from 'nuxt_plugin_googlemapsclient_79ad8fda' // Source: ..\\plugins\\google-maps.client.js (mode: 'client')
import nuxt_plugin_jsonld_2ff766e1 from 'nuxt_plugin_jsonld_2ff766e1' // Source: ..\\plugins\\jsonld.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Global Rus Trade","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"msapplication-TileColor","content":"#ffffff"},{"name":"msapplication-TileImage","content":"\u002Fnfavicon\u002Fms-icon-144x144.png"},{"name":"theme-color","content":"#ffffff"},{"name":"yandex-verification","content":"ac9ae3429537cfd4"},{"name":"facebook-domain-verification","content":"bv34upx26c8hjsgyhlirriznauj42d"}],"link":[{"rel":"apple-touch-icon","sizes":"57x57","href":"\u002Fnfavicon\u002Fapple-icon-57x57.png"},{"rel":"apple-touch-icon","sizes":"60x60","href":"\u002Fnfavicon\u002Fapple-icon-60x60.png"},{"rel":"apple-touch-icon","sizes":"72x72","href":"\u002Fnfavicon\u002Fapple-icon-72x72.png"},{"rel":"apple-touch-icon","sizes":"76x76","href":"\u002Fnfavicon\u002Fapple-icon-76x76.png"},{"rel":"apple-touch-icon","sizes":"114x114","href":"\u002Fnfavicon\u002Fapple-icon-114x114.png"},{"rel":"apple-touch-icon","sizes":"120x120","href":"\u002Fnfavicon\u002Fapple-icon-120x120.png"},{"rel":"apple-touch-icon","sizes":"144x144","href":"\u002Fnfavicon\u002Fapple-icon-144x144.png"},{"rel":"apple-touch-icon","sizes":"152x152","href":"\u002Fnfavicon\u002Fapple-icon-152x152.png"},{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Fnfavicon\u002Fapple-icon-180x180.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"192x192","href":"\u002Fnfavicon\u002Fandroid-icon-192x192.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Fnfavicon\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"96x96","href":"\u002Fnfavicon\u002Ffavicon-96x96.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Fnfavicon\u002Ffavicon-16x16.png"},{"rel":"manifest","href":"\u002Fmanifest.json"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.server && typeof nuxt_plugin_sentryserver_d83d8a2e === 'function') {
    await nuxt_plugin_sentryserver_d83d8a2e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_sentryclient_2e27c961 === 'function') {
    await nuxt_plugin_sentryclient_2e27c961(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_a69fedfc === 'function') {
    await nuxt_plugin_plugin_a69fedfc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_3a2bbcd4 === 'function') {
    await nuxt_plugin_toast_3a2bbcd4(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_ec48b818 === 'function') {
    await nuxt_plugin_pluginrouting_ec48b818(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_a826280a === 'function') {
    await nuxt_plugin_pluginmain_a826280a(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_f2bbb466 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_f2bbb466(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_6dfb7025 === 'function') {
    await nuxt_plugin_axios_6dfb7025(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_801a623e === 'function') {
    await nuxt_plugin_googleanalytics_801a623e(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_8c18078a === 'function') {
    await nuxt_plugin_gtm_8c18078a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_5659d192 === 'function') {
    await nuxt_plugin_axios_5659d192(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4be431c8 === 'function') {
    await nuxt_plugin_vuelidate_4be431c8(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_1fba523a === 'function') {
    await nuxt_plugin_i18n_1fba523a(app.context, inject)
  }

  if (typeof nuxt_plugin_checkView_79e05580 === 'function') {
    await nuxt_plugin_checkView_79e05580(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lazysizesclient_60ea0274 === 'function') {
    await nuxt_plugin_lazysizesclient_60ea0274(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_bodyScrollclient_70b0caa3 === 'function') {
    await nuxt_plugin_bodyScrollclient_70b0caa3(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_axiosAddToCartclient_23aafc3a === 'function') {
    await nuxt_plugin_axiosAddToCartclient_23aafc3a(app.context, inject)
  }

  if (typeof nuxt_plugin_redirectAction_a72c7262 === 'function') {
    await nuxt_plugin_redirectAction_a72c7262(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googlemapsclient_79ad8fda === 'function') {
    await nuxt_plugin_googlemapsclient_79ad8fda(app.context, inject)
  }

  if (typeof nuxt_plugin_jsonld_2ff766e1 === 'function') {
    await nuxt_plugin_jsonld_2ff766e1(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
