import React, { Dispatch } from "react";
import Keybind from "./Keybind/Keybind";
import Cooldown from "./Cooldown/Cooldown";
import Image from "./Image/Image";
import Charges from "./Charges/Charges";
import ManaCost from "./ManaCost/ManaCost";
import { ItemOptionsActionTypes } from "../../../types/itemOptionsTypes";
import { setItemOptionsItem, setItemOptionsPositionX, setItemOptionsVisible } from "../../../actions/itemOptionsActions";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  itemOptionsVisible: state.itemOptionsReducer.visible,
  itemOptionsItem: state.itemOptionsReducer.item,
});

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes>) => ({
  setItemOptionsItem: (item: ItemEntityIndex) => dispatch(setItemOptionsItem(item)),
  setItemOptionsPositionX: (posX: number) => dispatch(setItemOptionsPositionX(posX)),
  setItemOptionsVisible: (visible: boolean) => dispatch(setItemOptionsVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
  index: number,
};

type State = {
  isItemDragged: boolean,
  isItemDropTarget: boolean,
  isHovering: boolean,
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
      isHovering: false,
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

  onDragStart(thisPanel: Panel, draggedPanel: any): void {

    $.DispatchEvent("DOTAHideAbilityTooltip", thisPanel);

    if (this.props.item === -1) {
      return;
    }

    if (!Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer())) {
      GameUI.SendCustomHUDError("Item Not Owned By You", "General.InvalidTarget_Invulnerable");
      return;
    }

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
      Game.DropItemAtCursor(this.props.selectedUnit, this.props.item);
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

    this.props.setItemOptionsVisible(false);

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
    if (!Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer())) {
      return;
    }
    Abilities.ExecuteAbility(this.props.item, this.props.selectedUnit, false);
  }

  onItemRightClicked(): void {

    const panel = $("#inventory_item_container_" + this.props.index);
    $.DispatchEvent("DOTAHideAbilityTooltip", panel);

    if (this.props.item === -1) {
      GameUI.SendCustomHUDError("No Item In Slot", "General.InvalidTarget_Invulnerable")
      return;
    }

    const playerId = Entities.GetPlayerOwnerID(this.props.selectedUnit);
    const isControllable = Entities.IsControllableByPlayer(this.props.selectedUnit, playerId);

    if (isControllable) {
      if (this.props.itemOptionsVisible && this.props.itemOptionsItem === this.props.item) {
        this.props.setItemOptionsVisible(false);
      } else {
        this.props.setItemOptionsVisible(true);
        this.props.setItemOptionsItem(this.props.item);
        const position = panel.style.position;
        if (position) {
          const positionsArray = (position.match(/[+-]?\d+(\.\d+)?/g) || []).map(n => parseFloat(n));
          const posX = (positionsArray[0]);
          this.props.setItemOptionsPositionX(posX);
        }
      }
      Game.EmitSound("ui_topmenu_select");
    } else {
      GameUI.SendCustomHUDError("Item Not Owned By You", "General.InvalidTarget_Invulnerable")
    }

  }

  onMouseOver(): void {
    if (this.props.item === -1) {
      return;
    }
    const panel = $("#inventory_item_container_" + this.props.index);
    const ability = Abilities.GetAbilityName(this.props.item);
    $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", panel, ability, this.props.selectedUnit);
    this.setState({ isHovering: true });
  }

  onMouseOut(): void {
    const panel = $("#inventory_item_container_" + this.props.index);
    $.DispatchEvent("DOTAHideAbilityTooltip", panel);
    this.setState({ isHovering: false });
  }

  render() {

    $.Msg("REACT-RENDER: Inventory - Item rendered");

    return (
      <Panel
        id={"inventory_item_container_" + this.props.index}
        onmouseover={this.onMouseOver}
        onmouseout={this.onMouseOut}
        onactivate={this.onItemLeftClicked}
        oncontextmenu={this.onItemRightClicked}
        draggable={true}
        style={Styles.Container(this.state.isItemDragged, this.state.isItemDropTarget, this.state.isHovering)}
      >
        {this.props.item !== -1 && (
          <React.Fragment>
            <Cooldown key={'cooldown_' + this.props.item} item={this.props.item} />
            {Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer()) && (
              <Keybind key={'hotkey_' + this.props.item} item={this.props.item} />
            )}
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
