import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@mantine/core/styles.css";
import "mantine-contextmenu/styles.css";
import { MantineProvider } from "@mantine/core";
import { ContextMenuProvider } from "mantine-contextmenu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider>
    <ContextMenuProvider>
      <App />
    </ContextMenuProvider>
  </MantineProvider>
);
