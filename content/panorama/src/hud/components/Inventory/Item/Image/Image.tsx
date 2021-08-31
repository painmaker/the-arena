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
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(props.item));

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsCooldownReady(Abilities.IsCooldownReady(props.item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(props.item));
      setIsMuted(Entities.IsMuted(Players.GetLocalPlayerPortraitUnit()));
      setTexutre(Abilities.GetAbilityTextureName(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <DOTAItemImage
      itemname={texture}
      style={Styles.Container(isMuted, isCooldownReady, hasEnoughMana)}
    />
  );

};

export default withReactTimeout(Image);
