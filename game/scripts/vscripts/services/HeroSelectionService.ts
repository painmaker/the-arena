import { STRENGTH_GAIN_HP_BONUS, STRENGTH_GAIN_HP_REGEN_BONUS, INTELLIGENCE_GAIN_MANA_BONUS, INTELLIGENCE_GAIN_MANA_REGEN_BONUS, PRIMARY_ATTRIBUTE_DAMAGE_BONUS, AGILITY_GAIN_MOVE_SPEED_BONUS } from "../CustomAttributeBonuses";
import { PLAYER_ID_ARRAY, START_GOLD } from "../settings";

export class HeroSelectionService {

  constructor() {
    this.configure();
  }

  private configure(): void {
    CustomGameEventManager.RegisterListener("on_select_hero", (_, event) => this.onHeroSelected(event));
    CustomGameEventManager.RegisterListener("on_focus_hero", (_, event) => this.onHeroFocused(event));
    CustomGameEventManager.RegisterListener("on_random_hero", (_, event) => this.onHeroRandomed(event));
    CustomNetTables.SetTableValue('HeroSelectionHeroes', 'heroes', [
      { heroname: 'npc_dota_hero_dragon_knight', picked: 0, playerID: -1 },
      { heroname: 'npc_dota_hero_windrunner', picked: 0, playerID: -1 },
      { heroname: 'npc_dota_hero_phantom_assassin', picked: 0, playerID: -1 },
      { heroname: 'npc_dota_hero_crystal_maiden', picked: 0, playerID: -1 },
      { heroname: 'npc_dota_hero_dazzle', picked: 0, playerID: -1 },
      { heroname: 'npc_dota_hero_lina', picked: 0, playerID: -1 },
    ]);
  }

