import React, { useEffect, useState } from "react";
import { TableUtils } from "../../utils/TableUtils";
import ItemOptions from "./ItemOptions/ItemOptions";
import Item from "./Item/Item";
import { Styles } from "./Styles";
import { SCHEDULE_THINK_FAST } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

const Inventory = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory rendered");

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
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit, items]);

  return (
    <React.Fragment>
      <ItemOptions />
      <Panel style={Styles.Container(hasInventory)}>
        <Item index={0} item={items[0] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
        <Item index={1} item={items[1] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
        <Item index={2} item={items[2] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
        <Item index={3} item={items[3] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
        <Item index={4} item={items[4] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
        <Item index={5} item={items[5] || -1 as ItemEntityIndex} selectedUnit={selectedUnit} />
      </Panel>
    </React.Fragment>
  )

}

export default React.memo(connector(Inventory));
