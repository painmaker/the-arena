interface CustomNetTableDeclarations {

  HeroSelectionHeroes: { "heroes": { heroname: string, picked: 0 | 1, playerID: PlayerID }[] };

  RegularAbilities: { [playerId: string]: string[] };
  UltimateAbility: { [playerId: string]: string | undefined };

}