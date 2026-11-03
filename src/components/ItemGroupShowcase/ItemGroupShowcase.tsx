import type { LootItem } from "../../types/loot-item";
import { LootItemCard } from "../LootItemCard/LootItemCard";
import "./ItemGroupShowcase.css";

interface ItemGroupShowcaseProps {
  title: string;
  items: LootItem[];
  maxItems?: number;
}

export function ItemGroupShowcase({
  title,
  items,
  maxItems = 20,
}: ItemGroupShowcaseProps) {
  return (
    <div className="grouping-panel">
      <div className="grouping-panel-header">
        <h2>{title}</h2>
        <span className="grouping-panel-count">{items.length}</span>
      </div>

      <div className="item-area">
        {items.slice(0, maxItems).map((item) => (
          <LootItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
