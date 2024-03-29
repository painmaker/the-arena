import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

const excludedUnits = [
  'shopkeeper_abilities',
]

@registerModifier()
export class modifier_no_statusbar extends BaseModifier {

  IsHidden(): boolean {
    return true;
  }

  IsPurgable(): boolean {
    return false;
  }

  OnDestroy(): void {
    if (IsServer()) {
      const units = Object.values(CustomNetTables.GetTableValue('FloatingBarUnits', 'units'))
        .filter(unit => unit !== this.GetParent().GetEntityIndex());
      CustomNetTables.SetTableValue('FloatingBarUnits', 'units', units);
    }
  }

  OnCreated(): void {
    if (IsServer()) {
      const parent = this.GetParent();
      if (!excludedUnits.includes(parent.GetUnitName())) {
        const units = CustomNetTables.GetTableValue('FloatingBarUnits', 'units');
        CustomNetTables.SetTableValue('FloatingBarUnits', 'units', [...Object.values(units), parent.GetEntityIndex()]);
      }
    }
  }

  CheckState(): Partial<Record<modifierstate, boolean>> {
    return {
      [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: true,
    };
  }

}
