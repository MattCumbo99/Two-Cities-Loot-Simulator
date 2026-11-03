import type { SimulationStats } from "../types/simulation-stats";
import { formatCurrency } from "./currency-util";

export function getNetProfit(stats: SimulationStats): number {
  return stats.totalLootValue - stats.totalMoneySpent;
}

/**
 * Gets the net profit as a displayable currency.
 *
 * @param stats Stats to calculat net profit from.
 * @returns Stringified net profit.
 */
export function formatNetProfit(stats: SimulationStats): string {
  const profit = getNetProfit(stats);
  const profitStr = formatCurrency(profit);

  if (profit < 0) return profitStr;

  return `+${profitStr}`;
}

/**
 * Shows a condensed version of the provided value.
 *
 * @param value Number to condense.
 * @returns Condensed number.
 */
export function formatCondensed(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Creates a new `SimulationStats` object with starting values.
 *
 * @returns New SimulationStats.
 */
export const createInitialStats = (): SimulationStats => ({
  tours: [],
  australiums: [],
  highValueFabs: [],
  totalGoldPans: 0,
  totalHoursPlayed: 0,
  totalLootValue: 0,
  totalMoneySpent: 0,
  totalProFabs: 0,
  totalRobotParts: 0,
  totalSpecFabs: 0,
});
