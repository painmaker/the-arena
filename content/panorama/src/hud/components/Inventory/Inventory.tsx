import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { TableUtils } from "../../utils/TableUtils";
import ItemOptions from "./ItemOptions/ItemOptions";
import Item from "./Item/Item";
import { Styles } from "./Styles";
import { HUD_THINK_FAST } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

const Inventory = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

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

    update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [selectedUnit, items, setInterval, clearInterval]);

  return (
    <React.Fragment>
      <ItemOptions />
      <Panel style={Styles.Container(hasInventory)}>
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
  )

}

export default connector(withReactTimeout(Inventory));
