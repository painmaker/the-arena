import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class npc_boss_timbersaw_bomb extends BaseAbility {

  particle?: ParticleID;

  OnAbilityPhaseStart() {
    print("OnAbilityPhaseStart")
    return true;
  }

  OnAbilityPhaseInterrupted() {
    // Do nothing
  }

  OnSpellStart() {
    // Do stuff
    print("OnSpellStart")
  }

  OnProjectileHit(_target: CDOTA_BaseNPC, location: Vector) {
    // Do Stuff
  }

}