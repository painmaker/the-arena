import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './movespeed.module.css';
import ParentStyles from './../stats.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MoveSpeed rendered");

  const { selectedUnit } = props;

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useInterval(() => {
    setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)))
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={ParentStyles.entry} >
      <Panel className={`${Styles.image} ${ParentStyles.image}`} />
      <Label
        className={ParentStyles.label}
        text={moveSpeed.toFixed(0)}
      />
    </Panel>
  );

};

export default React.memo(MoveSpeed);
