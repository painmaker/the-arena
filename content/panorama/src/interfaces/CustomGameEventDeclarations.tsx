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
  on_random_hero: {},
  on_random_hero_error: {},
  on_random_hero_success: {},
  on_chat_input_submit: { playerId: PlayerID, input: string },
  custom_player_chat: {
    playerid: PlayerID,
    uuid: string,
    text: string,
    heroname: string | undefined,
    playername: string | undefined,
  },
  hero_select_generic_error: {},
  hero_selection_timer_update: { time: number },

  purchase_regular_ability: { abilityname: string };
  purchase_regular_ability_ok: {};
  purchase_regular_ability_error: {};

  fetch_shop_abilities: { entindex: EntityIndex },
  fetch_shop_abilities_ok: { regularAbilities: string[], ultimateAbilities: string[] },
  fetch_shop_abilities_error: {},

}