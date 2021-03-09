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
    // Minimap hack for disapparing icons 
    hero.SetDayTimeVisionRange(99999);
    hero.SetNightTimeVisionRange(99999);

    CustomGameEventManager.Send_ServerToAllClients("create_hero_image_for_player", { playerId: event.PlayerID });
    CustomGameEventManager.Send_ServerToPlayer(player, "on_select_hero_success", {});

  }

}
