import React, { Dispatch } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { addLockedInventoryItem, removeLockedInventoryItem } from "../../../../actions/inventoryActions";
import { resetItemOptions } from "../../../../actions/itemOptionsActions";
import { RootState } from "../../../../reducers/rootReducer";
import { InventoryActionTypes } from "../../../../types/inventoryTypes";
import { ItemOptionsActionTypes } from "../../../../types/itemOptionsTypes";

const mapStateToProps = (state: RootState) => ({
  item: state.itemOptionsReducer.item,
  visible: state.itemOptionsReducer.visible,
  lockedItems: state.inventoryReducer.lockedItems,
});

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes | InventoryActionTypes>) => ({
  resetInventoryMenu: () => dispatch(resetItemOptions()),
  addLockedInventoryItem: (item: ItemEntityIndex) => dispatch(addLockedInventoryItem(item)),
  removeLockedInventoryItem: (item: ItemEntityIndex) => dispatch(removeLockedInventoryItem(item)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const Menu = (props: Props) => {

  useGameEvent("dota_player_update_query_unit", () => {
    props.resetInventoryMenu();
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    props.resetInventoryMenu();
  }, []);

  if (props.item === -1) {
    return null;
  }

  const isSellable = Items.IsSellable(props.item);
  const isDisassemblable = Items.IsDisassemblable(props.item);
  const isAlertable = Items.IsAlertableItem(props.item);
  const isPurchasble = Items.IsPurchasable(props.item);
  const isLocked = props.lockedItems.includes(props.item);
  // TODO : Stash

  return (
    <React.Fragment>
      { props.visible && (
        <Panel className={'inventoryMenuContainer'} >
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
          { isPurchasble && (
            <Button
              className={'inventoryMenuButton'}
              onactivate={() => {
                GameEvents.SendEventClientSide("dota_link_clicked", {
                  link: ("dota.item." + Abilities.GetAbilityName(props.item)),
                  shop: 0,
                  recipe: 0,
                  nav: 0,
                  nav_back: 0,
                });
                props.resetInventoryMenu();
              }}
            >
              <Label className={'inventoryMenuButtonLabel'} text={'Show In Shop'} />
            </Button>
          )}
          <Button
            className={'inventoryMenuButton'}
            onactivate={() => {
              Game.PrepareUnitOrders({
                OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK,
                AbilityIndex: props.item,
                TargetIndex: isLocked ? 0 : 1
              });
              props.resetInventoryMenu();
              if (isLocked) {
                props.removeLockedInventoryItem(props.item)
              } else {
                props.addLockedInventoryItem(props.item);
              }
            }}
          >
            <Label className={'inventoryMenuButtonLabel'} text={isLocked ? 'Unlock' : 'Lock'} />
          </Button>
          { isSellable && (
            <Button
              className={'inventoryMenuButton'}
              onactivate={() => {
                Items.LocalPlayerSellItem(props.item);
                props.resetInventoryMenu();
              }}
            >
              <Label className={'inventoryMenuButtonLabel'} text={'Sell Item'} />
            </Button>
          )}
          { isAlertable && (
            <Button
              className={'inventoryMenuButton'}
              onactivate={() => {
                Items.LocalPlayerItemAlertAllies(props.item);
                props.resetInventoryMenu();
              }}
            >
              <Label className={'inventoryMenuButtonLabel'} text={'Alert Allies'} />
            </Button>
          )}
          { isDisassemblable && (
            <Button
              className={'inventoryMenuButton'}
              onactivate={() => {
                Items.LocalPlayerDisassembleItem(props.item);
                props.resetInventoryMenu();
              }}
            >
              <Label className={'inventoryMenuButtonLabel'} text={'Disassemble Item'} />
            </Button>
          )}
        </Panel>
      )}
    </React.Fragment>
  );

};

export default connector(Menu);
