
interface KeyValueItem {
  ItemShoppable: number;
  ItemCost: number;
  ItemCategory: string,
  ItemShopTags: string,
}

export class ItemsShopService {

  constructor() {
    CustomGameEventManager.RegisterListener("attempt_item_purchase", (_, event) => this.onItemPurchase(event));
    CustomGameEventManager.RegisterListener("fetch_items_shop_item", (_, event) => this.fetchItems(event));
  }

  public fetchItems(event: { PlayerID: PlayerID }): void {

    print("Backend - Fetching items!")

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const items = LoadKeyValues("scripts/npc/npc_items_custom.txt") as Record<string, KeyValueItem>;

    const consumables: ItemsShopItem[] = Object.entries(items)
      .filter(([_, value]) => value['ItemShoppable'] === 1)
      .filter(([_, value]) => value['ItemCategory'] === 'CONSUMABLES')
      .map(([key, value]) => ({
        itemname: key,
        cost: value['ItemCost'],
        tags: value['ItemShopTags'].split(';'),
      }));


    const basics: ItemsShopItem[] = Object.entries(items)
      .filter(([_, value]) => value['ItemShoppable'] === 1)
      .filter(([_, value]) => value['ItemCategory'] === 'BASICS')
      .map(([key, value]) => ({
        itemname: key,
        cost: value['ItemCost'],
        tags: value['ItemShopTags'].split(';'),
      }));

    CustomGameEventManager.Send_ServerToPlayer(player, "fetch_items_shop_item_success", {
      consumables,
      basics
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
