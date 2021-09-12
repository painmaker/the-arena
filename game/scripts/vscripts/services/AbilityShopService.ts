export class AbilityShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("purchase_regular_ability", (_, event) => this.purchaseRegularAbility(event));
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
