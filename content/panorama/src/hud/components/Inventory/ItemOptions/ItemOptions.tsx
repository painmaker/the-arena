import React, { Dispatch } from "react";
import { useGameEvent, useRegisterForUnhandledEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setItemOptionsVisible } from "../../../actions/itemOptionsActions";
import { RootState } from "../../../reducers/rootReducer";
import { ItemOptionsActionTypes } from "../../../interfaces/itemOptionsTypes";
import Styles from "./styles.module.css";

const POS_X_OFFSET = 146;
const POST_Y_OFFSET = -32;

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
        <Panel
          className={Styles.outerContainer}
          style={{ position: (posX - POS_X_OFFSET) + "px " + POST_Y_OFFSET + "px " + "0px" }}
        >
          <Panel className={Styles.closeBtnContainer}>
            <Button
              className={Styles.closeBtn}
              onactivate={() => {
                setItemOptionsVisible(false);
                Game.EmitSound("ui_topmenu_select");
              }}
            >
              <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
            </Button>
          </Panel>
          <Panel className={Styles.innerContainer}>
            <Label
              text={"OPTIONS"}
              className={Styles.title}
            />
            <Label
              text={"Sell"}
              className={Styles.option}
              onactivate={() => {
                Items.LocalPlayerSellItem(item);
                setItemOptionsVisible(false);
              }}
            />
            <Label
              text={"Alert"}
              className={Styles.option}
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
              className={Styles.option}
              onactivate={() => {
                Game.EmitSound("ui_topmenu_select");
                setItemOptionsVisible(false);
              }}
            />
          </Panel>
          <Panel className={Styles.arrowheadContainer}>
            <Image
              src="s2r://panorama/images/tooltip_arrow_top.png"
              className={Styles.arrowheadImage} />
          </Panel>
        </Panel>
      )}
    </React.Fragment>
  );

};

export default React.memo(connector(ItemOptions));
