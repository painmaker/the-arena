import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { TableUtils } from "../../utils/TableUtils";
import ItemOptions from "./ItemOptions/ItemOptions";
import Item from "./Item/Item";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  // ownProps
};

interface State {
  entityIndex: EntityIndex,
  itemIndexes: ItemEntityIndex[],
  hasInventory: boolean,
}

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

class Inventory extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      entityIndex: Players.GetLocalPlayerPortraitUnit(),
      itemIndexes: [],
      hasInventory: false,
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      const entityIndex = Players.GetLocalPlayerPortraitUnit();
      const itemIndexes = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(entityIndex, slot));
      const hasInventory = Entities.IsInventoryEnabled(entityIndex);
      this.setState({ entityIndex, itemIndexes, hasInventory })
    }, 100);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props) {
      return true;
    }
    if (this.state.entityIndex !== nextState.entityIndex) {
      return true;
    }
    if (!TableUtils.isEqual(this.state.itemIndexes, nextState.itemIndexes)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.hasInventory && (
          <React.Fragment>
            <ItemOptions />
            <Panel style={Styles.Container()}>
              {this.state.itemIndexes.map((item, index) => {
                return (
                  <Item
                    key={index + "_" + item}
                    index={index}
                    item={item}
                  />
                );
              })}
            </Panel>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

}

export default withReactTimeout(Inventory);
