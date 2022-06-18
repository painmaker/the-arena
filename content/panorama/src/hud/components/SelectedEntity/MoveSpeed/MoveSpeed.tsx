import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import ParentStyles from './../styles.module.css';
import Styles from './styles.module.css';

type Props = {
  selectedEntityIndex: EntityIndex,
}

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { selectedEntityIndex } = props;

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedEntityIndex, Entities.GetBaseMoveSpeed(selectedEntityIndex)));

  useInterval(() => {
    setMoveSpeed(Entities.GetMoveSpeedModifier(selectedEntityIndex, Entities.GetBaseMoveSpeed(selectedEntityIndex)))
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
