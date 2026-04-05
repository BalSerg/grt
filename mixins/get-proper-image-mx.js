import { ComposeCdnImageUrl } from '@/assets/js/util'
import { DefaultImage } from '@/assets/js/const'

export default {
  methods: {
    $mx_getProperImage(
      imageLink,
      preset,
      defaultImg = DefaultImage.NO_PRODUCT_PHOTO
    ) {
      return imageLink ? ComposeCdnImageUrl(imageLink, preset) : defaultImg
    },
  },
}
