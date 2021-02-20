import React, { useEffect } from "react";

type Props = {
  item: ItemEntityIndex,
  index: number,
}

type State = {
  isItemDragged: boolean,
  isItemDropTarget: boolean,
}

class InventoryItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.OnDragEnd = this.OnDragEnd.bind(this);
    this.OnDragEnter = this.OnDragEnter.bind(this);
    this.OnDragLeave = this.OnDragLeave.bind(this);
    this.OnDragDrop = this.OnDragDrop.bind(this);
    this.state = {
      isItemDragged: false,
      isItemDropTarget: false,
    }
  }

  componentDidMount() {
    const panel = $("#inventory_item_panel_" + this.props.index);
    $.RegisterEventHandler('DragEnter', panel, this.OnDragEnter);
    $.RegisterEventHandler('DragDrop', panel, this.OnDragDrop);
    $.RegisterEventHandler('DragLeave', panel, this.OnDragLeave);
    $.RegisterEventHandler('DragStart', panel, this.onDragStart);
    $.RegisterEventHandler('DragEnd', panel, this.OnDragEnd);
  }

  onDragStart(thisPanel: Panel, draggedPanel: any) {

    $.DispatchEvent("DOTAHideAbilityTooltip", thisPanel);

    if (this.props.item === -1) {
      return true;
    }

    const displayPanel = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "inventoryItemDraggedItem");
    displayPanel.itemname = Abilities.GetAbilityName(this.props.item);
    displayPanel.contextEntityIndex = this.props.item;
    //@ts-ignore
    displayPanel.Data().m_DragItem = this.props.item;
    //@ts-ignore
    displayPanel.Data().m_DragCompleted = false;

    draggedPanel.displayPanel = displayPanel;
    draggedPanel.offsetX = 0;
    draggedPanel.offsetY = 0;

    this.setState({ isItemDragged: true })

    return true;

  }

  OnDragEnd(thisPanel: Panel, draggedPanel: any) {
    if (!draggedPanel.Data().m_DragCompleted) {
      Game.DropItemAtCursor(Players.GetLocalPlayerPortraitUnit(), this.props.item);
    }
    draggedPanel.DeleteAsync(0);
    this.setState({ isItemDragged: false })
    return true;
  }

  OnDragLeave(thisPanel: Panel, draggedPanel: any) {
    const draggedItem = draggedPanel.Data().m_DragItem;
    if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
      return false;
    }
    this.setState({ isItemDropTarget: false })
    return true;
  }

  OnDragEnter(thisPanel: Panel, draggedPanel: any) {
    const draggedItem = draggedPanel.Data().m_DragItem;
    if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
      return true;
    }
    this.setState({ isItemDropTarget: true })
    return true;
  }

  OnDragDrop(thisPanel: Panel, draggedPanel: any) {

    const draggedItem = draggedPanel.Data().m_DragItem;

    if (draggedItem === null) {
      return true;
    }

    draggedPanel.Data().m_DragCompleted = true;

    if (draggedItem == this.props.item) {
      return true;
    }

    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
      TargetIndex: this.props.index,
      AbilityIndex: draggedItem
    });

    return true;

  }

  render() {
    return (
      <Panel
        id={"inventory_item_panel_" + this.props.index}
        draggable={true}
        className={"inventoryItemContainer"}
        style={{
          saturation: this.state.isItemDragged ? '0.5' : '1.0',
          washColor: this.state.isItemDragged ? '#808080' : 'none',
          opacity: this.state.isItemDropTarget ? '0.3' : '1.0',
        }}
      >
        { this.props.item === -1 && (
          <Panel className={'inventoryItemEmptyContainer'} />
        )}
        { this.props.item !== -1 && (
          <DOTAItemImage
            itemname={Abilities.GetAbilityName(this.props.item)}
          />
        )}
      </Panel>
    );
  }

};

export default InventoryItem;
