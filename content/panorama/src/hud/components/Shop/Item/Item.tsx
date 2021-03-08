import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { RootState } from "../../../reducers/rootReducer";
import { Item } from "../../../types/shopTypes";

const mapStateToProps = (state: RootState) => ({
  searchValue: state.shopReducer.searchValue,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  item: Item
};

const Item = (props: Props) => {

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(Players.GetLocalPlayerPortraitUnit())));
  const [isShopInRange, setIsShopInRange] = useState(Entities.IsInRangeOfShop(Players.GetLocalPlayerPortraitUnit(), 0, false));

  useEffect(() => {
    const id = props.setInterval(() => {
      setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(Players.GetLocalPlayerPortraitUnit())))
      setIsShopInRange(Entities.IsInRangeOfShop(Players.GetLocalPlayerPortraitUnit(), 0, false));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  useGameEvent("attempt_item_purchase_success", () => {
    Game.EmitSound("General.Buy");
  }, []);

  useGameEvent("attempt_item_purchase_error", () => {
    GameUI.SendCustomHUDError("Unable To Purchase Item", "General.Item_CantPickUp");
  }, []);

  const hasEnoughCold = props.item.cost <= playerGold;

  let isSearched = false;
  props.item.aliases.forEach(alias => {
    if (alias.match(props.searchValue)) {
      isSearched = true;
    }
  });

  return (
    <Button
      className={'shopItemContainer'}
      style={{
        border: hasEnoughCold ? '1.5px solid rgba(200, 175, 0, 0.5)' : '0.5px solid black',
        washColor: props.searchValue.length > 0 && !isSearched ? 'rgba(0, 0, 0, 0.9)' : 'none'
      }}
      onactivate={() => {
        if (GameUI.IsAltDown()) {
          GameEvents.SendCustomGameEventToServer("alert_shop_item", {
            itemname: props.item.itemname,
            cost: props.item.cost,
          });
        }
      }}
      oncontextmenu={() => {

        if (!isShopInRange) {
          GameUI.SendCustomHUDError("No Shop In Range", "General.Item_CantPickUp");
          return;
        }

        if (!hasEnoughCold) {
          GameUI.SendCustomHUDError("Not Enough Gold", "General.Item_CantPickUp");
          return;
        }

        GameEvents.SendCustomGameEventToServer("attempt_item_purchase", {
          itemname: props.item.itemname,
          cost: props.item.cost,
        });

      }}
    >
      <DOTAItemImage
        className={'shopItemImage'}
        itemname={props.item.itemname}
      />
    </Button>
  );

};

export default connector(withReactTimeout(Item));
