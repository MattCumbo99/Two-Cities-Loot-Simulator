import type { SimulationStats } from "./simulation-stats";

export interface MvmSimulator {
  stats: SimulationStats;
  runSimulation: (count: number) => void;
  resetSimulation: () => void;
}
