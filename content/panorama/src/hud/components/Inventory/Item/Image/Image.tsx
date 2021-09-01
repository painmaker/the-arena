import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Image = (props: Props) => {

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(props.item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(props.item));
  const [isMuted, setIsMuted] = useState(Entities.IsMuted(Players.GetLocalPlayerPortraitUnit()));
  const [isStunned, setIsStunned] = useState(Entities.IsStunned(Players.GetLocalPlayerPortraitUnit()));
  const [isCommandRestricted, setIsCommandRestricted] = useState(Entities.IsCommandRestricted(Players.GetLocalPlayerPortraitUnit()));
  const [isNightmared, setIsNightmared] = useState(Entities.IsNightmared(Players.GetLocalPlayerPortraitUnit()));
  const [isHexed, setIsHexed] = useState(Entities.IsHexed(Players.GetLocalPlayerPortraitUnit()));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(props.item));

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsCooldownReady(Abilities.IsCooldownReady(props.item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(props.item));
      setIsMuted(Entities.IsMuted(Players.GetLocalPlayerPortraitUnit()));
      setIsStunned(Entities.IsStunned(Players.GetLocalPlayerPortraitUnit()));
      setIsCommandRestricted(Entities.IsCommandRestricted(Players.GetLocalPlayerPortraitUnit()));
      setIsNightmared(Entities.IsNightmared(Players.GetLocalPlayerPortraitUnit()));
      setIsHexed(Entities.IsHexed(Players.GetLocalPlayerPortraitUnit()));
      setTexutre(Abilities.GetAbilityTextureName(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
