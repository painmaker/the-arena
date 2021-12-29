import React from "react";
import { Styles } from "./Styles";

const Divider = () => {

  // $.Msg("REACT-RENDER: Character - Divider rendered");

  return (
    <Panel style={Styles.Divider()} />
  );

};

export default React.memo(Divider);

