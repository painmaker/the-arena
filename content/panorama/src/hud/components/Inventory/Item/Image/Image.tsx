import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Image = (props: Props) => {

  const { item, setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(item));
  const [isMuted, setIsMuted] = useState(Entities.IsMuted(selectedUnit));
  const [isStunned, setIsStunned] = useState(Entities.IsStunned(selectedUnit));
  const [isCommandRestricted, setIsCommandRestricted] = useState(Entities.IsCommandRestricted(selectedUnit));
  const [isNightmared, setIsNightmared] = useState(Entities.IsNightmared(selectedUnit));
  const [isHexed, setIsHexed] = useState(Entities.IsHexed(selectedUnit));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(item));

  useEffect(() => {

    const update = () => {
      setIsCooldownReady(Abilities.IsCooldownReady(item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
      setIsMuted(Entities.IsMuted(selectedUnit));
      setIsStunned(Entities.IsStunned(selectedUnit));
      setIsCommandRestricted(Entities.IsCommandRestricted(selectedUnit));
      setIsNightmared(Entities.IsNightmared(selectedUnit));
      setIsHexed(Entities.IsHexed(selectedUnit));
      setTexutre(Abilities.GetAbilityTextureName(item));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [selectedUnit, item, setInterval, clearInterval]);

  const lockItems = isMuted || isStunned || isCommandRestricted || isNightmared || isHexed;

  return (
    <React.Fragment>
      {isCooldownReady && (lockItems) && (
        <Panel style={Styles.LockIcon()} />
      )}
      <DOTAItemImage
        itemname={texture}
        style={Styles.Container(lockItems, isCooldownReady, hasEnoughMana)}
      />
    </React.Fragment>
  );

};

export default withReactTimeout(Image);