  public AssignHeroesToHerolessPlayers(): void {

    for (let id of PLAYER_ID_ARRAY) {

      const heroes = CustomNetTables.GetTableValue('HeroSelectionHeroes', 'heroes');

      const player = PlayerResource.GetPlayer(id);

      if (!player) {
        CustomGameEventManager.Send_ServerToAllClients("hero_select_generic_error", {});
        return;
      }

      const playerHasPicked = Object.values(heroes).find(hero => hero.playerID === id);

      if (playerHasPicked) {
        return;
      }

      const availableHeroes = Object.values(heroes).filter(hero => hero.picked === 0);

      if (availableHeroes.length <= 0) {
        CustomGameEventManager.Send_ServerToPlayer(player, "hero_select_generic_error", {});
        return;
      }

      const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];

      const updatedHeroes = Object.values(heroes).map(hero => {
        if (hero.heroname === randomHero.heroname) {
          return { ...hero, picked: 1 as (0 | 1), playerID: id }
        }
        return hero;
      });

      CustomNetTables.SetTableValue('HeroSelectionHeroes', 'heroes', updatedHeroes);

      const hero = PlayerResource.ReplaceHeroWith(id, randomHero.heroname, 0, 0);
      hero.SetCustomDeathXP(10);
      hero.SetGold(START_GOLD, true);
      hero.AddItemByName("item_ogre_axe");
      hero.AddItemByName("item_staff_of_wizardry");
      hero.AddItemByName("item_blade_of_alacrity");
      hero.AddItemByName("item_blink");

      EmitSoundOnClient("HeroPicker.Selected", player);

      CustomGameEventManager.Send_ServerToPlayer(player, "on_random_hero_success", {});

      GameRules.ChatService.sendSytemMessage('Player X randomed Y.');

    }

  }

  private onHeroRandomed(event: { PlayerID: PlayerID }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);

    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("hero_select_generic_error", {});
      return;
    }

    const heroes = CustomNetTables.GetTableValue('HeroSelectionHeroes', 'heroes');

    const playerHasPicked = Object.values(heroes).find(hero => hero.playerID === event.PlayerID);

    if (playerHasPicked) {
      CustomGameEventManager.Send_ServerToPlayer(player, "on_random_hero_error", {});
      return;
    }

    const availableHeroes = Object.values(heroes).filter(hero => hero.picked === 0);

    if (availableHeroes.length <= 0) {
      CustomGameEventManager.Send_ServerToPlayer(player, "on_random_hero_error", {});
      return;
    }

    const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];

    const updatedHeroes = Object.values(heroes).map(hero => {
      if (hero.heroname === randomHero.heroname) {
        return { ...hero, picked: 1 as (0 | 1), playerID: event.PlayerID }
      }
      return hero;
    });

    CustomNetTables.SetTableValue('HeroSelectionHeroes', 'heroes', updatedHeroes);

    const hero = PlayerResource.ReplaceHeroWith(event.PlayerID, randomHero.heroname, 0, 0);
    hero.SetCustomDeathXP(10);
    hero.SetGold(START_GOLD, true);
    hero.AddItemByName("item_ogre_axe");
    hero.AddItemByName("item_staff_of_wizardry");
    hero.AddItemByName("item_blade_of_alacrity");
    hero.AddItemByName("item_blink");

    EmitSoundOnClient("HeroPicker.Selected", player);

    CustomGameEventManager.Send_ServerToPlayer(player, "on_random_hero_success", {});

    GameRules.ChatService.sendSytemMessage('Player X randomed Y.');

  }

  private onHeroSelected(event: { PlayerID: PlayerID, heroname: string }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);

    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("hero_select_generic_error", {});
      return;
    }

    const heroes = CustomNetTables.GetTableValue('HeroSelectionHeroes', 'heroes');

    const playerHasPicked = Object.values(heroes).find(hero => hero.playerID === event.PlayerID);

    if (playerHasPicked) {
      CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_error", {});
      return;
    }

    const heroIsPicked = Object.values(heroes).find(hero => hero.heroname === event.heroname)?.picked === 1;

    if (heroIsPicked) {
      CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_error", {});
      return;
    }

    const updatedHeroes = Object.values(heroes)
      .map(hero => {
        if (hero.heroname === event.heroname) {
          return { ...hero, picked: 1 as (0 | 1), playerID: event.PlayerID }
        }
        return hero;
      });

    CustomNetTables.SetTableValue('HeroSelectionHeroes', 'heroes', updatedHeroes);

    const hero = PlayerResource.ReplaceHeroWith(event.PlayerID, event.heroname, 0, 0);
    hero.SetCustomDeathXP(10);
    hero.SetGold(START_GOLD, true);
    hero.AddItemByName("item_ogre_axe");
    hero.AddItemByName("item_staff_of_wizardry");
    hero.AddItemByName("item_blade_of_alacrity");
    hero.AddItemByName("item_blink");

    EmitSoundOnClient("HeroPicker.Selected", player);

    CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_success", {});

    GameRules.ChatService.sendSytemMessage('Player X picked Y.');

  }

  private onHeroFocused(event: { PlayerID: PlayerID, heroname: string }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);

    if (!player) {
      CustomGameEventManager.Send_ServerToAllClients("on_random_hero_error", {});
      return;
    }

    const hero = DOTAGameManager.GetHeroDataByName_Script(event.heroname) as any;

    const abilities: string[] = [];
    for (let i = 1; i < 32; i++) {
      const ability = hero['Ability' + i];
      if (ability && ability !== 'generic_hidden' && ability !== '') {
        abilities.push(ability);
      }
    }

    const sounds: string[] = [];
    for (let i = 1; i < 10; i++) {
      const sound = hero['HeroSelectionSound' + i];
      if (sound && sound !== '') {
        sounds.push(sound);
      }
    }

    CustomGameEventManager.Send_ServerToPlayer(player, "on_focus_hero_success", {
      heroname: event.heroname,
      abilities: abilities,
      sound: sounds[Math.floor(Math.random() * sounds.length)],
      camera: hero['HeroSelectionCamera'],
      attribute: hero['AttributePrimary'],
      lore: 'HeroSelectionLore_' + event.heroname,
      health: hero['StatusHealth'] + hero['CustomBaseStrength'] * STRENGTH_GAIN_HP_BONUS,
      healthRegen: hero['StatusHealthRegen'] + hero['CustomStrengthGain'] * STRENGTH_GAIN_HP_REGEN_BONUS,
      mana: hero['StatusMana'] + hero['CustomBaseIntelligence'] * INTELLIGENCE_GAIN_MANA_BONUS,
      manaRegen: hero['StatusManaRegen'] + hero['CustomIntelligenceGain'] * INTELLIGENCE_GAIN_MANA_REGEN_BONUS,
      damage: this.caclulateAverageDamage(hero),
      armor: hero['ArmorPhysical'],
      movespeed: hero['MovementSpeed'] + (hero['CustomBaseAgility'] + hero['CustomAgilityGain']) * AGILITY_GAIN_MOVE_SPEED_BONUS,
      attackRange: hero['AttackRange'],
      attackSpeed: hero['BaseAttackSpeed'],
      attackRate: hero['AttackRate'],
      agility: hero['CustomBaseAgility'],
      agilityGain: hero['CustomAgilityGain'],
      strength: hero['CustomBaseStrength'],
      strengthGain: hero['CustomStrengthGain'],
      intelligence: hero['CustomBaseIntelligence'],
      intelligenceGain: hero['CustomIntelligenceGain'],
    });

  }

  private caclulateAverageDamage(hero: any): number {
    const primaryAttribute = hero['AttributePrimary'];
    let damage = ((hero['AttackDamageMin'] + hero['AttackDamageMax']) / 2);
    if (primaryAttribute === 'DOTA_ATTRIBUTE_STRENGTH') {
      return damage + (hero['CustomBaseStrength'] + hero['CustomStrengthGain']) * PRIMARY_ATTRIBUTE_DAMAGE_BONUS;
    }
    if (primaryAttribute === 'DOTA_ATTRIBUTE_AGILITY') {
      return damage + (hero['CustomBaseAgility'] + hero['CustomAgilityGain']) * PRIMARY_ATTRIBUTE_DAMAGE_BONUS;
    }
    if (primaryAttribute === 'DOTA_ATTRIBUTE_INTELLECT') {
      return damage + (hero['CustomBaseIntelligence'] + hero['CustomIntelligenceGain']) * PRIMARY_ATTRIBUTE_DAMAGE_BONUS;
    }
    return damage;
  }

}
