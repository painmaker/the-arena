import React from "react";
import SettingsButton from "./SettingsButton/SettingsButton";
import ShoppingButton from "./ShoppingButton/ShoppingButton";

interface Props {}

const ButtonGroup = (props: Props) => {
    return (
        <Panel hittest={false} className={"buttonGroupContainer"}>
            <Panel hittest={false} className="buttonGroupEntry">
                <SettingsButton />
            </Panel>
            <Panel hittest={false} className="buttonGroupEntry">
                <ShoppingButton />
            </Panel>
        </Panel>
    );
};

export default ButtonGroup;
