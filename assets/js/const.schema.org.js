
/**
 * https://schema.org/ItemAvailability
 * BackOrder
 * Discontinued
 * InStock
 * InStoreOnly
 * LimitedAvailability
 * OnlineOnly
 * OutOfStock
 * PreOrder
 * PreSale
 * SoldOut
 */
export const AVAILABILITY = {
    'TemporarilyOutOfStock': 'https://schema.org/OutOfStock',
    'Discontinued': 'https://schema.org/Discontinued',
    'NotPublished': 'https://schema.org/Discontinued',
    'Available': 'https://schema.org/InStock',
  };

export const GET_AVAILABILITY = (publishMode) => {
    return AVAILABILITY[publishMode] || AVAILABILITY.Discontinued
}
