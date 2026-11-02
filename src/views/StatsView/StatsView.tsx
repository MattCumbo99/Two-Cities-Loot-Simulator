import type { SimulationStats } from "../../types/simulation-stats";
import { formatCurrency } from "../../utils/currency-util";
import * as StatsUtil from "../../utils/stats-util";
import { getDetailedTimeBreakdown } from "../../utils/time-util";
import { StatRow } from "./StatRow/StatRow";
import { StatRowTour } from "./StatRowTour/StatRowTour";
import "./StatsView.css";

interface StatsViewProps {
  stats: SimulationStats;
}

export function StatsView({ stats }: StatsViewProps) {
  return (
    <div className="stats-container">
      <StatRow
        name="Tours Completed"
        value={stats.tours.length.toLocaleString()}
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

      <StatRow
        name="Australiums Earned"
        value={stats.australiums.length.toLocaleString()}
      />

      <StatRowTour name="Most Profitable Tour" tourData={stats.bestTour} />
    </div>
  );
}
