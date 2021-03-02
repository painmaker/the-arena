import React, { Dispatch, useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { Timer } from "react-timeout";
import { setItemOptionsVisible } from "../../../../actions/itemOptionsActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { RootState } from "../../../../reducers/rootReducer";
import { ItemOptionsActionTypes } from "../../../../types/itemOptionsTypes";

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

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.visible === false) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.visible]);

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
      { renderComponent && (
        <Panel
          className={'inventoryMenuOuterContainer'}
          style={props.visible ? { opacity: '1.0', preTransformScale2d: '1.0' } : {}}
        >
          <Panel className={'inventoryMenuInnerContainer'}>
            <Panel className={'inventoryMenuTitleContainer'}>
              <Label className={'inventoryMenuTitleLabel'} text={'ITEM'} />
              <Button
                className={'inventoryMenuCloseBtn'}
                onactivate={() => {
                  props.setItemOptionsVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
              </Button>
            </Panel>
            <Panel className={'inventoryMenuItemContainer'}>
              <Label
                className={'inventoryMenuItemLabel'}
                text={$.Localize("DOTA_Tooltip_ability_" + Abilities.GetAbilityName(props.item))}
              />
              <Panel className={'inventoryMenuItemImageContainer'}>
                <DOTAItemImage
                  className={'inventoryMenuItemImage'}
                  itemname={Abilities.GetAbilityName(props.item)}
                />
              </Panel>
            </Panel>
            <Panel className={'inventoryMenuButtonContainer'}>
              <Button
                className={'inventoryMenuButton inventoryMenuCancelButton'}
                onactivate={() => {
                  props.setItemOptionsVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={'inventoryMenuButtonLabel'} text={'Cancel'} />
              </Button>
              <Button
                className={'inventoryMenuButton inventoryMenuSellButton'}
                onactivate={() => {
                  Items.LocalPlayerSellItem(props.item);
                  props.setItemOptionsVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={'inventoryMenuButtonLabel'} text={'Sell'} />
              </Button>
            </Panel>
          </Panel>
        </Panel>
      )}
    </React.Fragment>
  );

};

export default connector(withReactTimeout(Menu));
