import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import { RootState } from "../../../reducers/rootReducer";
import { Item } from "../../../types/shopTypes";
import Styles from './item.module.css';

const mapStateToProps = (state: RootState) => ({
  searchValue: state.shopReducer.searchValue,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  item: Item,
  selectedUnit: EntityIndex,
};

const Item = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Item rendered");

  const { item, selectedUnit } = props;

  const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
  const [isShopInRange, setIsShopInRange] = useState(Entities.IsInRangeOfShop(selectedUnit, 0, false));

  useInterval(() => {
    setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    setIsShopInRange(Entities.IsInRangeOfShop(selectedUnit, 0, false));
  }, HUD_THINK_FAST)

  useGameEvent("attempt_item_purchase_success", () => {
    Game.EmitSound("General.CourierGivesItem");
    Game.EmitSound("Item.PickUpShop");
  }, []);

  useGameEvent("attempt_item_purchase_error", () => {
    GameUI.SendCustomHUDError("Unable To Purchase Item", "General.Item_CantPickUp");
  }, []);

  const hasEnoughCold = item.cost <= playerGold;

  let isSearched = false;
  item.aliases.forEach(alias => {
    if (alias.match(props.searchValue)) {
      isSearched = true;
    }
  });

  return (
    <Button
      className={Styles.container}
      style={{
        border: hasEnoughCold ? '1.5px solid rgba(200, 175, 0, 0.5)' : '0.5px solid black',
        washColor: props.searchValue.length > 0 && !isSearched ? 'rgba(0, 0, 0, 0.9)' : 'none'
      }}
      onactivate={() => {
        if (GameUI.IsAltDown()) {
          GameEvents.SendCustomGameEventToServer("alert_shop_item", {
            itemname: item.itemname,
            cost: item.cost,
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
          itemname: item.itemname,
          cost: item.cost,
        });

      }}
    >
      <DOTAItemImage
        className={Styles.image}
        itemname={item.itemname}
      />
    </Button>
  );

};

export default React.memo(connector(Item));
