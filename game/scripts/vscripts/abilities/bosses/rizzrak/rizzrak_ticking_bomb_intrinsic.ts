import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import "./rizzrak_ticking_bomb_intrinsic_modifier";

@registerAbility()
export class rizzrak_ticking_bomb_intrinsic extends BaseAbility {

  GetIntrinsicModifierName(): string {
    return "rizzrak_ticking_bomb_intrinsic_modifier";
  }

}