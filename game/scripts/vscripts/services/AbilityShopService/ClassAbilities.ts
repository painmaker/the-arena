export const ClassAbilities: Record<string, ShopAbilities> = {

  "npc_dota_hero_dazzle": {
    RegularAbilities: [
      { name: "dazzle_healing_wave", aliases: ['healing', 'wave'], requiredLevel: 1 },
      { name: "dazzle_juju_enrage", aliases: ['juju', 'enrage'], requiredLevel: 1 },
      { name: "dazzle_sadistic_ritual", aliases: ['sadistic', 'ritual'], requiredLevel: 1 },
      { name: "dazzle_depraved_healing", aliases: ['depraved', 'healing'], requiredLevel: 1 },
      { name: "dazzle_poison_touch", aliases: ['poison', 'touch'], requiredLevel: 1 },
      { name: "dazzle_shallow_grave", aliases: ['shallow', 'grave'], requiredLevel: 1 },
      { name: "witch_doctor_voodoo_restoration", aliases: ['voodoo', 'restoration'], requiredLevel: 1 },
    ],
    UltimateAbilities: [
      { name: "dazzle_weave", aliases: ['weave'], requiredLevel: 6 },
    ]
  },

  "npc_dota_hero_dragon_knight": {
    RegularAbilities: [
      { name: "dragon_knight_breathe_fire", aliases: ['breathe', 'fire'], requiredLevel: 1 },
      { name: "dragon_knight_dragon_tail", aliases: ['dragon', 'tail'], requiredLevel: 1 },
      { name: "dragon_knight_dragon_blood", aliases: ['dragon', 'blood'], requiredLevel: 1 },
    ],
    UltimateAbilities: [
      { name: "dragon_knight_elder_dragon_form", aliases: ['elder', 'dragon', 'form'], requiredLevel: 6 },
    ]
  },

}
