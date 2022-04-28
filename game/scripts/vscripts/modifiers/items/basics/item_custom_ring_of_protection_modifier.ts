import { BaseModifier, registerModifier } from "../../../lib/dota_ts_adapter";

@registerModifier()
export class item_custom_ring_of_protection_modifier extends BaseModifier {

  armor: number = 0;

  OnCreated(): void {
    this.armor = this.GetAbility()!.GetSpecialValueFor("armor");
  }

  DeclareFunctions(): modifierfunction[] {
    return [
      modifierfunction.MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
    ];
  }

  IsHidden(): boolean {
    return true;
  }

  GetModifierPhysicalArmorBonus(): number {
    return this.armor;
  }

}
