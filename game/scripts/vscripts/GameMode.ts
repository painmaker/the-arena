import { reloadable } from "./lib/tstl-utils";
import "./modifiers/modifier_panic";
import "./modifiers/modifier_not_on_minimap";
import "./modifiers/modifier_fow_visible";
import "./modifiers/ui/modifier_ui_status_resistance";
import "./modifiers/ui/modifier_ui_evasion";
import "./modifiers/ui/modifier_ui_health_regen";
import "./modifiers/ui/modifier_ui_base_health_regen";
import "./modifiers/ui/modifier_ui_spell_amp";
import "./modifiers/ui/modifier_ui_hero_id";
import { EXPERIENCE_PER_LEVEL_TABLE, MAX_PLAYERS } from "./settings";
import { HeroSelectionService } from "./services/HeroSelectionService";
import { ChatService } from "./services/ChatService";

declare global {
  interface CDOTAGamerules {
    Addon: GameMode;
    HeroSelectionService: HeroSelectionService;
    ChatService: ChatService;
  }
}

@reloadable
export class GameMode {

  public static Precache(this: void, context: CScriptPrecacheContext) {
    PrecacheResource("model", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_event_glitch.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_loadout.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/windrunner/windranger_arcana/windranger_arcana_anim_run_rare.vpcf", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_techies.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_shredder.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_shredder.vsndevts", context);
    PrecacheUnitByNameSync("npc_dota_hero_crystal_maiden", context)
    PrecacheUnitByNameSync("npc_dota_hero_lina", context)
    PrecacheUnitByNameSync("npc_dota_hero_dragon_knight", context)
    PrecacheUnitByNameSync("npc_dota_hero_phantom_assassin", context)
    PrecacheUnitByNameSync("npc_dota_hero_dazzle", context)
    PrecacheUnitByNameSync("npc_dota_hero_windrunner", context)
  }

  public static Activate(this: void) {
    GameRules.Addon = new GameMode();
    GameRules.HeroSelectionService = new HeroSelectionService();
    GameRules.ChatService = new ChatService();
  }

  constructor() {
    this.configure();
  }

  private configure(): void {

    ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
    ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
    CustomGameEventManager.RegisterListener("attempt_item_purchase", (_, event) => this.onItemPurchaseAttempt(event));
    CustomGameEventManager.RegisterListener("alert_shop_item", (_, event) => this.onAltertShopItem(event));

    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, MAX_PLAYERS);
    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, MAX_PLAYERS);
    GameRules.SetSameHeroSelectionEnabled(false);
    GameRules.SetHeroSelectionTime(0);
    GameRules.SetCustomGameSetupAutoLaunchDelay(0);
    GameRules.SetPreGameTime(3.0);
    GameRules.SetStrategyTime(0);
    GameRules.SetShowcaseTime(0);
    GameRules.SetPostGameTime(0);
    GameRules.SetUseUniversalShopMode(true);
    GameRules.SetUseCustomHeroXPValues(true);

    const gameMode = GameRules.GetGameModeEntity();
    gameMode.SetCustomGameForceHero("npc_dota_hero_wisp");
    gameMode.SetUnseenFogOfWarEnabled(true);
    gameMode.SetDaynightCycleDisabled(true);
    gameMode.SetAnnouncerDisabled(true);

    Timers.CreateTimer(0.1, () => {
      GameRules.SetTimeOfDay(0.5);
    });

    gameMode.SetUseCustomHeroLevels(true);
    gameMode.SetCustomHeroMaxLevel(30);
    gameMode.SetCustomXPRequiredToReachNextLevel(EXPERIENCE_PER_LEVEL_TABLE);
    gameMode.SetFixedRespawnTime(1.0);

    gameMode.SetExecuteOrderFilter(event => this.OrderFilter(event), {});
    gameMode.SetItemAddedToInventoryFilter(event => this.InventoryFilter(event), {});

    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ARMOR, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_DAMAGE, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP_REGEN, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA, 0);
    gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN, 0);

  }

  public InventoryFilter(event: ItemAddedToInventoryFilterEvent): boolean {
    // DeepPrintTable(event);
    return true;
  }

  public OrderFilter(event: ExecuteOrderFilterEvent): boolean {
    // DeepPrintTable(event);
    return true;
  }

  public onAltertShopItem(event: { PlayerID: PlayerID, itemname: string, cost: number }): void {
    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (player) {
      const goldDifference = event.cost - PlayerResource.GetGold(event.PlayerID);
      print("I will purchase " + event.itemname + ". Gold difference: " + goldDifference);
    }
  }

  public onItemPurchaseAttempt(event: { PlayerID: PlayerID, itemname: string, cost: number }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    if (PlayerResource.GetGold(event.PlayerID) >= event.cost) {
      const hero = player.GetAssignedHero();
      hero.AddItemByName(event.itemname);
      hero.ModifyGold(-event.cost, true, EDOTA_ModifyGold_Reason.DOTA_ModifyGold_PurchaseItem);
      CustomGameEventManager.Send_ServerToPlayer(player, "attempt_item_purchase_success", {});
    } else {
      CustomGameEventManager.Send_ServerToPlayer(player, "attempt_item_purchase_error", {});
    }

  }

  public OnStateChange(): void {

    const state = GameRules.State_Get();

    if (state == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME) {
      // Do nothing
    }

    if (state == DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
      Timers.CreateTimer(0.1, () => this.onGameInProgress());
    }

  }

  private onGameInProgress() {

    const spawnEntity = Entities.FindByName(undefined, "npc_boss_spawner_1");
    if (spawnEntity !== undefined) {
      const boss = CreateUnitByName("rizzrak", spawnEntity.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
      // boss.AddNewModifier(undefined, undefined, "modifier_fow_visible", undefined);
    }

    let delay = 1.0;
    [
      { hero: "npc_dota_hero_dazzle", name: "Dazzle" },
      { hero: "npc_dota_hero_crystal_maiden", name: "Crystal Maiden" },
      { hero: "npc_dota_hero_lina", name: "Lina" }
    ].forEach(bot => {
      Timers.CreateTimer(delay, () => {
        // const unit = GameRules.AddBotPlayerWithEntityScript(bot.hero, bot.name, DOTATeam_t.DOTA_TEAM_GOODGUYS, "", false) as CDOTA_BaseNPC_Hero;
        // unit.RespawnHero(false, false);
      });
      delay += 1.0;
    });

  }

  public Reload() {
    print("Script reloaded!");
  }

  private OnNpcSpawned(event: NpcSpawnedEvent) {
    const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC;
    unit.AddNewModifier(unit, undefined, "modifier_ui_status_resistance", { duration: -1 });
    unit.AddNewModifier(unit, undefined, "modifier_ui_evasion", { duration: -1 });
    unit.AddNewModifier(unit, undefined, "modifier_ui_health_regen", { duration: -1 });
    unit.AddNewModifier(unit, undefined, "modifier_ui_base_health_regen", { duration: -1 });
    unit.AddNewModifier(unit, undefined, "modifier_ui_spell_amp", { duration: -1 });
    unit.AddNewModifier(unit, undefined, "modifier_ui_hero_id", { duration: -1 });
  }

}

