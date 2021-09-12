import { ClassAbilities } from "./ClassAbilities";

export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_ability", (_, event) => this.purchasAbility(event));
    CustomGameEventManager.RegisterListener("fetch_shop_abilities", (_, event) => this.fetchClassAbilities(event));
  }

  public fetchClassAbilities(event: { PlayerID: PlayerID, entindex: EntityIndex }): void {

    print("Fetching shop abilities for entindex: " + event.entindex);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      // TODO : Send error
      return;
    }

    const entity = EntIndexToHScript(event.entindex);
    if (!entity) {
      // TODO : Send error
      return;
    }

    if (!entity.IsBaseNPC()) {
      // TODO : Send error
      return;
    }

    if (!entity.IsRealHero()) {

    }

    CustomGameEventManager.Send_ServerToPlayer(player, "fetch_shop_abilities_ok", {
      regularAbilities: ClassAbilities["npc_dota_hero_dazzle"].RegularAbilities,
      ultimateAbilities: ClassAbilities["npc_dota_hero_dazzle"].UltimateAbilities,
    });

  }


  public purchasAbility(event: { PlayerID: PlayerID, abilityname: string }): void {

    print("Purchasing ability: " + event.abilityname);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      // TODO : Handle error
      print("Could not find player");
      return;
    }

    const hero = player.GetAssignedHero();
    if (!hero) {
      // TODO : Handle error
      print("Could not find hero");
      return;
    }

    const ability = hero.FindAbilityByName(event.abilityname);
    if (ability) {
      if (ability.GetMaxLevel() > ability.GetLevel()) {
        ability.SetLevel(ability.GetLevel() + 1);
        return;
      } else {
        // TODO : Handle error 
        print("Ability already max level");
        return;
      }
    } else {
      hero.RemoveAbility("generic_hidden");
      const newAbility = hero.AddAbility(event.abilityname);
      if (!newAbility) {
        // TODO : Handle error
        print("Could not add ability");
        return;
      }
      newAbility.SetLevel(1);
      return;
    }

  }

}
