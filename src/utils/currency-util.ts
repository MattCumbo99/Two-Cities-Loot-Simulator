/**
 * Formats a raw numeric value into a comma-separated currency value.
 *
 * @param value Currency amount to format.
 * @returns Stringified currency amount.
 */
export function formatCurrency(value: number): string {
  let currencyPrefix = "$";

  if (value < 0) currencyPrefix = "-$";

  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));

  return `${currencyPrefix}${formattedValue}`;
}

/**
 * Formats a raw numeric value into a compact currency number.
 *
 * @param value Number to format.
 * @returns Formatted currency.
 */
export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(value);
}
