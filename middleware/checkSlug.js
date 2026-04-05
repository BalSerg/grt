import { REDIRECT_CODE } from '@/assets/js/const';

export default function({ error, route }) {
  const slug = route.params.slug;
  if (!slug) {
    return error({
      statusCode: 404
    })
  }
}
