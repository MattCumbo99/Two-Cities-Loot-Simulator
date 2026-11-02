import type { LootItem } from "./loot-item";

/**
 * Interface for earned rewards upon a tour completion.
 */
export interface TourLoot {
  /**
   * Price of the basic killstreak kit.
   */
  basicKitPrice: number;
  /**
   * Guaranteed specialized killstreak kit data.
   */
  specFabricator: LootItem;
  /**
   * Professional killstreak fabricator data, if earned.
   */
  proFabricator?: LootItem;
  /**
   * Australium weapon data, if earned.
   */
  australium?: LootItem;
  commonPartCount: number;
  pristinePartCount: number;
  /**
   * Any additional specialized killstreak fabricators earned in prior missions.
   */
  additionalSpecFabs: LootItem[];
}
