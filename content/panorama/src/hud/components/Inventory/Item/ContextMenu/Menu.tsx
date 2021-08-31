import React, { Dispatch, useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { Timer } from "react-timeout";
import { setItemOptionsVisible } from "../../../../actions/itemOptionsActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { RootState } from "../../../../reducers/rootReducer";
import { ItemOptionsActionTypes } from "../../../../types/itemOptionsTypes";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  item: state.itemOptionsReducer.item,
  visible: state.itemOptionsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes>) => ({
  setItemOptionsVisible: (visible: boolean) => dispatch(setItemOptionsVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {};

const Menu = (props: Props) => {

  useGameEvent("dota_player_update_query_unit", () => {
    props.setItemOptionsVisible(false);
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    props.setItemOptionsVisible(false);
  }, []);

  if (props.item === -1) {
    return null;
  }

  return (
    <React.Fragment>
      {props.visible && (
        <Panel style={Styles.Container()}>

        </Panel>
      )}
    </React.Fragment>
  );

};

export default connector(withReactTimeout(Menu));
