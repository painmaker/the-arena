import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
};

const Image = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Image rendered");

  const { item, selectedUnit, setInterval, clearInterval } = props;

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(item));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(item));
  const [showLock, setShowLock] = useState(false);

  useEffect(() => {
    const update = () => {
      const isMuted = Entities.IsMuted(selectedUnit);
      const isStunned = Entities.IsStunned(selectedUnit);
      const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
      const isNightmared = Entities.IsNightmared(selectedUnit);
      const isHexed = Entities.IsHexed(selectedUnit);
      setShowLock(isMuted || isStunned || isCommandRestricted || isNightmared || isHexed);
      setIsCooldownReady(Abilities.IsCooldownReady(item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
      setTexutre(Abilities.GetAbilityTextureName(item));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [selectedUnit, item, setInterval, clearInterval]);

  return (
    <React.Fragment>
      {(isCooldownReady && showLock) && (
        <Panel style={Styles.LockIcon()} />
      )}
      <DOTAItemImage
        itemname={texture}
        style={Styles.Container(showLock, isCooldownReady, hasEnoughMana)}
      />
    </React.Fragment>
  );

};

export default React.memo(ReactTimeout(Image));
