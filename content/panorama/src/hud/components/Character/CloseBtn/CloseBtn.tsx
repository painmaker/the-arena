import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCharacterVisible } from "../../../actions/characterActions";
import { CharacterActionTypes } from "../../../types/characterTypes";

const mapDispatchToProps = (dispatch: Dispatch<CharacterActionTypes>) => ({
  setCharacterPanelVisible: (visible: boolean) => dispatch(setCharacterVisible(visible)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

// $.Msg("REACT-RENDER: Character - CloseBtn rendered");

const CloseBtn = (props: Props) => {
  return (
    <Panel className={'characterPanelCloseBtnOuterContainer'} >
      <Panel className="characterPanelCloseBtnInnerContainer">
        <Button
          className="characterPanelCloseBtn"
          onactivate={() => {
            props.setCharacterPanelVisible(false);
            Game.EmitSound("ui_topmenu_select");
          }}
        >
          <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
        </Button>
      </Panel>
    </Panel>
  );
};

export default connector(CloseBtn);
