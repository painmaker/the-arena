import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";


const mapStateToProps = (state: RootState) => ({
  visible: state.inventoryReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const DraggedItem = (props: Props) => {

  return (
    <React.Fragment>
      { props.visible && (
        <DOTAItemImage />
      )}
    </React.Fragment>
  );

};

export default connector(DraggedItem);
