interface CustomNetTableDeclarations {

  HeroSelectionHeroes: { "heroes": { heroname: string, picked: 0 | 1, playerID: PlayerID }[] };

  RegularAbilities: { [playerId: string]: ShopAbility[] };
  UltimateAbilities: { [playerId: string]: ShopAbility[] };

}