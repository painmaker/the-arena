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
  const [isActive, setIsActive] = useState(Abilities.IsActivated(item));
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
    setIsActive(Abilities.GetLocalPlayerActiveAbility() === item);
  }, HUD_THINK_FAST);

  return (
    <Panel
      className={Styles.container}
      style={{
        backgroundColor: isActive
          ? "gradient(linear, 50% 0%, 50% 40%, from(rgba(200, 200, 200, 0.5)), color-stop(0.5, #045d5688), to(rgb(0, 0, 0)) );"
          : "black"
      }}
    >
      {(isCooldownReady && showLock) && (
        <Panel className={Styles.lockIcon} />
      )}
      <DOTAItemImage
        itemname={texture}
        className={Styles.itemImage}
        style={{
          saturation: isCooldownReady ? '1.0' : '0.5',
          washColor: (showLock || !isCooldownReady) ? 'rgba(100, 100, 100, 0.8)' : hasEnoughMana ? 'none' : '#1569be',
          padding: isActive ? '-0.75px' : '0px',
        }}
      />
    </Panel>
  );

};

export default React.memo(Image);
