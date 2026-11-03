import type { LootItem } from "../types/loot-item";
import type { TourLoot } from "../types/tour-loot";
import { random } from "./randomizer";
import type { SimulationStats } from "../types/simulation-stats";
import type { MvmTour } from "../types/mvm-tour";
import {
  createBasicKitItem,
  createCommonPartsItem,
  createGoldenPanItem,
  createPristinePartsItem,
  getRandomAustralium,
  getRandomProFab,
  getRandomSpecFab,
} from "./loot-util";
import {
  GOLD_PAN_ID,
  TOUR_COST,
  TOUR_PLAYTIME_HOURS,
} from "../data/simulator-props";

/**
 * Performs a set number of events simulating the completion of a single two cities tour.
 *
 * @param currentStats The current statistic data.
 * @param count Amount of simulations to run.
 * @returns Updated statistics
 */
export function simulateTours(
  currentStats: SimulationStats,
  count: number,
): SimulationStats {
  const newTours = [...currentStats.tours];

  const newAustraliums = [...currentStats.australiums];
  const newHighValueFabs = [...currentStats.highValueFabs];

  let bestTour = currentStats.bestTour;

  let totalHoursPlayed = currentStats.totalHoursPlayed;
  let totalLootValue = currentStats.totalLootValue;
  let totalMoneySpent = currentStats.totalMoneySpent;
  let totalGoldPans = currentStats.totalGoldPans;
  let totalSpecFabs = currentStats.totalSpecFabs;
  let totalProFabs = currentStats.totalProFabs;
  let totalRobotParts = currentStats.totalRobotParts;

  let currentTourNumber = newTours.length + 1;

  // Begin tour simulation
  for (let i = 0; i < count; i++) {
    const tourLoot = generateTourLoot();
    const tourItems = unwrapLoot(tourLoot);
    const tourEarnings = getLootValue(tourItems);

    totalHoursPlayed += TOUR_PLAYTIME_HOURS;
    totalLootValue += tourEarnings;
    totalMoneySpent += TOUR_COST;
    totalRobotParts += tourLoot.commonPartCount + tourLoot.pristinePartCount;
    totalSpecFabs += 1 + tourLoot.additionalSpecFabs.length;

    if (containsGoldPan(tourItems)) {
      totalGoldPans++;
    }

    // Professional fabricator
    const proFab = tourLoot.proFabricator;
    if (proFab) {
      totalProFabs++;

      if (isFabHighValue(proFab)) newHighValueFabs.push(proFab);
    }

    // Australium
    const australium = tourLoot.australium;
    if (australium) newAustraliums.push(australium);

    const currentTour: MvmTour = {
      tourNumber: currentTourNumber++,
      tourEarnings,
      tourLoot,
    };

    if (!bestTour || currentTour.tourEarnings > bestTour.tourEarnings) {
      bestTour = currentTour;
    }

    // Add this tour to the history
    newTours.push(currentTour);
  }

  return {
    tours: newTours.reverse(),
    bestTour,
    australiums: newAustraliums.reverse(),
    highValueFabs: newHighValueFabs.reverse(),
    totalGoldPans,
    totalHoursPlayed,
    totalLootValue,
    totalMoneySpent,
    totalProFabs,
    totalRobotParts,
    totalSpecFabs,
  };
}

/**
 * Simulates the loot reward for completing a single tour.
 *
 * @returns The generated tour loot.
 */
const generateTourLoot = (): TourLoot => ({
  basicKitPrice: randomKitPrice(),
  specFabricator: getRandomSpecFab(),
  proFabricator: gambleProFab(),
  australium: gambleAustralium(),
  commonPartCount: random(20, 27),
  pristinePartCount: gamblePristineParts(),
  additionalSpecFabs: gambleAdditionalSpecFabs(),
});

/**
 * Converts tour loot data into an array of loot items.
 *
 * @param tourLoot Data to read
 * @returns Loot items based on tour data.
 */
function unwrapLoot(tourLoot: TourLoot): LootItem[] {
  const items: LootItem[] = [];

  // Common robot parts
  const commonRoboItem = createCommonPartsItem(tourLoot.commonPartCount);
  items.push(commonRoboItem);

  // Add pristine parts
  if (tourLoot.pristinePartCount > 0) {
    const pristineRoboItem = createPristinePartsItem(
      tourLoot.pristinePartCount,
    );

    items.push(pristineRoboItem);
  }

  // Additional spec fabs
  items.push(...tourLoot.additionalSpecFabs);

  // Basic killstreak kit
  const basicKit = createBasicKitItem(tourLoot.basicKitPrice);
  items.push(basicKit);

  // Guaranteed spec fabricator
  items.push(tourLoot.specFabricator);

  // Pro fabricator
  if (tourLoot.proFabricator) items.push(tourLoot.proFabricator);

  // Australium
  if (tourLoot.australium) items.push(tourLoot.australium);

  return items;
}

/**
 * Gets the sum of all item's prices.
 *
 * @param loot Items to sum up.
 * @returns Sum of each item's price.
 */
const getLootValue = (loot: LootItem[]): number =>
  loot.reduce((sum, item) => sum + item.price, 0);

const randomKitPrice = (): number => random(40, 70) * 0.01;

const containsGoldPan = (items: LootItem[]): boolean =>
  items.find((item) => item.id === GOLD_PAN_ID) !== undefined;

const isFabHighValue = (fabItem: LootItem): boolean => fabItem.price >= 10;

/**
 * Rolls for a chance at succeeding four different times.
 *
 * @param chancePerMission Decimal percentage to succeed.
 * @returns Number of successes.
 */
function rollRewards(chancePerMission: number): number {
  const minRoll = 100 - 100 * chancePerMission;
  const missionCount = 4;
  let rewardAmount = 0;

  for (let i = 0; i < missionCount; i++) {
    const roll = random(1, 100);

    if (roll >= minRoll) {
      rewardAmount++;
    }
  }

  return rewardAmount;
}

const gamblePristineParts = (): number => rollRewards(0.17);

function gambleAdditionalSpecFabs(): LootItem[] {
  const rewardedKits = rollRewards(0.05);

  const specFabs: LootItem[] = [];

  for (let i = 0; i < rewardedKits; i++) {
    specFabs.push(getRandomSpecFab());
  }

  return specFabs;
}

/**
 * Randomly determines if the player has earned a Professional Killstreak Kit.
 * The chance of earning a Professional Killstreak Kit is 15%.
 *
 * @returns The earned Professional Killstreak Kit, or null if not earned.
 */
function gambleProFab(): LootItem | undefined {
  if (hasEarnedProFab()) {
    return getRandomProFab();
  }

  return undefined;
}

const hasEarnedProFab = (): boolean => random(1, 100) >= 85;

/**
 * Randomly determines if the player has earned an Australium weapon or the Golden Pan.
 * The chance of earning the Golden Pan is 1 in 19,500, while the chance of earning an Australium weapon is 1 in 100.
 *
 * @returns The earned Australium weapon or Golden Pan, or undefined if neither was earned.
 */
function gambleAustralium(): LootItem | undefined {
  // Roll for the golden frying pan
  if (hasEarnedGoldPan()) {
    return createGoldenPanItem();
  }

  // Roll for an australium
  if (hasEarnedAustralium()) {
    return getRandomAustralium();
  }

  return undefined;
}

const hasEarnedGoldPan = (): boolean => random(1, 19500) === 19500;

const hasEarnedAustralium = (): boolean => random(1, 100) >= 99;
