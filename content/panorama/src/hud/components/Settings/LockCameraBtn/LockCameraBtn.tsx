import React, { Dispatch, SetStateAction } from "react";
import { Styles } from "./Styles";

type Props = {
  isLocked: boolean,
  setIsLocked: Dispatch<SetStateAction<boolean>>
}

const LockCameraBtn = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings - LockCameraBtn rendered");

  const { isLocked, setIsLocked } = props;

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.LeftLabel()}
        text={"Lock Camera:"}
      />
      <Panel style={Styles.ToggleBtnContainer()}>
        <ToggleButton
          selected={isLocked}
          onactivate={() => setIsLocked(prevState => !prevState)}
        />
      </Panel>
      <Label
        style={Styles.RightLabel()}
        text={isLocked ? "Locked" : "Unlocked"}
      />
    </Panel>

  );
}

export default React.memo(LockCameraBtn);