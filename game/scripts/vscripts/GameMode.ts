import { reloadable } from "./lib/tstl-utils";
import "./modifiers/modifier_panic";
import "./modifiers/modifier_not_on_minimap";
import { $CombinedState } from "redux";

declare global {
  interface CDOTAGamerules {
    Addon: GameMode;
  }
}

@reloadable
export class GameMode {

  public static Precache(this: void, context: CScriptPrecacheContext) {
    PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_techies.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_shredder.vsndevts", context);
    PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_shredder.vsndevts", context);
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
    GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 0);
    GameRules.SetSameHeroSelectionEnabled(true);
    GameRules.SetHeroSelectionTime(60);
    GameRules.SetCustomGameSetupAutoLaunchDelay(0);
    GameRules.SetPreGameTime(10.0);
    GameRules.SetStrategyTime(0);
    GameRules.SetShowcaseTime(0);
    GameRules.SetPostGameTime(0);
    GameRules.SetUseUniversalShopMode(true);

    const gameMode = GameRules.GetGameModeEntity();
    gameMode.SetCustomGameForceHero('npc_dota_hero_windrunner');
    gameMode.SetUnseenFogOfWarEnabled(true);
    gameMode.SetDaynightCycleDisabled(true);

    Timers.CreateTimer(0.1, () => {
      GameRules.SetTimeOfDay(0.5);
    });

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
      CreateUnitByName("rizzrak", spawnEntity.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
    }

    [
      GameRules.AddBotPlayerWithEntityScript("npc_dota_hero_dragon_knight", "Dragon Knight", DOTATeam_t.DOTA_TEAM_GOODGUYS, "", false),
      GameRules.AddBotPlayerWithEntityScript("npc_dota_hero_crystal_maiden", "Crystal Maiden", DOTATeam_t.DOTA_TEAM_GOODGUYS, "", false),
      GameRules.AddBotPlayerWithEntityScript("npc_dota_hero_lina", "Lina", DOTATeam_t.DOTA_TEAM_GOODGUYS, "", false),
    ].forEach(bot => {
      if (bot !== undefined) {
        bot.RespawnHero(false, false);
      }
    });

  }

  public Reload() {
    print("Script reloaded!");
  }

  private OnNpcSpawned(event: NpcSpawnedEvent) {
    const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC;
    if (unit.IsRealHero()) {
      const hero = unit as any;
      print("hero.hasSpawnedBefore: " + hero.hasSpawnedBefore);
      if (hero.hasSpawnedBefore !== true) {
        hero.hasSpawnedBefore = true;
        const playerId = hero.GetPlayerID();
        const player = PlayerResource.GetPlayer(playerId);
        if (player) {
          CustomGameEventManager.Send_ServerToPlayer(player, "lock_camera", {} as never);
          CustomGameEventManager.Send_ServerToAllClients("create_hero_image_for_player", { playerId: playerId } as never);
        }
      }
    }
  }

}
