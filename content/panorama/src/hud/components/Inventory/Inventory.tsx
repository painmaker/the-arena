import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { TableUtils } from "../../utils/TableUtils";
import ItemOptions from "./ItemOptions/ItemOptions";
import Item from "./Item/Item";
import { Styles } from "./Styles";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";
import { HUD_THINK } from "../../App";

type Props = ReactTimeoutProps & {
  // ownProps
};

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

const Inventory = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [items, setItems] = useState<ItemEntityIndex[]>([]);
  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedUnit));

  useEffect(() => {

    const update = () => {
      setHasInventory(Entities.IsInventoryEnabled(selectedUnit));
      const newItems = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(selectedUnit, slot));
      if (!TableUtils.isEqual(items, newItems)) {
        setItems(newItems);
      }
    }

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [selectedUnit, items, setInterval, clearInterval]);

  return (
    <React.Fragment>
      {hasInventory && (
        <React.Fragment>
          <ItemOptions />
          <Panel style={Styles.Container()}>
            {items.map((item, index) => {
              return (
                <Item
                  key={index + "_" + item}
                  index={index}
                  item={item}
                  selectedUnit={selectedUnit}
                />
              );
            })}
          </Panel>
        </React.Fragment>
      )}
    </React.Fragment>
  )

}

export default withReactTimeout(Inventory);
