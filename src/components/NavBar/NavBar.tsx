import "./NavBar.css";

export type ActiveTab = "simulator" | "stats";

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function NavBar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="navbar-header">
      <h1>Two Cities Loot Simulator</h1>
      <nav className="tab-navigation">
        <button
          className={activeTab === "simulator" ? "active" : ""}
          onClick={() => onTabChange("simulator")}
        >
          Simulator
        </button>
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => onTabChange("stats")}
        >
          Statistics
        </button>
      </nav>
    </header>
  );
}
