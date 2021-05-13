import { createUUID } from "../utils/uuid";

export class ChatService {

  constructor() {
    this.configure();
  }

  private configure(): void {
    // ListenToGameEvent("player_chat", (event) => this.onChat(event), undefined);
    CustomGameEventManager.RegisterListener("on_chat_input_submit", (_, event) => this.onChat(event));
  }

  private onChat(event: { input: string, playerId: PlayerID }): void {

    let text = event.input;
    text = text.replace("^%s*(.-)%s*$", "%1");
    text = text.replace("^(.{0,256})", "%1");

    if (text.length === 0) {
      return;
    }

    const heroes = CustomNetTables.GetTableValue('HeroSelectionHeroes', 'heroes');
    const selectedHero = Object.values(heroes).find(hero => hero.playerID === event.playerId);

    CustomGameEventManager.Send_ServerToAllClients("custom_player_chat", {
      playerid: event.playerId,
      uuid: createUUID(),
      text,
      heroname: selectedHero ? selectedHero.heroname : undefined,
      playername: PlayerResource.GetPlayerName(event.playerId),
    });

  }

  public sendSytemMessage(message: string): void {
    CustomGameEventManager.Send_ServerToAllClients("custom_player_chat", {
      playerid: -1,
      uuid: createUUID(),
      text: message,
      heroname: undefined,
      playername: undefined,
    });
  }

}
