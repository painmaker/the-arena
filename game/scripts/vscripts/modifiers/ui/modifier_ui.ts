import { BaseModifier, registerModifier } from "../../lib/dota_ts_adapter";

@registerModifier()
export class modifier_ui extends BaseModifier {

  IsHidden(): boolean {
    return true;
  }

  IsPurgable(): boolean {
    return false;
  }

  IsPermanent(): boolean {
    return true;
  }

}
