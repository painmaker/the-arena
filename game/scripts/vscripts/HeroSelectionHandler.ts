import { MAX_PLAYERS } from "./settings";

interface SelectedHero {
  heroname: string,
}

export class HeroSelectionHandler {

  constructor() {
    this.configure();
  }

  private configure(): void {
    CustomGameEventManager.RegisterListener("on_select_hero", (_, event) => this.onHeroSelected(event));
    CustomGameEventManager.RegisterListener("on_focus_hero", (_, event) => this.onHeroFocused(event));
  }

  private onHeroSelected(event: { PlayerID: PlayerID, heroname: string }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const selectedHeroes: SelectedHero[] = [];

    for (let i = 0; i < MAX_PLAYERS; i++) {
      const selectedHero = CustomNetTables.GetTableValue('SelectedHero', event.PlayerID + '');
      if (selectedHero !== undefined) {
        selectedHeroes.push(selectedHero);
      }
    }

    const heroAlreadySelected = selectedHeroes.some(hero => hero.heroname === event.heroname);

    if (heroAlreadySelected) {
      CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_error", {});
      return;
    }

    CustomNetTables.SetTableValue('SelectedHero', event.PlayerID + '', { heroname: event.heroname });

    const hero = PlayerResource.ReplaceHeroWith(event.PlayerID, event.heroname, 0, 0);
    hero.SetCustomDeathXP(10);
    hero.AddItemByName("item_pipe");
    hero.AddItemByName("item_sange_and_yasha");
    hero.AddItemByName("item_assault");
    hero.AddItemByName("item_blink");

    CustomGameEventManager.Send_ServerToAllClients("create_hero_image_for_player", { playerId: event.PlayerID });
    CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_success", {});

  }

  private onHeroFocused(event: { PlayerID: PlayerID, heroname: string }): void {

    const player = PlayerResource.GetPlayer(event.PlayerID);
    if (!player) {
      return;
    }

    const hero = DOTAGameManager.GetHeroDataByName_Script(event.heroname) as any;

    DeepPrintTable(hero);

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
      health: hero['StatusHealth'],
      healthRegen: hero['StatusHealthRegen'],
      mana: hero['StatusMana'],
      manaRegen: hero['StatusManaRegen'],
    });;

  }

}
