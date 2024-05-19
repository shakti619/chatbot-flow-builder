// src/App.js
import React from "react";
import FlowBuilder from "./components/FlowBuilder";
import { MantineProvider, Notifications } from "@mantine/core";


function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <div className="App">
      <FlowBuilder />
    </div>
    </MantineProvider>
  );
}

export default App;
