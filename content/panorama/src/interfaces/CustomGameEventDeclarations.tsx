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
  on_focus_hero: { heroname: string };
  on_focus_hero_success: {
    heroname: string,
    abilities: string[],
    sound: string,
    camera: string,
    attribute: string,
    lore: string,
    health: number,
    healthRegen: number,
    mana: number,
    manaRegen: number,
    damage: number,
    armor: number,
    movespeed: number,
    attackRange: number,
    attackSpeed: number,
    attackRate: number,
    agility: number,
    agilityGain: number,
    strength: number,
    strengthGain: number,
    intelligence: number,
    intelligenceGain: number,
  };
}