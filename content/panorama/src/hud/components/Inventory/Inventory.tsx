import React, { useEffect, useState } from "react";
import { TableUtils } from "../../utils/TableUtils";
import ItemOptions from "./ItemOptions/ItemOptions";
import Item from "./Item/Item";
import { Styles } from "./Styles";
import { SCHEDULE_THINK_FAST } from "../../App";
import { cancelSchedule } from "../../utils/Schedule";

type Props = {
  selectedUnit: EntityIndex,
};

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

const Inventory = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory rendered");

  const { selectedUnit } = props;

  const [items, setItems] = useState<ItemEntityIndex[]>([]);
  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setHasInventory(Entities.IsInventoryEnabled(selectedUnit));
      const newItems = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(selectedUnit, slot));
      if (!TableUtils.isEqual(items, newItems)) {
        setItems(newItems);
      }
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    }
    update();
    return () => cancelSchedule(schedule, Inventory.name);
  }, [selectedUnit, items]);

  return (
    <React.Fragment>
      <ItemOptions />
      <Panel style={Styles.Container(hasInventory)}>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              item={item || -1 as ItemEntityIndex}
              selectedUnit={selectedUnit}
            />
          )
        })}
      </Panel>
    </React.Fragment>
  )

}

export default React.memo(Inventory);
