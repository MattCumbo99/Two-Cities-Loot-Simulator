import { useMemo } from "react";
import type { SimulationStats } from "../../types/simulation-stats";
import { formatCurrency } from "../../utils/currency-util";
import * as StatsUtil from "../../utils/stats-util";
import { getDetailedTimeBreakdown } from "../../utils/time-util";
import { StatRow } from "./StatRow/StatRow";
import { StatRowItems } from "./StatRowItems/StatRowItems";
import { StatRowTour } from "./StatRowTour/StatRowTour";
import "./StatsView.css";

interface StatsViewProps {
  stats: SimulationStats;
}

export function StatsView({ stats }: StatsViewProps) {
  const teamShineFireHorns = useMemo(() => {
    return stats.highValueFabs.filter(
      (fab) => fab.sheen === "Team Shine" && fab.killstreaker === "Fire Horns",
    );
  }, [stats.highValueFabs]);

  return (
    <div className="stats-container">
      <StatRow
        name="Tours Completed"
        value={stats.tours.length.toLocaleString()}
      />

      <StatRowItems name="Australiums" items={stats.australiums} />

      <StatRowItems name="High Value Fabricators" items={stats.highValueFabs} />

      <StatRowItems
        name="Valuable Team Shine + Fire Horns Fabricators"
        items={teamShineFireHorns}
      />

      <StatRowItems
        name="Most Expensive Professional Fabricator"
        items={stats.bestProFab ? [stats.bestProFab] : []}
      />

      <StatRow
        name="Money Spent"
        value={formatCurrency(stats.totalMoneySpent)}
      />

      <StatRow
        name="Total Playtime"
        value={getDetailedTimeBreakdown(stats.totalHoursPlayed)}
      />

      <StatRow name="Loot Value" value={formatCurrency(stats.totalLootValue)} />

      <StatRow
        name="Golden Pans Received"
        value={stats.totalGoldPans.toLocaleString()}
      />

      <StatRow
        name="Net Profit / Loss"
        value={StatsUtil.formatNetProfit(stats)}
      />

      <StatRow
        name="Robot Parts Collected"
        value={stats.totalRobotParts.toLocaleString()}
      />

      <StatRow
        name="Specialized Fabricators Earned"
        value={stats.totalSpecFabs.toLocaleString()}
      />

      <StatRow
        name="Professional Fabricators Earned"
        value={stats.totalProFabs.toLocaleString()}
      />

      <StatRowTour name="Most Profitable Tour" tourData={stats.bestTour} />
    </div>
  );
}
