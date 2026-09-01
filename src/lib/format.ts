const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactPriceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("en-US");

/** $1,450,000 */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

/** $1.5M — used where the full figure would wrap, e.g. filter range labels. */
export function formatPriceCompact(value: number): string {
  return compactPriceFormatter.format(value);
}

/** 1,850 m² */
export function formatArea(value: number): string {
  return `${numberFormatter.format(value)} m²`;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}
