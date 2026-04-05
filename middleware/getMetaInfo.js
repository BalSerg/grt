import { NOT_FOUND, SEARCH_PAGE_NAME } from '@/assets/js/const';

export default async ({ route, $nuxtRedirect, $axios, store, error }) => {
  try {
        const encodedPath = encodeURIComponent(route.fullPath);

        if (store.getters['meta/metaData'].has(encodedPath)) {
          return;
        }

        const { result } = await $axios.$get(
          `/napi/meta/info?url=${encodedPath}`
        );

        if (result?.redirect?.redirectTo) {
          return $nuxtRedirect(
            result.redirect.redirectTo,
            result.redirect.redirectCode
          );
        }

        store.commit('meta/setMetaData', {
          path: encodedPath,
          metaData: result.metaInfo
        });
      } catch (err) {
    if (err.response && err.response.status === NOT_FOUND) {
      return error({
        statusCode: 404
      })
    }
  }
};
