import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  const [unspentPoints, setUnSpentPoints] = useState(3);

  useEffect(() => {
    const id = props.setInterval(() => {
      // Do something
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
          text={unspentPoints}
          style={Styles.NumberLabel(unspentPoints !== 0)}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(AbilitiesPoints);
