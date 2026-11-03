import type { Killstreaker, WeaponSheen } from "../types/killstreak-effects";

/**
 * Price of a single tour of duty ticket.
 */
export const TICKET_PRICE = 0.99;

/**
 * Amount of missions in a single tour.
 */
export const MISSION_COUNT = 4;

/**
 * Cost to complete a single tour (ticket price * mission count).
 */
export const TOUR_COST = TICKET_PRICE * MISSION_COUNT;

/**
 * Amount of time in hours it takes to complete a single tour.
 */
export const TOUR_PLAYTIME_HOURS = 2.1;

/**
 * Pricing of a single common robot part.
 */
export const ROBOT_PARTS_COMMON_PRICE = 0.04;

/**
 * Pricing of a single pristine robot part.
 */
export const ROBOT_PARTS_PRISTINE_PRICE = 0.11;

/**
 * Identifier for the golden pan item.
 */
export const GOLD_PAN_ID = "golden_pan";

/**
 * Minimum price a specialized fabricator must meet in order to be
 * upgraded to "uncommon" rarity.
 */
export const SPEC_FAB_MIN_UNCOMMON_THRESHOLD = 0.05;

/**
 * Minimum price a specialized fabricator must meet in order to be
 * upgraded to "rare" rarity.
 */
export const SPEC_FAB_MIN_RARE_THRESHOLD = 0.5;

/**
 * Minimum price a professional fabricator must meet in order to be
 * upgraded to "epic" rarity.
 */
export const PRO_FAB_MIN_EPIC_THRESHOLD = 5;

/**
 * Minimum price a professional fabricator must meet in order to be
 * upgraded to "legendary" rarity.
 */
export const PRO_FAB_MIN_LEGEND_THRESHOLD = 20;

/**
 * Record table mapping weapon sheens to a price multiplier.
 */
export const SHEEN_MULTIPLIERS: Record<WeaponSheen, number> = {
  "Team Shine": 0.35, // +35% price boost
  "Villainous Violet": 0.15, // +15%
  "Deadly Daffodil": 0.1, // +10%
  Manndarin: 0.05, // +5%
  "Agonizing Emerald": 0.0, // Base price
  "Hot Rod": 0.0, // Base price
  "Mean Green": 0.0, // Base price
};

/**
 * Record table mapping killstreak effects to a price multipliter.
 */
export const KILLSTREAKER_MULTIPLIERS: Record<Killstreaker, number> = {
  "Fire Horns": 0.5, // +50% price boost
  Tornado: 0.3, // +30%
  "Cerebral Discharge": 0.25, // +25%
  Flames: 0.15, // +15%
  Incinerator: 0.05, // +5%
  Singularity: 0.0, // Base price
  "Hypno-Beam": 0.0, // Base price
};
