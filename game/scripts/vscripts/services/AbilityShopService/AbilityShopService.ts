import { ClassAbilities } from "./ClassAbilities";

const MAX_REGULAR_ABILITIES = 5;
const MAX_ULTIMATE_ABILITIES = 1;
const ULTIMATE_INDEX = 5;

export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_ability", (_, event) => this.purchasAbility(event));
    CustomGameEventManager.RegisterListener("fetch_shop_abilities", (_, event) => this.fetchClassAbilities(event));
    CustomNetTables.SetTableValue('RegularAbilities', "0", []);
    CustomNetTables.SetTableValue('RegularAbilities', "1", []);
    CustomNetTables.SetTableValue('RegularAbilities', "2", []);
    CustomNetTables.SetTableValue('RegularAbilities', "3", []);
    CustomNetTables.SetTableValue('UltimateAbilities', "0", []);
    CustomNetTables.SetTableValue('UltimateAbilities', "1", []);
    CustomNetTables.SetTableValue('UltimateAbilities', "2", []);
    CustomNetTables.SetTableValue('UltimateAbilities', "3", []);
  }

  public fetchClassAbilities(event: { PlayerID: PlayerID, entindex: EntityIndex }): void {

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

    let regularAbilities: ShopAbility[] = [];
    let ultimateAbilities: ShopAbility[] = [];
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

    const regularAbility = heroAbilities.RegularAbilities.find(ability => ability.name === event.abilityname);
    const regularAbilities = Object.values(CustomNetTables.GetTableValue('RegularAbilities', entity.GetPlayerID().toString()));

    const ultimateAbility = heroAbilities.UltimateAbilities.find(ability => ability.name === event.abilityname);
    const ultimateAbilities = Object.values(CustomNetTables.GetTableValue('UltimateAbilities', entity.GetPlayerID().toString()));

    if (!regularAbility && !ultimateAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Hero Cannot Purchase This Ability" });
      return;
    }

    if (regularAbility && regularAbilities.length === MAX_REGULAR_ABILITIES) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max Regular Abilities Reached" });
      return;
    }

    if (regularAbility && regularAbility.requiredLevel > entity.GetLevel()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Requires Hero Level " + regularAbility.requiredLevel });
      return;
    }

    if (ultimateAbility && ultimateAbilities.length === MAX_ULTIMATE_ABILITIES) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max Ultimate Abilities Reached" });
      return;
    }

    if (ultimateAbility && ultimateAbility.requiredLevel > entity.GetLevel()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Requires Hero Level " + ultimateAbility.requiredLevel });
      return;
    }

    const index = ultimateAbility ? ULTIMATE_INDEX : regularAbilities.length;

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

    if (ultimateAbility) {
      CustomNetTables.SetTableValue('UltimateAbilities', entity.GetPlayerID().toString(), [...ultimateAbilities, ultimateAbility]);
    } else {
      CustomNetTables.SetTableValue('RegularAbilities', entity.GetPlayerID().toString(), [...regularAbilities, regularAbility!]);
    }

    CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_ok", {});

    return;

  }

}
