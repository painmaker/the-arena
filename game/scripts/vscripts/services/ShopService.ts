import { createUUID } from "../utils/uuid";

export class ShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("attempt_item_purchase", (_, event) => this.onItemPurchase(event));
    CustomGameEventManager.RegisterListener("alert_shop_item", (_, event) => this.onAltertShopItem(event));
  }

  public onAltertShopItem(event: { PlayerID: PlayerID, itemname: string, cost: number }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const goldDifference = event.cost - PlayerResource.GetGold(event.PlayerID);

    let text = "";
    if (goldDifference > 0) {
      text = "I need " + goldDifference + " gold for #" + event.itemname + ".";
    } else {
      text = "I will purchase #" + event.itemname + ".";
    };

    CustomGameEventManager.Send_ServerToAllClients("custom_player_chat", {
      playerid: event.PlayerID,
      uuid: createUUID(),
      text: text,
      heroname: player.GetAssignedHero().GetName(),
      playername: PlayerResource.GetPlayerName(event.PlayerID),
    });

  }

  public onItemPurchase(event: { PlayerID: PlayerID, itemname: string, cost: number }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const hero = player.GetAssignedHero();

    let hasFreeItemSlot = false;
    for (let i = DOTAScriptInventorySlot_t.DOTA_ITEM_SLOT_1; i <= DOTAScriptInventorySlot_t.DOTA_ITEM_SLOT_6; i++) {
      const item = hero.GetItemInSlot(i);
      if (item === undefined) {
        hasFreeItemSlot = true;
      }
      if (item && item.GetName() === event.itemname && item.IsStackable()) {
        hasFreeItemSlot = true;
      }
    }

    if (!hasFreeItemSlot) {
      CustomGameEventManager.Send_ServerToPlayer(player, "attempt_item_purchase_error", {});
      return;
    }

    if (PlayerResource.GetGold(event.PlayerID) < event.cost) {
      CustomGameEventManager.Send_ServerToPlayer(player, "attempt_item_purchase_error", {});
      return;
    }

    hero.AddItemByName(event.itemname);
    hero.SpendGold(event.cost, EDOTA_ModifyGold_Reason.DOTA_ModifyGold_PurchaseItem);
    CustomGameEventManager.Send_ServerToPlayer(player, "attempt_item_purchase_success", {});

  }

}
