import { reloadable } from "./lib/tstl-utils";
import "./modifiers/modifier_not_on_minimap";
import "./modifiers/modifier_fow_visible";
import "./modifiers/modifier_no_statusbar";
import "./modifiers/modifier_shopkeeper";
import "./modifiers/ui/modifier_ui_status_resistance";
import "./modifiers/ui/modifier_ui_evasion";
import "./modifiers/ui/modifier_ui_health_regen";
import "./modifiers/ui/modifier_ui_base_health_regen";
import "./modifiers/ui/modifier_ui_spell_amp";
import "./modifiers/ui/modifier_ui_hero_id";
import { EXPERIENCE_PER_LEVEL_TABLE, HERO_SELECTION_TIME, MAX_PLAYERS } from "./settings";
import { HeroSelectionService } from "./services/HeroSelectionService";
import { ChatService } from "./services/ChatService";
import { ShopService } from "./services/ShopService";
import { AbilityShopService } from "./services/AbilityShopService/AbilityShopService";

declare global {
  interface CDOTAGamerules {
    Addon: GameMode;
    HeroSelectionService: HeroSelectionService;
    ChatService: ChatService;
    ShopService: ShopService;
    AbilityShopService: AbilityShopService;
    dummy: CDOTA_BaseNPC,
  }
}

@reloadable
export class GameMode {

  public static Precache(this: void, context: CScriptPrecacheContext) {

    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_dazzle.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_vo_dazzle.vsndevts", context);

    PrecacheResource("model", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_event_glitch.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_loadout.vpcf", context);
    PrecacheResource("particle", "particles/econ/items/windrunner/windranger_arcana/windranger_arcana_anim_run_rare.vpcf", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_dazzle.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_techies.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_shredder.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_bloodseeker.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_shredder.vsndevts", context);
    PrecacheResource("soundfile", "game_sounds_ui_imported.vsndevts", context);
    PrecacheUnitByNameSync("npc_dota_hero_crystal_maiden", context)
    PrecacheUnitByNameSync("npc_dota_hero_lina", context)
    PrecacheUnitByNameSync("npc_dota_hero_dragon_knight", context)
    PrecacheUnitByNameSync("npc_dota_hero_phantom_assassin", context)
    PrecacheUnitByNameSync("npc_dota_hero_dazzle", context)
    PrecacheUnitByNameSync("npc_dota_hero_windrunner", context)
    PrecacheUnitByNameSync("shopkeeper_abilities", context)
    PrecacheUnitByNameSync("npc_dota_creep_goodguys_melee", context)
  }

  public static Activate(this: void) {
    GameRules.Addon = new GameMode();
    GameRules.HeroSelectionService = new HeroSelectionService();
    GameRules.ChatService = new ChatService();
    GameRules.ShopService = new ShopService();
    GameRules.AbilityShopService = new AbilityShopService();
  }

  constructor() {

    ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
    ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
    ListenToGameEvent("player_connect_full", event => this.OnPlayerConnectFull(event), undefined);
    ListenToGameEvent("dota_player_gained_level", event => this.OnLevelUp(event), undefined);

    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, MAX_PLAYERS);
    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, MAX_PLAYERS);
    GameRules.SetSameHeroSelectionEnabled(false);
    GameRules.SetHeroSelectionTime(0);
    GameRules.SetCustomGameSetupAutoLaunchDelay(0);
    GameRules.SetPreGameTime(0.0);
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

    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ARMOR, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_DAMAGE, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP_REGEN, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA, 0);
    // gameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN, 0);

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

    let heroSelectionRemainingTime = HERO_SELECTION_TIME;
    Timers.CreateTimer(0.0, () => {
      heroSelectionRemainingTime -= 1;
      CustomGameEventManager.Send_ServerToAllClients("hero_selection_timer_update", { time: heroSelectionRemainingTime });
      if (heroSelectionRemainingTime <= 0) {
        GameRules.HeroSelectionService.AssignHeroesToHerolessPlayers();
        return;
      }
      return 1;
    });

    const dummyUnitSpawner = Entities.FindByName(undefined, "npc_dota_spawner_dummy_unit");
    if (dummyUnitSpawner !== undefined) {
      const dummy = CreateUnitByName("dummy_unit", dummyUnitSpawner.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
      GameRules.dummy = dummy;
    }

    const spawnEntity = Entities.FindByName(undefined, "npc_boss_spawner_1");
    if (spawnEntity !== undefined) {
      CreateUnitByName("rizzrak", spawnEntity.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
      // boss.AddNewModifier(undefined, undefined, "modifier_fow_visible", undefined);
    }

    const shopkeeperAbilitiesSpawner = Entities.FindByName(undefined, "npc_dota_spawner_shopkeeper_abilities");
    if (shopkeeperAbilitiesSpawner !== undefined) {
      CreateUnitByName("shopkeeper_abilities", shopkeeperAbilitiesSpawner.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    let delay = 1.0;
    [
      { hero: "npc_dota_hero_dragon_knight", name: "Dragon Knight" },
      // { hero: "npc_dota_hero_crystal_maiden", name: "Crystal Maiden" },
      // { hero: "npc_dota_hero_lina", name: "Lina" }
    ].forEach(bot => {
      Timers.CreateTimer(delay, () => {
        const unit = GameRules.AddBotPlayerWithEntityScript(bot.hero, bot.name, DOTATeam_t.DOTA_TEAM_GOODGUYS, "", false) as CDOTA_BaseNPC_Hero;
        unit.RespawnHero(false, false);
      });
      delay += 1.0;
    });

    const creepSpawner1 = Entities.FindByName(undefined, "radiant_melee_creep_spawner_1");
    if (creepSpawner1) {
      CreateUnitByName("npc_dota_creep_goodguys_melee", creepSpawner1.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    const creepSpawner2 = Entities.FindByName(undefined, "radiant_melee_creep_spawner_2");
    if (creepSpawner2) {
      CreateUnitByName("npc_dota_creep_goodguys_melee", creepSpawner2.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    const creepSpawner3 = Entities.FindByName(undefined, "radiant_melee_creep_spawner_3");
    if (creepSpawner3) {
      CreateUnitByName("npc_dota_creep_goodguys_melee", creepSpawner3.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    const creepSpawner4 = Entities.FindByName(undefined, "radiant_melee_creep_spawner_4");
    if (creepSpawner4) {
      CreateUnitByName("npc_dota_creep_goodguys_melee", creepSpawner4.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    const creepSpawner5 = Entities.FindByName(undefined, "radiant_melee_creep_spawner_5");
    if (creepSpawner5) {
      CreateUnitByName("npc_dota_creep_goodguys_melee", creepSpawner5.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

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
    unit.AddNewModifier(unit, undefined, "modifier_no_statusbar", { duration: -1 });

    // @ts-ignore
    if (!unit.bFirstSpawn && unit.IsRealHero() && unit.GetUnitName() !== "npc_dota_hero_wisp") {
      print("Spawning hero " + unit.GetName() + " for the first time...");
      unit.SetAbilityPoints(3);
      // @ts-ignore
      unit.bFirstSpawn = true;
      unit.AddItemByName("item_heart");
      unit.AddItemByName("item_skadi");
      unit.AddItemByName("item_pipe");
      unit.AddItemByName("item_blink");
      unit.AddItemByName("item_buckler");
    }

  }

  private OnPlayerConnectFull(event: PlayerConnectFullEvent) {
    print(event);
  }

  private OnLevelUp(event: DotaPlayerGainedLevelEvent) {

  }

}

