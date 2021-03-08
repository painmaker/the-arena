import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCharacterVisible } from "../../../actions/characterActions";
import { RootState } from "../../../reducers/rootReducer";
import { CharacterActionTypes } from "../../../types/characterTypes";

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

export default connector(CharaterButton);
