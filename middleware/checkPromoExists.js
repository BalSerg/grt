import { PROMO_SEARCH_BASE_URL, BasePath, NOT_FOUND } from '@/assets/js/const';
import {
  composeServerRedirectUrl,
  composeClientRedirectObj
} from '@/assets/js/redirectUtils.js';

export default async function({ route, error, $nuxtRedirect, $axios }) {
  try {
    const encodedSlug = encodeURIComponent(route.params.slug);
    const checkUrl = `${PROMO_SEARCH_BASE_URL}/${encodedSlug}/check-existing`;
    const { result } = await $axios.$get(checkUrl);

    if (!result.categoryExists) {
      // redirect if category ID was used instead of semanticId for support elder collections
      const redirectObj = process.server
        ? composeServerRedirectUrl(
            route.fullPath,
            `${BasePath.PROMO}/${route.params.slug}/`,
            `${BasePath.PROMO}/${result.redirectTo}/`
          )
        : composeClientRedirectObj(route, result.redirectTo);
      return $nuxtRedirect(redirectObj);
    }
  } catch (err) {
    if (err.response && err.response.status === NOT_FOUND) {
      return error({
        statusCode: 404
      })
    }
  }
}
