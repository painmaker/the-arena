import React from "react";
import Styles from './styles.module.css';

const Divider = () => {

  // $.Msg("REACT-RENDER: Settings - Divider rendered");

  return (
    <Panel className={Styles.container} />
  )

}

export default React.memo(Divider);

