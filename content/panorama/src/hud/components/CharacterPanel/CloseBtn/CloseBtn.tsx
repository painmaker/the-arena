import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCharacterPanelVisible } from "../../../actions/characterPanelActions";
import { RootState } from "../../../reducers/rootReducer";
import { CharacterPanelActionTypes } from "../../../types/characterPanelTypes";

const mapStateToProps = (state: RootState) => ({
  visible: state.characterPanelReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<CharacterPanelActionTypes>) => ({
  setCharacterPanelVisible: (visible: boolean) => dispatch(setCharacterPanelVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const CloseBtn = (props: Props) => {

  return (
    <Panel
      style={props.visible ? { transform: 'translateX(-510px)', opacity: '1.0' } : {}}
      className="characterPanelCloseBtnContainer"
    >
      <Button
        className="characterPanelCloseBtn"
        onactivate={() => {
          props.setCharacterPanelVisible(!props.visible);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default connector(CloseBtn);
