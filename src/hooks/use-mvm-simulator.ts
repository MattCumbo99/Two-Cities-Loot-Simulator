import { useState } from "react";
import type { MvmSimulator } from "../types/mvm-simuator";
import type { SimulationStats } from "../types/simulation-stats";
import { createInitialStats } from "../utils/stats-util";
import { simulateTours } from "../utils/simulation-engine";

export function useMvmSimulator(): MvmSimulator {
  const [stats, setStats] = useState<SimulationStats>(createInitialStats());

  const runSimulation = (amount: number) => {
    setStats((prevStats) => simulateTours(prevStats, amount));
  };

  const resetSimulation = () => {
    setStats(createInitialStats());
  };

  return {
    stats,
    runSimulation,
    resetSimulation,
  };
}
