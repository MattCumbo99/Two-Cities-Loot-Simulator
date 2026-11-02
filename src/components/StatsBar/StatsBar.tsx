import React from "react";
import type { SimulationStats } from "../../types/simulation-stats";
import "./StatsBar.css";
import { getDetailedTimeBreakdown } from "../../utils/time-util";
import { formatCurrency } from "../../utils/currency-util";
import * as StatsUtil from "../../utils/stats-util";

interface Props {
  stats: SimulationStats;
  onSimulate: (count: number) => void;
  onReset: () => void;
}

export const StatsBar: React.FC<Props> = ({ stats, onSimulate, onReset }) => {
  const isProfitable = StatsUtil.getNetProfit(stats) >= 0;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <label>Tours Completed</label>
        <span>{stats.tours.length.toLocaleString()}</span>
      </div>

      <div className="stat-card">
        <label>Money Spent</label>
        <span>{formatCurrency(stats.totalMoneySpent)}</span>
      </div>

      <div className="stat-card">
        <label>Hours Played</label>

        <div className="stat-card-details">
          <span className="stat-value">
            {stats.totalHoursPlayed.toLocaleString()}
          </span>
          <span className="stat-subtitle">
            {getDetailedTimeBreakdown(stats.totalHoursPlayed)}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <label>Loot Value</label>
        <span>{formatCurrency(stats.totalLootValue)}</span>
      </div>

      <div className="stat-card">
        <label>Golden Pans</label>
        <span>{stats.totalGoldPans.toLocaleString()}</span>
      </div>

      <div className={`stat-card ${isProfitable ? "profit" : "loss"}`}>
        <label>Net Profit / Loss</label>
        <span>{StatsUtil.formatNetProfit(stats)}</span>
      </div>

      <div className="actions">
        <button onClick={() => onSimulate(1)}>+1 Tour</button>
        <button onClick={() => onSimulate(10)}>+10 Tours</button>
        <button onClick={() => onSimulate(100)}>+100 Tours</button>
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
