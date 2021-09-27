import React, { Dispatch, useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setItemOptionsVisible } from "../../../actions/itemOptionsActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { RootState } from "../../../reducers/rootReducer";
import { ItemOptionsActionTypes } from "../../../types/itemOptionsTypes";
import { ButtonTypes } from "./ButtonTypes";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  item: state.itemOptionsReducer.item,
  visible: state.itemOptionsReducer.visible,
  posX: state.itemOptionsReducer.posX,
});

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes>) => ({
  setItemOptionsVisible: (visible: boolean) => dispatch(setItemOptionsVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {};

const ItemOptions = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - ItemOptions rendered");

  const [buttonTypeHovered, setButtonTypeHovered] = useState(ButtonTypes.NONE);

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
        <Panel style={Styles.OuterContainer(props.posX)}>
          <Panel style={Styles.CloseBtnContainer(buttonTypeHovered === ButtonTypes.CROSS)}>
            <Button
              style={Styles.CloseBtn()}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.CROSS)}
              onactivate={() => {
                props.setItemOptionsVisible(false);
                Game.EmitSound("ui_topmenu_select");
              }}
            >
              <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
            </Button>
          </Panel>
          <Panel style={Styles.InnerContainer()}>
            <Label
              text={"OPTIONS"}
              style={Styles.Title()}
            />
            <Label
              text={"Sell"}
              style={Styles.Option(buttonTypeHovered === ButtonTypes.SELL)}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.SELL)}
              onactivate={() => {
                Items.LocalPlayerSellItem(props.item);
                props.setItemOptionsVisible(false);
              }}
            />
            <Label
              text={"Alert"}
              style={Styles.Option(buttonTypeHovered === ButtonTypes.ALERT)}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.ALERT)}
              onactivate={() => {
                Items.LocalPlayerItemAlertAllies(props.item);
                props.setItemOptionsVisible(false);
              }}
            />
            <Label
              text={"Cancel"}
              style={Styles.Option(buttonTypeHovered === ButtonTypes.CANCEL)}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.CANCEL)}
              onactivate={() => {
                Game.EmitSound("ui_topmenu_select");
                props.setItemOptionsVisible(false);
              }}
            />
          </Panel>
          <Panel style={Styles.ArrowheadContainer()}>
            <Image
              src="s2r://panorama/images/tooltip_arrow_top.png"
              style={Styles.ArrowheadImage()} />
          </Panel>
        </Panel>
      )}
    </React.Fragment>
  );

};

export default connector(withReactTimeout(ItemOptions));
