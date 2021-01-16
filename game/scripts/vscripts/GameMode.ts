import { reloadable } from "./lib/tstl-utils";
import "./modifiers/modifier_panic";

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
    gameMode.SetCustomGameForceHero('npc_dota_hero_phantom_assassin');
    gameMode.SetUnseenFogOfWarEnabled(true);
    gameMode.SetCameraDistanceOverride(1600);
    gameMode.SetDaynightCycleDisabled(false);

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
      const unit = CreateUnitByName("npc_boss_timbersaw", spawnEntity.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
    }

  }

  public Reload() {
    print("Script reloaded!");
  }

  private OnNpcSpawned(event: NpcSpawnedEvent) {

  }

}
