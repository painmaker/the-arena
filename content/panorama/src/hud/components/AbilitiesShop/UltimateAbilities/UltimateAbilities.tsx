import React, { useEffect } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {

}

const UltimateAbilities = (props: Props) => {

  useEffect(() => {
    const id = props.setInterval(() => {
      // Do something
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={Styles.Container()}>

    </Panel>
  );

};

export default withReactTimeout(UltimateAbilities);
