import "./TourSummaryCard.css";
import { LootItemCard } from "../LootItemCard/LootItemCard";
import { memo } from "react";
import type { MvmTour } from "../../types/mvm-tour";
import {
  createBasicKitItem,
  createCommonPartsItem,
  createPristinePartsItem,
} from "../../utils/loot-util";

interface TourSummaryCardProps {
  tour: MvmTour;
}

function TourSummaryCardComponent({ tour }: TourSummaryCardProps) {
  const tourRewards = tour.tourLoot;
  const roboPartItem = createCommonPartsItem(tourRewards.commonPartCount);
  const hasPristineParts = tourRewards.pristinePartCount > 0;

  return (
    <div className="tour-summary-card">
      <div className="tour-card-header">
        <h3 className="tour-number-title">
          Tour{" "}
          <span className="tour-number-highlight">
            #{tour.tourNumber.toLocaleString()}
          </span>
        </h3>
      </div>

      <div className="tour-loot-container">
        <LootItemCard item={roboPartItem} />

        {hasPristineParts && (
          <LootItemCard
            item={createPristinePartsItem(tourRewards.pristinePartCount)}
          />
        )}

        <LootItemCard item={createBasicKitItem(tourRewards.basicKitPrice)} />

        <LootItemCard item={tourRewards.specFabricator} />

        {/* Any additional fabricators earned */}
        {tourRewards.additionalSpecFabs.map((fab) => (
          <LootItemCard key={fab.id} item={fab} />
        ))}

        {tourRewards.proFabricator && (
          <LootItemCard item={tourRewards.proFabricator} />
        )}

        {tourRewards.australium && (
          <LootItemCard item={tourRewards.australium} />
        )}
      </div>
    </div>
  );
}

export const TourSummaryCard = memo(TourSummaryCardComponent);
