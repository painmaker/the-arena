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

const CharaterPanelButton = (props: Props) => {
  return (
    <Panel hittest={false}>
      <Button>
        <Image
          style={{ washColor: props.visible ? 'orange' : 'white' }}
          onactivate={() => {
            props.setCharacterPanelVisible(!props.visible);
            Game.EmitSound("ui_topmenu_select");
          }}
          src="s2r://panorama/images/character_btn_white_png.vtex"
        />
      </Button>
    </Panel>
  );
};

export default connector(CharaterPanelButton);
