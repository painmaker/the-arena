import React, { Dispatch, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCharacterVisible } from "../../../actions/characterActions";
import { RootState } from "../../../reducers/rootReducer";
import { CharacterActionTypes } from "../../../types/characterTypes";
import { Styles } from "../Styles";

const mapStateToProps = (state: RootState) => ({
  visible: state.characterReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<CharacterActionTypes>) => ({
  setCharacterPanelVisible: (visible: boolean) => dispatch(setCharacterVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const CharaterButton = (props: Props) => {

  $.Msg("REACT-RENDER: ButtonGroup - CharacterButton rendered");

  const { visible, setCharacterPanelVisible } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button>
      <Image
        style={Styles.EntryHover(visible, isHovering)}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          setCharacterPanelVisible(!visible);
          Game.EmitSound("ui_topmenu_select");
        }}
        src="s2r://panorama/images/character_btn_white_png.vtex"
      />
    </Button>
  );

};

export default connector(CharaterButton);
