export function calculatePrice(
  basePrice: number,
  discountInPercent: number,
  priceDiff: number,
) {
  return Math.round(basePrice * (1 - discountInPercent / 100) + priceDiff);
}
