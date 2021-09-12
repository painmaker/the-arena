
interface HeroAbilities {
  RegularAbilities: string[],
  UltimateAbilities: string[],
}

export const ClassAbilities: Record<string, HeroAbilities> = {

  "npc_dota_hero_dazzle": {
    RegularAbilities: [
      "dazzle_poison_touch",
      "dazzle_shallow_grave",
      "dazzle_shadow_wave",
      "witch_doctor_voodoo_restoration",
      "witch_doctor_maledict",
    ],
    UltimateAbilities: [
      "dazzle_weave",
      "witch_doctor_death_ward",
    ]
  },

  "npc_dota_hero_dragon_knight": {
    RegularAbilities: [
      "dragon_knight_breathe_fire",
      "dragon_knight_dragon_tail",
      "dragon_knight_dragon_blood",
    ],
    UltimateAbilities: [
      "dragon_knight_elder_dragon_form",
    ]
  },

}
