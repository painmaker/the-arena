import React, { Dispatch } from "react";
import Hotkey from "./Hotkey/Hotkey";
import Cooldown from "./Cooldown/Cooldown";
import Image from "./Image/Image";
import Charges from "./Charges/Charges";
import ManaCost from "./ManaCost/ManaCost";
import { ItemOptionsActionTypes } from "../../../types/itemOptionsTypes";
import { setItemOptionsItem, setItemOptionsVisible } from "../../../actions/itemOptionsActions";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";

const mapStateToProps = (state: RootState) => ({
  itemOptionsVisible: state.itemOptionsReducer.visible,
  itemOptionsItem: state.itemOptionsReducer.item,
});

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes>) => ({
  setItemOptionsItem: (item: ItemEntityIndex) => dispatch(setItemOptionsItem(item)),
  setItemOptionsVisible: (visible: boolean) => dispatch(setItemOptionsVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  item: ItemEntityIndex,
  index: number,
};

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
    this.onItemLeftClicked = this.onItemLeftClicked.bind(this);
    this.onItemRightClicked = this.onItemRightClicked.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.state = {
      isItemDragged: false,
      isItemDropTarget: false,
    }
  }

  componentDidMount() {
    const panel = $("#inventory_item_container_" + this.props.index);
    $.RegisterEventHandler('DragEnter', panel, this.OnDragEnter);
    $.RegisterEventHandler('DragDrop', panel, this.OnDragDrop);
    $.RegisterEventHandler('DragLeave', panel, this.OnDragLeave);
    $.RegisterEventHandler('DragStart', panel, this.onDragStart);
    $.RegisterEventHandler('DragEnd', panel, this.OnDragEnd);
    panel.SetAcceptsFocus(false);
  }

  componentDidUpdate(prevProps: Props) {
    // $.Msg("this.props.item: " + this.props.item)
  }

  onDragStart(thisPanel: Panel, draggedPanel: any): void {

    if (this.props.item === -1) {
      return;
    }

    $.DispatchEvent("DOTAHideAbilityTooltip", thisPanel);

    this.setState({ isItemDragged: true })

    draggedPanel.displayPanel = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "inventoryItemDraggedItem");
    draggedPanel.displayPanel.itemname = Abilities.GetAbilityName(this.props.item);
    draggedPanel.displayPanel.contextEntityIndex = this.props.item;
    draggedPanel.displayPanel.Data().item = this.props.item;
    draggedPanel.displayPanel.Data().dragCompleted = false;
    draggedPanel.offsetX = 0;
    draggedPanel.offsetY = 0;

  }

  OnDragEnd(thisPanel: Panel, draggedPanel: any): void {
    if (!draggedPanel.Data().dragCompleted) {
      Game.DropItemAtCursor(Players.GetLocalPlayerPortraitUnit(), this.props.item);
    }
    draggedPanel.DeleteAsync(0);
    this.setState({ isItemDragged: false })
  }

  OnDragLeave(thisPanel: Panel, draggedPanel: any): void {
    const draggedItem = draggedPanel.Data().item;
    if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
      return;
    }
    this.setState({ isItemDropTarget: false })
  }

  OnDragEnter(thisPanel: Panel, draggedPanel: any): void {
    const draggedItem = draggedPanel.Data().item;
    if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
      return;
    }
    this.setState({ isItemDropTarget: true })
  }

  OnDragDrop(thisPanel: Panel, draggedPanel: any): void {

    const draggedItem = draggedPanel.Data().item;

    if (draggedItem === null) {
      return;
    }

    draggedPanel.Data().dragCompleted = true;

    if (draggedItem == this.props.item) {
      return;
    }

    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
      TargetIndex: this.props.index,
      AbilityIndex: draggedItem
    });

  }

  onItemLeftClicked(): void {
    if (this.props.item == -1) {
      return;
    }
    if (GameUI.IsAltDown()) {
      Items.LocalPlayerItemAlertAllies(this.props.item);
      return;
    }
    Abilities.ExecuteAbility(this.props.item, Players.GetLocalPlayerPortraitUnit(), false);
  }

  onItemRightClicked(): void {

    const panel = $("#inventory_item_container_" + this.props.index);
    $.DispatchEvent("DOTAHideAbilityTooltip", panel);

    if (this.props.item === -1) {
      GameUI.SendCustomHUDError("No Item In Slot", "General.InvalidTarget_Invulnerable")
      return;
    }

    const selectedUnit = Players.GetLocalPlayerPortraitUnit();
    const playerId = Entities.GetPlayerOwnerID(selectedUnit);
    const isControllable = Entities.IsControllableByPlayer(selectedUnit, playerId);

    if (isControllable) {
      if (this.props.itemOptionsVisible && this.props.itemOptionsItem === this.props.item) {
        this.props.setItemOptionsVisible(false);
      } else {
        this.props.setItemOptionsVisible(true);
        this.props.setItemOptionsItem(this.props.item);
      }
      Game.EmitSound("ui_topmenu_select");
    }

  }

  onMouseOver(): void {
    if (this.props.item === -1) {
      return;
    }
    const panel = $("#inventory_item_container_" + this.props.index);
    const ability = Abilities.GetAbilityName(this.props.item);
    const unit = Players.GetLocalPlayerPortraitUnit();
    $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", panel, ability, unit);
  }

  onMouseOut(): void {
    const panel = $("#inventory_item_container_" + this.props.index);
    $.DispatchEvent("DOTAHideAbilityTooltip", panel)
  }

  render() {
    return (
      <Panel
        id={"inventory_item_container_" + this.props.index}
        onmouseover={this.onMouseOver}
        onmouseout={this.onMouseOut}
        onactivate={this.onItemLeftClicked}
        oncontextmenu={this.onItemRightClicked}
        className={'inventoryItemContainer'}
        draggable={true}
        style={{
          saturation: (this.state.isItemDragged || this.state.isItemDropTarget) ? '0.5' : '1.0',
          washColor: (this.state.isItemDragged || this.state.isItemDropTarget) ? '#808080' : 'none',
        }}
      >
        { this.props.item !== -1 && (
          <React.Fragment>
            <Cooldown key={'cooldown_' + this.props.item} item={this.props.item} />
            <Hotkey key={'hotkey_' + this.props.item} item={this.props.item} />
            <Charges key={'charges_' + this.props.item} item={this.props.item} />
            <Image key={'image_' + this.props.item} item={this.props.item} />
            <ManaCost key={'mana_cost_' + this.props.item} item={this.props.item} />
          </React.Fragment>
        )}
      </Panel>
    );
  }

};

export default connector(InventoryItem);
