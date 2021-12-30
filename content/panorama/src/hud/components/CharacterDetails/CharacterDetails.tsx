import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Styles } from "./Styles";
import Model from "./Model/Model";
import Defense from "./Defense/Defense";
import Title from "./Title/Title"
import Level from "./Level/Level";
import Avatar from "./Avatar/Avatar";
import Attack from "./Attack/Attack";
import { HUD_THINK_SLOW } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { setCharacterVisible } from "../../actions/characterActions";
import { CharacterActionTypes } from "../../types/characterTypes";
import { Dispatch } from "redux";
import { useRegisterForUnhandledEvent } from "react-panorama";

const mapStateToProps = (state: RootState) => ({
  visible: state.characterReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<CharacterActionTypes>) => ({
  setCharacterVisible: (visible: boolean) => dispatch(setCharacterVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  selectedUnit: EntityIndex,
};

const CharacterDetails = (props: Props) => {

  // $.Msg("REACT-RENDER: Character rendered");

  const { selectedUnit, visible, setCharacterVisible } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(visible);
  }, visible === false ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (visible) {
      Game.EmitSound("ui_topmenu_select");
    }
    setCharacterVisible(false);
  }, [visible, setCharacterVisible]);

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <React.Fragment>
          <Panel style={Styles.InnerContainer(visible)}>
            <Title selectedUnit={selectedUnit} />
            <Panel style={Styles.ColumnContainer()}>
              <Panel style={Styles.LeftColumn()}>
                <Model selectedUnit={selectedUnit} />
                <Level selectedUnit={selectedUnit} />
                <Avatar selectedUnit={selectedUnit} />
              </Panel>
              <Panel style={Styles.RightColumn()}>
                <Attack selectedUnit={selectedUnit} />
                <Defense selectedUnit={selectedUnit} />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default React.memo(connector(CharacterDetails));