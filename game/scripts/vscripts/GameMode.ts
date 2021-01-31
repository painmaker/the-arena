import { reloadable } from "./lib/tstl-utils";
import "./modifiers/modifier_panic";
import "./modifiers/modifier_not_on_minimap";

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
    GameRules.SetPreGameTime(0);
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
      Timers.CreateTimer(0.2, () => this.StartGame());
    }

  }

  private StartGame(): void {

    print("Game starting!");


    const spawnEntity = Entities.FindByName(undefined, "npc_boss_spawner_1");
    if (spawnEntity !== undefined) {
      CreateUnitByName("rizzrak", spawnEntity.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
    }

  }

  public Reload() {
    print("Script reloaded!");
  }

  private OnNpcSpawned(event: NpcSpawnedEvent) {

    const unit = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC;

    if (unit.IsRealHero()) {
      // Temp hack 
      CustomGameEventManager.Send_ServerToAllClients("lock_camera", {} as never);
    }

  }

}
