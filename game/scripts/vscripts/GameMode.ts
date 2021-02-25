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
import { EXPERIENCE_PER_LEVEL_TABLE } from "./settings";
import { $CombinedState } from "redux";

declare global {
  interface CDOTAGamerules {
    Addon: GameMode;
  }
}

@reloadable
export class GameMode {

  public static Precache(this: void, context: CScriptPrecacheContext) {
    PrecacheResource("model", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_techies.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_shredder.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_shredder.vsndevts", context);

    PrecacheUnitByNameSync("npc_dota_crystal_maiden", context)

  }

  public static Activate(this: void) {
    GameRules.Addon = new GameMode();
  }

  constructor() {
    this.configure();
    ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
    ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
  }

  private configure(): void {

    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 4);
    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 4);
    GameRules.SetSameHeroSelectionEnabled(true);
    GameRules.SetHeroSelectionTime(60);
    GameRules.SetCustomGameSetupAutoLaunchDelay(0);
    GameRules.SetPreGameTime(3.0);
    GameRules.SetStrategyTime(0);
    GameRules.SetShowcaseTime(0);
    GameRules.SetPostGameTime(0);
    GameRules.SetUseUniversalShopMode(true);
    GameRules.SetUseCustomHeroXPValues(true);

    const gameMode = GameRules.GetGameModeEntity();
    gameMode.SetCustomGameForceHero('npc_dota_hero_dragon_knight');
    gameMode.SetUnseenFogOfWarEnabled(true);
    gameMode.SetDaynightCycleDisabled(true);
    // gameMode.SetFogOfWarDisabled(true);

    Timers.CreateTimer(0.1, () => {
      GameRules.SetTimeOfDay(0.5);
    });

    gameMode.SetUseCustomHeroLevels(true);
    gameMode.SetCustomHeroMaxLevel(15);
    gameMode.SetCustomXPRequiredToReachNextLevel(EXPERIENCE_PER_LEVEL_TABLE);
    gameMode.SetFixedRespawnTime(1.0);

    gameMode.SetExecuteOrderFilter(event => this.OrderFilter(event), {});
    gameMode.SetItemAddedToInventoryFilter(event => this.InventoryFilter(event), {});

    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ARMOR, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ATTACK_SPEED, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_DAMAGE, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP, 0.0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP_REGEN, 0.0);

  }

  public InventoryFilter(event: ItemAddedToInventoryFilterEvent): boolean {
    // DeepPrintTable(event);
    return true;
  }

  public OrderFilter(event: ExecuteOrderFilterEvent): boolean {
    // DeepPrintTable(event);
    return true;
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
    if (unit.IsRealHero()) {
      const hero = unit as any;
      if (hero.hasSpawnedBefore !== true) {
        hero.SetCustomDeathXP(10);
        hero.AddItemByName("item_pipe");
        hero.AddItemByName("item_sange_and_yasha");
        hero.AddItemByName("item_assault");
        hero.hasSpawnedBefore = true;
        // Minimap hack for disapparing icons 
        hero.SetDayTimeVisionRange(99999);
        hero.SetNightTimeVisionRange(99999);
        const playerId = hero.GetPlayerID();
        const player = PlayerResource.GetPlayer(playerId);
        if (player) {
          CustomGameEventManager.Send_ServerToPlayer(player, "initialize_camera", {});
          CustomGameEventManager.Send_ServerToPlayer(player, "show_ability_bar", {});
          CustomGameEventManager.Send_ServerToAllClients("create_hero_image_for_player", { playerId: playerId });
        }
      }
    }
  }

}

