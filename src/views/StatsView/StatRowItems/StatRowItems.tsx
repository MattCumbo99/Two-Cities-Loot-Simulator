import { useState } from "react";
import type { LootItem } from "../../../types/loot-item";
import "./StatRowItems.css";
import { LootItemCard } from "../../../components/LootItemCard/LootItemCard";

interface StatRowItemsProps {
  name: string;
  items: LootItem[];
}

export function StatRowItems({ name, items }: StatRowItemsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasData = items.length > 0;

  const handleToggle = () => {
    if (hasData) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`stat-row-item ${!hasData ? "stat-row-item-disabled" : ""}`}
    >
      {/* Main Row Header */}
      <div
        className="stat-row-item-header"
        onClick={handleToggle}
        role="button"
        tabIndex={hasData ? 0 : -1}
      >
        <span className="stat-row-item-label">{`${name} (${items.length.toLocaleString()})`}</span>

        <div className="stat-row-item-right">
          <span
            className={`stat-row-item-status ${!hasData ? "insufficient" : "clickable"}`}
          >
            {hasData
              ? isOpen
                ? "Click to Collapse"
                : "Click to Expand"
              : "(Insufficient Data)"}
          </span>
          {hasData && <span className="arrow">{isOpen ? "▲" : "▼"}</span>}
        </div>
      </div>

      {/* Expandable Content Area */}
      {isOpen && hasData && (
        <div className="stat-row-item-expansion">
          {items.slice(0, 50).map((item, index) => (
            <LootItemCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
