export const deliveryTypes = [
  {
    id: 1,
    name: 'checkout.delivery_type.post.name',
    description: 'checkout.delivery_type.post.description',
    deliveryTimeSpan: null,
    tariffRate: null,
  },
  {
    id: 2,
    name: 'checkout.delivery_type.courier.name',
    description: 'checkout.delivery_type.courier.description',
    deliveryTimeSpan: null,
    tariffRate: null,
  },
  // { temporary hidden
  //   id: 4,
  //   name: 'checkout.delivery_type.pack-station.name',
  //   description: 'checkout.delivery_type.pack-station.description',
  //   deliveryTimeSpan: null,
  //   tariffRate: null,
  // },
  {
    id: 10,
    name: 'checkout.delivery_type.self-delivery.name',
    description: 'checkout.delivery_type.self-delivery.description',
    deliveryTimeSpan: null,
    tariffRate: null,
  }
]

export function secondsToDays(seconds) {
  return seconds / 60 / 60 / 24;
}
