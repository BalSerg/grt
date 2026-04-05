export default function ({ $axios }, inject) {
  const axiosAddToCart = $axios.create();

  axiosAddToCart.onError = () => {};

  inject('axiosAddToCart', axiosAddToCart);
};
