interface CustomGameEventDeclarations {
  create_hero_image_for_player: { playerId: PlayerID };
  set_zone_name: { zoneName: string };
  attempt_item_purchase: { itemname: string, cost: number };
  attempt_item_purchase_success: {};
  attempt_item_purchase_error: {};
  alert_shop_item: { itemname: string, cost: number };
  on_select_hero: { heroname: string };
  on_select_hero_error: {};
  on_select_hero_success: {};
}