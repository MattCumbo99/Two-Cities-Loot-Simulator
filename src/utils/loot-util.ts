import {
  AUSTRALIUMS,
  KILLSTREAKERS,
  WEAPON_REGISTRY,
  WEAPON_SHEENS,
} from "../data/loot-tables";
import {
  GOLD_PAN_ID,
  KILLSTREAKER_MULTIPLIERS,
  PRO_FAB_MIN_EPIC_THRESHOLD,
  PRO_FAB_MIN_LEGEND_THRESHOLD,
  ROBOT_PARTS_COMMON_PRICE,
  ROBOT_PARTS_PRISTINE_PRICE,
  SHEEN_MULTIPLIERS,
  SPEC_FAB_MIN_RARE_THRESHOLD,
  SPEC_FAB_MIN_UNCOMMON_THRESHOLD,
} from "../data/simulator-props";
import type { Killstreaker, WeaponSheen } from "../types/killstreak-effects";
import type { LootItem } from "../types/loot-item";
import type { WeaponDefinition } from "../types/weapon-definition";
import { random } from "./randomizer";

/**
 * Creates a new Golden Frying Pan item.
 *
 * @returns Golden pan `LootItem`.
 */
export const createGoldenPanItem = (): LootItem => ({
  id: GOLD_PAN_ID,
  name: "The Golden Frying Pan",
  rarity: "mythic",
  price: 7895,
  image: "/items/gold_frying_pan.png",
  sheen: getRandomSheen(),
  killstreaker: getRandomKillstreaker(),
});

/**
 * Creates a new common robot part `LootItem`.
 *
 * @param quantity Amount of robot parts to use.
 * @returns Common robot parts adjusted with quantity.
 */
export const createCommonPartsItem = (quantity: number): LootItem => ({
  id: "robot_parts_common",
  name: `Robot Parts: x${quantity}`,
  rarity: "common",
  price: ROBOT_PARTS_COMMON_PRICE * quantity,
  image: "/items/robot_part.png",
});

/**
 * Creates a new pristine robot part `LootItem`.
 *
 * @param quantity Amount of pristine parts to use.
 * @returns Pristine robot parts adjusted with quantity.
 */
export const createPristinePartsItem = (quantity: number): LootItem => ({
  id: "robot_parts_pristine",
  name: `Pristine Parts: x${quantity}`,
  rarity: "common",
  price: ROBOT_PARTS_PRISTINE_PRICE * quantity,
  image: "/items/pristine_part.png",
});

/**
 * Creates a new basic killstreak kit item.
 *
 * @param price Price of this kit.
 * @returns `LootItem` holding data on the basic killstreak kit.
 */
export const createBasicKitItem = (price: number): LootItem => ({
  id: "killstreak_kit",
  name: "Killstreak Kit",
  rarity: "uncommon",
  price: price,
  image: "/items/killstreak_kit.png",
});

export const createSpecFabItem = (wepName: string, price: number): LootItem => {
  const sheen = getRandomSheen();

  return {
    id: `spec_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Specialized Killstreak ${wepName} Kit Fabricator`,
    rarity: "common",
    price: getEstimatedPrice(price, sheen),
    image: "/items/spec_kit_fabricator.png",
    sheen: sheen,
  };
};

/**
 * Creates a new professional fabricator `LootItem`.
 *
 * @param wepName Name of the weapon.
 * @param price Price of the weapon.
 * @returns Professional Fabricator.
 */
export const createProFabItem = (wepName: string, price: number): LootItem => {
  const sheen = getRandomSheen();
  const killstreaker = getRandomKillstreaker();

  return {
    id: `pro_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Professional Killstreak ${wepName} Kit Fabricator`,
    rarity: "rare",
    price: getEstimatedPrice(price, sheen, killstreaker),
    image: "/items/pro_kit_fabricator.png",
    sheen: sheen,
    killstreaker: killstreaker,
  };
};

/**
 * Retrieves a potential increased estimate price based on the provided
 * data. Applies multipliers from the sheen and killstreaker effect.
 *
 * @param price Current price.
 * @param sheen Weapon sheen of item.
 * @param killstreaker Killstreaker effect of item.
 * @returns New price based on sheen and killstreaker.
 */
export const getEstimatedPrice = (
  price: number,
  sheen?: WeaponSheen,
  killstreaker?: Killstreaker,
): number => {
  let bonusMult = 0;

  if (sheen) {
    bonusMult += SHEEN_MULTIPLIERS[sheen];
  }

  if (killstreaker) {
    bonusMult += KILLSTREAKER_MULTIPLIERS[killstreaker];
  }

  // Drastically increase the price on the ultimate combination (TS + FH)
  if (sheen === "Team Shine" && killstreaker === "Fire Horns") {
    bonusMult += 1;
  }

  return price + price * bonusMult;
};

/**
 * Gets a random weapon.
 *
 * @returns Random weapon definition.
 */
export const getRandomWeapon = (): WeaponDefinition =>
  WEAPON_REGISTRY.at(random(0, WEAPON_REGISTRY.length - 1))!!;

/**
 * Retrieves a random weapon sheen.
 *
 * @returns Random weapon sheen.
 */
export const getRandomSheen = (): WeaponSheen =>
  WEAPON_SHEENS.at(random(0, WEAPON_SHEENS.length - 1))!;

/**
 * Retrieves a random killstreaker effect.
 *
 * @returns Random killstreaker.
 */
export const getRandomKillstreaker = (): Killstreaker =>
  KILLSTREAKERS.at(random(0, KILLSTREAKERS.length - 1))!;

/**
 * Retrieves a random specialized fabricator with random properties. Rarity and price are
 * upgraded accordingly.
 *
 * @returns Random specialized fabricator.
 */
export const getRandomSpecFab = (): LootItem => {
  const chosenWeapon = getRandomWeapon();

  const specFabItem = createSpecFabItem(
    chosenWeapon.name,
    chosenWeapon.specFabPrice,
  );

  upgradeSpecFabRarity(specFabItem);

  return specFabItem;
};

function upgradeSpecFabRarity(specFab: LootItem) {
  if (specFab.price >= SPEC_FAB_MIN_UNCOMMON_THRESHOLD) {
    specFab.rarity = "uncommon";
  }

  if (specFab.price >= SPEC_FAB_MIN_RARE_THRESHOLD) {
    specFab.rarity = "rare";
  }
}

/**
 * Retrieves a random professional fabricator with random properties. Rarity and price are
 * upgraded accordingly.
 *
 * @returns Random pro fabricator.
 */
export const getRandomProFab = (): LootItem => {
  const chosenWeapon = getRandomWeapon();

  const proFabItem = createProFabItem(
    chosenWeapon.name,
    chosenWeapon.proFabPrice,
  );

  upgradeProFabRarity(proFabItem);

  return proFabItem;
};

function upgradeProFabRarity(proFab: LootItem) {
  if (proFab.price >= PRO_FAB_MIN_EPIC_THRESHOLD) {
    proFab.rarity = "epic";
  }

  if (proFab.price >= PRO_FAB_MIN_LEGEND_THRESHOLD) {
    proFab.rarity = "legendary";
  }
}

/**
 * Retrieves a random australium weapon.
 *
 * @returns Random australium weapon.
 */
export const getRandomAustralium = (): LootItem =>
  AUSTRALIUMS.at(random(0, AUSTRALIUMS.length - 1))!!;
