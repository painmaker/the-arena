import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setCharacterVisible } from "../../../actions/characterActions";
import { CharacterActionTypes } from "../../../types/characterTypes";
import { Styles } from "./Styles";

const mapDispatchToProps = (dispatch: Dispatch<CharacterActionTypes>) => ({
  setCharacterVisible: (visible: boolean) => dispatch(setCharacterVisible(visible)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  selectedUnit: EntityIndex
};

const Title = (props: Props) => {

  $.Msg("REACT-RENDER: Character - Title rendered");

  const { selectedUnit, setCharacterVisible } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={"CHARACTER - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()}
      />
      <Button
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        style={Styles.CloseBtn(isHovering)}
        onactivate={() => {
          setCharacterVisible(false);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default React.memo(connector(Title));
