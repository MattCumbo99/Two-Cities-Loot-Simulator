import { ItemGroupShowcase } from "../../components/ItemGroupShowcase/ItemGroupShowcase";
import { StatsBar } from "../../components/StatsBar/StatsBar";
import { TourSummaryCard } from "../../components/TourSummaryCard/TourSummaryCard";
import type { MvmSimulator } from "../../types/mvm-simuator";
import "./SimulatorView.css";

interface SimulatorViewProps {
  simulator: MvmSimulator;
}

const MAX_DISPLAYED_TOURS = 50;

export function SimulatorView({ simulator }: SimulatorViewProps) {
  return (
    <div className="simulator-container">
      <div className="top-dashboard-container">
        <div className="stats-panel">
          <StatsBar
            stats={simulator.stats}
            onSimulate={simulator.runSimulation}
            onReset={simulator.resetSimulation}
          />
        </div>

        <ItemGroupShowcase
          title="Valuable Fabricators"
          items={simulator.stats.highValueFabs}
        />

        <ItemGroupShowcase
          title="Australiums"
          items={simulator.stats.australiums}
        />
      </div>

      <div className="tour-history-list">
        {simulator.stats.tours.slice(0, MAX_DISPLAYED_TOURS).map((tour) => (
          <TourSummaryCard tour={tour} />
        ))}
      </div>
    </div>
  );
}
