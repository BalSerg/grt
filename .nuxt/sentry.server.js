const apiMethods = ["BrowserClient","Hub","Scope","addBreadcrumb","addGlobalEventProcessor","captureEvent","captureException","captureMessage","close","configureScope","eventFromException","eventFromMessage","flush","forceLoad","getCurrentHub","getHubFromCarrier","init","injectReportDialog","lastEventId","makeMain","onLoad","setContext","setExtra","setExtras","setTag","setTags","setUser","showReportDialog","startTransaction","withScope","wrap"]

/** @type {import('@nuxt/types').Plugin} */
export default function (ctx, inject) {
  const SentryMock = {}
  apiMethods.forEach(key => {
    // eslint-disable-next-line no-console
    SentryMock[key] = (...args) => console.warn(`$sentry.${key}() called, but Sentry plugin is disabled. Arguments:`, args)
  })

  // Inject mocked sentry to the context as $sentry (this is used in case sentry is disabled)
  inject('sentry', SentryMock)
  ctx.$sentry = SentryMock
}
