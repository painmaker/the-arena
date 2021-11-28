import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
};

const Image = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Image rendered");

  const { item, selectedUnit } = props;

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(item));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(item));
  const [showLock, setShowLock] = useState(false);

  useInterval(() => {
    const isMuted = Entities.IsMuted(selectedUnit);
    const isStunned = Entities.IsStunned(selectedUnit);
    const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
    const isNightmared = Entities.IsNightmared(selectedUnit);
    const isHexed = Entities.IsHexed(selectedUnit);
    setShowLock(isMuted || isStunned || isCommandRestricted || isNightmared || isHexed);
    setIsCooldownReady(Abilities.IsCooldownReady(item));
    setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
    setTexutre(Abilities.GetAbilityTextureName(item));
  }, HUD_THINK_FAST);

  return (
    <React.Fragment>
      {(isCooldownReady && showLock) && (
        <Panel className={Styles.lockIcon} />
      )}
      <DOTAItemImage
        itemname={texture}
        className={Styles.container}
        style={{
          saturation: isCooldownReady ? '1.0' : '0.5',
          border: !isCooldownReady ? '3px solid rgba(50, 50, 50, 0.75)' : '0px solid black',
          washColor: showLock ? 'rgba(0, 0, 0, 0.8)' : hasEnoughMana ? 'none' : '#1569be',
        }}
      />
    </React.Fragment>
  );

};

export default React.memo(Image);
