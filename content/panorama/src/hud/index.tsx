import React from "react";
import App from "./App";
import './polyfill/console';
import './polyfill/timers';
import { render } from "./reconciler";

render(
  <Panel id="__react__app__root__" hittest={false}>
    <App />
  </Panel>,
  $.GetContextPanel()
);