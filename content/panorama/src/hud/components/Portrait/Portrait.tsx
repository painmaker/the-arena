import React, { useEffect } from "react";
import { Context } from "../../App";
import Styles from "./styles.module.css";

const Portrait = () => {

  // $.Msg("REACT-RENDER: Portrait rendered");

  const { selectedUnit } = React.useContext(Context);

  useEffect(() => {
    const scenePanel = $('#selected_unit_portrait') as ScenePanel;
    scenePanel.SetUnit(Entities.GetUnitName(selectedUnit), "", true);
    scenePanel.SetPostProcessFade(100);
  }, [selectedUnit])
  
  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.background} >
        <DOTAScenePanel 
          className={Styles.image}
          id={"selected_unit_portrait"}
          key={Entities.GetUnitName(selectedUnit)}
        />
      </Panel>
      <Label 
        className={Styles.label}
        text={$.Localize(Entities.GetUnitName(selectedUnit))}
      />
    </Panel>
  );

};

export default React.memo(Portrait);
