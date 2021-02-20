import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import InventoryItem from "./InventoryItem/InventoryItem";

type Props = ReactTimeoutProps & {
  // ownProps
};

const Inventory = (props: Props) => {

  const [firstItem, setFirstItem] = useState(-1 as ItemEntityIndex);
  const [secondItem, setSecondItem] = useState(-1 as ItemEntityIndex);
  const [thirdItem, setThirdItem] = useState(-1 as ItemEntityIndex);
  const [fourthItem, setFourthItem] = useState(-1 as ItemEntityIndex);
  const [fifthItem, setFifthItem] = useState(-1 as ItemEntityIndex);
  const [sixthItem, setSixthItem] = useState(-1 as ItemEntityIndex);

  useEffect(() => {
    const id = props.setInterval(() => {
      const unit = Players.GetLocalPlayerPortraitUnit();
      setFirstItem(Entities.GetItemInSlot(unit, 0));
      setSecondItem(Entities.GetItemInSlot(unit, 1));
      setThirdItem(Entities.GetItemInSlot(unit, 2));
      setFourthItem(Entities.GetItemInSlot(unit, 3));
      setFifthItem(Entities.GetItemInSlot(unit, 4));
      setSixthItem(Entities.GetItemInSlot(unit, 5));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={"inventoryContainer"}>
      <Panel className={'inventoryFirstRowContainer'}>
        <InventoryItem index={0} item={firstItem} />
        <InventoryItem index={1} item={secondItem} />
        <InventoryItem index={2} item={thirdItem} />
      </Panel>
      <Panel className={'inventorySecondRowContainer'}>
        <InventoryItem index={3} item={fourthItem} />
        <InventoryItem index={4} item={fifthItem} />
        <InventoryItem index={5} item={sixthItem} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Inventory);
