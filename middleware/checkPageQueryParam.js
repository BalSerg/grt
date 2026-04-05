import { REDIRECT_CODE } from '@/assets/js/const';
import { composePageCatalogUrl } from '@/assets/js/util';

export default function({ route, redirect }) {
  const PAGE_LIMIT = 50;
  const FIRST_PAGE = 1;
  const radix = 10;

  if (route.query.page === undefined) {
    return;
  }

  const page = parseInt(route.query.page, radix);

  if (isNaN(page) || page < FIRST_PAGE) {
    return redirect(REDIRECT_CODE, composePageCatalogUrl(route, FIRST_PAGE));
  }

  if (page > PAGE_LIMIT) {
    return redirect(REDIRECT_CODE, composePageCatalogUrl(route, PAGE_LIMIT));
  }

  if (page.toString() !== route.query.page) {
    return redirect(REDIRECT_CODE, composePageCatalogUrl(route, page));
  }
}
