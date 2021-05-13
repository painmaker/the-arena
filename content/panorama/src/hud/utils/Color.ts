export const toColor = (playerId: PlayerID) => {

  if (!Players.IsValidPlayerID(playerId)) {
    return '#9C9383';
  }

  const playerColor = Players.GetPlayerColor(playerId).toString(16);
  return (
    '#' +
    playerColor.substring(6, 8) +
    playerColor.substring(4, 6) +
    playerColor.substring(2, 4) +
    playerColor.substring(0, 2)
  );

};