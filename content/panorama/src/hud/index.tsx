import React from "react";
import App from "./App";
import './polyfill/console';
import './polyfill/timers';
import { render } from "./reconciler";

render(
  <App />,
  $.GetContextPanel()
);