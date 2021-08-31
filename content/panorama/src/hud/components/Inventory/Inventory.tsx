import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { TableUtils } from "../../utils/TableUtils";
import Item from "./Item/Item";
import Menu from "./Item/OldMenu/Menu";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  // ownProps
};

interface State {
  entityIndex: EntityIndex,
  itemIndexes: ItemEntityIndex[],
}

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];

class Inventory extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      entityIndex: Players.GetLocalPlayerPortraitUnit(),
      itemIndexes: [],
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      const entityIndex = Players.GetLocalPlayerPortraitUnit();
      const itemIndexes = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(entityIndex, slot));
      this.setState({ entityIndex, itemIndexes })
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
    )
  }

}

export default withReactTimeout(Inventory);
