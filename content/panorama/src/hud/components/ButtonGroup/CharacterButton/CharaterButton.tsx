import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setCharacterVisible } from "../../../actions/characterActions";
import { RootState } from "../../../reducers/rootReducer";
import { CharacterActionTypes } from "../../../types/characterTypes";
import ParentStyles from './../styles.module.css';

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

  // $.Msg("REACT-RENDER: ButtonGroup - CharacterButton rendered");

  const { visible, setCharacterPanelVisible } = props;

  return (
    <Button
      id={'character_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#character_btn').RemoveClass('btnClicked');
        $('#character_btn').AddClass('btnClicked');
        setCharacterPanelVisible(!visible);
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: visible ? 'orange' : 'white' }}
        src="s2r://panorama/images/character_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(connector(CharaterButton));
