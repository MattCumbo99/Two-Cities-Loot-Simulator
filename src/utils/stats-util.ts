import type { SimulationStats } from "../types/simulation-stats";
import { formatCurrency } from "./currency-util";

export function getNetProfit(stats: SimulationStats): number {
  return stats.totalMoneySpent - stats.totalLootValue;
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
