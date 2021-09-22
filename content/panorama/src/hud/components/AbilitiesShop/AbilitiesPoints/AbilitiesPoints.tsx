import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setAbilityPoints(Entities.GetAbilityPoints(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.LabelContainer()}>
        {/* 
        <Image
          src={props.imageSrc}
          style={Styles.Icon()}
        />
        */}
        <Label
          text={props.text}
          style={Styles.TextLabel()}
        />
        <Label
          text={abilityPoints}
          style={Styles.NumberLabel(abilityPoints !== 0)}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(AbilitiesPoints);
