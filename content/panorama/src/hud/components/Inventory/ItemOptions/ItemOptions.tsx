import React, { Dispatch, useState } from "react";
import { useGameEvent, useRegisterForUnhandledEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setItemOptionsVisible } from "../../../actions/itemOptionsActions";
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

type Props = PropsFromRedux & {
  selectedUnit: EntityIndex,
};

const ItemOptions = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - ItemOptions rendered");

  const { selectedUnit, item, visible, posX, setItemOptionsVisible } = props;

  const [buttonTypeHovered, setButtonTypeHovered] = useState(ButtonTypes.NONE);

  useGameEvent("dota_player_update_query_unit", () => {
    setItemOptionsVisible(false);
  }, [setItemOptionsVisible]);

  useGameEvent("dota_player_update_selected_unit", () => {
    setItemOptionsVisible(false);
  }, [setItemOptionsVisible]);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (visible) {
      Game.EmitSound("ui_topmenu_select");
    }
    setItemOptionsVisible(false);
  }, [visible, setItemOptionsVisible]);

  if (item === -1) {
    return null;
  }

  return (
    <React.Fragment>
      {visible && (
        <Panel style={Styles.OuterContainer(posX)}>
          <Panel style={Styles.CloseBtnContainer(buttonTypeHovered === ButtonTypes.CROSS)}>
            <Button
              style={Styles.CloseBtn()}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.CROSS)}
              onactivate={() => {
                setItemOptionsVisible(false);
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
                Items.LocalPlayerSellItem(item);
                setItemOptionsVisible(false);
              }}
            />
            <Label
              text={"Alert"}
              style={Styles.Option(buttonTypeHovered === ButtonTypes.ALERT)}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.ALERT)}
              onactivate={() => {
                GameEvents.SendCustomGameEventToAllClients("on_item_alerted", {
                  broadcaster: Players.GetLocalPlayer(),
                  selectedUnit: selectedUnit,
                  item: item
                });
                setItemOptionsVisible(false);
              }}
            />
            <Label
              text={"Cancel"}
              style={Styles.Option(buttonTypeHovered === ButtonTypes.CANCEL)}
              onmouseout={() => setButtonTypeHovered(ButtonTypes.NONE)}
              onmouseover={() => setButtonTypeHovered(ButtonTypes.CANCEL)}
              onactivate={() => {
                Game.EmitSound("ui_topmenu_select");
                setItemOptionsVisible(false);
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

export default React.memo(connector(ItemOptions));
