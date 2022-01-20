import React, { useState } from "react";
import { SelectedUnitContext, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import ParentStyles from './../styles.module.css';
import Styles from './styles.module.css';

const MoveSpeed = () => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useInterval(() => {
    setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)))
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={ParentStyles.entry} >
      <Panel className={ParentStyles.imageContainer}>
        <Image
          src={'file://{images}/icon_speed.png'}
          className={ParentStyles.image}
        />
      </Panel>
      <Panel className={ParentStyles.labelContainer}>
        <Label
          className={`${ParentStyles.label} ${Styles.label} `}
          text={moveSpeed.toFixed(0)}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(MoveSpeed);
