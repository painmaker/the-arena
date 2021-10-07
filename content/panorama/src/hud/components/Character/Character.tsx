import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Styles } from "./Styles";
import Model from "./Model/Model";
import Defense from "./Defense/Defense";
import Title from "./Title/Title"
import Level from "./Level/Level";
import Avatar from "./Avatar/Avatar";
import Attack from "./Attack/Attack";
import { SCHEDULE_THINK_SLOW } from "../../App";
import { cancelSchedule } from "../../utils/Schedule";

const mapStateToProps = (state: RootState) => ({
  visible: state.characterReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  selectedUnit: EntityIndex,
};

const Character = (props: Props) => {

  // $.Msg("REACT-RENDER: Character rendered");

  const { selectedUnit, visible } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    if (visible === false) {
      schedule = $.Schedule(SCHEDULE_THINK_SLOW, () => {
        setRenderComponent(false);
        schedule = -1 as ScheduleID;
      });
    } else {
      setRenderComponent(true);
    }
    return () => cancelSchedule(schedule, Character.name);
  }, [visible]);

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <React.Fragment>
          <Panel style={Styles.InnerContainer(visible)}>
            <Title selectedUnit={selectedUnit} />
            <Panel style={Styles.ColumnContainer()}>
              <Panel style={Styles.LeftColumn()}>
                <Model selectedUnit={selectedUnit} />
                <Level selectedUnit={selectedUnit} />
                <Avatar selectedUnit={selectedUnit} />
              </Panel>
              <Panel style={Styles.RightColumn()}>
                <Attack selectedUnit={selectedUnit} />
                <Defense selectedUnit={selectedUnit} />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default React.memo(connector(Character));
