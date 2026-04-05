// TODO DELETE it when cart will already done

import PATH from 'assets/js/const.path'
import { EXTERNAL_LINK_REGEXP } from '@/assets/js/const';

export default {
  methods: {
    $mx_addToCart(productId, productCount = 1) {
      // Формат добавления в корзину на старом сайте. Таков путь.
      const orderFormData = new FormData();
      orderFormData.append('add', productCount.toString());

      this.$axiosAddToCart
        .$post(`/cmpbasket/add/${productId}?=json`, orderFormData)
        .then(response => {
          if (!response.error) {
            const toastOptions = {
              router: this.$router,
              action: {
                text: this.$t('go_to_cart')
              }
            };

            const url = this.localePath(PATH.CART);
            const isExternalLink = url.match(EXTERNAL_LINK_REGEXP) === null;

            if (isExternalLink) {
              toastOptions.action.href = url;
            } else {
              toastOptions.action.push = {
                path: url,
                dontClose: true
              };
            }

            this.$store.dispatch('userData/fetchCart');

            return this.$toast.show(this.$t('added_to_cart'), toastOptions);
          }
          throw response.error_msg;
        })
        .catch(err => {
          this.$toast.error(err.toString());
        });
    },
  }
}
