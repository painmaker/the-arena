export interface Message {
  playerid: PlayerID,
  uuid: string,
  text: string,
  heroname: string | undefined,
  playername: string | undefined
}