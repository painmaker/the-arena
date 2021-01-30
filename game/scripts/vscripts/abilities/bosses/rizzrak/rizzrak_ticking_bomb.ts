import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class rizzrak_ticking_bomb extends BaseAbility {

  particle?: ParticleID;

  OnSpellStart() {

    EmitSoundOn("Hero_Techies.RemoteMine.Toss", this.GetCaster());

    const explosionDelay = 2.5;

    const cursorPosition = this.GetCursorPosition();
    const speed = 1250;
    const distance = ((cursorPosition - this.GetCaster().GetAbsOrigin()) as Vector).Length2D() + 250;
    const time = distance / speed;

    const projectileParticleId = ParticleManager.CreateParticle(
      "particles/bosses/rizzrak/rizzrak_ticking_bomb/rizzrak_ticking_bomb_projectile.vpcf",
      ParticleAttachment_t.PATTACH_CUSTOMORIGIN,
      this.GetCaster(),
    );
    ParticleManager.SetParticleControl(projectileParticleId, 0, (this.GetCaster().GetAbsOrigin() + Vector(0, 0, 250)) as Vector);
    ParticleManager.SetParticleControl(projectileParticleId, 1, cursorPosition);
    ParticleManager.SetParticleControl(projectileParticleId, 2, Vector(speed, 0, 0));
    ParticleManager.SetParticleControl(projectileParticleId, 3, Vector(time, 0, 0));

    // this.GetCaster().EmitSound("shredder_timb_kill_15");

    Timers.CreateTimer(time, () => {

      // DebugDrawCircle(cursorPosition, Vector(255,0,0), 25, 100, true, time);

      ParticleManager.DestroyParticle(projectileParticleId, false);
      ParticleManager.ReleaseParticleIndex(projectileParticleId);

      EmitSoundOnLocationWithCaster(cursorPosition, "Hero_Techies.RemoteMine.Plant", this.GetCaster());

      const bomb = CreateUnitByName(
        "rizzrak_ticking_bomb",
        cursorPosition,
        false,
        this.GetCaster(),
        this.GetCaster(),
        this.GetCaster().GetTeam(),
      );

      const bombParticleId = ParticleManager.CreateParticle(
        "particles/bosses/rizzrak/rizzrak_ticking_bomb/rizzrak_ticking_bomb_model_oscilate_circle.vpcf",
        ParticleAttachment_t.PATTACH_CUSTOMORIGIN,
        bomb
      );
      ParticleManager.SetParticleControl(bombParticleId, 0, bomb.GetAbsOrigin())

      const damageRadiusParticleId = ParticleManager.CreateParticle(
        "particles/bosses/rizzrak/rizzrak_ticking_bomb/rizzrak_ticking_bomb_explosion_warning.vpcf",
        ParticleAttachment_t.PATTACH_CUSTOMORIGIN,
        bomb,
      );
      ParticleManager.SetParticleControl(damageRadiusParticleId, 0, bomb.GetAbsOrigin());
      ParticleManager.ReleaseParticleIndex(damageRadiusParticleId); 

      let counter = explosionDelay;
      Timers.CreateTimer(0, () => {
        if (counter == 0) {
          return undefined;
        }
        const timerParticleId = ParticleManager.CreateParticle(
          "particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_timer.vpcf",
          ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW,
          bomb,
        );
        ParticleManager.SetParticleControl(timerParticleId, 0, bomb.GetAbsOrigin());
        ParticleManager.SetParticleControl(timerParticleId, 1, Vector(0, math.floor(counter), counter % 1 !== 0 ? 8 : 1));
        ParticleManager.SetParticleControl(timerParticleId, 2, Vector(2, 0, 0));
        ParticleManager.ReleaseParticleIndex(timerParticleId);
        counter = counter - 0.5;
        return 0.5;
      });

      Timers.CreateTimer(explosionDelay, () => {

        bomb.ForceKill(false);

        ParticleManager.DestroyParticle(bombParticleId, false);
        ParticleManager.ReleaseParticleIndex(bombParticleId);

      });

    });

  }

}