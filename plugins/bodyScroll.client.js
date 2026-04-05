export default ({ app }, inject) => {
  const disable = () => {
    document.body.classList.add('overflow-hidden');
  };

  const enable = () => {
    document.body.classList.remove('overflow-hidden');
  };

  inject('disableBodyScroll', disable);
  inject('enableBodyScroll', enable);
}
