import type { LootItem } from "./loot-item";
import type { MvmTour } from "./mvm-tour";

/**
 * A grouped data field holding overall statistics of prior tour simulations.
 */
export interface SimulationStats {
  tours: MvmTour[];
  bestTour?: MvmTour;

  australiums: LootItem[];
  highValueFabs: LootItem[];

  bestProFab?: LootItem;

  totalGoldPans: number;
  totalHoursPlayed: number;
  totalLootValue: number;
  totalMoneySpent: number;
  totalProFabs: number;
  totalRobotParts: number;
  totalSpecFabs: number;
}
