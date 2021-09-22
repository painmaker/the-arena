
interface HeroAbilities {
  RegularAbilities: string[],
  UltimateAbilities: string[],
}

export const ClassAbilities: Record<string, HeroAbilities> = {

  "npc_dota_hero_dazzle": {
    RegularAbilities: [
      "dazzle_healing_wave",
      "dazzle_juju_enrage",
      "dazzle_sadistic_ritual",
      "dazzle_poison_touch",
      "dazzle_shallow_grave",
      "witch_doctor_voodoo_restoration",
    ],
    UltimateAbilities: [
      "dazzle_weave"
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
