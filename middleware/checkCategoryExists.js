import { CATALOG_SEARCH_BASE_URL, BasePath, NOT_FOUND } from '@/assets/js/const';
import {
  composeServerRedirectUrl,
  composeClientRedirectObj
} from '@/assets/js/redirectUtils.js';

export default async function({ route, $nuxtRedirect, $oldRedirect, $axios }) {
  try {
    const encodedSlug = encodeURI(route.params.slug);

    const checkUrl = `${CATALOG_SEARCH_BASE_URL}/${encodedSlug}/check-existing`;
    const { result } = await $axios.$get(checkUrl);

    if (!result.categoryExists) {
      // redirect if category ID was used instead of semanticId (GRT-1851)
      const redirectObj = process.server
        ? composeServerRedirectUrl(
            route.fullPath,
            `${BasePath.CATALOG}/${route.params.slug}/`,
            `${BasePath.CATALOG}/${result.redirectTo}/`
          )
        : composeClientRedirectObj(route, result.redirectTo);
      return $nuxtRedirect(redirectObj);
    }
  } catch (err) {
    if (err.response && err.response.status === NOT_FOUND) {
      // redirect to products (GRT-1837)
      const redirectUrl = composeServerRedirectUrl(
        encodeURI(route.fullPath),
        BasePath.CATALOG,
        BasePath.PRODUCTS
      );

      if (process.server) {
        return $nuxtRedirect(redirectUrl);
      } else {
        const redirectedLocation = {
          path: route.path.replace(BasePath.CATALOG, BasePath.PRODUCTS),
          params: Object.assign({}, route.params),
          query: Object.assign({}, route.query),
          hash: route.hash,
        };
        return $nuxtRedirect(redirectedLocation);
      }
    }
  }
}
