import { ClassAbilities } from "./ClassAbilities";

const MAX_REGULAR_ABILITIES = 3;
const ULTIMATE_INDEX = 5;

export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_ability", (_, event) => this.purchasAbility(event));
    CustomGameEventManager.RegisterListener("fetch_shop_abilities", (_, event) => this.fetchClassAbilities(event));
    CustomNetTables.SetTableValue('RegularAbilities', "0", []);
    CustomNetTables.SetTableValue('RegularAbilities', "1", []);
    CustomNetTables.SetTableValue('RegularAbilities', "2", []);
    CustomNetTables.SetTableValue('RegularAbilities', "3", []);
    CustomNetTables.SetTableValue('UltimateAbility', "0", "");
    CustomNetTables.SetTableValue('UltimateAbility', "1", "");
    CustomNetTables.SetTableValue('UltimateAbility', "2", "");
    CustomNetTables.SetTableValue('UltimateAbility', "3", "");
  }

  public fetchClassAbilities(event: { PlayerID: PlayerID, entindex: EntityIndex }): void {

    print("Fetching shop abilities for entindex: " + event.entindex);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("fetch_shop_abilities_error", { errorMsg: "Could not find player" });
      return;
    }

    const entity = EntIndexToHScript(event.entindex);
    if (!entity) {
      CustomGameEventManager.Send_ServerToPlayer(player, "fetch_shop_abilities_error", { errorMsg: "Could not find selected unit" });
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
      CustomGameEventManager.Send_ServerToAllClients("purchase_ability_error", { errorMsg: "Could not find player" });
      return;
    }

    const entity = EntIndexToHScript(event.entindex);
    if (!entity || !entity.IsBaseNPC() || !entity.IsRealHero()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Could not find hero" });
      return;
    }

    if (entity.GetPlayerID() !== event.PlayerID && !entity.IsControllableByAnyPlayer()) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Cannot purchase abilities for others" });
      return;
    }

    const ability = entity.FindAbilityByName(event.abilityname);
    if (ability) {
      if (ability.GetMaxLevel() > ability.GetLevel()) {
        ability.SetLevel(ability.GetLevel() + 1);
      } else {
        CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Already max level" });
      }
      return;
    }

    const regularAbilities = Object.values(CustomNetTables.GetTableValue('RegularAbilities', entity.GetPlayerID().toString()));
    if (regularAbilities.length === MAX_REGULAR_ABILITIES) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max abilities reached" });
      return;
    }

    const ultimateAbility = Object.values(CustomNetTables.GetTableValue('UltimateAbility', entity.GetPlayerID().toString()));
    if (ultimateAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Max ultimates reached" });
      return;
    }

    const heroAbilities = ClassAbilities[entity.GetName()];
    const isRegularAbility = heroAbilities ? heroAbilities.RegularAbilities.includes(event.abilityname) : false;
    const isUltimateAbility = heroAbilities ? heroAbilities.UltimateAbilities.includes(event.abilityname) : false;
    if (!isRegularAbility && !isUltimateAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Hero cannot purchase ability" });
      return;
    }

    const index = isUltimateAbility ? ULTIMATE_INDEX : Math.max(0, regularAbilities.length - 1);

    const replacedableAbility = entity.GetAbilityByIndex(index);
    if (!replacedableAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Unable to replace ability" });
      return;
    }
    entity.RemoveAbilityByHandle(replacedableAbility);

    const newAbility = entity.AddAbility(event.abilityname);
    if (!newAbility) {
      CustomGameEventManager.Send_ServerToPlayer(player, "purchase_ability_error", { errorMsg: "Unable to add new ability" });
      return;
    }
    newAbility.SetLevel(1);

    if (isUltimateAbility) {
      CustomNetTables.SetTableValue('UltimateAbility', entity.GetPlayerID().toString(), event.abilityname);
    } else {
      CustomNetTables.SetTableValue('RegularAbilities', entity.GetPlayerID().toString(), [...regularAbilities, event.abilityname]);
    }

    return;

  }

}
