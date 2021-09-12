import { ClassAbilities } from "./ClassAbilities";

export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_regular_ability", (_, event) => this.purchaseRegularAbility(event));
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


  public purchaseRegularAbility(event: { PlayerID: PlayerID, abilityname: string }): void {

    print("Purchasing ability: " + event.abilityname);

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const hero = player.GetAssignedHero();


  }

}
