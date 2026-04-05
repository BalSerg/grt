
// Переадресует "кривые" адреса типа /ru/catalog/sporting-goods/xxx/yyy/zzz?filters=22 
// в /ru/catalog/sporting-goods/?filters=22
// Нужно для SEO
// TODO: Убрать после того, как уберём из роутинга /catalog/ (станет не актуально) 
export default async function({ route, $nuxtRedirect }) {
  if (process.server) {
    const pathMatch = route.params.pathMatch;
    if (pathMatch) {
      const redirectPath = route.path.substring(0, route.path.length - pathMatch.length);
      return $nuxtRedirect({
        path: redirectPath,
        query: route.query
      });
    }
  }
}
