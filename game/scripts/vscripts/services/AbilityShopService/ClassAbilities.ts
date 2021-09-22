interface ShopAbilities {
  RegularAbilities: string[],
  UltimateAbilities: string[],
}

export const ClassAbilities: Record<string, ShopAbilities> = {

  "npc_dota_hero_dazzle": {
    RegularAbilities: [
      // { name: "dazzle_healing_wave", aliases: ['healing', 'wave'] },
      // { name: "dazzle_juju_enrage", aliases: ['healing', 'wave'] },
      // { name: "dazzle_sadistic_ritual", aliases: ['healing', 'wave'] },
      // { name: "dazzle_poison_touch", aliases: ['healing', 'wave'] },
      // { name: "dazzle_shallow_grave", aliases: ['healing', 'wave'] },
      // { name: "witch_doctor_voodoo_restoration", aliases: ['healing', 'wave'] },
      "dazzle_healing_wave",
      "dazzle_juju_enrage",
      "dazzle_sadistic_ritual",
      "dazzle_poison_touch",
      "dazzle_shallow_grave",
      "witch_doctor_voodoo_restoration",
    ],
    UltimateAbilities: [
      // { name: "dazzle_weave", aliases: ['healing', 'wave'] },
      "dazzle_weave"
    ]
  },

  "npc_dota_hero_dragon_knight": {
    RegularAbilities: [
      // { name: "dragon_knight_breathe_fire", aliases: ['healing', 'wave'] },
      // { name: "dragon_knight_dragon_tail", aliases: ['healing', 'wave'] },
      // { name: "dragon_knight_dragon_blood", aliases: ['healing', 'wave'] },
      "dragon_knight_breathe_fire",
      "dragon_knight_dragon_tail",
      "dragon_knight_dragon_blood",
    ],
    UltimateAbilities: [
      // { name: "dragon_knight_elder_dragon_form", aliases: ['healing', 'wave'] },
      "dragon_knight_elder_dragon_form",
    ]
  },

}
