export const getSupplierProducts = (suppliers, supplierId) => {
  return suppliers
    .find(supplier => supplier.supplierId === supplierId)
    .items.map(product => {
      return {
        productId: product.id,
        supplierId
      };
    });
};

// TODO: Use Array.flatMap() instead or something better
export const getTabProducts = (suppliers) => {
  return suppliers.map(supplier => {
    return supplier.items.map(product => {
      return {
        productId: product.id,
        supplierId: Number(supplier.supplierId)
      }
    });
  }).flat();
};
