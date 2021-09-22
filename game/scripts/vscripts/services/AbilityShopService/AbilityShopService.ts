import { ClassAbilities } from "./ClassAbilities";

const MAX_REGULAR_ABILITIES = 5;
const ULTIMATE_INDEX = 5;
const LEVEL_REQUIRED_TO_LEVEL_UP_ULTIMATE = 6;

export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_ability", (_, event) => this.purchasAbility(event));
    CustomGameEventManager.RegisterListener("fetch_shop_abilities", (_, event) => this.fetchClassAbilities(event));
    CustomNetTables.SetTableValue('RegularAbilities', "0", []);
    CustomNetTables.SetTableValue('RegularAbilities', "1", []);
    CustomNetTables.SetTableValue('RegularAbilities', "2", []);
    CustomNetTables.SetTableValue('RegularAbilities', "3", []);
    CustomNetTables.SetTableValue('UltimateAbility', "0", { ability: undefined });
    CustomNetTables.SetTableValue('UltimateAbility', "1", { ability: undefined });
    CustomNetTables.SetTableValue('UltimateAbility', "2", { ability: undefined });
    CustomNetTables.SetTableValue('UltimateAbility', "3", { ability: undefined });
  }

  public fetchClassAbilities(event: { PlayerID: PlayerID, entindex: EntityIndex }): void {

    print("Fetching shop abilities for entindex: " + event.entindex);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("fetch_shop_abilities_error", { errorMsg: "Could Not Find Player" });
      return;
    }

    const entity = EntIndexToHScript(event.entindex);
    if (!entity) {
      CustomGameEventManager.Send_ServerToPlayer(player, "fetch_shop_abilities_error", { errorMsg: "Could Not Find Selected Unit" });
      return;
    }

    let regularAbilities: string[] = [];
    let ultimateAbilities: string[] = [];
    if (entity.IsBaseNPC() && entity.IsRealHero()) {
      const heroAbilities = ClassAbilities[entity.GetName()];
      regularAbilities = heroAbilities ? heroAbilities.RegularAbilities : [];
      ultimateAbilities = heroAbilities ? heroAbilities.UltimateAbilities : [];
    }

    CustomGameEventManager.Send_ServerToPlayer(player, "fetch_shop_abilities_ok", {
      regularAbilities,
      ultimateAbilities
    });

  }


  public purchasAbility(event: { PlayerID: PlayerID, entindex: EntityIndex, abilityname: string }): void {

    print("Purchasing ability " + event.abilityname + " for entindex " + event.entindex);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("purchase_ability_error", { errorMsg: "Could Not Find Player" });
      return;
    }

    const entity = EntIndexToHScript(event.entindex);
    if (!entity || !entity.IsBaseNPC() || !entity.IsRealHero()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Could Not Find Hero" });
      return;
    }

    if (entity.GetPlayerID() !== event.PlayerID && !entity.IsControllableByAnyPlayer()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Cannot Purchase Abilities For Others" });
      return;
    }

    const abilityPoints = entity.GetAbilityPoints();
    if (abilityPoints <= 0) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Missing Ability Points" });
      return;
    }

    const ability = entity.FindAbilityByName(event.abilityname);
    if (ability) {

      if (ability.GetMaxLevel() === ability.GetLevel()) {
        CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Ability Is Max Level" });
        return;
      }

      const requiredLevel = ability.GetHeroLevelRequiredToUpgrade();
      if (requiredLevel > entity.GetLevel()) {
        CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Requires Hero Level " + requiredLevel });
        return;
      }

      if (!ability.CanAbilityBeUpgraded()) {
        CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Ability Cannot Be Upgraded" });
        return;
      }

      ability.UpgradeAbility(false);
      entity.SetAbilityPoints(abilityPoints - 1);

      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_ok", {});

      return;

    }

    const heroAbilities = ClassAbilities[entity.GetName()];
    const isRegularAbility = heroAbilities ? heroAbilities.RegularAbilities.includes(event.abilityname) : false;
    const isUltimateAbility = heroAbilities ? heroAbilities.UltimateAbilities.includes(event.abilityname) : false;
    if (!isRegularAbility && !isUltimateAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Hero Cannot Purchase This Ability" });
      return;
    }

    const regularAbilities = Object.values(CustomNetTables.GetTableValue('RegularAbilities', entity.GetPlayerID().toString()));
    if (isRegularAbility && regularAbilities.length === MAX_REGULAR_ABILITIES) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max Regular Abilities Reached" });
      return;
    }

    const ultimateAbility = CustomNetTables.GetTableValue('UltimateAbility', entity.GetPlayerID().toString());
    if (isUltimateAbility && ultimateAbility.ability !== undefined) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max Ultimate Abilities Reached" });
      return;
    }

    if (isUltimateAbility && entity.GetLevel() < LEVEL_REQUIRED_TO_LEVEL_UP_ULTIMATE) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Requires Hero Level " + LEVEL_REQUIRED_TO_LEVEL_UP_ULTIMATE });
      return;
    }

    const index = isUltimateAbility ? ULTIMATE_INDEX : regularAbilities.length;

    const replacedableAbility = entity.GetAbilityByIndex(index);
    if (!replacedableAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Unable To Replace Ability" });
      return;
    }
    entity.RemoveAbilityByHandle(replacedableAbility);

    const newAbility = entity.AddAbility(event.abilityname);
    if (!newAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Unable To Add New Ability" });
      return;
    }

    newAbility.SetLevel(1);
    entity.SetAbilityPoints(abilityPoints - 1);

    if (isUltimateAbility) {
      CustomNetTables.SetTableValue('UltimateAbility', entity.GetPlayerID().toString(), { ability: event.abilityname });
    } else {
      CustomNetTables.SetTableValue('RegularAbilities', entity.GetPlayerID().toString(), [...regularAbilities, event.abilityname]);
    }

    CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_ok", {});

    return;

  }

}
