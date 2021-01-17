import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class rizzrak_ticking_bomb extends BaseAbility {

  particle?: ParticleID;

  OnAbilityPhaseStart() {
    // Do nothing
    return true;
  }

  OnAbilityPhaseInterrupted() {
    // Do nothing
  }

  OnSpellStart() {

    const thinker = CreateModifierThinker(
      this.GetCaster(),
      this,
      "",
      { duration: -1 },
      this.GetCursorPosition(),
      this.GetCaster().GetTeam(),
      false,
    ) as CDOTA_BaseNPC;

    if (thinker === undefined) {
      return
    }

    EmitSoundOn("Hero_Techies.RemoteMine.Toss", this.GetCaster());

    ProjectileManager.CreateTrackingProjectile({
      EffectName: "particles/units/heroes/hero_ogre_magi/ogre_magi_ignite.vpcf",
      Ability: this,
      Source: this.GetCaster(),
      bProvidesVision: true,
      iVisionRadius: 100,
      iVisionTeamNumber: this.GetCaster().GetTeam(),
      vSourceLoc: (this.GetCaster().GetAbsOrigin() + Vector(0, 0, 200) + this.GetCaster().GetForwardVector() * 500) as Vector,
      Target: thinker ,
      iMoveSpeed: 1000,
      flExpireTime: GameRules.GetGameTime() + 10,
      bDodgeable: false,
      bIsAttack: false,
      bReplaceExisting: false,
      bIgnoreObstructions: false,
      bSuppressTargetCheck: false,
      iSourceAttachment: DOTAProjectileAttachment_t.DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
      bDrawsOnMinimap: true,
      bVisibleToEnemies: true,
    })

    DebugDrawCircle(thinker.GetAbsOrigin(), Vector(255,0,0), 5, 250, true, 3);

  }

  OnProjectileHit(target: CDOTA_BaseNPC, location: Vector) {
    if (target) {
      EmitSoundOn("Hero_Techies.RemoteMine.Plant", target);
      UTIL_Remove(target);
    }
  }

}